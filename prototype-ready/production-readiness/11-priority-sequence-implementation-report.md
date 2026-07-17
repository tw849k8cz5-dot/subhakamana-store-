# Priority Sequence Implementation Report

## PHASE

Production priorities 1-3:

1. Real PostgreSQL runtime and migrations
2. Authentication and sessions
3. Server-side RBAC

## STATUS

In Progress

## FILES REVIEWED

- `production-readiness/10-production-priority-roadmap.md`
- `production-readiness/module-01-database/prisma/schema.prisma`
- `production-readiness/module-01-database/package.json`
- `production-readiness/module-02-api-foundation/src/rbac.js`
- `production-readiness/module-02-api-foundation/src/server.js`
- `production-readiness/module-02-api-foundation/test/foundation.test.js`

## CHANGES MADE

- Added a 15-step production priority roadmap.
- Added local PostgreSQL Docker Compose runtime for Module 1.
- Added migration guide for creating repeatable Prisma migrations.
- Added authentication input validation and password-hash verification interface.
- Added session creation, expiration, and revocation helpers.
- Added auth/session tests.
- Kept the current ERP/POS/website prototype unchanged.

## TESTS RUN

- `node production-readiness/module-01-database/scripts/verify-database-module.js` - Passed.
- `node --test test/*.test.js` inside `production-readiness/module-02-api-foundation` - Passed, 10 tests.

## ISSUES FOUND

### P0

- Real PostgreSQL is still not running in this environment.
- Generated Prisma migration files still need to be created against PostgreSQL.
- Authentication is not connected to Prisma users yet.
- Sessions are not persisted in the database yet.

### P1

- Replace dependency-free PBKDF2 placeholder with Argon2id or bcrypt before production.
- Add login/logout HTTP routes.
- Store refresh token hashes in the `Session` table.
- Add rate limiting and failed-login protection.
- Connect RBAC checks to route middleware and Prisma-backed user roles.

### P2

- Add Docker-based local integration test after PostgreSQL can run.
- Add OpenAPI docs for auth/session endpoints.

### P3

- Add CI workflow to run Module 1 and Module 2 verification.

## RISKS

- Treating the current auth helper as production-ready would be unsafe. It exists to define the interface and tests before adding Argon2id/bcrypt and Prisma persistence.
- Running frontend and backend sources of truth together during migration can create data confusion unless each module is migrated deliberately.

## NEXT ACTION

Install the final auth dependency, connect Module 2 to Prisma, implement `/auth/login`, `/auth/logout`, `/auth/session`, and protect the first read-only product endpoint with RBAC middleware.
