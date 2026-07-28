# Module 2 - Backend API Foundation

This module starts the production backend path without changing the current HTML prototype.

It is intentionally small, but it now includes the authentication and authorization foundation needed before product, inventory, POS, payment, and report APIs become production services.

## Included

- Health endpoints:
  - `GET /health`
  - `GET /health/database`
  - `GET /health/storage`
  - `GET /health/payments`
- Authentication endpoints:
  - `POST /api/v1/auth/login`
  - `GET /api/v1/auth/me`
  - `POST /api/v1/auth/logout`
- First backend product and inventory endpoints:
  - `GET /api/v1/products`
  - `POST /api/v1/products`
  - `GET /api/v1/inventory`
  - `POST /api/v1/inventory/receive-stock`
- Consistent JSON response format.
- Central error response format.
- Authentication input validation with bcrypt password hashing.
- Session creation, expiration check, revocation helpers, and database repository interface.
- Prisma session repository for server-side refresh-token storage.
- Role and permission rules.
- Server-side RBAC middleware for protected handlers.
- HTTP-only refresh-token cookie handling for auth routes.
- Optional RBAC protection switch for product and inventory HTTP routes.
- Prisma user repository for login lookups with role permissions.
- Prisma product repository for Product List and Add Product persistence.
- Prisma inventory repository for Inventory View and Receive Stock persistence.
- Idempotency key validation for checkout/payment-style requests.
- Inventory safety rules for available stock and commit validation.
- Node test suite using built-in `node:test`.

## Not Included Yet

- Prisma-backed product and inventory persistence.
- Real Prisma service implementation.
- Live payment gateway verification.
- Live image storage.
- Production repository wiring in the default server startup.
- Live PostgreSQL runtime for executing these repositories.

These belong in the next backend modules after the API foundation is accepted.

## Run

```bash
cd production-readiness/module-02-api-foundation
node src/server.js
```

Then open:

```text
http://localhost:4000/health
```

## Test

```bash
cd production-readiness/module-02-api-foundation
node --test test/*.test.js
```

## Production Rule

This backend must become the authority for business actions. The browser may display data, but it must not finalize stock, payment, refund, permission, or audit decisions by itself.
