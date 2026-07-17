import { ApiError } from "./errors.js";
import { verifyPasswordHash } from "./password.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function validateLoginInput({ email, password }) {
  const normalizedEmail = normalizeEmail(email);
  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    throw new ApiError(400, "INVALID_EMAIL", "Enter a valid email address.");
  }
  if (!password || String(password).length < 8) {
    throw new ApiError(400, "INVALID_PASSWORD", "Password must be at least 8 characters.");
  }
  return { email: normalizedEmail, password: String(password) };
}

function resolveRole(user) {
  if (typeof user.role === "string") return user.role;
  return user.role?.name || "CASHIER";
}

export async function authenticateUser({ email, password }, user, verifyPassword = verifyPasswordHash) {
  const login = validateLoginInput({ email, password });
  if (!user || normalizeEmail(user.email) !== login.email) {
    throw new ApiError(401, "INVALID_CREDENTIALS", "Email or password is incorrect.");
  }
  if (user.status && user.status !== "ACTIVE") {
    throw new ApiError(403, "USER_INACTIVE", "This user account is not active.");
  }
  if (!(await verifyPassword(login.password, user.passwordHash))) {
    throw new ApiError(401, "INVALID_CREDENTIALS", "Email or password is incorrect.");
  }
  return {
    id: user.id,
    email: login.email,
    fullName: user.fullName,
    role: resolveRole(user)
  };
}

export function passwordHashingProductionNote() {
  return "Passwords are hashed with bcrypt. Production may raise cost or move to Argon2id without changing the authentication interface.";
}
