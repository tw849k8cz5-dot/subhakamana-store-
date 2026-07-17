# PostgreSQL CI Sprint Status

**Date:** 2026-07-17  
**Scope:** PostgreSQL CI validation first. Frontend workflow migration is intentionally deferred until live PostgreSQL CI passes.

## Requested Order

1. Review the existing GitHub Actions PostgreSQL workflow, Prisma migration, hardened seed, authentication repositories, Product repository, Inventory repository, integration tests, and ERP API bridge.
2. Configure and run PostgreSQL CI using CI-only encrypted secrets.
3. Fix only database/backend issues if live PostgreSQL tests fail.
4. Do not change frontend workflows until live PostgreSQL passes.
5. After PostgreSQL passes, implement frontend login/session restoration and migrate Product List, Add Product, Inventory View, and Receive Stock one at a time.

## Review Completed

Reviewed:

- `.github/workflows/postgresql-validation.yml`
- `production-readiness/module-01-database/prisma/schema.prisma`
- `production-readiness/module-01-database/prisma/migrations/20260715000000_initial_production_schema/migration.sql`
- `production-readiness/module-01-database/prisma/seed.js`
- `production-readiness/module-02-api-foundation/src/prisma-user-repository.js`
- `production-readiness/module-02-api-foundation/src/prisma-session-repository.js`
- `production-readiness/module-02-api-foundation/src/prisma-product-repository.js`
- `production-readiness/module-02-api-foundation/src/prisma-inventory-repository.js`
- `production-readiness/module-02-api-foundation/test/postgres-integration.test.js`
- ERP API bridge functions in `subhakamana-store-final-erp-platform.html`

## Backend / Database Fixes Made

- Updated hardened seed permission codes to match backend RBAC permissions such as `products.write`, `inventory.read`, `inventory.receive`, `payments.verify`, `reports.read`, and related production permission codes.
- Updated Product repository creation so opening inventory creates an opening inventory movement record.
- Wrapped Product creation in a transaction when the repository is using a real Prisma client.
- Updated Inventory receiving repository to support being called inside an existing Prisma transaction without starting an invalid nested transaction.
- Updated Inventory receiving movement calculations to use the post-increment inventory value returned by Prisma, improving concurrent receive evidence.
- Expanded PostgreSQL integration test coverage for:
  - database-backed login;
  - `/auth/me`;
  - logout and session revocation;
  - expired session rejection;
  - invalid login rejection;
  - protected Product route access;
  - Product creation;
  - opening Inventory creation;
  - opening movement creation;
  - duplicate SKU and barcode repository rejection;
  - direct database unique SKU and barcode constraints;
  - Receive Stock;
  - Inventory movement records;
  - Receive Stock rollback;
  - Product creation rollback;
  - concurrent inventory receives;
  - reconnect persistence.
- Hardened the GitHub Actions workflow to fail if PostgreSQL integration tests or the full Module 2 suite report skipped tests during CI.

## Local Validation Evidence

These checks were run locally with the bundled Node runtime:

```bash
cd production-readiness/module-01-database
pnpm verify
```

Result:

```text
Database module verification passed.
```

```bash
cd production-readiness/module-02-api-foundation
node --check test/postgres-integration.test.js
pnpm verify
```

Result:

```text
31 passed, 1 skipped, 0 failed
```

The skipped test is the PostgreSQL integration test. It is skipped locally only because `TEST_DATABASE_URL` is not available in this sandbox.

## CI Run Result

The PostgreSQL CI workflow was not run from this environment.

Reason:

- The current shell does not expose GitHub CLI.
- No GitHub Actions/secrets connector was available in the tool list.
- A GitHub plugin install was requested because encrypted repository secrets and workflow dispatch require GitHub access.
- CI secrets cannot be safely created by writing them into repository files.

Required encrypted GitHub Actions secrets:

- `CI_POSTGRES_PASSWORD`
- `CI_SEED_ADMIN_PASSWORD`
- `CI_SESSION_SECRET`

These must be stored as GitHub encrypted secrets and must remain CI-only. They must never point to a production database.

## Frontend Migration Status

Frontend login/session restoration and strict `demo` / `api` data mode migration were not started in this sprint step.

Reason:

- The requested gate says not to change frontend workflows until the live PostgreSQL job passes.
- The live PostgreSQL job has not yet been run from this environment.

Current ERP API bridge status:

- Existing bridge functions call Product and Inventory backend APIs when available.
- Existing demo fallback remains in the prototype.
- Strict `api` / `production` mode behavior still needs to be implemented after live PostgreSQL passes:
  - no silent localStorage fallback;
  - no merging local business records with backend Product or Inventory records;
  - visible backend errors instead of divergent local writes.

## Remaining Risks

- Live migrations have not yet been applied in GitHub Actions from this environment.
- Hardened seed has not yet been verified by a completed CI run.
- PostgreSQL rollback and concurrency evidence has not yet been produced by CI.
- Frontend API mode cannot be safely finalized until backend auth/session and Product/Inventory PostgreSQL validation pass in CI.

## Exact Next Step

Install/connect GitHub access for this Codex session or manually add the required GitHub Actions secrets in the repository, then dispatch the `PostgreSQL Validation` workflow.

Only after that workflow passes with zero live-database tests skipped should the frontend login/session restoration and strict `demo` / `api` data mode migration begin.
