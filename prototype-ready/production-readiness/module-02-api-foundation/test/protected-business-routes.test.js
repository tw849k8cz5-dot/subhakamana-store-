import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "../src/server.js";
import { hashPassword } from "../src/password.js";
import { hashRefreshToken } from "../src/session.js";
import { permissions } from "../src/rbac.js";

async function listen(server) {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return `http://127.0.0.1:${server.address().port}`;
}

async function close(server) {
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

function userWithPermissions(permissionCodes) {
  return {
    id: "user-1",
    email: "owner@subhakamana.store",
    fullName: "Store Owner",
    role: {
      name: "ADMIN",
      permissions: permissionCodes.map((code) => ({ permission: { code } }))
    }
  };
}

function sessionRepositoryFor(user) {
  const sessions = new Map();
  const refreshToken = "fixed-refresh-token-for-route-test";
  sessions.set(hashRefreshToken(refreshToken), {
    id: "session-1",
    userId: user.id,
    refreshTokenHash: hashRefreshToken(refreshToken),
    expiresAt: new Date("2026-07-16T12:00:00.000Z"),
    revokedAt: null,
    status: "ACTIVE",
    user
  });
  return {
    refreshToken,
    async create() {
      throw new Error("not used in this test");
    },
    async findByRefreshTokenHash(refreshTokenHash) {
      return sessions.get(refreshTokenHash) || null;
    },
    async revokeByRefreshTokenHash() {
      return { count: 0 };
    }
  };
}

test("protected business routes reject unauthenticated product access", async () => {
  const passwordHash = await hashPassword("StrongPass123");
  const server = createServer({
    protectBusinessRoutes: true,
    userRepository: {
      async findByEmail(email) {
        return { id: "user-1", email, fullName: "Store Owner", role: "ADMIN", status: "ACTIVE", passwordHash };
      }
    },
    sessionRepository: sessionRepositoryFor(userWithPermissions([permissions.INVENTORY_READ])),
    now: () => new Date("2026-07-16T10:00:00.000Z")
  });
  const baseUrl = await listen(server);
  try {
    const response = await fetch(`${baseUrl}/api/v1/products`);
    assert.equal(response.status, 400);
    const body = await response.json();
    assert.equal(body.error.code, "MISSING_REFRESH_TOKEN");
  } finally {
    await close(server);
  }
});

test("protected business routes allow only matching permissions", async () => {
  const user = userWithPermissions([permissions.INVENTORY_READ]);
  const sessionRepository = sessionRepositoryFor(user);
  const server = createServer({
    protectBusinessRoutes: true,
    userRepository: {
      async findByEmail() {
        return user;
      }
    },
    sessionRepository,
    now: () => new Date("2026-07-16T10:00:00.000Z")
  });
  const baseUrl = await listen(server);
  const cookie = `subhakamana_refresh_token=${sessionRepository.refreshToken}`;
  try {
    const readProducts = await fetch(`${baseUrl}/api/v1/products`, { headers: { cookie } });
    assert.equal(readProducts.status, 200);

    const createProduct = await fetch(`${baseUrl}/api/v1/products`, {
      method: "POST",
      headers: { "content-type": "application/json", cookie },
      body: JSON.stringify({ name: "Test Product", sku: "TEST-1", price: 1000 })
    });
    assert.equal(createProduct.status, 403);
    const body = await createProduct.json();
    assert.equal(body.error.code, "FORBIDDEN");
  } finally {
    await close(server);
  }
});

test("protected receive stock requires inventory receive permission", async () => {
  const user = userWithPermissions([permissions.INVENTORY_READ, permissions.INVENTORY_RECEIVE]);
  const sessionRepository = sessionRepositoryFor(user);
  const server = createServer({
    protectBusinessRoutes: true,
    userRepository: {
      async findByEmail() {
        return user;
      }
    },
    sessionRepository,
    now: () => new Date("2026-07-16T10:00:00.000Z")
  });
  const baseUrl = await listen(server);
  const cookie = `subhakamana_refresh_token=${sessionRepository.refreshToken}`;
  try {
    const response = await fetch(`${baseUrl}/api/v1/inventory/receive-stock`, {
      method: "POST",
      headers: { "content-type": "application/json", cookie },
      body: JSON.stringify({ sku: "KUR-BLU-L", quantity: 1, cost: 950, reference: "offline-rbac-test" })
    });
    assert.equal(response.status, 201);
  } finally {
    await close(server);
  }
});
