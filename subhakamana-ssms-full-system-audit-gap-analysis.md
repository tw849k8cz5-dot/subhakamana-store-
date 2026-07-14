# Subhakamana Store Management System

## Full System Audit, Gap Analysis, and Implementation Summary

**Project:** Subhakamana Store Management System  
**Business Type:** Nepali fashion and clothing store  
**System Type:** Front-end ERP, POS, inventory, and e-commerce prototype  
**Audit Date:** July 9, 2026  
**Latest Update:** July 10, 2026  
**Main File Reviewed and Improved:** `subhakamana-store-final-erp-platform.html`
**Brand Palette Applied:** Deep Maroon, Saffron Gold, Royal Violet, Warm Ivory, Clean White, Deep Ink, Warm Gray, and Soft Sand.

---

## 1. System Summary

Subhakamana Store Management System is a local front-end prototype for managing a clothing store that sells kurtas, sarees, dupattas, and festival wear. The project contains a customer-facing store experience, an admin ERP dashboard, inventory tools, product entry, POS sales, delivery records, payment summaries, reports, user manuals, UML files, and a complete demonstration folder.

The current project is best described as a strong local demonstration system. It runs from files on the computer and now saves local working data in the browser. It is suitable for project demonstration, presentation, and workflow explanation. It is not yet a production-grade business system because it does not have a real backend server, shared database, secure authentication service, real payment verification, or live courier/notification integrations.

---

## 2. Audit Scope

The audit reviewed the active project files in the `outputs` folder, especially:

- `subhakamana-store-final-erp-platform.html`
- `subhakamana-store-ecommerce.html`
- `open-subhakamana-store-system.html`
- local launch files
- user manuals and reports
- UML diagram files
- complete packaged demonstration folder

The audit focused on whether the system supports the required store workflows:

- dashboard and management overview
- product entry
- inventory tracking
- POS sales
- online orders
- payments
- customers
- purchases and stock receiving
- suppliers
- reports
- role access
- data persistence
- auditability
- local demonstration use

---

## 3. What Is Already Implemented

The project already includes a broad front-end interface:

- ERP dashboard with KPIs and navigation.
- Subhakamana brand styling using Deep Maroon, Saffron Gold, Royal Violet, Warm Ivory, Clean White, Deep Ink, Warm Gray, and Soft Sand.
- Official Subhakamana vector logo used in the ERP, customer website, local start page, and packaged assets.
- Product management form with SKU, barcode, category, pricing, stock, supplier, variants, media, and website preview fields.
- Phone camera or local image selection for simple product photo onboarding in the local prototype.
- Inventory list with search, category filter, stock status filter, and stock adjustment.
- POS screen with cart, payment selection, customer selection, and barcode/SKU scanning support.
- Orders page for store and online order records.
- Delivery page with shipment creation and courier tracking fields.
- Supplier, purchase, customer, report, storefront, settings, and manual sections.
- Numerical analysis formulas for inventory value, gross profit, gross margin, average order value, sell-through rate, stock turnover, and reorder need.
- Demo product image gallery for Subhakamana EF2125 product photos.
- Customer e-commerce page with product browsing, cart, checkout, and confirmation flow.
- Local opening files and a marked complete demonstration folder.
- UML use case diagram and project report files.

---

## 4. Real Persistent Data

The project does not use a real production database. However, the ERP prototype now stores working local data using browser storage on the same computer and browser.

Local saved data now includes:

- products
- customers
- suppliers
- orders
- shipments
- POS cart
- payment records
- returns, exchanges, and refund records
- stocktake and cycle count records
- cashier shift records
- audit log
- stock movement history

This makes the prototype more practical for demonstration because new products, stock changes, sales, payments, and reports can survive a browser refresh. This is still local-only persistence, not a shared business database.

---

## 5. Mock, Demo, and Hardcoded Data

The project still uses seeded demo records for presentation. These records are useful for showing how the system works before a real database exists.

Demo or hardcoded areas include:

- starter products
- starter customers
- starter suppliers
- starter orders
- starter shipments
- some dashboard trend bars
- demo EF2125 image list
- demo role PINs

The ERP now labels demo records so users can understand which items are sample data and which records were created through the local role-based workflow.

---

## 6. Gap Analysis

| Feature | Status | Existing Location | Problem | Priority | Recommended Action |
|---|---|---|---|---|---|
| Dashboard | Partial | ERP dashboard | KPIs use local data, but some trend charts are still demo summaries. | Medium | Connect dashboard fully to backend database and real sales reports. |
| Product Entry | Improved Prototype | Product page | Product creation works locally with SKU/barcode checks, but advanced editing and bulk import are missing. | High | Add backend product table, edit/archive actions, bulk import, image upload storage. |
| Phone Photo Product Onboarding | Improved Prototype | Product page | Staff can capture or choose local product photos for preview, but images are saved only in browser storage. | Medium | Add production file storage, image compression service, and product media library. |
| Product Variants | Partial | Product form | Single variant entry is supported, but full multi-variant storage is not complete. | High | Add real variant model for size, color, SKU, barcode, stock, and image mapping. |
| Inventory | Improved Prototype | Inventory page | Stock can be adjusted and tracked locally, but no server-side inventory ledger exists. | Critical | Add database-backed stock ledger and transaction rules. |
| Stock Movements | Implemented Locally | Reports page | Local movement history exists, but not shared across users or devices. | Critical | Move stock movement history to backend database. |
| Purchase Receiving | Improved Prototype | Purchases page | Received stock updates local inventory, but purchase orders, supplier bills, and approvals are incomplete. | Critical | Add purchase order, receiving note, supplier bill, and payment workflow. |
| POS Sales | Improved Prototype | POS page | POS can scan, add to cart, complete sale, reduce stock, and create payment records locally. | Critical | Add receipt printing, returns, discounts, cashier shift closing, and backend sync. |
| Barcode Scanning | Implemented Locally | POS page | Hardware scanners can type into focused input, but device configuration is outside the app. | High | Add barcode label printing, barcode lookup logs, and scanner setup guide. |
| Payments | Partial | POS and Reports | Cash, COD, eSewa, Khalti, and bank transfer can be recorded locally, but no payment gateway verification exists. | Critical | Integrate real eSewa/Khalti APIs and bank reconciliation. |
| Returns, Exchanges, and Refunds | Improved Prototype | Business Controls page | Staff can create local return, exchange, refund, inspection, and restock records. Digital refunds are only recorded locally. | Critical | Add backend approval workflow, refund gateway verification, and customer notification. |
| Advanced Inventory States | Improved Prototype | Inventory page | On-hand, reserved, committed, available, damaged, returned, and in-transit states are shown locally. | Critical | Move inventory state changes into a server-side ledger with locking rules. |
| Stocktake and Cycle Counting | Improved Prototype | Business Controls page | Physical counts can be recorded and approved counts adjust local stock. | High | Add manager approval, count sessions, location/bin counts, and locked variance posting. |
| Cashier Shift Reconciliation | Improved Prototype | Business Controls page | Cashier shifts can be opened and closed with expected cash, actual cash, and difference calculation. | High | Add cash-in/cash-out events, receipt totals, manager approval, and end-of-day close reports. |
| Orders | Partial | Orders page | Orders are listed and POS orders are created locally, but online order sync is not real. | High | Use one shared order database for e-commerce and ERP. |
| Delivery | Partial | Delivery page | Shipment records can be created locally, but courier tracking is not live. | Medium | Add courier API integration and delivery status updates. |
| Customers | Partial | Customers page | Customers are shown from demo/local data, but there is no complete customer profile workflow. | Medium | Add customer create/edit, purchase history, loyalty, and communication logs. |
| Suppliers | Partial | Suppliers page | Suppliers are listed, but supplier creation, documents, and balances are incomplete. | Medium | Add supplier master records, purchase ledger, and outstanding balance tracking. |
| Reports | Improved Prototype | Reports page | Payment, audit, and stock movement reports are local; deeper profit and tax reports are missing. | High | Add sales, profit, stock aging, tax, returns, and staff reports. |
| Numerical Analysis | Improved Prototype | Reports page | Core formulas are calculated from local prototype data, but not yet from backend transaction tables. | Medium | Move formulas to backend reports using verified sales, stock, purchase, and return data. |
| Audit Log | Improved Prototype | Reports page | Audit events are stored locally only. | High | Add server-side immutable audit table with user IDs and timestamps. |
| Role Access | Partial | Login screen and role selector | Role gate exists in the front end, but it is not secure because it uses demo PINs. | Critical | Add secure backend login, hashed passwords, and server-side permissions. |
| Website Link | Partial | Storefront preview and e-commerce page | ERP and website are not fully sharing a real database. | High | Connect product, stock, order, and customer data through backend API. |
| Local Use | Implemented | Launch files and package folder | System can run without a domain from local files. | Low | Keep local launcher and add backend option in next phase. |
| Backup | Partial | CSV export | Export includes products, payments, audit, and stock movements, but no restore function exists. | Medium | Add backup restore, scheduled exports, and database backup process. |
| Security | Needs Production Work | Entire prototype | Local files and browser storage cannot protect business data. | Critical | Add backend security, encrypted sessions, role policies, and server validation. |
| AI Helper | Missing | Not implemented | No assistant or forecasting feature exists. | Low | Add only after core database and transaction logic are complete. |
| Loyalty and Campaigns | Missing | Not implemented | Customer rewards, offers, and campaigns are not built. | Low | Add after stable customer and order modules. |

---

## 7. Critical Issues Found

The most important issue is that the system is still a static front-end prototype. It can demonstrate the store workflow, but it cannot safely run a real store by itself because the data is stored on one browser instead of a central database.

Critical production gaps are:

- no real database
- no backend API
- no secure login
- no server-side role permission checks
- no real payment verification
- no shared inventory between the e-commerce website and ERP
- no production backup and restore
- no secure audit history
- no multi-user conflict protection

These are normal limitations for a front-end prototype, but they must be clearly explained during submission or demonstration.

---

## 8. Highest-Priority Implementation Completed

The highest-priority improvements were implemented in the ERP prototype.

### 8.1 Local Data Persistence

The ERP now saves local working data in the browser. Products, customers, suppliers, orders, shipments, cart, payments, audit records, and stock movements can persist after refresh.

### 8.2 Product Data Integrity

The product entry workflow now checks duplicate SKU and barcode values before saving a product. This prevents two products from accidentally using the same stock identity in the local prototype.

### 8.3 Phone Photo Product Onboarding

The product entry page now allows staff to take a simple product photo with a phone camera or choose existing image files. The selected photo is shown in the website preview and saved with newly created local products for storefront preview.

### 8.4 POS Stock Protection

The POS now prevents selling out-of-stock items and prevents cart quantity from exceeding available stock. Completing a POS sale reduces stock and creates a local order.

### 8.5 Payment Records

Completed POS sales now create a local payment record. The payment report can summarize Cash, eSewa, Khalti, Bank Transfer, and Cash on Delivery records.

### 8.6 Stock Movement History

Stock changes are now recorded as movement history. The system tracks opening stock, manual stock adjustment, purchase receiving, and POS sale stock reduction.

### 8.7 Purchase Receiving

The purchase page now includes a simple stock receiving form. A user can select a supplier, select a product, enter received quantity and cost, and update inventory locally.

### 8.8 Audit Trail

The ERP now records key actions such as login, logout, product creation, stock movement, POS sale completion, shipment creation, and denied page access.

### 8.9 Role Access Guard

The app now checks whether the selected role is allowed to open a page. If a role attempts to open a restricted page, the system redirects to the dashboard and logs the access denial.

### 8.10 CSV Export

The export now includes numerical analysis, products, payment records, stock movements, and audit trail records.

### 8.11 Numerical Analysis Formulas

The Reports page now calculates key store formulas from local prototype data:

- Inventory Value = Cost Price x Current Stock
- Retail Stock Value = Selling Price x Current Stock
- Estimated Stock Profit = Retail Stock Value - Inventory Value
- Sales Revenue = Sum of paid order totals
- Cost of Goods Sold = Units Sold x Product Cost
- Gross Profit = Sales Revenue - Cost of Goods Sold
- Gross Margin = Gross Profit / Sales Revenue x 100
- Average Order Value = Sales Revenue / Number of Paid Orders
- Sell-Through Rate = Units Sold / (Units Sold + Current Stock) x 100
- Stock Turnover = Cost of Goods Sold / Inventory Value
- Reorder Need = Count of products where Stock is less than or equal to Reorder Level

### 8.12 Returns, Exchanges, and Refunds

A new Business Controls section now allows staff to create local return, exchange, and refund records. The form records order, product, quantity, reason, status, inspection result, refund method, exchange replacement, price difference, notes, staff role, and timestamp.

The workflow separates inspection from restocking. Returned items are only added back to on-hand stock when the item is marked Sellable and Restocked. Damaged or defective items are counted separately and are not automatically returned to saleable inventory. Refund records are also added to the local payment ledger. Digital refunds such as eSewa, Khalti, and bank transfer remain marked as pending verification because a real gateway is required in production.

### 8.13 Advanced Inventory States

The inventory table now shows more realistic stock states:

- On Hand
- Reserved
- Committed
- Available
- Damaged
- Returned
- In Transit

Available Stock is calculated as:

`Available Stock = On Hand - Reserved - Committed`

This improves numerical analysis and prevents POS sales from relying only on a simple stock number.

### 8.14 Stocktake and Cycle Counting

A stocktake/cycle count workflow has been added to Business Controls. Staff can record physical stock, compare it with system stock, calculate variance, calculate variance value, enter a reason, identify an approver, and choose a workflow status. Approved or closed counts update local stock and create stock movement plus audit records.

### 8.15 Cashier Shift Reconciliation

A cashier shift workflow has been added. Staff can open a register shift with opening cash and close it with actual closing cash. The system calculates expected cash and the difference.

Formula:

`Expected Cash = Opening Cash + Cash Sales + Cash In - Cash Refunds - Cash Out`

The current prototype calculates cash sales and cash refunds from local payment records. Cash-in and cash-out are reserved for the production version.

### 8.16 Schema Migration and Expanded Export

The local browser database now includes a schema version so older saved records can be upgraded with new inventory fields and control tables. The CSV export now includes numerical analysis, products with advanced inventory states, payments, returns/exchanges/refunds, stocktake/cycle counts, cashier shifts, stock movements, and audit trail records.

### 8.17 Brand Palette Alignment

The ERP, customer website, and local opening page now use the selected Subhakamana palette: Deep Maroon `#9E3F4F` for primary actions, Saffron Gold `#D89A1D` for heritage accents, Royal Violet `#71528B` for secondary accents, Warm Ivory `#FFF8F0` for backgrounds, Clean White `#FFFFFF` for surfaces, Deep Ink `#2B2725` for main text, Warm Gray `#756B66` for muted text, and Soft Sand `#E8DDD1` for borders.

### 8.18 Logo Integration

The official vector logo has been added to the project assets and displayed in the ERP login, ERP sidebar, customer storefront navigation, customer storefront footer, and local opening page. The same logo asset is included in the marked demonstration folder for handover.

---

## 9. Implementation Plan for Next Phase

### Recommended Production Architecture

The next production version should use one connected system architecture:

`Website Admin Panel -> Backend API + Database -> Image Storage -> Web Store / Android App / iPhone App`

In this model, the admin panel is used by store staff to create products, upload photos, manage stock, process orders, and view reports. The backend API and database store the real business data securely. Image storage such as AWS S3, Cloudinary, Firebase Storage, or another file storage service stores product photos. The web store, Android app, and iPhone app should all read from the same backend so product information, stock levels, prices, images, and order status remain consistent.

### Phase 1: Real Database Foundation

- Create backend server.
- Add database tables for products, variants, inventory, customers, suppliers, orders, payments, and audit logs.
- Replace local browser storage with API-backed data.
- Add backup and restore.
- Connect the admin panel to the backend API instead of saving business records only in browser storage.

### Phase 2: Secure Staff Access

- Add secure login.
- Store hashed passwords.
- Add role permissions on the backend.
- Add staff activity logs.
- Add session timeout and password reset.

### Phase 3: Inventory and Purchase Control

- Add purchase orders.
- Add stock receiving notes.
- Add stock transfer, damage, return, and adjustment records.
- Add barcode label printing.
- Add low-stock reorder alerts.

### Phase 4: POS and Payment Integration

- Add receipt printing.
- Add sale return and exchange flow.
- Add cashier shift closing.
- Integrate real eSewa and Khalti verification.
- Add bank transfer reconciliation.

### Phase 5: E-Commerce and ERP Sync

- Connect customer website products to the same product database.
- Reduce stock automatically when online orders are placed.
- Add customer account login.
- Add order tracking.
- Add notification integration.
- Prepare shared API endpoints for future Android and iPhone apps.

### Phase 6: Advanced Store Features

- Add loyalty points.
- Add discount campaigns.
- Add profit reports.
- Add tax reports.
- Add demand forecasting.
- Add AI helper only after the core system is stable.

---

## 10. Testing and Validation Completed

The updated ERP file was checked for:

- JavaScript syntax validity.
- duplicate HTML IDs.
- presence of stock receiving workflow.
- presence of return, exchange, refund, stocktake, and cashier shift workflows.
- presence of stock movement reporting.
- expanded CSV export coverage.
- local persistence support.
- package folder synchronization.

Validation result: passed for the current front-end prototype.

---

## 11. Current Limitations

The system should not be presented as a fully production-ready ERP. It is a strong working front-end prototype with local persistence.

The following functions still require backend or third-party integration:

- real staff login
- real database
- real payment gateway connection
- real bank verification
- real courier tracking
- SMS or email notifications
- multi-user inventory control
- secure admin permission enforcement
- central backups
- live website-to-ERP synchronization

---

## 12. Final Completion Report

The project has been improved from a mostly visual ERP prototype into a stronger local management prototype. It can now demonstrate a realistic store workflow: create products, validate SKU/barcode, receive stock, scan items in POS, complete sales, reduce stock, record payments, create shipment records, view audit history, and export records.

The system is suitable for academic submission, project demonstration, and explaining how Subhakamana Store could manage products, inventory, sales, delivery, and reports. The next major step is to convert this local prototype into a real full-stack system with backend security, a database, and live payment/order integrations.
