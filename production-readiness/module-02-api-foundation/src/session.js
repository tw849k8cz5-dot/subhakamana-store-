import crypto from "node:crypto";
import { ApiError } from "./errors.js";

export function createRefreshToken() {
  return crypto.randomBytes(32).toString("hex");
}

export function hashRefreshToken(refreshToken) {
  if (!refreshToken) throw new ApiError(400, "MISSING_REFRESH_TOKEN", "Refresh token is required.");
  return crypto.createHash("sha256").update(String(refreshToken)).digest("hex");
}

export function createSession({ userId, role, now = new Date(), ttlMinutes = 480 }) {
  if (!userId) throw new ApiError(400, "MISSING_USER_ID", "Session requires a user ID.");
  if (!role) throw new ApiError(400, "MISSING_ROLE", "Session requires a role.");
  const issuedAt = new Date(now);
  const expiresAt = new Date(issuedAt.getTime() + ttlMinutes * 60 * 1000);
  const refreshToken = createRefreshToken();
  return {
    id: crypto.randomUUID(),
    userId,
    role,
    refreshToken,
    refreshTokenHash: hashRefreshToken(refreshToken),
    issuedAt: issuedAt.toISOString(),
    expiresAt: expiresAt.toISOString(),
    revokedAt: null,
    status: "ACTIVE"
  };
}

export function assertSessionActive(session, now = new Date()) {
  if (!session || session.status !== "ACTIVE" || session.revokedAt) {
    throw new ApiError(401, "SESSION_INACTIVE", "Session is not active.");
  }
  if (new Date(session.expiresAt).getTime() <= new Date(now).getTime()) {
    throw new ApiError(401, "SESSION_EXPIRED", "Session has expired.");
  }
  return true;
}

export function revokeSession(session, now = new Date()) {
  return {
    ...session,
    status: "REVOKED",
    revokedAt: new Date(now).toISOString()
  };
}

export async function createStoredSession({ sessionRepository, userId, role, ipAddress, userAgent, now = new Date(), ttlMinutes = 480 }) {
  if (!sessionRepository?.create) throw new ApiError(500, "SESSION_STORE_MISSING", "Session repository is not configured.");
  const session = createSession({ userId, role, now, ttlMinutes });
  const storedSession = await sessionRepository.create({
    userId,
    refreshTokenHash: session.refreshTokenHash,
    ipAddress,
    userAgent,
    expiresAt: new Date(session.expiresAt),
    status: "ACTIVE"
  });
  return {
    refreshToken: session.refreshToken,
    session: storedSession
  };
}

export async function assertStoredSessionActive({ sessionRepository, refreshToken, now = new Date() }) {
  if (!sessionRepository?.findByRefreshTokenHash) throw new ApiError(500, "SESSION_STORE_MISSING", "Session repository is not configured.");
  const session = await sessionRepository.findByRefreshTokenHash(hashRefreshToken(refreshToken));
  assertSessionActive(session, now);
  return session;
}

export async function revokeStoredSession({ sessionRepository, refreshToken, now = new Date() }) {
  if (!sessionRepository?.revokeByRefreshTokenHash) throw new ApiError(500, "SESSION_STORE_MISSING", "Session repository is not configured.");
  return sessionRepository.revokeByRefreshTokenHash(hashRefreshToken(refreshToken), new Date(now));
}
