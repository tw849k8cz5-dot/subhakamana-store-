import { createHash, pbkdf2Sync, randomBytes, timingSafeEqual } from "node:crypto";
import { ApiError } from "./errors.js";

const DEFAULT_BCRYPT_COST = 12;
let bcryptModulePromise;

export function validatePasswordPolicy(password) {
  const value = String(password || "");
  if (value.length < 8) {
    throw new ApiError(400, "WEAK_PASSWORD", "Password must be at least 8 characters.");
  }
  if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value)) {
    throw new ApiError(400, "WEAK_PASSWORD", "Password must include letters and numbers.");
  }
  return value;
}

export async function hashPassword(password, cost = DEFAULT_BCRYPT_COST) {
  const validPassword = validatePasswordPolicy(password);
  const bcrypt = await loadBcrypt();
  if (bcrypt) return bcrypt.hash(validPassword, cost);
  const salt = randomBytes(16).toString("hex");
  const iterations = Math.max(100_000, Number(cost || DEFAULT_BCRYPT_COST) * 10_000);
  const digest = pbkdf2Sync(validPassword, salt, iterations, 32, "sha256").toString("hex");
  return `$2-local-pbkdf2$${iterations}$${salt}$${digest}`;
}

export async function verifyPasswordHash(password, storedHash) {
  if (!storedHash || !String(storedHash).startsWith("$2")) return false;
  const bcrypt = await loadBcrypt();
  if (bcrypt && !String(storedHash).startsWith("$2-local-pbkdf2$")) {
    return bcrypt.compare(String(password || ""), storedHash);
  }
  return verifyLocalHash(String(password || ""), String(storedHash));
}

async function loadBcrypt() {
  if (!bcryptModulePromise) {
    bcryptModulePromise = import("bcryptjs")
      .then((module) => module.default || module)
      .catch(() => null);
  }
  return bcryptModulePromise;
}

function verifyLocalHash(password, storedHash) {
  const parts = storedHash.split("$");
  if (parts.length !== 5 || parts[1] !== "2-local-pbkdf2") return false;
  const iterations = Number(parts[2]);
  const salt = parts[3];
  const expected = parts[4];
  if (!Number.isInteger(iterations) || iterations < 100_000 || !salt || !expected) return false;
  const digest = pbkdf2Sync(password, salt, iterations, 32, "sha256").toString("hex");
  const left = Buffer.from(createHash("sha256").update(digest).digest("hex"));
  const right = Buffer.from(createHash("sha256").update(expected).digest("hex"));
  return left.length === right.length && timingSafeEqual(left, right);
}
