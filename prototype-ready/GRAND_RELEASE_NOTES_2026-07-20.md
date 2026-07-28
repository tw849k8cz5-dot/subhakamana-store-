# Subhakamana Store Management System

## Grand Release Notes

Release date: 2026-07-20  
Release type: Prototype-ready demonstration and developer handoff package

## Release Summary

The Subhakamana Store Management System is now organized as a complete prototype-ready platform package for demonstration, review, GitHub sharing, and continued production development. The package presents the business as three connected operator experiences:

- Admin ERP - full store management, products, inventory, orders, delivery, reports, people, and settings.
- Cashier POS - simplified physical-store billing for fast counter use.
- Customer Website - online storefront for browsing products, cart, checkout, and customer-facing store presentation.

The release also includes backend production-readiness modules for PostgreSQL, Prisma, authentication, sessions, RBAC, Product API, Inventory API, strict API-mode planning, QA workflows, reports, manuals, UML diagrams, and local launch files.

## Included Release Assets

- `START_HERE.html` - main release entry point.
- `OPEN_PROTOTYPE.command` - local server launcher.
- `subhakamana-store-final-erp-platform.html` - Admin ERP.
- `subhakamana-store-physical-pos.html` - Cashier POS.
- `subhakamana-store-ecommerce.html` - Customer Website.
- `RUN_STATIC_VALIDATION.command` - static script validation.
- `RUN_PLAYWRIGHT_QA.command` - browser QA runner.
- `RUN_BACKEND_OFFLINE_TESTS.command` - backend non-database tests.
- `RUN_POSTGRESQL_VALIDATION_LOCAL.command` - PostgreSQL validation runner.
- `RUN_BACKEND_API_LOCAL.command` - backend API local runner.
- `production-readiness/` - architecture, database, API, security, CI, and conversion documentation.
- `reports/` - presentation, technical, hosting, QA, and full-system reports.
- `docs/` - user manuals and local-use instructions.
- `diagrams/` - UML use case diagram and explanation.

## Current Capabilities

- Branded Subhakamana Store interface with Nepali fashion-store styling.
- Product listing, product onboarding, inventory visibility, photo readiness labels, and website preview.
- Demo product images and clear demo/source labels.
- Admin role, inventory role, cashier role, and local demo PIN access.
- API mode switch for backend-backed Product List, Add Product, Inventory View, and Receive Stock.
- POS-focused cashier flow with barcode search, shift concept, bill creation, discounts, split payments, receipts, void/correction safeguards, and return-by-bill planning.
- Customer website with homepage, shop, product detail, cart, checkout, payment options, trust sections, contact/social links, and privacy policy.
- Delivery page and NCM-ready delivery data display concept.
- PostgreSQL/Prisma schema foundation, seed process, auth/session/RBAC foundation, product/inventory repositories, and CI workflow files.

## Validated Locally

The package has local validation support for:

- Static JavaScript validation.
- Backend auth/session/RBAC service tests.
- Product List service behavior.
- Add Product service behavior.
- Inventory View service behavior.
- Receive Stock service behavior.

Some checks require the user's Mac terminal or GitHub Actions because the Codex sandbox may not provide Docker, PostgreSQL, npm network access, browser binaries, or local HTTP listener permissions.

## Production Boundary

This release is suitable for demonstration, academic/project submission, operator walkthroughs, investor or stakeholder review, and developer handoff.

It is not yet a live production business system until these items are completed and validated:

- Hosted backend deployment.
- Real PostgreSQL production database.
- Secure production authentication and session policy.
- Server-side RBAC across all workflows.
- Complete API persistence for POS, orders, customers, payments, delivery, returns, and reports.
- Payment gateway verification for eSewa, Khalti, bank transfer, and other payment methods.
- Production courier integration and webhook handling.
- Cloud object storage for product images.
- Backup, monitoring, logging, alerting, and recovery procedures.
- Security review, privacy review, and operational acceptance testing.

## Recommended Release Message

Subhakamana Store Management System is ready as a prototype-grade retail platform demonstration. It now contains a polished customer website, Admin ERP, physical-store POS, local launch files, documentation, reports, QA assets, GitHub workflows, and backend production-readiness modules for the next engineering phase.
