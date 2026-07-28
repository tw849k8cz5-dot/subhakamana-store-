import test from "node:test";
import assert from "node:assert/strict";
import { authenticateUser, normalizeEmail, passwordHashingProductionNote } from "../src/auth.js";
import { hashPassword, verifyPasswordHash } from "../src/password.js";
import { assertSessionActive, createSession, revokeSession } from "../src/session.js";

test("login input normalizes email and verifies bcrypt hash", async () => {
  const passwordHash = await hashPassword("StrongPass123");
  assert.equal(await verifyPasswordHash("StrongPass123", passwordHash), true);
  assert.equal(await verifyPasswordHash("WrongPass123", passwordHash), false);
  assert.equal(normalizeEmail(" Owner@Subhakamana.Store "), "owner@subhakamana.store");
});

test("authenticateUser returns safe user identity", async () => {
  const passwordHash = await hashPassword("StrongPass123");
  const user = {
    id: "user-1",
    email: "owner@subhakamana.store",
    fullName: "Store Owner",
    role: "SUPER_ADMIN",
    status: "ACTIVE",
    passwordHash
  };
  const identity = await authenticateUser({ email: "OWNER@SUBHAKAMANA.STORE", password: "StrongPass123" }, user);
  assert.deepEqual(identity, {
    id: "user-1",
    email: "owner@subhakamana.store",
    fullName: "Store Owner",
    role: "SUPER_ADMIN"
  });
});

test("authentication rejects invalid credentials", async () => {
  const passwordHash = await hashPassword("StrongPass123");
  const user = { id: "user-1", email: "owner@subhakamana.store", fullName: "Store Owner", role: "SUPER_ADMIN", status: "ACTIVE", passwordHash };
  await assert.rejects(() => authenticateUser({ email: "owner@subhakamana.store", password: "badpass12" }, user), /incorrect/);
  await assert.rejects(() => authenticateUser({ email: "owner@subhakamana.store", password: "StrongPass123" }, { ...user, status: "INACTIVE" }), /not active/);
});

test("sessions can be created, validated, expired, and revoked", () => {
  const now = new Date("2026-07-15T00:00:00.000Z");
  const session = createSession({ userId: "user-1", role: "CASHIER", now, ttlMinutes: 60 });
  assert.equal(session.status, "ACTIVE");
  assert.equal(session.refreshToken.length, 64);
  assert.equal(session.refreshTokenHash.length, 64);
  assert.equal(assertSessionActive(session, new Date("2026-07-15T00:30:00.000Z")), true);
  assert.throws(() => assertSessionActive(session, new Date("2026-07-15T01:00:01.000Z")), /expired/);
  const revoked = revokeSession(session, new Date("2026-07-15T00:45:00.000Z"));
  assert.throws(() => assertSessionActive(revoked, new Date("2026-07-15T00:46:00.000Z")), /not active/);
});

test("production password note confirms bcrypt interface", () => {
  assert.match(passwordHashingProductionNote(), /bcrypt/);
});
