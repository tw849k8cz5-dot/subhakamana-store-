# Subhakamana Store Management System

## Full Production Audit and Priority Register

**Audit date:** 2026-07-15  
**Audit scope:** Admin ERP, Physical POS, Customer Website, production-readiness package, PostgreSQL/Prisma database module, local launch files, and project documentation.  
**Repository:** `tw849k8cz5-dot/subhakamana-store-`

---

## PHASE

Phase 1 - Complete System Audit

## STATUS

Completed for the current repository baseline. Production implementation remains in progress.

## FILES REVIEWED

- `README.md`
- `START_HERE_README.md`
- `open-subhakamana-store-system.html`
- `subhakamana-store-final-erp-platform.html`
- `subhakamana-store-physical-pos.html`
- `subhakamana-store-ecommerce.html`
- `subhakamana-store-erp-user-manual.md`
- `subhakamana-physical-pos-guide.md`
- `subhakamana-full-audit-preservation-report.md`
- `subhakamana-gap-analysis-and-implementation-report.md`
- `production-readiness/00-production-implementation-summary.md`
- `production-readiness/01-system-architecture.md`
- `production-readiness/02-database-schema.sql`
- `production-readiness/03-api-contract.md`
- `production-readiness/04-security-rbac-plan.md`
- `production-readiness/05-testing-deployment-plan.md`
- `production-readiness/06-migration-plan.md`
- `production-readiness/07-module-01-database-implementation.md`
- `production-readiness/module-01-database/README.md`
- `production-readiness/module-01-database/package.json`
- `production-readiness/module-01-database/prisma/schema.prisma`
- `production-readiness/module-01-database/prisma/seed.js`
- `production-readiness/module-01-database/scripts/verify-database-module.js`

## CHANGES MADE

- Added this production audit and priority register.
- Fixed the database module verification script so it works when the repository path contains spaces.

## TESTS RUN

- `node production-readiness/module-01-database/scripts/verify-database-module.js` - initially failed because the script treated URL-encoded spaces as real path characters.
- Verification script path handling was corrected using `fileURLToPath`.
- `node production-readiness/module-01-database/scripts/verify-database-module.js` - passed after the fix.
- `node --test test/*.test.js` in `production-readiness/module-02-api-foundation` - passed, 5 tests.
- Local HTTP listen smoke test - blocked by sandbox with `EPERM`; not counted as passed.

---

## Executive Summary

Subhakamana Store is a strong front-end prototype with broad feature coverage across ERP, POS, and customer e-commerce workflows. It is useful for demonstration, user training, and project presentation. The system already shows good operational thinking: product-first tracking, bill-number delivery, physical POS separation, barcode-oriented lookup, local reports, returns, payment review, cashier shifts, and production-readiness documentation.

The main launch blocker is architectural, not visual. Critical business operations still depend on browser-side JavaScript, hardcoded demo data, and `localStorage`. That means the current system cannot safely support multiple staff, real concurrent sales, secure permissions, trustworthy payments, or transaction-safe inventory. Module 1 has begun the production path with a PostgreSQL/Prisma schema, but the backend API, authentication, RBAC middleware, inventory transaction services, and real frontend API migration are not yet implemented.

The correct next step is not a redesign. The correct next step is to preserve the best UI/workflows and move authority into a backend, one module at a time.

---

## Current Architecture

### What Exists

- Three front-end interfaces:
  - Admin ERP: `subhakamana-store-final-erp-platform.html`
  - Physical POS: `subhakamana-store-physical-pos.html`
  - Customer Website: `subhakamana-store-ecommerce.html`
- Local launch page and macOS command launchers.
- Browser-local state using `localStorage`.
- Hardcoded demo arrays for products, customers, orders, shipments, payments, and stock.
- Production-readiness documentation.
- PostgreSQL schema design in SQL.
- Prisma database module under `production-readiness/module-01-database/`.

### What Is Prototype-Only

- Demo PIN login.
- Role access enforced in the browser.
- Inventory changes made directly in JavaScript.
- Payment verification simulated in the browser.
- QR generation using client-side demo URLs.
- E-commerce checkout writing into local browser storage.
- POS sale completion in browser state.
- NCM/courier status display as local/demo data.
- Audit logs stored in local browser data.

### What Is Production-Ready Foundation

- The target architecture has been documented.
- A normalized production schema exists.
- The Prisma schema includes core models for users, roles, permissions, products, variants, inventory, orders, payments, deliveries, returns, refunds, cashier shifts, audit logs, notifications, settings, and idempotency.
- Migration documentation correctly states that `localStorage` must not remain the production source of truth.

---

## ERP Audit

### Strengths

- Dashboard gives store-level visibility.
- Product entry supports name, SKU, barcode, category, pricing, stock, variants, supplier, images, and website preview.
- Inventory includes stock, reserved/committed concepts, damaged/returned/in-transit fields, and movement records.
- Orders, delivery, payments, returns, reports, and settings are already represented.
- Recent workflow improvements support fast physical sale, duplicate product, one-click dispatch, bill-first returns, and payment verification.
- Documentation is unusually complete for a prototype.

### Gaps

- ERP data is not server-backed.
- Role controls are visual, not secure.
- Stock updates are not database transactions.
- Product variants exist in the UI but are not yet enforced through a real variant table in runtime behavior.
- Audit logs are not immutable.
- Reports calculate from local prototype arrays, not verified backend records.
- Payment verification is still simulated.
- File/image handling is local/demo only.

---

## POS Audit

### Strengths

- Separate POS file exists for physical counter use.
- Barcode/SKU/product search is represented.
- Cart, bargaining/manual selling price, member discount, payment selection, and stock reduction are present in prototype form.
- Cashier shift concepts exist.

### Gaps

- Checkout is not atomic.
- Duplicate sale prevention is not implemented.
- Inventory can conflict between POS and online sales.
- Offline/retry handling is not production-safe.
- Receipt reprint and printer-failure recovery need backend receipt records.
- Payment correction and void controls need authorization and audit.
- Cashier shift control needs backend enforcement.

---

## E-Commerce Audit

### Strengths

- Customer storefront is branded and functional as a local prototype.
- Product catalogue, search, cart, checkout, delivery/pickup, payment options, and order confirmation concepts exist.
- Website can write demo orders/payment records into the shared local prototype key.

### Gaps

- Catalogue is not fetched from a backend.
- Website stock is not reliably synchronized with ERP/POS.
- Checkout does not reserve stock in a database.
- Customer login/session is not production-secure.
- Payment success is frontend-simulated.
- Order tracking is not backed by a real order/status service.

---

## Security Audit

### P0 Security Gaps

- No production backend authentication.
- Demo PIN login appears in the browser.
- Permissions are enforced only by UI visibility.
- Sensitive operations such as stock adjustment, refund, payment verification, and price change are browser-controlled.
- No server-side rate limiting, session revocation, CSRF protection, or permission middleware.
- NCM/payment tokens must never be committed or stored in browser-accessible production code.

### Existing Security Planning

- `04-security-rbac-plan.md` correctly identifies secure authentication, RBAC, permission checks, session handling, secret handling, and audit controls as required production work.

---

## Database and Data Integrity Audit

### Strengths

- PostgreSQL is correctly selected.
- Prisma schema uses UUIDs, unique constraints, soft-delete fields, inventory versioning, product variants, inventory movement history, bill numbers, payments, returns, refunds, and idempotency.
- Inventory is product/variant-first, matching the store requirement that the system tracks products rather than customers.

### Gaps

- No live PostgreSQL instance is connected.
- No backend services currently use the schema.
- Inventory transaction locking is not implemented in runtime code.
- No migration has moved HTML prototype operations to API calls.
- No database migration files have been generated from Prisma yet.
- Verification tooling existed but failed in repo paths with spaces before this audit fix.

---

## UX and Efficiency Audit

### Strengths

- The system has been progressively simplified for layman use.
- Fast shortcuts now exist for New Sale, Receive Stock, Check Stock, Verify Payment, Dispatch Order, and Process Return.
- POS hides optional discount controls until needed.
- Inventory search supports product/SKU/barcode lookup.
- Product duplication supports faster similar-product onboarding.

### Remaining UX Issues

- Some pages still contain dense prototype documentation inside the app.
- Tables need consistent sticky headers, compact row behavior, and action menus.
- ERP and POS could further separate everyday staff work from manager/admin work.
- Some advanced fields should remain hidden until relevant.
- Mobile/tablet POS checkout needs persistent cart behavior in a production UI.

---

## Priority Register

## P0 - Critical Launch Blockers

1. No live backend API.
2. No production PostgreSQL connection used by the app.
3. Critical data still depends on `localStorage`.
4. Demo PIN authentication remains in the frontend.
5. No server-side RBAC or permission middleware.
6. Inventory updates are not transaction-safe.
7. POS and website can conflict because they do not reserve/commit shared stock through the database.
8. Payments are simulated and can be marked verified from browser logic.
9. Audit logs are local and editable through browser state.
10. No backup/restore job has been implemented and tested.
11. No production deployment with HTTPS, environment secrets, logging, and monitoring.
12. No critical end-to-end tests against a backend and database.

## P1 - Must Fix Before Launch

1. Implement backend API foundation with health checks and structured error responses.
2. Implement secure employee authentication with password hashing.
3. Implement sessions or JWT/refresh-token architecture with revocation.
4. Implement server-side roles and permissions.
5. Create product and variant APIs.
6. Create transaction-safe inventory service.
7. Create POS checkout endpoint with idempotency.
8. Create order/checkout endpoint for website orders.
9. Create payment ledger and manual verification workflow.
10. Create returns/refunds workflow linked to original bill/order items.
11. Implement cashier shift open/close on backend.
12. Add validation schemas for all write endpoints.
13. Add basic API, permission, and inventory transaction tests.

## P2 - Important Improvements

1. Move frontend modules from `localStorage` to API gradually.
2. Add sticky headers/action columns to major ERP tables.
3. Add saved views/filter chips for inventory, orders, and payments.
4. Add receipt print/reprint records.
5. Add production image upload with validation and object storage.
6. Add NCM/courier service integration after core delivery workflow is stable.
7. Add role-specific dashboards.
8. Add staff usability testing checklist and issue log.
9. Add migration scripts from demo CSV/export into PostgreSQL starter data.

## P3 - Post-Launch Enhancements

1. Automated eSewa/Khalti gateway verification.
2. Advanced loyalty/marketing.
3. Advanced analytics and forecasting.
4. Native mobile apps.
5. Multi-warehouse support.
6. Advanced courier automation.

---

## Recommended Next Implementation Step

Start Module 2: Backend API Foundation and Authentication.

The safest first implementation should add:

1. Backend project folder.
2. `/health` endpoint.
3. Central configuration loader.
4. Central error format.
5. Authentication service skeleton.
6. RBAC middleware skeleton.
7. Inventory transaction service design.
8. Tests that run locally without touching the current HTML prototype.

This keeps the current demo working while creating the production path.

---

## RISKS

- Attempting a full rewrite would likely break the working demonstration.
- Connecting only one interface to a backend while others still write to localStorage can create confusing data differences unless clearly staged.
- Payment/courier integration before backend security would increase risk.
- Staff may reject the system if production migration makes common tasks slower than the current prototype.

## NEXT ACTION

Implement Module 2 in a separate backend folder, keep the prototype unchanged, and add tests for health, auth shape, RBAC checks, idempotency shape, and inventory transaction rules.
