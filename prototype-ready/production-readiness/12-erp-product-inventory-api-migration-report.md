# ERP Product and Inventory API Migration Report

## PHASE

ERP workflow migration from `localStorage` toward Backend API.

## STATUS

In Progress

## REQUIRED ORDER

1. ERP Product List: `localStorage` to Backend API
2. Add Product: `localStorage` to Backend API
3. Inventory View: `localStorage` to Backend API
4. Receive Stock: `localStorage` to Backend API

## FILES REVIEWED

- `subhakamana-store-final-erp-platform.html`
- `production-readiness/module-02-api-foundation/src/server.js`
- `production-readiness/module-02-api-foundation/src/catalog-service.js`
- `production-readiness/module-02-api-foundation/test/catalog-service.test.js`
- `production-readiness/module-02-api-foundation/README.md`

## CHANGES MADE

- Added backend product/inventory service module.
- Added backend routes:
  - `GET /api/v1/products`
  - `POST /api/v1/products`
  - `GET /api/v1/inventory`
  - `POST /api/v1/inventory/receive-stock`
- Added local CORS and `OPTIONS` support so a locally opened ERP page can call the backend during development.
- Updated ERP Product List and Inventory View to sync from Backend API after login/session restore.
- Updated ERP Add Product to post to Backend API first, then update the local screen state from the API response.
- Updated ERP Receive Stock to post to Backend API first, then update local inventory and movement display from the API response.
- Preserved local fallback behavior so the prototype still opens when the backend is not running.

## TESTS RUN

- Module 2 test suite: Passed, 15 tests.
- ERP JavaScript syntax check: Passed.
- ERP `getElementById` reference check: Passed, no missing IDs.

## ISSUES FOUND

### P0

- The backend product/inventory service is still in-memory for this module. It must be connected to Prisma/PostgreSQL before production use.

### P1

- Add real route-level authentication and RBAC middleware before enabling these endpoints for real staff use.
- Add Prisma-backed persistence for products, variants, inventory, stock movements, and audit logs.
- Add integration tests after PostgreSQL can run locally.

### P2

- Add frontend visible Backend API status so staff can tell whether the screen is using backend or local fallback.
- Add API base URL setting in the ERP Settings page.

### P3

- Add OpenAPI documentation for product and inventory endpoints.

## RISKS

- Local fallback is useful for demonstration, but production must disable browser-local authority for product, inventory, stock receiving, and audit decisions.
- Running backend in-memory means data resets when the server restarts until Prisma/PostgreSQL is connected.

## NEXT ACTION

Connect the product and inventory service to Prisma models, then migrate Product API and Inventory API tests from in-memory store to database-backed transaction tests.
