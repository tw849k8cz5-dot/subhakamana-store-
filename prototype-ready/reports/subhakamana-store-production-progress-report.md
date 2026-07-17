# Subhakamana Store Management System

## Production Conversion Progress Report

**Project:** Subhakamana Store Management System  
**Prepared for:** Subhakamana Store  
**Report Date:** 15 July 2026  
**Project Type:** Front-end prototype moving toward production-ready ERP, POS, and e-commerce system

---

## 1. Executive Summary

The Subhakamana Store Management System has progressed from a visual front-end prototype into a more structured production-conversion project. The system already includes a customer-facing clothing website, an Admin ERP, a Cashier POS concept, inventory screens, checkout flows, delivery tracking, product onboarding, reports, manuals, UML documentation, and local launch files.

The latest production step focused only on the technical foundation required before converting Product, Inventory, POS, and Checkout features into real backend services. This step reviewed Module 1 and Module 2, validated the Prisma database schema, generated the first production migration SQL, replaced prototype password handling with bcrypt hashing, added database-ready session storage helpers, and implemented server-side role-based access control middleware.

This progress is important because the system is now moving from browser-only demo logic toward a secure backend architecture where important actions such as login, permissions, stock updates, payments, returns, and reports can be controlled by the server.

---

## 2. Current System Areas

The project is currently organized into three main user-facing areas:

### 2.1 Admin ERP

The Admin ERP is the main management area for store operations. It includes dashboard views, stock lists, product entry, purchase and receiving flows, sales/order management, delivery tracking, returns, reports, and product-photo workflow indicators.

### 2.2 Cashier POS

The Cashier POS is designed for fast physical-store billing. It supports the intended workflow of immediate sale entry, product lookup, manual selling price adjustment for bargaining situations, payment verification, and simple checkout handling.

### 2.3 Customer Website

The customer website is the online storefront for Subhakamana Store. It presents products, trust sections, cart and checkout flows, customer login-related sections, online payment placement areas, and brand styling based on the store identity.

---

## 3. Major Completed Work

### 3.1 Branding and Visual Design

- Applied Subhakamana Store branding across the website and ERP.
- Used the brand color direction from the logo and palette:
  - Deep Maroon
  - Saffron Gold
  - Royal Violet
  - Warm Ivory
  - Deep Ink
  - Warm Gray
- Improved homepage presentation for a Nepali fashion and clothing store.
- Improved product cards, navigation, spacing, trust sections, and mobile responsiveness.
- Removed unnecessary content such as the heritage story and festival notes for now.

### 3.2 Customer Website Improvements

- Improved homepage hero section and online-store feel.
- Added product browsing, search, category filtering, and sorting concepts.
- Improved product detail page behavior.
- Improved cart and checkout flow.
- Added payment options during checkout instead of the homepage.
- Added QR placement areas for online payment options.
- Added delivery or in-store pickup selection during checkout.
- Added customer phone/member discount entry section.
- Added default customer handling for checkout scenarios.
- Moved navigation links closer to the cart as requested.

### 3.3 Admin ERP Improvements

- Organized ERP sections for stock, products, orders, delivery, returns, reports, people, and settings.
- Added product onboarding workflow:
  - Basic information
  - Pricing
  - Inventory
  - Variants
  - Supplier
  - Images and media
  - Website preview
- Added stock and photo-use concepts:
  - Inventory photo
  - Premium website photo
  - Ready for photoshoot
  - Photo-use status that can be changed
- Added barcode and hardware scanning concept.
- Added product flow from supplier to publishing and sale.
- Added demo labels where content is not role-created or production-created.

### 3.4 POS and Store Workflow Improvements

- Separated the system concept into:
  - Admin ERP
  - Cashier POS
  - Customer Website
- Added a physical-store POS direction for local sale.
- Added manual selling price adjustment for bargaining situations.
- Added checkout adjustment support.
- Added member creation using phone number and related customer/member details.
- Focused on product tracking instead of customer tracking for stock control.

### 3.5 Delivery and Order Tracking

- Added delivery page behavior based on bill number.
- Added package status display.
- Added Nepal Can Move delivery integration concept.
- Added NCM token usage direction and NCM data display concept.
- Improved delivery table layout and fixed visual irregularities.

### 3.6 Documentation and Reports

Multiple documentation files and reports have been created or improved, including:

- Project summary report
- Layman user report
- Framework and technology report
- Hosting requirements report
- Overall system report
- ERP visual representation PDF report
- QA reports
- System manager check report
- UML use case diagram and explanation
- GitHub sharing guidance
- Complete marked folder for demonstration

---

## 4. Latest Production Conversion Work

The latest completed development step focused on Module 1 and Module 2 only.

### 4.1 Module 1: PostgreSQL and Prisma Database

Completed work:

- Reviewed the existing Prisma schema.
- Confirmed the system is designed for PostgreSQL.
- Validated the Prisma schema.
- Generated the first production migration SQL.
- Confirmed the database module verification script passes.
- Added or maintained production data models for:
  - Users
  - Roles
  - Permissions
  - Sessions
  - Products
  - Variants
  - Inventory
  - Orders
  - Payments
  - Deliveries
  - Returns
  - Cashier shifts
  - Audit logs

Migration file created:

```text
production-readiness/module-01-database/prisma/migrations/20260715000000_initial_production_schema/migration.sql
```

Validation result:

```text
Prisma schema valid
Database module verification passed
```

Important note:

The local environment did not provide Docker, PostgreSQL server tools, or a running PostgreSQL database on `localhost:5432`. Because of that, the migration was generated and validated with Prisma, but it was not applied to a live PostgreSQL database in this environment.

### 4.2 Module 2: Authentication, Sessions, and RBAC

Completed work:

- Reviewed existing authentication, session, and RBAC code.
- Replaced prototype password behavior with bcrypt password hashing.
- Added password policy validation.
- Added secure refresh-token generation.
- Stored only hashed refresh tokens.
- Added database-ready session storage helpers.
- Added a Prisma-compatible session repository.
- Added server-side role-based access control middleware.
- Added tests for:
  - bcrypt password hashing
  - user authentication
  - session creation
  - session validation
  - session revocation
  - RBAC permission checks
  - protected handler behavior

Validation result:

```text
Module 2 tests passed: 18/18
```

This means authentication and authorization foundations are now tested before deeper Product, Inventory, POS, Payment, and Checkout production work begins.

---

## 5. Testing and Validation Completed

The following checks have been performed during the project:

- UI section checks
- QA reliability checks
- ERP section functionality checks
- Checkout flow checks
- Delivery table layout checks
- Return/exchange/refund section layout fixes
- Product listing and inventory flow tests in the backend foundation
- Prisma schema validation
- Database module verification
- Authentication and RBAC automated tests

Latest backend test result:

```text
18 tests passed
0 tests failed
```

---

## 6. Current Limitations

The system is still a prototype moving toward production. The following items are not fully production-ready yet:

- Live PostgreSQL runtime is not connected in the current environment.
- Migrations have not yet been applied to a real PostgreSQL database locally.
- Product and inventory frontend screens are not yet fully connected to the backend API.
- POS checkout is not yet backed by a real database transaction.
- Payment verification is still not connected to real gateways.
- NCM delivery integration requires live API validation.
- Real file/image storage such as S3, Cloudinary, or Firebase Storage is not yet connected.
- Full login/logout HTTP endpoints still need to be wired into the backend server.
- Production deployment, monitoring, backup, and recovery are still future steps.

---

## 7. Recommended Next Steps

The next work should continue in controlled production-conversion order:

1. Run PostgreSQL through Docker or a local PostgreSQL installation.
2. Apply the Prisma migration to the real database.
3. Seed roles, permissions, and an initial admin user.
4. Add real login and logout API endpoints.
5. Connect server sessions to HTTP cookies or secure authorization headers.
6. Protect backend routes using RBAC middleware.
7. Convert ERP Product List from localStorage to backend API.
8. Convert Add Product from localStorage to backend API.
9. Convert Inventory View from localStorage to backend API.
10. Convert Receive Stock from localStorage to backend API.

Product and Inventory API conversion should start only after the authentication and authorization layer is applied to real routes.

---

## 8. Overall Project Status

The Subhakamana Store Management System is now in a strong demonstration and early production-conversion state.

The front-end prototype is broad and presentation-ready for demonstrating how the business system will work. The backend foundation is now beginning to enforce real production principles, including schema validation, secure password hashing, session handling, and server-side permissions.

The project is not yet a finished production system, but it now has a clear path from prototype to real deployable software.

---

## 9. Final Conclusion

The project has made significant progress from a simple front-end store concept into a structured business system for Subhakamana Store. It now includes customer shopping, ERP management, POS planning, delivery workflow, product tracking, reporting, documentation, and the first backend security foundation.

The most important recent improvement is that authentication and authorization have started moving from visual/demo behavior into tested server-side logic. This creates the correct foundation for the next production steps: real database runtime, protected APIs, live product and inventory persistence, secure POS checkout, payment verification, and deployment.

