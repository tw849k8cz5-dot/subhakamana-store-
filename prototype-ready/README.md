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

## Main Prototype Screens

- `subhakamana-store-final-erp-platform.html` - Admin ERP for products, stock, orders, delivery, reports, and management.
- `subhakamana-store-physical-pos.html` - physical store POS screen for fast counter sales.
- `subhakamana-store-ecommerce.html` - customer-facing online fashion store.
- `subhakamana-store-simple-overview.html` - simplified project overview.

## Included Documentation

- `docs/` - user manuals and local use guides.
- `reports/` - progress, technical, hosting, framework, and overall system reports.
- `diagrams/` - UML use case diagram files.
- `production-readiness/` - backend/database/API/security planning documents.
- `assets/` - brand logo and product demo images used by the prototype.

## Prototype Status

This is a strong front-end prototype with local demo behavior. It is suitable for presentation, review, training, and development planning.

The following items still require production backend integration before real business use:

- live PostgreSQL database
- secure authentication and server-side RBAC
- real product and inventory API persistence
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
