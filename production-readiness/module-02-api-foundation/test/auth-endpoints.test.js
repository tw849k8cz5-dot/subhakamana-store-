import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "../src/server.js";
import { hashPassword } from "../src/password.js";
import { hashRefreshToken } from "../src/session.js";
import { permissions } from "../src/rbac.js";

async function listen(server) {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  return `http://127.0.0.1:${port}`;
}

async function close(server) {
  await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
}

function sessionRepositoryFixture() {
  const sessions = new Map();
  return {
    async create(data) {
      const session = {
        id: `session-${sessions.size + 1}`,
        ...data,
        user: {
          id: data.userId,
          email: "owner@subhakamana.store",
          fullName: "Store Owner",
          role: {
            name: "ADMIN",
            permissions: [{ permission: { code: permissions.PAYMENTS_VERIFY } }]
          }
        }
      };
      sessions.set(data.refreshTokenHash, session);
      return session;
    },
    async findByRefreshTokenHash(refreshTokenHash) {
      return sessions.get(refreshTokenHash) || null;
    },
    async revokeByRefreshTokenHash(refreshTokenHash, revokedAt) {
      const session = sessions.get(refreshTokenHash);
      if (!session) return { count: 0 };
      session.revokedAt = revokedAt;
      session.status = "INACTIVE";
      return { count: 1 };
    },
    sessions
  };
}

test("auth endpoints login, read current user, and logout through refresh cookie", async () => {
  const passwordHash = await hashPassword("StrongPass123");
  const userRepository = {
    async findByEmail(email) {
      if (email !== "owner@subhakamana.store") return null;
      return {
        id: "user-1",
        email,
        fullName: "Store Owner",
        role: { name: "ADMIN" },
        status: "ACTIVE",
        passwordHash
      };
    }
  };
  const sessionRepository = sessionRepositoryFixture();
  const server = createServer({
    userRepository,
    sessionRepository,
    now: () => new Date("2026-07-16T10:00:00.000Z"),
    sessionTtlMinutes: 30
  });

  const baseUrl = await listen(server);
  try {
    const login = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "OWNER@SUBHAKAMANA.STORE", password: "StrongPass123" })
    });
    assert.equal(login.status, 200);
    const cookie = login.headers.get("set-cookie");
    assert.match(cookie, /subhakamana_refresh_token=/);
    assert.match(cookie, /HttpOnly/);
    assert.match(cookie, /SameSite=Lax/);
    assert.match(cookie, /Path=\/api\/v1/);
    const loginBody = await login.json();
    assert.equal(loginBody.data.user.role, "ADMIN");
    assert.equal(loginBody.data.session.expiresAt instanceof Object, false);

    const refreshToken = /subhakamana_refresh_token=([^;]+)/.exec(cookie)[1];
    assert.equal(sessionRepository.sessions.has(hashRefreshToken(decodeURIComponent(refreshToken))), true);

    const me = await fetch(`${baseUrl}/api/v1/auth/me`, { headers: { cookie } });
    assert.equal(me.status, 200);
    const meBody = await me.json();
    assert.equal(meBody.data.user.email, "owner@subhakamana.store");

    const logout = await fetch(`${baseUrl}/api/v1/auth/logout`, { method: "POST", headers: { cookie } });
    assert.equal(logout.status, 200);
    assert.match(logout.headers.get("set-cookie"), /Max-Age=0/);

    const meAfterLogout = await fetch(`${baseUrl}/api/v1/auth/me`, { headers: { cookie } });
    assert.equal(meAfterLogout.status, 401);
  } finally {
    await close(server);
  }
});

test("auth endpoint rejects bad login without issuing a session cookie", async () => {
  const passwordHash = await hashPassword("StrongPass123");
  const server = createServer({
    userRepository: {
      async findByEmail(email) {
        return { id: "user-1", email, fullName: "Store Owner", role: "ADMIN", status: "ACTIVE", passwordHash };
      }
    },
    sessionRepository: sessionRepositoryFixture()
  });
  const baseUrl = await listen(server);
  try {
    const response = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "owner@subhakamana.store", password: "WrongPass123" })
    });
    assert.equal(response.status, 401);
    assert.equal(response.headers.get("set-cookie"), null);
  } finally {
    await close(server);
  }
});

test("auth endpoints report unavailable storage when repositories are missing", async () => {
  const server = createServer();
  const baseUrl = await listen(server);
  try {
    const response = await fetch(`${baseUrl}/api/v1/auth/me`);
    assert.equal(response.status, 503);
    const body = await response.json();
    assert.equal(body.error.code, "AUTH_NOT_CONFIGURED");
  } finally {
    await close(server);
  }
});
