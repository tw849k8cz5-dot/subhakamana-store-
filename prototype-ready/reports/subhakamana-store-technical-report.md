# Subhakamana Store Management System

## Technical Report

**Project:** Subhakamana Store Management System  
**Prepared for:** Subhakamana Store  
**Report Date:** 15 July 2026  
**System Type:** ERP, POS, and Customer E-Commerce Prototype with Production Backend Conversion Plan

---

## 1. Technical Executive Summary

The Subhakamana Store Management System is a front-end prototype and early production-conversion project for a Nepali fashion and clothing store. The system is designed to support three main operating areas: Admin ERP, Cashier POS, and Customer Website.

The current prototype demonstrates store workflows through browser-based screens, local data handling, and structured user interfaces. The production-conversion work has now started by creating a PostgreSQL and Prisma database foundation, generating an initial migration, improving backend authentication, preparing secure session storage, and implementing server-side role-based access control.

The system is not yet a complete production deployment, but the technical direction is now clear: the browser interface will gradually stop being the authority for business actions, and the backend will become responsible for login, permissions, data persistence, inventory movement, payment verification, delivery state, audit logs, and reporting.

---

## 2. System Architecture Overview

The intended production architecture follows a standard multi-layer retail system design.

```text
Customer Website
Admin ERP
Cashier POS
        |
        v
Authentication and RBAC
        |
        v
Backend API Layer
        |
        v
Business Services
        |
        +-- Product Service
        +-- Inventory Service
        +-- Sales/POS Service
        +-- Purchase Service
        +-- Customer/Member Service
        +-- Supplier Service
        +-- Payment Verification Service
        +-- Delivery Service
        +-- Reporting and Analytics
        +-- Notification Service
        +-- File/Image Service
        |
        v
PostgreSQL Database + Object/Image Storage
```

In the current state, the user interface is mostly static HTML, CSS, and JavaScript. The backend production modules are being introduced in a controlled order under the production-readiness area.

---

## 3. Main System Areas

### 3.1 Admin ERP

The Admin ERP is intended for store managers and authorized staff. It contains management screens for:

- Dashboard and attention lists
- Product list and product onboarding
- Inventory and stock movement
- Purchase and receiving workflows
- Orders and delivery dispatch
- Returns, exchanges, and refunds
- People, members, suppliers, and staff concepts
- Reports and business analysis

### 3.2 Cashier POS

The Cashier POS is intended for physical-store billing. Its design goal is speed and simplicity. The desired flow is:

- New physical sale with immediate access
- Product search in under five seconds
- One-screen stock check
- Manual selling price adjustment for bargaining situations
- Fast payment verification
- Bill-based return processing
- Minimal distractions for cashier use

### 3.3 Customer Website

The Customer Website is the online storefront. It includes:

- Branded homepage
- Product browsing
- Product detail pages
- Cart and checkout
- Delivery or in-store pickup selection
- Payment method and QR placement areas
- Member phone number entry
- Customer login-related sections
- Trust and support information

---

## 4. Current Technology Stack

### 4.1 Front-End Prototype

- HTML
- CSS
- Vanilla JavaScript
- Browser localStorage for prototype state
- Local file-based launch for demonstration

The front-end is currently suitable for demonstration, workflow explanation, and UI testing. It is not yet fully connected to a production backend.

### 4.2 Backend Foundation

- Node.js
- Native Node HTTP/testing tools
- Modular JavaScript services
- bcrypt password hashing
- Session helper functions
- Server-side RBAC middleware
- Prisma-compatible session repository

### 4.3 Database Foundation

- PostgreSQL as the target production database
- Prisma ORM
- UUID primary keys
- Initial production migration SQL generated
- Soft-delete and status fields across important records
- Audit-friendly models

### 4.4 Future Storage Layer

The production system should use an object storage service for product images and media, such as:

- AWS S3
- Cloudinary
- Firebase Storage
- Supabase Storage

---

## 5. Database Design Summary

The Prisma schema defines the foundation for a production retail database. Major model groups include:

### 5.1 Security Models

- User
- Role
- Permission
- RolePermission
- Session
- AuditLog

These models support secure login, role assignment, permission checks, session persistence, and audit history.

### 5.2 Product and Inventory Models

- Product
- ProductVariant
- ProductImage
- Category
- Brand
- Supplier
- Inventory
- InventoryMovement
- PriceHistory

The design tracks product variants, SKU, barcode, stock quantities, price history, and image usage.

### 5.3 Sales and Checkout Models

- Order
- OrderItem
- Payment
- Delivery
- Customer
- Address

Orders store product and price snapshots so historical bills remain accurate even if product data later changes.

### 5.4 Returns and Stocktake Models

- Return
- ReturnItem
- Refund
- Stocktake
- StocktakeItem

These models support return inspection, refund tracking, and physical stock verification.

### 5.5 Store Operation Models

- PurchaseOrder
- PurchaseItem
- CashierShift
- Notification
- Setting
- IdempotencyKey

These models support receiving stock, cashier shift control, notifications, settings, and duplicate-request prevention.

---

## 6. Authentication and Authorization

The latest backend foundation work improved the security layer.

### 6.1 Password Handling

Prototype password behavior was replaced with bcrypt hashing. The system now has:

- Password policy validation
- bcrypt password hashing
- bcrypt password verification
- Safe user identity response after login validation

### 6.2 Session Handling

The system now includes:

- Secure refresh-token generation
- Refresh-token hashing
- Stored session creation helper
- Stored session validation helper
- Stored session revocation helper
- Prisma-compatible session repository

Only the hashed refresh token should be stored in the database.

### 6.3 RBAC Middleware

Server-side role-based access control has been added. This allows backend routes to enforce permissions before actions are performed.

Examples of permission areas:

- POS sale creation
- Discount application
- Payment verification
- Return creation and approval
- Inventory read and receiving
- Product writing
- Report reading
- User management

This is important because permissions must be enforced by the server, not only hidden or shown in the browser.

---

## 7. Current Prototype Data Behavior

Some parts of the project still use browser-side data behavior. This is acceptable for demonstration but not for production.

### 7.1 Real or Production-Ready Foundations

- Prisma database schema
- Initial migration SQL
- bcrypt password hashing
- Session storage interface
- Server-side RBAC middleware
- Backend foundation tests

### 7.2 Prototype or Demo Behavior

- Many UI screens still use localStorage or in-memory demo data.
- Product and inventory screens are not yet fully connected to a real backend database.
- Checkout and POS behavior is still not fully transaction-backed.
- Delivery and NCM integration are not yet verified against a live API runtime.
- Payment gateway verification is still visual or conceptual.

### 7.3 Required Conversion Direction

The conversion should proceed one module at a time:

1. Authentication and sessions
2. RBAC-protected API routes
3. Product list API
4. Add product API
5. Inventory view API
6. Receive stock API
7. POS checkout transaction
8. Payment verification
9. Delivery integration
10. Reports and audit logs

---

## 8. Testing and Validation

The latest technical validation included:

```text
Prisma schema validation: passed
Database module verification: passed
Module 2 automated tests: 18 passed, 0 failed
```

Validated areas:

- bcrypt password hashing
- bcrypt password verification
- login identity handling
- session creation
- session expiration
- session revocation
- stored session validation
- RBAC permission checking
- protected handler middleware
- inventory safety helper tests from earlier API foundation work

Important environment limitation:

The local environment did not expose Docker, PostgreSQL server binaries, or a running PostgreSQL database on `localhost:5432`. Therefore, the migration was generated and schema-validated, but it was not applied to a live PostgreSQL runtime in this environment.

---

## 9. Security Considerations

For production, the following security rules should be followed:

- Use HTTPS only.
- Store passwords only as bcrypt or Argon2id hashes.
- Store refresh tokens only as hashes.
- Use secure, HTTP-only cookies for browser sessions where possible.
- Enforce RBAC on every protected backend route.
- Add audit logs for important actions.
- Validate all input on the server.
- Never trust localStorage for sensitive or final business decisions.
- Protect payment verification and refund actions with higher-level permissions.
- Use environment variables for secrets.

---

## 10. Deployment and Hosting Direction

The production system will need:

- Web hosting for the customer website
- Backend API hosting
- PostgreSQL managed database
- Object/image storage
- Domain and SSL certificate
- Backup and restore policy
- Monitoring and logging
- Environment variable management

Suitable hosting directions include:

- Render, Railway, Fly.io, or DigitalOcean for backend/API
- Supabase, Neon, Railway, or managed PostgreSQL for database
- Cloudinary, S3, Firebase, or Supabase Storage for product images
- Vercel, Netlify, or static hosting for the customer website if separated

---

## 11. Current Technical Risks

- A live PostgreSQL runtime has not yet been applied and tested locally.
- Product and inventory APIs are not fully database-backed yet.
- POS checkout does not yet use atomic database transactions.
- Real payment verification is not connected.
- Real delivery API behavior requires live courier integration testing.
- Image upload and media storage are not connected to object storage.
- Front-end and backend still need a formal integration layer.
- Production monitoring and backups are not yet implemented.

---

## 12. Recommended Next Technical Steps

The next technical steps should be completed in this order:

1. Install or run PostgreSQL locally through Docker.
2. Apply the Prisma migration to the live database.
3. Generate Prisma Client against the live schema.
4. Seed roles, permissions, and an initial admin user.
5. Create real login and logout API endpoints.
6. Store sessions in PostgreSQL.
7. Apply RBAC middleware to protected routes.
8. Convert ERP Product List from localStorage to backend API.
9. Convert Add Product from localStorage to backend API.
10. Convert Inventory View from localStorage to backend API.
11. Convert Receive Stock from localStorage to backend API.
12. Add transaction-safe POS checkout.
13. Add payment verification workflow.
14. Add delivery dispatch and status sync.
15. Add reports and audit logs.

---

## 13. Final Technical Conclusion

The Subhakamana Store Management System is technically moving in the correct direction. The current visual prototype already demonstrates the expected business workflows, and the backend foundation has now started to provide the secure structure needed for production.

The most important recent technical progress is the creation of the Prisma/PostgreSQL foundation and the addition of bcrypt authentication, stored session helpers, and server-side RBAC middleware. These foundations must remain in place before expanding product, inventory, POS, payment, delivery, and reporting APIs.

The next major milestone is to run PostgreSQL successfully, apply the migration, seed security data, and connect real authenticated backend routes to the existing ERP and POS screens.

