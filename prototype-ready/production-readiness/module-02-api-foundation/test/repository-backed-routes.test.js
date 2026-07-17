import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "../src/server.js";
import { permissions } from "../src/rbac.js";
import { hashRefreshToken } from "../src/session.js";

async function listen(server) {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return `http://127.0.0.1:${server.address().port}`;
}

async function close(server) {
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

function authRepositories(permissionCodes = []) {
  const refreshToken = "repo-backed-route-token";
  const user = {
    id: "user-1",
    email: "owner@subhakamana.store",
    fullName: "Store Owner",
    role: {
      name: "ADMIN",
      permissions: permissionCodes.map((code) => ({ permission: { code } }))
    }
  };
  return {
    refreshToken,
    userRepository: {
      async findByEmail() {
        return user;
      }
    },
    sessionRepository: {
      async create() {
        throw new Error("not used");
      },
      async findByRefreshTokenHash(refreshTokenHash) {
        if (refreshTokenHash !== hashRefreshToken(refreshToken)) return null;
        return {
          id: "session-1",
          userId: user.id,
          refreshTokenHash,
          expiresAt: new Date("2026-07-16T12:00:00.000Z"),
          revokedAt: null,
          status: "ACTIVE",
          user
        };
      },
      async revokeByRefreshTokenHash() {
        return { count: 0 };
      }
    }
  };
}

test("repository-backed routes use injected product and inventory repositories behind RBAC", async () => {
  const auth = authRepositories([permissions.INVENTORY_READ, permissions.PRODUCTS_WRITE, permissions.INVENTORY_RECEIVE]);
  const calls = [];
  const server = createServer({
    protectBusinessRoutes: true,
    userRepository: auth.userRepository,
    sessionRepository: auth.sessionRepository,
    productRepository: {
      async listProducts() {
        calls.push("listProducts");
        return [{ sku: "KUR-BLU-L", name: "Blue Printed Kurta" }];
      },
      async createProduct(input) {
        calls.push(["createProduct", input.sku]);
        return { sku: input.sku, name: input.name };
      }
    },
    inventoryRepository: {
      async listInventory() {
        calls.push("listInventory");
        return [{ sku: "KUR-BLU-L", available: 4 }];
      },
      async receiveStock(input) {
        calls.push(["receiveStock", input.sku, input.quantity]);
        return { product: { sku: input.sku, onHand: 9 }, movement: { quantity: input.quantity } };
      }
    },
    now: () => new Date("2026-07-16T10:00:00.000Z")
  });
  const baseUrl = await listen(server);
  const cookie = `subhakamana_refresh_token=${auth.refreshToken}`;
  try {
    assert.equal((await fetch(`${baseUrl}/api/v1/products`, { headers: { cookie } })).status, 200);
    assert.equal((await fetch(`${baseUrl}/api/v1/inventory`, { headers: { cookie } })).status, 200);
    const created = await fetch(`${baseUrl}/api/v1/products`, {
      method: "POST",
      headers: { "content-type": "application/json", cookie },
      body: JSON.stringify({ name: "Repository Product", sku: "REP-1", barcode: "REP-1" })
    });
    assert.equal(created.status, 201);
    const received = await fetch(`${baseUrl}/api/v1/inventory/receive-stock`, {
      method: "POST",
      headers: { "content-type": "application/json", cookie },
      body: JSON.stringify({ sku: "KUR-BLU-L", quantity: 5, cost: 950, reference: "PO-DB-001" })
    });
    assert.equal(received.status, 201);
    assert.deepEqual(calls, [
      "listProducts",
      "listInventory",
      ["createProduct", "REP-1"],
      ["receiveStock", "KUR-BLU-L", 5]
    ]);
  } finally {
    await close(server);
  }
});
