# Production Readiness Package

## Subhakamana Store Management System

This folder contains the first production-conversion layer for the existing Subhakamana Store front-end prototype.

It does not remove or redesign the current UI. It defines how to convert the current system into a secure, scalable, multi-user retail management application.

## Files

- `00-production-implementation-summary.md`
  Overview of the production conversion plan.

- `01-system-architecture.md`
  Target production architecture and service boundaries.

- `02-database-schema.sql`
  Normalized PostgreSQL schema for production.

- `03-api-contract.md`
  REST API contract mapped to current ERP and website workflows.

- `04-security-rbac-plan.md`
  Secure login, roles, permissions, validation, and audit controls.

- `05-testing-deployment-plan.md`
  QA, security testing, deployment, monitoring, and backup plan.

- `06-migration-plan.md`
  Step-by-step migration plan from localStorage prototype to database-backed production system.

- `07-module-01-database-implementation.md`
  Completed Module 1 implementation summary for the production database layer.

- `08-full-system-production-audit.md`
  Current P0/P1/P2/P3 production audit and priority register.

- `09-module-02-api-foundation-implementation.md`
  Module 2 implementation report for the backend API foundation.

- `10-production-priority-roadmap.md`
  Ordered implementation roadmap from PostgreSQL through backups and monitoring.

- `11-priority-sequence-implementation-report.md`
  Progress report for the first three production priorities.

- `12-erp-product-inventory-api-migration-report.md`
  Report for the first ERP localStorage-to-Backend API migration: Product List, Add Product, Inventory View, and Receive Stock.

- `13-offline-backend-hardening-report.md`
  Offline backend hardening report for authentication, sessions, RBAC, and API safety.

- `14-product-inventory-repository-prep-report.md`
  Product and Inventory repository preparation report.

- `15-postgresql-integration-phase-report.md`
  PostgreSQL integration phase report covering repository wiring and live database test expectations.

- `16-postgresql-validation-environment-report.md`
  PostgreSQL validation environment report.

- `17-postgresql-ci-sprint-status.md`
  Current PostgreSQL CI sprint status and required GitHub Actions validation.

- `18-remaining-production-work-and-validation-status.md`
  Current remaining work, test evidence, blocked sandbox tests, and next production gates.

- `19-pos-cashier-hardening-implementation-status.md`
  POS and cashier hardening status for secure shifts, scanning, discounts, split payments, receipts, parked sales, voids, payment corrections, and returns.

- `20-master-project-completion-initial-audit-2026-07-17.md`
  Master completion prompt initial audit covering repository state, implemented backend foundations, prototype-only areas, P0 blockers, CI changes, and next production phase.

- `module-01-database/`
  Runnable Prisma/PostgreSQL database module with schema, seed script, environment example, and verification script.

- `module-02-api-foundation/`
  Backend API foundation with authentication, session storage, RBAC rules, Product API, Inventory API, Prisma repositories, idempotency validation, inventory safety rules, and tests.

## PostgreSQL CI Validation

The repository includes `.github/workflows/postgresql-validation.yml` for CI-only PostgreSQL validation. It starts a temporary PostgreSQL 16 service, creates separate temporary development and test databases, applies Prisma migrations, runs the hardened seed, verifies seeded roles and permissions, and executes the gated PostgreSQL integration test.

Create these encrypted GitHub Actions secrets before running the workflow:

- `CI_POSTGRES_PASSWORD`
- `CI_SEED_ADMIN_PASSWORD`
- `CI_SESSION_SECRET`

These secrets are for CI only. They must not point to or reuse production database credentials.

## Recommended Next Build Step

Module 1 and Module 2 foundations are now included in this package. Continue production implementation in this order:

1. Push the latest package to GitHub.
2. Run PostgreSQL Validation in GitHub Actions.
3. Run Playwright QA in GitHub Actions or on the user Mac.
4. Confirm strict frontend API mode against the backend server.
5. Implement POS checkout APIs.
6. Implement website checkout and online order APIs.
7. Implement payment verification APIs.
8. Implement returns, exchanges, refunds, reports, audit logs, backups, and monitoring.
