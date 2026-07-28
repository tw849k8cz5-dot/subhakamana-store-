import http from "node:http";
import { fileURLToPath } from "node:url";
import { authenticateUser, normalizeEmail } from "./auth.js";
import { createCatalogStore, createProduct, inventoryRows, listProducts, receiveStock } from "./catalog-service.js";
import { loadConfig, validateProductionConfig } from "./config.js";
import { ApiError, errorResponse, successResponse } from "./errors.js";
import { createPrismaInventoryRepository } from "./prisma-inventory-repository.js";
import { createPrismaProductRepository } from "./prisma-product-repository.js";
import { createPrismaSessionRepository } from "./prisma-session-repository.js";
import { createPrismaUserRepository } from "./prisma-user-repository.js";
import { assertUserPermission, permissions } from "./rbac.js";
import { assertStoredSessionActive, createStoredSession, revokeStoredSession } from "./session.js";

const config = loadConfig();
const REFRESH_COOKIE = "subhakamana_refresh_token";

function corsHeaders(request) {
  const origin = request.headers.origin;
  const allowedOrigin = origin && (!config.isProduction || config.allowedOrigins.includes(origin)) ? origin : "*";
  return {
    "access-control-allow-origin": allowedOrigin,
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "content-type,x-request-id",
    "access-control-allow-credentials": "true",
    "vary": "origin"
  };
}

function sendJson(request, response, status, payload, headers = {}) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    ...corsHeaders(request),
    ...headers
  });
  response.end(JSON.stringify(payload, null, 2));
}

function sendOptions(request, response) {
  response.writeHead(204, {
    ...corsHeaders(request),
    "access-control-max-age": "86400"
  });
  response.end();
}

function parseBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) reject(new ApiError(413, "PAYLOAD_TOO_LARGE", "Request body is too large."));
    });
    request.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(new ApiError(400, "INVALID_JSON", "Request body must be valid JSON."));
      }
    });
    request.on("error", reject);
  });
}

function parseCookies(cookieHeader = "") {
  return String(cookieHeader)
    .split(";")
    .map((entry) => entry.trim())
    .filter(Boolean)
    .reduce((cookies, entry) => {
      const index = entry.indexOf("=");
      if (index === -1) return cookies;
      const key = entry.slice(0, index);
      const value = entry.slice(index + 1);
      cookies[key] = decodeURIComponent(value);
      return cookies;
    }, {});
}

function cookieHeader(refreshToken, { maxAgeSeconds, expires, secure = false } = {}) {
  const parts = [
    `${REFRESH_COOKIE}=${encodeURIComponent(refreshToken || "")}`,
    "HttpOnly",
    "SameSite=Lax",
    "Path=/api/v1"
  ];
  if (Number.isFinite(maxAgeSeconds)) parts.push(`Max-Age=${maxAgeSeconds}`);
  if (expires) parts.push(`Expires=${expires.toUTCString()}`);
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

function clearRefreshCookie({ secure = false } = {}) {
  return cookieHeader("", { maxAgeSeconds: 0, expires: new Date(0), secure });
}

function requireAuthRepositories({ userRepository, sessionRepository }) {
  if (!userRepository?.findByEmail || !sessionRepository?.create || !sessionRepository?.findByRefreshTokenHash) {
    throw new ApiError(503, "AUTH_NOT_CONFIGURED", "Authentication storage is not configured.");
  }
}

function safeSessionUser(session) {
  const user = session?.user;
  if (!user) throw new ApiError(401, "SESSION_USER_MISSING", "Session user is not available.");
  return {
    id: user.id,
    email: normalizeEmail(user.email),
    fullName: user.fullName,
    role: user.role?.name || user.role || "CASHIER"
  };
}

async function authenticateFromRequest(request, { sessionRepository, now }) {
  const refreshToken = parseCookies(request.headers.cookie)[REFRESH_COOKIE];
  return assertStoredSessionActive({ sessionRepository, refreshToken, now: now() });
}

async function requireRequestPermission(request, permission, { userRepository, sessionRepository, now }) {
  requireAuthRepositories({ userRepository, sessionRepository });
  const session = await authenticateFromRequest(request, { sessionRepository, now });
  assertUserPermission(session.user, permission);
  return session;
}

export function createServer({
  now = () => new Date(),
  store = createCatalogStore(),
  userRepository,
  sessionRepository,
  productRepository,
  inventoryRepository,
  sessionTtlMinutes = 480,
  protectBusinessRoutes = false
} = {}) {
  return http.createServer(async (request, response) => {
    const requestId = request.headers["x-request-id"] || `local-${Date.now()}`;
    try {
      const url = new URL(request.url, "http://localhost");
      if (request.method === "OPTIONS") {
        sendOptions(request, response);
        return;
      }
      if (request.method === "GET" && url.pathname === "/health") {
        const missing = config.isProduction ? validateProductionConfig(config) : [];
        const status = missing.length ? "degraded" : "ok";
        sendJson(request, response, missing.length ? 503 : 200, successResponse({
          service: "subhakamana-store-api",
          status,
          checkedAt: now().toISOString(),
          checks: {
            api: "ok",
            database: config.databaseUrl ? "configured" : "not_configured",
            storage: "not_connected",
            payments: "manual_verification_only"
          },
          missingProductionConfig: missing
        }, requestId));
        return;
      }

      if (request.method === "GET" && url.pathname === "/health/database") {
        sendJson(request, response, 200, successResponse({ status: config.databaseUrl ? "configured" : "not_configured" }, requestId));
        return;
      }

      if (request.method === "GET" && url.pathname === "/health/storage") {
        sendJson(request, response, 200, successResponse({ status: "not_connected", note: "Object storage integration is planned for a later module." }, requestId));
        return;
      }

      if (request.method === "GET" && url.pathname === "/health/payments") {
        sendJson(request, response, 200, successResponse({ status: "manual_verification_only", note: "Automated eSewa/Khalti verification is not enabled yet." }, requestId));
        return;
      }

      if (request.method === "POST" && url.pathname === "/api/v1/auth/login") {
        requireAuthRepositories({ userRepository, sessionRepository });
        const body = await parseBody(request);
        const user = await userRepository.findByEmail(normalizeEmail(body.email));
        const identity = await authenticateUser(body, user);
        const created = await createStoredSession({
          sessionRepository,
          userId: identity.id,
          role: identity.role,
          ipAddress: request.socket?.remoteAddress,
          userAgent: request.headers["user-agent"],
          now: now(),
          ttlMinutes: sessionTtlMinutes
        });
        const cookie = cookieHeader(created.refreshToken, {
          maxAgeSeconds: sessionTtlMinutes * 60,
          secure: config.isProduction
        });
        sendJson(request, response, 200, successResponse({
          user: identity,
          session: {
            id: created.session.id,
            expiresAt: created.session.expiresAt
          }
        }, requestId), { "set-cookie": cookie });
        return;
      }

      if (request.method === "GET" && url.pathname === "/api/v1/auth/me") {
        requireAuthRepositories({ userRepository, sessionRepository });
        const session = await authenticateFromRequest(request, { sessionRepository, now });
        sendJson(request, response, 200, successResponse({
          user: safeSessionUser(session),
          session: {
            id: session.id,
            expiresAt: session.expiresAt
          }
        }, requestId));
        return;
      }

      if (request.method === "POST" && url.pathname === "/api/v1/auth/logout") {
        requireAuthRepositories({ userRepository, sessionRepository });
        const refreshToken = parseCookies(request.headers.cookie)[REFRESH_COOKIE];
        if (refreshToken) {
          await revokeStoredSession({ sessionRepository, refreshToken, now: now() });
        }
        sendJson(request, response, 200, successResponse({ loggedOut: true }, requestId), {
          "set-cookie": clearRefreshCookie({ secure: config.isProduction })
        });
        return;
      }

      if (request.method === "GET" && url.pathname === "/api/v1/products") {
        if (protectBusinessRoutes) {
          await requireRequestPermission(request, permissions.INVENTORY_READ, { userRepository, sessionRepository, now });
        }
        const products = productRepository ? await productRepository.listProducts() : listProducts(store);
        sendJson(request, response, 200, successResponse({ products }, requestId));
        return;
      }

      if (request.method === "POST" && url.pathname === "/api/v1/products") {
        if (protectBusinessRoutes) {
          await requireRequestPermission(request, permissions.PRODUCTS_WRITE, { userRepository, sessionRepository, now });
        }
        const body = await parseBody(request);
        const created = productRepository ? await productRepository.createProduct(body) : createProduct(store, body);
        sendJson(request, response, 201, successResponse({ product: created }, requestId));
        return;
      }

      if (request.method === "GET" && url.pathname === "/api/v1/inventory") {
        if (protectBusinessRoutes) {
          await requireRequestPermission(request, permissions.INVENTORY_READ, { userRepository, sessionRepository, now });
        }
        const inventory = inventoryRepository ? await inventoryRepository.listInventory() : inventoryRows(store);
        sendJson(request, response, 200, successResponse({ inventory }, requestId));
        return;
      }

      if (request.method === "POST" && url.pathname === "/api/v1/inventory/receive-stock") {
        if (protectBusinessRoutes) {
          await requireRequestPermission(request, permissions.INVENTORY_RECEIVE, { userRepository, sessionRepository, now });
        }
        const body = await parseBody(request);
        const result = inventoryRepository ? await inventoryRepository.receiveStock(body) : receiveStock(store, body);
        sendJson(request, response, 201, successResponse(result, requestId));
        return;
      }

      throw new ApiError(404, "NOT_FOUND", "Route not found.");
    } catch (error) {
      const status = Number(error.status || 500);
      sendJson(request, response, status, errorResponse(error, requestId));
    }
  });
}

export async function createPrismaBackedServer(options = {}) {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();
  return createServer({
    userRepository: createPrismaUserRepository(prisma),
    sessionRepository: createPrismaSessionRepository(prisma),
    productRepository: createPrismaProductRepository(prisma),
    inventoryRepository: createPrismaInventoryRepository(prisma),
    protectBusinessRoutes: true,
    ...options
  });
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const server = config.databaseUrl ? await createPrismaBackedServer() : createServer();
  server.listen(config.port, () => {
    const mode = config.databaseUrl ? "Prisma/PostgreSQL" : "in-memory demo";
    console.log(`Subhakamana Store API foundation listening on http://localhost:${config.port} (${mode} mode)`);
  });
}
