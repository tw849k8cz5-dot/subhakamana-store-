import { ApiError } from "./errors.js";

const IDEMPOTENCY_PATTERN = /^[A-Za-z0-9:_-]{16,120}$/;

export function validateIdempotencyKey(key) {
  if (!key || !IDEMPOTENCY_PATTERN.test(String(key))) {
    throw new ApiError(400, "INVALID_IDEMPOTENCY_KEY", "A valid idempotency key is required for this operation.");
  }
  return String(key);
}
