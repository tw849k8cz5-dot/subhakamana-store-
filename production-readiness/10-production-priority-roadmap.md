# Production Priority Roadmap

## Subhakamana Store Management System

**Updated:** 2026-07-15

This roadmap turns the production sequence into an implementation checklist for developers. The current prototype should remain usable while production modules are added one at a time.

## Current Rule

Do not rewrite the ERP, POS, or website before the backend source of truth exists. Preserve the strongest screens and replace browser-only decisions with backend authority gradually.

## Priority Sequence

| Order | Area | Deliverable | Current Status | Definition of Done |
| --- | --- | --- | --- | --- |
| 1 | Real PostgreSQL runtime and migrations | Local PostgreSQL, Prisma migrations, seed, verification | Started | A developer can run PostgreSQL locally, apply migrations, seed starter data, and verify the schema. |
| 2 | Authentication and sessions | Secure login, password hashing, session lifecycle | Started | Login, logout, session expiry, revocation, and failed-login protection exist on the backend. |
| 3 | Server-side RBAC | Backend permission middleware | Started | Protected endpoints reject unauthorized roles even if the frontend is modified. |
| 4 | Product API | Product create/read/update/list | Not started | ERP product screens can read/write products through API. |
| 5 | Product variants / SKU / barcode API | Variant matrix, unique SKU/barcode checks | Not started | Product variants are distinct records with SKU, barcode, price, stock, and image links. |
| 6 | Inventory ledger API | Immutable stock movement service | Not started | Every stock change creates a movement and previous/new quantity record. |
| 7 | Stock receiving and adjustment API | Purchase receiving, stock correction, stocktake adjustment | Not started | Stock increases/corrections happen in database transactions with audit records. |
| 8 | POS checkout | Atomic sale endpoint with idempotency | Not started | POS checkout cannot oversell, duplicate a sale, or lose payment/stock records. |
| 9 | Cashier shift management | Open/close shift, cash reconciliation | Not started | Cashier shift totals calculate from backend payment/refund records. |
| 10 | Online orders and reservations | Reserve/release/commit stock | Not started | Online checkout reserves stock and releases it safely on failure/cancel. |
| 11 | Website checkout | Backend order creation and delivery/pickup selection | Not started | Website orders appear in ERP from the same database. |
| 12 | Payment verification | Manual QR/bank verification first, gateways later | Not started | Payments cannot be marked paid by frontend-only logic. |
| 13 | Returns / exchanges / refunds | Bill-linked return workflow | Not started | Original sale remains immutable; returns/refunds create linked records. |
| 14 | Reports and audit logs | Backend reports and immutable audit stream | Not started | Reports calculate from verified transaction tables; sensitive events are audited. |
| 15 | Backups and monitoring | Health checks, logs, backup/restore runbook | Not started | Backup restore has been tested and health checks are monitored. |

## Immediate Developer Tasks

1. Run Module 1 PostgreSQL locally using `production-readiness/module-01-database/docker-compose.yml`.
2. Apply the Prisma migration flow documented in `production-readiness/module-01-database/migrations/README.md`.
3. Continue Module 2 with real password hashing dependency, Prisma user lookup, session persistence, and auth routes.
4. Add backend route tests before connecting any frontend screen.
5. Migrate Product API first, then Inventory API, then POS checkout.

## Do Not Start Yet

- Automated eSewa/Khalti gateway verification.
- Advanced loyalty.
- Mobile apps.
- Advanced forecasting.
- Multi-warehouse features.

These can wait until the backend source of truth, stock safety, payments, and audit trail are stable.
