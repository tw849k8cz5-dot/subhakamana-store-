# Subhakamana Store Management System

## Frameworks and Technology Report

### 1. Report Purpose

This report explains the frameworks, technologies, and development approach used to build the Subhakamana Store Management System. It is written for academic presentation, project demonstration, and non-technical review.

The project includes two main user-facing parts:

- Customer e-commerce website
- ERP/admin store management system

It also includes documentation, local launch files, reports, UML files, production-readiness planning, and a starter production database module.

---

## 2. Overall Development Approach

The current system is a front-end prototype. It is designed to run locally without a domain, web hosting service, or live backend server.

The system uses standard web technologies:

- HTML for page structure
- CSS for design, layout, branding, and responsiveness
- JavaScript for interaction, routing, cart logic, checkout behavior, inventory demo behavior, local storage, and ERP workflows

The project does not currently use a large front-end framework such as React, Vue, Angular, Next.js, or Svelte. This keeps the demonstration simple, portable, and easy to open on a local computer.

---

## 3. Main Front-End Technologies

### HTML

HTML is used to define the visible structure of the system.

It provides:

- Customer website pages
- ERP dashboard pages
- Product cards
- Product detail page
- Cart and checkout forms
- Customer login and order tracking area
- Admin navigation
- Tables for inventory, orders, deliveries, reports, suppliers, customers, and controls
- Documentation launcher pages

Important files:

- `subhakamana-store-ecommerce.html`
- `subhakamana-store-final-erp-platform.html`
- `open-subhakamana-store-system.html`

### CSS

CSS is used for the full visual design of the system.

It provides:

- Subhakamana Store brand colors
- Premium Nepali fashion website styling
- ERP/admin dashboard layout
- Responsive mobile, tablet, and desktop layouts
- Product card design
- Buttons, forms, tables, badges, panels, and cards
- Dark mode support inside the ERP
- Accessibility focus states
- Reduced-motion handling

The customer website uses a more premium editorial fashion style. The ERP uses a more practical operational style while still matching the Subhakamana brand.

### JavaScript

JavaScript is used to make the prototype interactive.

It provides:

- Page routing using hash-based navigation
- Product search
- Product category filtering
- Price sorting
- Wishlist behavior
- Product detail rendering
- Cart quantity updates
- Checkout calculations
- Member/friends/family discount logic
- Delivery or in-store pickup selection
- Bill number generation
- Order confirmation
- Customer order tracking prototype
- ERP role-based demo access
- Product onboarding
- Inventory display
- POS cart behavior
- Delivery by bill number
- Reports and formulas
- CSV export

No separate JavaScript framework is used. The logic is written in vanilla JavaScript inside the HTML files.

---

## 4. Data Storage Used in the Current Prototype

### Browser Local Storage

The current prototype uses browser localStorage for demo persistence.

This allows the system to remember demo records inside the same browser, such as:

- Products
- Inventory records
- Orders
- Customers
- Deliveries
- POS activity
- Reports
- Audit-style demo entries

This is useful for local demonstration, but it is not the same as a real production database.

### Current Limitation

localStorage is browser-based. It does not provide:

- Multi-user access
- Secure authentication
- Central database storage
- Real backup and restore
- Server-side validation
- Real payment verification
- Real inventory synchronization across devices

For real business use, localStorage should be replaced by a backend API and database.

---

## 5. Production Database Technology

The project now includes a production-readiness database module.

Planned production database technology:

- PostgreSQL
- Prisma ORM

Important folder:

- `production-readiness/module-01-database/`

Important files:

- `production-readiness/module-01-database/prisma/schema.prisma`
- `production-readiness/module-01-database/prisma/seed.js`
- `production-readiness/module-01-database/package.json`
- `production-readiness/module-01-database/README.md`

This module defines a future production database structure for:

- Users
- Roles
- Permissions
- Sessions
- Customers
- Products
- Product variants
- Suppliers
- Purchase orders
- Inventory
- Inventory movements
- Orders
- Payments
- Deliveries
- Returns
- Refunds
- Cashier shifts
- Stocktakes
- Audit logs
- Notifications
- Settings

This is a production foundation, not yet a live backend connected to the current front-end screens.

---

## 6. Backend and API Status

The current working prototype does not use a live backend API.

The project includes production-readiness documentation for a future backend, including:

- System architecture
- API contract
- Security and RBAC plan
- Database schema
- Testing and deployment plan
- Migration plan

Important files:

- `production-readiness/01-system-architecture.md`
- `production-readiness/03-api-contract.md`
- `production-readiness/04-security-rbac-plan.md`
- `production-readiness/05-testing-deployment-plan.md`
- `production-readiness/06-migration-plan.md`

Future backend technologies recommended by the project documentation include:

- Node.js backend
- REST API
- PostgreSQL database
- Prisma ORM
- Server-side authentication
- Role-based access control
- Secure payment verification
- Courier/delivery integration
- Cloud image storage

---

## 7. Local Running Technology

The system is designed to run locally without a domain.

Local launch files are included:

- `open-subhakamana-store-system.command`
- `run-subhakamana-local.command`
- `run-subhakamana-overview-local.command`

These command files help open the system from the local computer. The project can also be opened directly through HTML files in a browser.

This makes the project suitable for:

- Classroom demonstration
- Academic project presentation
- Local store workflow demonstration
- Offline review
- Non-technical stakeholder walkthrough

---

## 8. Design and UI Framework Status

The project does not use Bootstrap, Tailwind CSS, Material UI, Chakra UI, or another external UI framework.

The visual design is custom-built using CSS.

This custom CSS covers:

- Subhakamana brand identity
- Deep maroon primary color
- Heritage gold accent
- Royal violet secondary accent
- Warm ivory background
- Clean white surfaces
- Deep ink text
- Warm gray muted text
- Soft sand borders

This approach gives the project a custom Nepali fashion-store feel instead of a generic template look.

---

## 9. External Services and Integrations

The current prototype includes links and placeholders for real-world integrations.

Currently included:

- Google/share links for store location, Instagram, and TikTok
- QR code generation through an external QR image URL
- Payment options shown in checkout
- Delivery/courier fields in checkout and ERP delivery

Not yet production-integrated:

- eSewa live payment verification
- Khalti live payment verification
- Bank transfer reconciliation
- SMS/email/WhatsApp notifications
- Courier tracking API
- Cloud image storage
- Real customer login
- Real admin authentication

---

## 10. Testing and Validation Tools

The project has been validated using local file and script checks.

Validation includes:

- HTML ID checks
- JavaScript syntax checks
- Local link checks
- Database module verification script
- QA report documentation

Important files:

- `subhakamana-qa-test-report.md`
- `subhakamana-authenticity-test-report.md`
- `production-readiness/module-01-database/scripts/verify-database-module.js`

---

## 11. Why This Technology Stack Was Suitable

The chosen approach is suitable because:

- It runs locally without hosting.
- It is easy to demonstrate.
- It does not require installation for the main prototype.
- It keeps the project portable.
- It is understandable for non-technical users.
- It preserves all major workflows in one package.
- It can later be migrated to a real backend and database.

The system is currently strongest as a front-end prototype and demonstration system. The production-readiness folder explains how it can be upgraded into a full production retail management platform.

---

## 12. Summary Table

| Area | Technology Used Now | Production Recommendation |
| --- | --- | --- |
| Customer Website | HTML, CSS, JavaScript | Keep UI, connect to backend API |
| ERP/Admin Panel | HTML, CSS, JavaScript | Keep UI, connect to backend API |
| Data Storage | Browser localStorage | PostgreSQL |
| ORM | Planned Prisma module | Prisma |
| Authentication | Demo role PIN | Secure backend login, Argon2, sessions |
| Payments | Prototype options | eSewa, Khalti, bank verification |
| Delivery | Prototype delivery records | Courier API and tracking |
| Image Storage | Local/demo image handling | Cloudinary, S3, or Firebase Storage |
| Hosting | Local files/local command files | Production hosting with HTTPS |
| UI Framework | Custom CSS | Continue custom brand system or migrate carefully |

---

## 13. Final Conclusion

The Subhakamana Store Management System is built primarily with HTML, CSS, and vanilla JavaScript. This makes the current system lightweight, portable, and easy to run locally for demonstration.

The project does not depend on a heavy front-end framework. Instead, it uses custom design and JavaScript logic to support the e-commerce website, ERP dashboard, POS, inventory, checkout, delivery, reports, and documentation.

For production, the project already includes a PostgreSQL and Prisma database foundation, along with architecture, API, security, testing, deployment, and migration documentation. The next major development step would be connecting the current front-end prototype to a secure backend API and real database.
