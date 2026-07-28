import { ApiError } from "./errors.js";
import { assertUserPermission } from "./rbac.js";
import { assertStoredSessionActive } from "./session.js";

export function createAuthenticatedContext({ user, session }) {
  if (!user) throw new ApiError(401, "AUTH_REQUIRED", "Login is required.");
  return { user, session };
}

export function requirePermission(permission, handler) {
  return async function protectedHandler(context) {
    const authContext = createAuthenticatedContext(context);
    assertUserPermission(authContext.user, permission);
    return handler(authContext);
  };
}

export async function authenticateRequest({ sessionRepository, refreshToken, now = new Date() }) {
  const session = await assertStoredSessionActive({ sessionRepository, refreshToken, now });
  return createAuthenticatedContext({ user: session.user, session });
}
