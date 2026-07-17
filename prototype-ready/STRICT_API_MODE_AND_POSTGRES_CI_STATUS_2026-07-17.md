# Subhakamana Store Strict API Mode and PostgreSQL CI Status

Date: 2026-07-17

## Completed in This Workspace

- Implemented frontend login mode selection in `outputs/subhakamana-store-final-erp-platform.html`.
- Added API mode configuration with backend base URL, email, and password fields.
- Added session restoration through `/api/v1/auth/me`.
- Added API logout through `/api/v1/auth/logout`.
- Added strict API bridge calls for:
  - Product List: `GET /api/v1/products`
  - Inventory View: `GET /api/v1/inventory`
  - Add Product: `POST /api/v1/products`
  - Receive Stock: `POST /api/v1/inventory/receive-stock`
- Enforced visible API failure behavior in API mode.
- In API mode, Product List, Add Product, Inventory View, and Receive Stock do not silently fall back to localStorage.
- Kept demo mode available for local prototype demonstration.
- Refreshed the prototype-ready package copy and zip.

## Validation Performed Locally

- Extracted the ERP inline JavaScript and ran a syntax check with the bundled Node.js runtime.
- Confirmed the updated ERP file and package ERP file are identical.
- Confirmed strict API-mode text and bridge functions exist in both copies.
- Reviewed the existing PostgreSQL CI workflow and backend routes.

## PostgreSQL CI Status

The repository already contains a PostgreSQL validation workflow at:

`.github/workflows/postgresql-validation.yml`

The workflow is designed to:

- Start temporary PostgreSQL service databases.
- Validate encrypted CI secrets.
- Generate Prisma Client.
- Apply migrations to empty development and test databases.
- Run the hardened seed.
- Verify roles, permissions, role-permission mappings, and the first administrator.
- Run gated PostgreSQL integration tests.
- Validate authentication, session revocation, Product creation, opening Inventory, duplicate SKU/barcode handling, Receive Stock, movement records, rollback behavior, concurrent inventory updates, and persistence.

## Not Executed From This Sandbox

GitHub Actions could not be run from this sandbox because network access is restricted and the workspace does not have direct GitHub Actions execution access here. Therefore, PostgreSQL CI is prepared but not honestly claimable as passed from this environment.

## Required GitHub Action

After pushing the refreshed package to the repository, run the GitHub Actions workflow:

`PostgreSQL Validation`

Required encrypted GitHub Actions secrets:

- `CI_POSTGRES_PASSWORD`
- `CI_SEED_ADMIN_PASSWORD`
- `CI_SESSION_SECRET`

The workflow must pass with zero live PostgreSQL tests skipped before the backend can be considered CI-validated.

## Files Updated

- `outputs/subhakamana-store-final-erp-platform.html`
- `outputs/SUBHAKAMANA_STORE_PROTOTYPE_READY_2026-07-17/subhakamana-store-final-erp-platform.html`
- `outputs/SUBHAKAMANA_STORE_PROTOTYPE_READY_2026-07-17.zip`

