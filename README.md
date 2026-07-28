# Subhakamana Store Management System

Subhakamana Store Management System is a prototype-ready retail platform for a Nepali fashion and clothing store. It includes a customer website, Admin ERP, physical-store POS, production-readiness backend modules, QA workflows, manuals, reports, and a complete shareable demonstration package.

## Open the Prototype

Use the marked package:

```text
outputs/SUBHAKAMANA_STORE_PROTOTYPE_READY_2026-07-17/
```

Open:

```text
START_HERE.html
```

or run:

```bash
./outputs/SUBHAKAMANA_STORE_PROTOTYPE_READY_2026-07-17/OPEN_PROTOTYPE.command
```

## Main Systems

- `subhakamana-store-final-erp-platform.html` - Admin ERP for products, inventory, orders, delivery, reports, returns, cashier controls, and production planning.
- `subhakamana-store-physical-pos.html` - separate physical-store POS prototype.
- `subhakamana-store-ecommerce.html` - customer-facing online clothing storefront.
- `production-readiness/` - database, backend API, authentication, RBAC, PostgreSQL, CI, and migration documentation.

## Current Status

- Prototype/demo package: ready for presentation and review.
- Browser QA setup: prepared with Playwright.
- Backend Module 1: PostgreSQL/Prisma database foundation included.
- Backend Module 2: authentication, sessions, RBAC, Product API, Inventory API, and repository tests included.
- Strict API mode: frontend bridge prepared for Product List, Add Product, Inventory View, and Receive Stock.
- POS hardening: cashier shift requirement, barcode scanning, variant checks, discounts, split payments, receipts, voids, payment correction, and return-by-bill safeguards added.

## Run QA

Browser QA:

```bash
pnpm install
./RUN_PLAYWRIGHT_QA.command
```

Backend offline checks:

```bash
./RUN_BACKEND_OFFLINE_TESTS.command
```

PostgreSQL validation with non-production databases:

```bash
DATABASE_URL="postgresql://..." TEST_DATABASE_URL="postgresql://..." SEED_ADMIN_PASSWORD="..." ./RUN_POSTGRESQL_VALIDATION_LOCAL.command
```

## GitHub Actions

Included workflows:

- `.github/workflows/playwright-qa.yml`
- `.github/workflows/postgresql-validation.yml`

GitHub secrets required for PostgreSQL CI:

- `CI_POSTGRES_PASSWORD`
- `CI_SEED_ADMIN_PASSWORD`
- `CI_SESSION_SECRET`

## Production Limitations

This project is still a front-end prototype plus backend foundation package. Production use still requires hosted backend deployment, real PostgreSQL validation, real authentication sessions, payment gateway integration, courier integration, object/image storage, backups, monitoring, and server-side enforcement of all business rules.

## Full Report

See:

```text
outputs/reports/subhakamana-store-full-system-report-2026-07-17.md
outputs/reports/subhakamana-store-full-system-report-2026-07-17.pdf
```

