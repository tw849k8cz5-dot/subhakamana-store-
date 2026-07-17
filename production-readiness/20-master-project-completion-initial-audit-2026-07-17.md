# Subhakamana Store Management System
## Master Project-Completion Initial Audit

Prepared: 2026-07-17  
Repository target: `https://github.com/tw849k8cz5-dot/subhakamana-store-`  
Branch observed locally: `prototype-ready-package-2026-07-17`

## 1. Audit Scope

This audit reviews the current packaged source and the local GitHub repository checkout before further production conversion work. The purpose is to identify what is already implemented, what remains prototype-only, and what must be completed before controlled staff onboarding.

Reviewed areas:

- Git repository state and local branch information.
- Root package scripts and QA configuration.
- GitHub Actions workflows.
- Prisma schema, migration SQL, seed script, and database module.
- Backend API foundation, authentication, sessions, RBAC, Product repository, and Inventory repository.
- ERP API bridge and explicit demo/API mode behavior.
- Cashier POS and customer website runtime behavior.
- Playwright and backend test coverage.
- Deployment, environment, and production-readiness documentation.

GitHub PR inspection could not be completed from this environment because network access to `api.github.com` is blocked.

## 2. Repository State

The local GitHub repository folder exists at:

`/Users/bibekadhikari/Documents/GitHub/subhakamana store `

Observed status:

- Current branch: `prototype-ready-package-2026-07-17`
- Remote: `https://github.com/tw849k8cz5-dot/subhakamana-store-.git`
- Local branch is tracking `origin/prototype-ready-package-2026-07-17`
- Dirty working tree observed in the local GitHub checkout:
  - Modified: `.gitignore`
  - Untracked: `package-lock.json`
  - Untracked: `tests/example.spec.js`

The Codex workspace itself is not a Git repository. It contains the source package and the GitHub update script used to copy the ready package into the real repository.

## 3. Existing Working Backend Code

The project does include real backend foundation code. It is not only a visual prototype.

Implemented backend foundation:

- HTTP API server in `module-02-api-foundation/src/server.js`.
- Login, current-user, and logout endpoints:
  - `POST /api/v1/auth/login`
  - `GET /api/v1/auth/me`
  - `POST /api/v1/auth/logout`
- Session creation, hashed refresh tokens, expiration checks, and revocation.
- Bcrypt password verification.
- Server-side RBAC helpers and permission checks.
- Protected Product and Inventory routes when `protectBusinessRoutes` is enabled:
  - `GET /api/v1/products`
  - `POST /api/v1/products`
  - `GET /api/v1/inventory`
  - `POST /api/v1/inventory/receive-stock`
- Prisma-backed user, session, Product, and Inventory repositories.
- Transaction wrapper usage for Product creation and stock receiving.
- Product creation creates Product, ProductVariant, opening Inventory, and opening movement records.
- Inventory receiving updates ProductVariant cost, Inventory quantity/version, and InventoryMovement.
- Health endpoints for API, database configuration, storage status, and payment status.

## 4. Database Foundation

Implemented Prisma/PostgreSQL foundation:

- PostgreSQL datasource.
- Initial SQL migration exists: `20260715000000_initial_production_schema`.
- Core tables are modeled for:
  - Users, Roles, Permissions, RolePermission, Sessions
  - Customers and addresses
  - Categories, Brands, Suppliers
  - Products, ProductVariants, ProductImages, PriceHistory
  - Inventory and InventoryMovement
  - PurchaseOrder and PurchaseItem
  - Orders, OrderItems, Payments, Delivery
  - Returns, ReturnItems, Refunds
  - Stocktakes and StocktakeItems
  - CashierShift
  - AuditLog
  - Notification
  - Setting
  - IdempotencyKey
- SKU uniqueness is enforced at database level.
- Barcode uniqueness is enforced at database level.
- Monetary fields use PostgreSQL decimal fields.
- Most business records include timestamps and soft-delete/status fields.
- Seed script creates Owner role, permissions, role-permission mappings, administrator account, core categories, and store profile setting.
- Seed script refuses weak or missing admin passwords.

Database gaps:

- Only one seeded role, `Owner`, is created. Required launch roles such as Manager, Inventory Staff, Cashier, Delivery Staff, and Reports Viewer are not fully seeded yet.
- Permissions are a good start but do not yet cover every operation in the master prompt.
- Production backup, restore, monitoring, and database least-privilege validation are not implemented.
- No verified staging database is configured in this environment.

## 5. Existing Frontend Integrations

The ERP contains explicit data modes:

- Demo mode: local browser persistence and sample data.
- API mode: backend-backed Product and Inventory work.

Implemented API-mode behavior:

- Backend API base URL setting.
- Backend login and session restoration.
- API mode blocks Product/Inventory loading if backend calls fail.
- Product List, Add Product, Inventory View, and Receive Stock call backend APIs in API mode.
- API mode does not silently merge backend failures into localStorage business records for those flows.

Frontend prototype/localStorage dependencies:

- Demo mode uses `localStorage` for Products, Inventory, Orders, Payments, Returns, Shipments, Customers, POS records, audit events, cashier shifts, and local settings.
- Customer website cart and checkout are local prototype workflows.
- Physical POS is local prototype persistence and not yet backend transaction-safe.
- Delivery/NCM, payment verification, returns, reports, and cashier shift workflows are mostly visual/local prototype implementations.

## 6. Missing Backend Modules

The following areas are not yet production backend implementations:

- POS checkout transaction endpoint.
- Cashier shift open/close/reconciliation API.
- Online order checkout and stock reservation API.
- Payment verification and payment reconciliation API.
- Return, exchange, refund, and sale-void APIs.
- Supplier and purchasing APIs beyond schema planning.
- Delivery/courier operations API.
- NCM webhook and live courier API integration.
- Product image/file upload API and object storage integration.
- Report generation APIs and controlled export audit logs.
- Staff management APIs for user activation/deactivation and password reset.
- Full audit logging across sensitive operations.
- Backup and restore automation.
- Monitoring and alerting integration.

## 7. Security Gaps

Implemented:

- Bcrypt password verification.
- Refresh token hashing before storage.
- HTTP-only refresh cookie.
- Server-side permission checks for protected Product and Inventory routes.
- Production config validation for database URL, session secret, and allowed origins.
- Seed password strength checks.

Remaining gaps:

- Login rate limiting is not implemented.
- CSRF protection is not implemented.
- Password change and password reset are not implemented.
- Failed-login tracking is not implemented.
- Revoke-all-sessions is not implemented.
- Secure production cookie behavior depends on `NODE_ENV=production`, but HTTPS deployment is not validated.
- CORS allowlist behavior should be hardened further; non-production currently allows broad origin behavior.
- Sensitive operations beyond current Product/Inventory endpoints do not yet have backend routes to secure.
- Audit records for authentication and security events are not consistently written yet.

## 8. Test Coverage

Existing backend tests cover:

- Auth input validation and bcrypt password authentication.
- Session creation, expiration, and revocation.
- RBAC middleware behavior.
- Product list/create behavior in service and Prisma repository layers.
- Inventory list/receive behavior in service and Prisma repository layers.
- Protected route authorization.
- Gated PostgreSQL integration test for auth, products, inventory, rollback, concurrent receiving, and persistence when `TEST_DATABASE_URL` is present.

Existing Playwright tests cover:

- ERP opening and demo login.
- Main ERP pages checked for document-level horizontal overflow.
- Customer website shop and privacy link.
- Prototype start page entry-point links.

Tests executed in this environment:

- Static JavaScript validation using bundled Node runtime:
  - Command: `/Users/bibekadhikari/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/validate-static.mjs`
  - Result: passed.
- Shell script syntax:
  - Command: `zsh -n outputs/UPDATE_GITHUB_WITH_LATEST_PROTOTYPE_CHANGES.command && zsh -n outputs/SUBHAKAMANA_STORE_PROTOTYPE_READY_2026-07-17/OPEN_PROTOTYPE.command && zsh -n RUN_PLAYWRIGHT_QA.command`
  - Result: passed.

Tests not executed here:

- PostgreSQL integration tests were not executed because no live PostgreSQL service is available in this sandbox.
- Playwright browser tests were not executed because browser binaries are not installed in this sandbox.
- GitHub Actions were not executed because network access is blocked here.

## 9. CI and Build Status

Existing CI workflows:

- `PostgreSQL Validation`
- `Playwright QA`

CI improvements prepared during this phase:

- Added static JavaScript validation script: `scripts/validate-static.mjs`.
- Added `validate:static` package script.
- Added Playwright workflow static validation.
- Added dependency vulnerability checks.
- Added pnpm cache configuration.
- Added prototype branch trigger for both CI workflows.
- Added Prisma schema validation to PostgreSQL workflow.
- Updated GitHub sync script to copy root `production-readiness/` and the validation script.

CI still requires GitHub execution with encrypted secrets:

- `CI_POSTGRES_PASSWORD`
- `CI_SEED_ADMIN_PASSWORD`
- `CI_SESSION_SECRET`

## 10. P0 Launch Blockers

P0 blockers before controlled live onboarding:

1. Run PostgreSQL CI successfully with zero skipped live database tests.
2. Confirm root workflows run from the actual GitHub repository.
3. Resolve dirty files in the local GitHub checkout before merging.
4. Implement transaction-safe POS checkout backend.
5. Require secure cashier login and open cashier shift before physical sale.
6. Add backend idempotency to POS checkout, stock receiving, payments, and returns.
7. Implement server-generated sales, sale items, payments, inventory reduction, and audit records in one transaction.
8. Implement backend return-by-bill and partial return.
9. Remove production dependency on localStorage for Orders, Sales, Payments, Returns, Delivery, Customers, Suppliers, and Reports.
10. Validate backup and restore workflow in a non-production database.

## 11. P1 Onboarding Requirements

P1 requirements for staff pilot:

- Seed complete staff roles and permissions.
- Add staff user management.
- Add product edit/archive/restore.
- Add barcode lookup and label reprint endpoint.
- Add cashier shift API.
- Add receiving by purchase order and goods received note.
- Add order queue and dispatch workflow.
- Add manual payment verification endpoint.
- Add member/customer lookup endpoint.
- Add report endpoints for daily sales, stock value, low stock, and payment totals.
- Add object storage selection and secure upload flow.

## 12. P2 Post-Launch Improvements

P2 improvements:

- eSewa/Khalti backend gateway verification.
- Nepal Can Move live API and webhook integration.
- Advanced supplier statements and purchase returns.
- PDF/CSV controlled report exports.
- Hardware certification for barcode scanner, receipt printer, and label printer.
- Observability dashboards, alerts, and incident runbook.
- Mobile app and multi-store support.

## 13. Phase Report

PHASE: 1 - Repository, build, CI, and source audit  
STATUS: Partially completed in local package; GitHub workflow execution pending  
BRANCH: `prototype-ready-package-2026-07-17` observed locally  
COMMITS: None created from this sandbox  
FILES REVIEWED:

- `package.json`
- `.github/workflows/playwright-qa.yml`
- `.github/workflows/postgresql-validation.yml`
- `production-readiness/module-01-database/prisma/schema.prisma`
- `production-readiness/module-01-database/prisma/migrations/20260715000000_initial_production_schema/migration.sql`
- `production-readiness/module-01-database/prisma/seed.js`
- `production-readiness/module-02-api-foundation/src/server.js`
- `production-readiness/module-02-api-foundation/src/auth.js`
- `production-readiness/module-02-api-foundation/src/session.js`
- `production-readiness/module-02-api-foundation/src/rbac-middleware.js`
- `production-readiness/module-02-api-foundation/src/prisma-product-repository.js`
- `production-readiness/module-02-api-foundation/src/prisma-inventory-repository.js`
- `production-readiness/module-02-api-foundation/test/*.test.js`
- `subhakamana-store-final-erp-platform.html`
- `subhakamana-store-ecommerce.html`
- `subhakamana-store-physical-pos.html`
- `tests/subhakamana-system.spec.js`

FILES CHANGED:

- `package.json`
- `.github/workflows/playwright-qa.yml`
- `.github/workflows/postgresql-validation.yml`
- `scripts/validate-static.mjs`
- `outputs/UPDATE_GITHUB_WITH_LATEST_PROTOTYPE_CHANGES.command`
- `production-readiness/20-master-project-completion-initial-audit-2026-07-17.md`

FEATURES COMPLETED:

- Initial audit produced.
- Static validation script added.
- CI workflows strengthened with static validation, cache configuration, branch coverage, Prisma validation, and dependency audit steps.
- GitHub sync script prepared to copy root production-readiness files and validation script.

DATABASE MIGRATIONS: No new migration added in this phase  
ENVIRONMENT VARIABLES ADDED: None  
TESTS EXECUTED:

- `/Users/bibekadhikari/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/validate-static.mjs`
- `zsh -n outputs/UPDATE_GITHUB_WITH_LATEST_PROTOTYPE_CHANGES.command`
- `zsh -n outputs/SUBHAKAMANA_STORE_PROTOTYPE_READY_2026-07-17/OPEN_PROTOTYPE.command`
- `zsh -n RUN_PLAYWRIGHT_QA.command`

TESTS PASSED:

- Static JavaScript validation passed.
- Shell script syntax validation passed.

TESTS FAILED:

- None from the commands executed.

TESTS SKIPPED:

- PostgreSQL live integration tests, because no live PostgreSQL service is available in this sandbox.
- Playwright browser tests, because browser binaries are not installed in this sandbox.
- GitHub PR/workflow checks, because network access is blocked in this environment.

SECURITY CHECKS:

- Confirmed seed password strength guard exists.
- Confirmed refresh token hashing exists.
- Confirmed protected Product and Inventory routes can enforce server-side RBAC.
- Added dependency audit steps to CI workflows.

BLOCKERS:

- GitHub network access is unavailable from this sandbox.
- PostgreSQL service is unavailable from this sandbox.
- The local GitHub checkout has dirty/untracked files that should be reviewed before merge.

UNRESOLVED RISKS:

- CI changes must be run on GitHub before being trusted.
- PostgreSQL migration, rollback, and concurrency claims depend on actual CI/database execution.
- POS, checkout, payments, returns, delivery, reports, object storage, and audit logging remain incomplete as production backend modules.

NEXT PHASE:

Run GitHub CI with encrypted CI-only PostgreSQL secrets. If CI passes, continue with Phase 2 PostgreSQL validation and Phase 3 authentication/RBAC completion before adding POS checkout or payment features.
