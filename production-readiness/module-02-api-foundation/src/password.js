import bcrypt from "bcryptjs";
import { ApiError } from "./errors.js";

const DEFAULT_BCRYPT_COST = 12;

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
  return bcrypt.hash(validPassword, cost);
}

export async function verifyPasswordHash(password, storedHash) {
  if (!storedHash || !String(storedHash).startsWith("$2")) return false;
  return bcrypt.compare(String(password || ""), storedHash);
}
