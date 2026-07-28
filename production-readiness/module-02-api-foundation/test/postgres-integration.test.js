import test from "node:test";
import assert from "node:assert/strict";
import { authenticateUser } from "../src/auth.js";
import { hashPassword } from "../src/password.js";
import { createPrismaInventoryRepository } from "../src/prisma-inventory-repository.js";
import { createPrismaProductRepository } from "../src/prisma-product-repository.js";
import { createPrismaSessionRepository } from "../src/prisma-session-repository.js";
import { createPrismaUserRepository } from "../src/prisma-user-repository.js";
import { permissions } from "../src/rbac.js";
import { createServer } from "../src/server.js";
import { assertStoredSessionActive, createStoredSession, revokeStoredSession } from "../src/session.js";

const TEST_DATABASE_URL = process.env.TEST_DATABASE_URL;

async function listen(server) {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return `http://127.0.0.1:${server.address().port}`;
}

async function close(server) {
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

test("PostgreSQL integration: auth, product, inventory, rollback, concurrent receive, and persistence", { skip: !TEST_DATABASE_URL }, async () => {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient({ datasources: { db: { url: TEST_DATABASE_URL } } });
  const suffix = Date.now();
  const email = `integration-${suffix}@subhakamanastore.local`;
  const sku = `IT-KUR-${suffix}`;
  const barcode = `IT-BAR-${suffix}`;
  try {
    const role = await prisma.role.upsert({
      where: { name: "Integration Admin" },
      update: {},
      create: { name: "Integration Admin", description: "Integration test role" }
    });
    for (const code of [permissions.INVENTORY_READ, permissions.INVENTORY_RECEIVE, permissions.PRODUCTS_WRITE]) {
      const [module, ...actionParts] = code.split(".");
      const permission = await prisma.permission.upsert({
        where: { code },
        update: { module, action: actionParts.join(".") },
        create: { code, module, action: actionParts.join("."), description: `Integration permission ${code}` }
      });
      await prisma.rolePermission.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId: permission.id } },
        update: {},
        create: { roleId: role.id, permissionId: permission.id }
      });
    }
    const passwordHash = await hashPassword("StrongPass123");
    const user = await prisma.user.create({
      data: { email, fullName: "Integration Admin", roleId: role.id, passwordHash }
    });

    const userRepository = createPrismaUserRepository(prisma);
    const sessionRepository = createPrismaSessionRepository(prisma);
    const productRepository = createPrismaProductRepository(prisma);
    const inventoryRepository = createPrismaInventoryRepository(prisma);

    const server = createServer({
      userRepository,
      sessionRepository,
      productRepository,
      inventoryRepository,
      protectBusinessRoutes: true,
      now: () => new Date(),
      sessionTtlMinutes: 30
    });
    const baseUrl = await listen(server);
    try {
      const badLogin = await fetch(`${baseUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password: "WrongPass123" })
      });
      assert.equal(badLogin.status, 401);

      const login = await fetch(`${baseUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password: "StrongPass123" })
      });
      assert.equal(login.status, 200);
      const cookie = login.headers.get("set-cookie");
      assert.match(cookie, /subhakamana_refresh_token=/);

      const me = await fetch(`${baseUrl}/api/v1/auth/me`, { headers: { cookie } });
      assert.equal(me.status, 200);
      const productsOverHttp = await fetch(`${baseUrl}/api/v1/products`, { headers: { cookie } });
      assert.equal(productsOverHttp.status, 200);
      const logout = await fetch(`${baseUrl}/api/v1/auth/logout`, { method: "POST", headers: { cookie } });
      assert.equal(logout.status, 200);
      const meAfterLogout = await fetch(`${baseUrl}/api/v1/auth/me`, { headers: { cookie } });
      assert.equal(meAfterLogout.status, 401);
      const unauthorizedProducts = await fetch(`${baseUrl}/api/v1/products`);
      assert.equal(unauthorizedProducts.status, 400);
    } finally {
      await close(server);
    }

    const authed = await authenticateUser({ email, password: "StrongPass123" }, await userRepository.findByEmail(email));
    assert.equal(authed.id, user.id);
    await assert.rejects(
      () => authenticateUser({ email, password: "WrongPass123" }, user),
      /Email or password is incorrect/
    );

    const createdSession = await createStoredSession({ sessionRepository, userId: user.id, role: "Integration Admin", ttlMinutes: 30 });
    assert.equal(createdSession.session.userId, user.id);
    const activeSession = await assertStoredSessionActive({ sessionRepository, refreshToken: createdSession.refreshToken });
    assert.equal(activeSession.userId, user.id);
    const revoked = await revokeStoredSession({ sessionRepository, refreshToken: createdSession.refreshToken });
    assert.equal(revoked.count, 1);
    await assert.rejects(
      () => assertStoredSessionActive({ sessionRepository, refreshToken: createdSession.refreshToken }),
      /Session is not active/
    );
    const expiredSession = await createStoredSession({ sessionRepository, userId: user.id, role: "Integration Admin", ttlMinutes: -1 });
    await assert.rejects(
      () => assertStoredSessionActive({ sessionRepository, refreshToken: expiredSession.refreshToken }),
      /Session has expired/
    );

    const product = await productRepository.createProduct({
      name: "Integration Test Kurta",
      category: "Kurta",
      brand: "Subhakamana",
      variant: "M / Blue / Cotton",
      sku,
      barcode,
      cost: 700,
      price: 1400,
      stock: 2,
      reorder: 1
    });
    assert.equal(product.sku, sku);
    assert.equal(product.onHand, 2);
    const openingInventory = await prisma.inventory.findUnique({ where: { variantId: product.id } });
    assert.equal(openingInventory.onHand, 2);
    const openingMovement = await prisma.inventoryMovement.findFirst({
      where: { variantId: product.id, referenceType: "opening_inventory" }
    });
    assert.equal(openingMovement.quantity, 2);

    await assert.rejects(() => productRepository.createProduct({ name: "Duplicate SKU", sku, barcode: `${barcode}-2` }), /SKU/);
    await assert.rejects(() => productRepository.createProduct({ name: "Duplicate Barcode", sku: `${sku}-2`, barcode }), /barcode/i);
    await assert.rejects(
      () => prisma.productVariant.create({
        data: {
          productId: product.productId,
          sku,
          barcode: `${barcode}-DIRECT-SKU`
        }
      }),
      /Unique constraint/
    );
    await assert.rejects(
      () => prisma.productVariant.create({
        data: {
          productId: product.productId,
          sku: `${sku}-DIRECT-BAR`,
          barcode
        }
      }),
      /Unique constraint/
    );

    const rollbackSku = `${sku}-ROLLBACK`;
    const rollbackBarcode = `${barcode}-ROLLBACK`;
    await assert.rejects(
      () => prisma.$transaction(async (tx) => {
        const repo = createPrismaProductRepository(tx);
        await repo.createProduct({
          name: "Rollback Product",
          category: "Kurta",
          brand: "Subhakamana",
          variant: "S / Red / Cotton",
          sku: rollbackSku,
          barcode: rollbackBarcode,
          cost: 500,
          price: 1000,
          stock: 4,
          reorder: 1
        });
        throw new Error("forced product rollback");
      }),
      /forced product rollback/
    );
    assert.equal(await prisma.productVariant.count({ where: { sku: rollbackSku } }), 0);
    assert.equal(await prisma.productVariant.count({ where: { barcode: rollbackBarcode } }), 0);
    assert.equal(await prisma.inventory.count({ where: { variant: { sku: rollbackSku } } }), 0);
    assert.equal(await prisma.product.count({ where: { name: "Rollback Product" } }), 0);

    const received = await inventoryRepository.receiveStock({ sku, quantity: 3, cost: 750, reference: `PO-${suffix}` });
    assert.equal(received.product.onHand, 5);
    const movementCount = await prisma.inventoryMovement.count({ where: { variantId: product.id } });
    assert.equal(movementCount, 2);

    await assert.rejects(
      () => prisma.$transaction(async (tx) => {
        const repo = createPrismaInventoryRepository(tx);
        await repo.receiveStock({ sku, quantity: 1, cost: 760, reference: `ROLLBACK-${suffix}` });
        throw new Error("forced rollback");
      }),
      /forced rollback/
    );
    const afterRollback = await prisma.inventory.findUnique({ where: { variantId: product.id } });
    assert.equal(afterRollback.onHand, 5);
    const movementCountAfterRollback = await prisma.inventoryMovement.count({ where: { variantId: product.id } });
    assert.equal(movementCountAfterRollback, 2);

    await Promise.all([
      inventoryRepository.receiveStock({ sku, quantity: 1, cost: 770, reference: `CONCURRENT-A-${suffix}` }),
      inventoryRepository.receiveStock({ sku, quantity: 2, cost: 780, reference: `CONCURRENT-B-${suffix}` })
    ]);
    const afterConcurrent = await prisma.inventory.findUnique({ where: { variantId: product.id } });
    assert.equal(afterConcurrent.onHand, 8);
    assert.equal(afterConcurrent.version, 4);
    const concurrentMovements = await prisma.inventoryMovement.findMany({
      where: { variantId: product.id, referenceType: "purchase_order" },
      orderBy: { postedAt: "asc" }
    });
    assert.equal(concurrentMovements.length, 3);
    assert.equal(concurrentMovements.some((movement) => movement.newOnHand === 8), true);

    await prisma.$disconnect();
    const reconnectPrisma = new PrismaClient({ datasources: { db: { url: TEST_DATABASE_URL } } });
    const persisted = await reconnectPrisma.productVariant.findUnique({
      where: { sku },
      include: { inventory: true }
    });
    assert.equal(persisted.inventory.onHand, 8);
    await reconnectPrisma.$disconnect();
  } finally {
    await prisma.$disconnect();
  }
});
