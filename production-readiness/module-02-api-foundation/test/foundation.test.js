import test from "node:test";
import assert from "node:assert/strict";
import { loadConfig, validateProductionConfig } from "../src/config.js";
import { ApiError, errorResponse, successResponse } from "../src/errors.js";
import { assertCanCommitStock, availableStock, nextInventoryVersion } from "../src/inventory-rules.js";
import { validateIdempotencyKey } from "../src/idempotency.js";
import { assertPermission, hasPermission, permissions } from "../src/rbac.js";

test("configuration reports missing production requirements", () => {
  const config = loadConfig({ NODE_ENV: "production", PORT: "4001" });
  assert.deepEqual(validateProductionConfig(config), ["DATABASE_URL", "SESSION_SECRET", "ALLOWED_ORIGINS"]);
});

test("responses use consistent success and error shape", () => {
  assert.equal(successResponse({ status: "ok" }, "req-1").ok, true);
  const response = errorResponse(new ApiError(403, "FORBIDDEN", "No access", { role: "CASHIER" }), "req-2");
  assert.equal(response.ok, false);
  assert.equal(response.error.code, "FORBIDDEN");
  assert.equal(response.error.requestId, "req-2");
});

test("RBAC allows cashier sales but blocks payment verification", () => {
  assert.equal(hasPermission("CASHIER", permissions.POS_CREATE_SALE), true);
  assert.equal(hasPermission("CASHIER", permissions.PAYMENTS_VERIFY), false);
  assert.throws(() => assertPermission("CASHIER", permissions.PAYMENTS_VERIFY), /not allowed/);
});

test("idempotency key is required for critical operations", () => {
  assert.equal(validateIdempotencyKey("POS:20260715:000001"), "POS:20260715:000001");
  assert.throws(() => validateIdempotencyKey("short"), /idempotency key/);
});

test("inventory safety rules prevent overselling", () => {
  const inventory = { onHand: 5, reserved: 1, committed: 1, damaged: 1, version: 3 };
  assert.equal(availableStock(inventory), 2);
  assert.doesNotThrow(() => assertCanCommitStock(inventory, 2));
  assert.throws(() => assertCanCommitStock(inventory, 3), /Not enough stock/);
  assert.equal(nextInventoryVersion(inventory), 4);
});
