# Subhakamana Store Prototype Ready Project

This folder contains the demonstration-ready prototype for the Subhakamana Store Management System.

## Open First

Double-click:

```text
OPEN_PROTOTYPE.command
```

If macOS blocks the file, right-click it, choose **Open**, and confirm. The command starts a small local server and opens:

```text
START_HERE.html
```

You can also open `START_HERE.html` directly in a browser.

For the release handoff page, open:

```text
RELEASE_CENTER.html
```

The release center includes release notes, the grand release checklist, a demo script, developer handoff instructions, validation commands, reports, and the production boundary.

## Main Prototype Screens

- `subhakamana-store-final-erp-platform.html` - Admin ERP for products, stock, orders, delivery, reports, and management.
- `subhakamana-store-physical-pos.html` - physical store POS screen for fast counter sales.
- `subhakamana-store-ecommerce.html` - customer-facing online fashion store.
- `subhakamana-store-simple-overview.html` - simplified project overview.

## Backend API Mode

The Admin ERP now has an explicit API mode for backend-backed product and inventory work. Use demo mode for presentation. Use API mode only after the backend is running.

For local backend use:

1. Prepare a non-production PostgreSQL database.
2. Set `DATABASE_URL`.
3. Run `RUN_POSTGRESQL_VALIDATION_LOCAL.command` once to apply migrations, seed the first admin, and validate the backend foundation.
4. Run `RUN_BACKEND_API_LOCAL.command`.
5. Open the ERP login screen, choose **API Mode**, and use backend URL `http://localhost:4000/api/v1`.

In API mode, Product List, Add Product, Inventory View, and Receive Stock do not silently fall back to local demo data. If the backend fails, the screen shows an error instead of creating different local records.

## Included Documentation

- `RELEASE_CENTER.html` - grand release entry point.
- `GRAND_RELEASE_NOTES_2026-07-20.md` - release summary and included assets.
- `GRAND_RELEASE_CHECKLIST_2026-07-20.md` - final prototype-release checklist.
- `GRAND_RELEASE_DEMO_SCRIPT_2026-07-20.md` - presenter script.
- `GRAND_RELEASE_HANDOFF_2026-07-20.md` - developer and GitHub handoff.
- `docs/` - user manuals and local use guides.
- `reports/` - progress, technical, hosting, framework, and overall system reports.
- `diagrams/` - UML use case diagram files.
- `production-readiness/` - backend/database/API/security planning documents.
- `assets/` - brand logo and product demo images used by the prototype.

## Prototype Status

This is a strong prototype package with local demo behavior and an early backend API foundation. It is suitable for presentation, review, training, and continued development.

The following items still require production backend integration before real business use:

- hosted PostgreSQL database and deployment environment
- fully reviewed production authentication and server-side RBAC
- complete API persistence across all ERP/POS/e-commerce workflows
- payment gateway verification
- delivery/courier API production credentials
- cloud image storage
- backup, monitoring, and deployment configuration

## Recommended Demo Flow

1. Open `START_HERE.html`.
2. Open the **Admin ERP** and review dashboard, stock, product entry, delivery, and reports.
3. Open the **Cashier POS** and test a physical store sale workflow.
4. Open the **Customer Website** and review the shopping and checkout flow.
5. Review the reports and production-readiness documents for technical explanation.
