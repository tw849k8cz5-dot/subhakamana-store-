# Subhakamana Store Management System

## Project Report

Prepared for: Subhakamana Store  
Project type: Front-end prototype with production-readiness planning  
Prepared on: 2026-07-17  

---

## Executive Summary

The Subhakamana Store Management System is a prototype retail software project designed for a Nepali fashion and clothing store. The system brings together three important business areas: a customer-facing e-commerce website, an Admin ERP system for store management, and a Cashier POS system for physical store billing.

The current project is presentation-ready as a front-end prototype. It includes working demonstration screens, local launch files, product images, manuals, project reports, diagrams, privacy documentation, a Nepali calendar feature, and a complete prototype-ready package for sharing and demonstration.

The project also includes production-readiness planning for a future real backend. This includes PostgreSQL database design, Prisma migration planning, API contracts, authentication and role-based access control planning, inventory ledger concepts, product and stock APIs, and GitHub CI workflow preparation. However, real production features such as live database persistence, payment gateway verification, secure login sessions, courier API production use, and cloud image storage still require backend deployment and validation.

---

## Project Introduction

Subhakamana Store is a Nepali fashion store that sells clothing such as sarees, kurtas, dupattas, blouses, and festival wear. The purpose of this project is to design a practical software system that can support both online sales and physical store operations.

The project was developed as a store-focused management prototype. It is not only a website design. It also demonstrates how products, stock, sales, billing, delivery, payments, returns, suppliers, and reports can be organized in one system.

The system has been made simple enough for a layperson to understand. It uses clear labels, visible buttons, demo data tags, and direct workflows such as "New Sale," "Add Product," "Receive Stock," "Track Order," and "Create Shipment."

---

## Project Objectives

The main objectives of the project are:

- To create a professional customer website for Subhakamana Store.
- To provide an Admin ERP dashboard for managing products, inventory, orders, deliveries, reports, and store settings.
- To provide a separate Cashier POS screen for fast physical store billing.
- To support local use without requiring a domain during prototype demonstration.
- To include demo product photos and sample inventory data.
- To label demo data clearly so users understand what is sample information.
- To prepare the system for future backend integration with PostgreSQL, APIs, authentication, payments, and delivery services.
- To create manuals, reports, diagrams, and a packaged folder suitable for project presentation.
- To keep the user experience simple and practical for store staff.

---

## System Overview

The system is divided into three main platforms:

### 1. Admin ERP

The Admin ERP is the main management system. It includes dashboards, product entry, inventory control, order management, delivery preparation, payments, suppliers, purchases, reports, returns, settings, and documentation.

### 2. Cashier POS

The Cashier POS is designed for physical store use. It focuses on fast billing, product search, barcode/SKU entry, cart management, manual selling price adjustment, member phone number discount support, payment method selection, and bill creation.

### 3. Customer Website

The Customer Website is the online storefront. It allows customers to browse products, view product details, add items to cart, choose checkout method, enter delivery or pickup information, select payment method, and receive an order confirmation.

---

## Customer E-Commerce Website Features

The customer-facing website has been improved to feel like a real Nepali fashion store rather than a simple demo page.

Key features include:

- A polished homepage with fashion-store branding.
- Product cards with product images, category, price, badges, and clear action buttons.
- Consistent wording for clothing products, including "Kurta" and "Saree."
- Product detail view with description, pricing, size selection, quantity, cart action, and related information.
- Search, filter, and sorting controls.
- Cart page with item quantity, subtotal, delivery charge, discount, and total.
- Checkout page with customer details, delivery or in-store pickup option, payment method, and order summary.
- Member phone number section for friends-and-family or customer discount support.
- Default customer option for quick checkout testing.
- QR/payment placement area for payment methods such as eSewa, Khalti, bank transfer, and cash on delivery.
- Order confirmation page with bill number.
- Customer login area with track order option.
- Footer with contact, useful links, payment options, and privacy policy.
- Privacy Policy page adapted specifically for Subhakamana Store.

---

## Admin ERP Features

The Admin ERP system is the largest part of the prototype. It is designed for store owners, managers, stock staff, and sales staff.

Key modules include:

- Dashboard with store KPIs and attention list.
- Nepali Calendar section with approximate Bikram Sambat date, month grid, and store reminders.
- Product list and product detail drawer.
- Product entry workflow with basic information, variants, supplier, pricing, inventory, images, and website preview.
- Inventory view showing stock, available quantity, damaged items, returned items, in-transit items, reorder level, source labels, and photo-use status.
- Photo-use controls such as ready for photoshoot and website-ready image status.
- Daily stock entry and receive stock workflow.
- Supplier and purchase management prototype.
- Order queue for customer and counter orders.
- Delivery page connected by bill number.
- Nepal Can Move integration planning and demo display.
- Payment center for payment status review.
- Returns, exchanges, and refund workflow.
- Reports and numerical analysis sections.
- Settings area for backend, deployment, roles, authentication, and future production setup.
- Help guide/manual area built directly into the ERP.

---

## Cashier POS Features

The separate POS system is designed for physical store use. Its goal is quick billing with minimal distractions.

Key POS goals and features include:

- Immediate access to "New physical sale."
- Product lookup by SKU, barcode, or name.
- Cart with quantity and price control.
- Manual selling price adjustment for bargaining situations.
- Member phone number entry for discount support.
- Payment method selection.
- Cash, QR, eSewa, Khalti, bank transfer, and cash-on-delivery planning.
- Bill creation and stock reduction concept.
- Simple workflow for store staff who may not be technically trained.

---

## Inventory And Product Workflow

The intended product lifecycle follows a practical retail process:

Supplier -> Purchase Order -> Receive Stock -> Create or Find Product -> Create Variants -> Generate SKU and Barcode -> Print Labels -> Update Inventory -> Take Photos -> Upload Images -> Website Preview -> Online Ready -> Publish -> POS or Online Sale -> Stock Reduction -> Reports, Returns, and Audit.

The prototype supports this workflow visually and functionally in demo mode. Production use will require the backend database and inventory ledger to be fully connected.

---

## Nepali Calendar Feature

A Nepali Calendar section has been added to the ERP dashboard. This feature helps the store think in the local Nepali calendar context, which is important for festival planning and retail operations in Nepal.

The calendar currently includes:

- Approximate Bikram Sambat date.
- English date.
- Nepali month grid.
- Highlight for today's date.
- Store reminders for festival stock review, low stock, pending orders, payment review, and month-end stock count.

The current calendar conversion is marked as approximate for prototype use. A verified Nepali calendar API or reliable BS calendar library should be used in production.

---

## Privacy Policy

A Subhakamana Store Privacy Policy page has been added. It explains how the store may collect and use customer information through checkout, delivery, customer support, member discounts, payments, and future backend systems.

The policy clearly states that the current project is a prototype and that browser demo storage is not the same as a secure production database. It also explains that real payment, delivery, authentication, and database systems must use secure production practices.

This document is suitable for prototype demonstration but should be reviewed legally before real commercial launch.

---

## Documentation And Manuals

The project includes several documentation files and reports:

- User manual for ERP operation.
- Local use guide.
- Physical POS guide.
- Technical report.
- Hosting requirements report.
- Frameworks and technology report.
- Production progress report.
- Overall system report.
- QA and reliability reports.
- UML use case diagram.
- Production-readiness backend planning documents.

These documents help both technical and non-technical users understand the project.

---

## UML Use Case Diagram Summary

The UML use case diagram describes two main actors:

- Admin
- Customer

Admin use cases include login, product management, category management, inventory dashboard, order management, customer detail viewing, website-to-dashboard linking, notifications, and reports.

Customer use cases include register/login, product browsing, product search, cart, order placement, order tracking, and order notifications.

The diagram shows that admin functions require admin login, order management includes notifications, and placing an order includes receiving an order notification.

---

## Local Prototype Package

A complete prototype-ready folder was created:

`SUBHAKAMANA_STORE_PROTOTYPE_READY_2026-07-17`

It includes:

- `START_HERE.html`
- `OPEN_PROTOTYPE.command`
- Admin ERP
- Cashier POS
- Customer Website
- Privacy Policy
- Product images
- Brand logo
- Manuals
- Reports
- Diagrams
- Production-readiness files
- Manifest

A zip archive was also created for sharing:

`SUBHAKAMANA_STORE_PROTOTYPE_READY_2026-07-17.zip`

This package is suitable for demonstration, review, and sharing with other coders.

---

## GitHub Integration Status

The actual Git repository was located at:

`/Users/bibekadhikari/Documents/GitHub/subhakamana store`

A branch was created locally:

`prototype-ready-package-2026-07-17`

A local commit was created:

`3509338 Add prototype-ready Subhakamana package`

The prototype-ready folder exists in the local Git repository. However, GitHub push and CI validation were not fully confirmed inside the sandbox because GitHub network access and GitHub CLI were unavailable in the current environment.

An update script was prepared to push the latest prototype package changes, including the Privacy Policy and Nepali Calendar updates:

`UPDATE_GITHUB_WITH_LATEST_PROTOTYPE_CHANGES.command`

---

## Backend And Production Readiness

The project includes planning and early implementation work for a future backend using:

- PostgreSQL
- Prisma
- API routes
- Authentication
- Sessions
- Role-based access control
- Product API
- Product variant/SKU/barcode API
- Inventory ledger API
- Stock receiving and adjustment API
- Audit logs
- PostgreSQL CI workflow planning

The backend is not yet fully live for production use. The current customer website, ERP, and POS are still primarily front-end prototype files with demo/local behavior.

---

## Testing And Validation

Several rounds of checks were performed during the project:

- UI link checks for the prototype-ready package.
- Package manifest generation.
- Local start page link validation.
- ERP section checks.
- QA reports.
- System manager review reports.
- Prototype package verification.
- Checks for Nepali Calendar markers in ERP files.
- Checks for Privacy Policy links in website files.

The prototype is suitable for presentation and demonstration. Full production reliability still requires backend integration tests against a real PostgreSQL database, live authentication tests, payment verification tests, delivery API tests, and deployment tests.

---

## Current Limitations

The current system is not yet a complete production system. Main limitations include:

- Real backend database is not fully connected to all UI workflows.
- Authentication and sessions are planned but not fully live in production.
- Role-based security is not enforced by a deployed backend.
- Product, inventory, sales, and order records still use prototype/demo behavior in parts of the system.
- Payment gateways are represented visually but not connected to real payment providers.
- Delivery integration is planned and demo-ready but not production-validated.
- Nepali calendar date conversion is approximate.
- Cloud image storage is not connected.
- GitHub CI workflow is prepared but not confirmed as passed from this environment.

---

## Future Enhancements

Recommended next steps include:

1. Connect PostgreSQL database in a non-production environment.
2. Apply and validate Prisma migrations.
3. Complete authentication, sessions, and server-side RBAC.
4. Connect Product List, Add Product, Inventory View, and Receive Stock to backend APIs.
5. Add full POS checkout backend persistence.
6. Add website checkout backend persistence.
7. Connect payment verification for eSewa, Khalti, bank transfer, and cash workflows.
8. Connect delivery integration using secure courier credentials.
9. Add verified Nepali calendar library or API.
10. Add production image storage using Supabase Storage, Cloudinary, Firebase Storage, or AWS S3.
11. Add backups, monitoring, and deployment process.
12. Complete GitHub Actions CI validation with PostgreSQL services.

---

## Final Conclusion

The Subhakamana Store Management System has reached a strong prototype-ready stage. It now demonstrates a complete retail workflow across customer website, Admin ERP, physical store POS, product management, inventory tracking, order processing, delivery planning, payment review, reports, privacy policy, and Nepali calendar support.

The system is suitable for academic presentation, project demonstration, store workflow discussion, and developer handoff. It clearly shows how Subhakamana Store can manage online and physical sales from one integrated platform.

The next major phase is production conversion. This means connecting the prepared frontend and ERP workflows to a real backend database, secure authentication, payment services, delivery APIs, and cloud deployment. Once those steps are completed and tested, the project can move from prototype to a real operational store management system.
