import test from "node:test";
import assert from "node:assert/strict";
import { authenticateUser, normalizeEmail } from "../src/auth.js";
import { hashPassword, verifyPasswordHash } from "../src/password.js";
import { assertUserPermission, permissions, permissionsFromUser } from "../src/rbac.js";
import { authenticateRequest, requirePermission } from "../src/rbac-middleware.js";
import { assertStoredSessionActive, createStoredSession, revokeStoredSession } from "../src/session.js";

function memorySessionRepository() {
  const sessions = new Map();
  return {
    async create(data) {
      const session = {
        id: "session-1",
        ...data,
        user: {
          id: data.userId,
          email: "owner@subhakamana.store",
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
      session.status = "INACTIVE";
      session.revokedAt = revokedAt;
      return { count: 1 };
    }
  };
}

test("bcrypt password hashing authenticates a safe user identity", async () => {
  const passwordHash = await hashPassword("StrongPass123");
  assert.equal(await verifyPasswordHash("StrongPass123", passwordHash), true);
  assert.equal(await verifyPasswordHash("WrongPass123", passwordHash), false);
  assert.equal(normalizeEmail(" Owner@Subhakamana.Store "), "owner@subhakamana.store");

  const identity = await authenticateUser(
    { email: "OWNER@SUBHAKAMANA.STORE", password: "StrongPass123" },
    { id: "user-1", email: "owner@subhakamana.store", fullName: "Store Owner", role: { name: "SUPER_ADMIN" }, status: "ACTIVE", passwordHash }
  );
  assert.deepEqual(identity, {
    id: "user-1",
    email: "owner@subhakamana.store",
    fullName: "Store Owner",
    role: "SUPER_ADMIN"
  });
});

test("stored sessions create, validate, authenticate, and revoke with hashed refresh tokens", async () => {
  const sessionRepository = memorySessionRepository();
  const created = await createStoredSession({
    sessionRepository,
    userId: "user-1",
    role: "ADMIN",
    now: new Date("2026-07-15T00:00:00.000Z"),
    ttlMinutes: 60
  });
  assert.equal(created.refreshToken.length, 64);
  assert.equal(created.session.refreshTokenHash.length, 64);

  const session = await assertStoredSessionActive({
    sessionRepository,
    refreshToken: created.refreshToken,
    now: new Date("2026-07-15T00:30:00.000Z")
  });
  assert.equal(session.user.email, "owner@subhakamana.store");

  const context = await authenticateRequest({
    sessionRepository,
    refreshToken: created.refreshToken,
    now: new Date("2026-07-15T00:30:00.000Z")
  });
  assert.equal(context.user.role.name, "ADMIN");

  const revoked = await revokeStoredSession({
    sessionRepository,
    refreshToken: created.refreshToken,
    now: new Date("2026-07-15T00:45:00.000Z")
  });
  assert.equal(revoked.count, 1);
  await assert.rejects(
    () => assertStoredSessionActive({ sessionRepository, refreshToken: created.refreshToken }),
    /not active/
  );
});

test("server-side RBAC middleware enforces permissions from database-shaped roles", async () => {
  const user = {
    id: "user-1",
    role: {
      name: "ADMIN",
      permissions: [{ permission: { code: permissions.PAYMENTS_VERIFY } }]
    }
  };
  assert.deepEqual(permissionsFromUser(user), [permissions.PAYMENTS_VERIFY]);
  assert.equal(assertUserPermission(user, permissions.PAYMENTS_VERIFY), true);

  const handler = requirePermission(permissions.PAYMENTS_VERIFY, async ({ user: authedUser }) => authedUser.id);
  assert.equal(await handler({ user }), "user-1");

  await assert.rejects(
    () => requirePermission(permissions.USERS_MANAGE, async () => true)({ user }),
    /not allowed/
  );
});
