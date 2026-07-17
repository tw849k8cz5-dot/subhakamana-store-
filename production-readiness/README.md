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

- `module-01-database/`
  Runnable Prisma/PostgreSQL database module with schema, seed script, environment example, and verification script.

- `module-02-api-foundation/`
  Dependency-free backend API foundation with health endpoints, RBAC rules, idempotency validation, inventory safety rules, and tests.

## PostgreSQL CI Validation

The repository includes `.github/workflows/postgresql-validation.yml` for CI-only PostgreSQL validation. It starts a temporary PostgreSQL 16 service, creates separate temporary development and test databases, applies Prisma migrations, runs the hardened seed, verifies seeded roles and permissions, and executes the gated PostgreSQL integration test.

Create these encrypted GitHub Actions secrets before running the workflow:

- `CI_POSTGRES_PASSWORD`
- `CI_SEED_ADMIN_PASSWORD`
- `CI_SESSION_SECRET`

These secrets are for CI only. They must not point to or reuse production database credentials.

## Recommended Next Build Step

Module 1 is now started with the production database package. Continue production implementation in this order:

1. Review `08-full-system-production-audit.md`
2. Validate and migrate the database in PostgreSQL
3. Continue Module 2 authentication and backend API implementation
4. Products
5. Inventory
6. Orders and checkout
7. Delivery by bill number
8. POS
9. Payments
10. Reports
11. Notifications and backups
