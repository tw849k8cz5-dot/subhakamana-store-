# Subhakamana Store Management System

## Complete Work Summary Report

**Project Name:** Subhakamana Store Management System  
**Business Type:** Nepali fashion and clothing store  
**Project Type:** Front-end e-commerce, ERP, POS, inventory, reporting, and demonstration prototype  
**Report Date:** July 10, 2026  
**Prepared For:** Project submission, presentation, and local demonstration

---

## 1. Executive Summary

The Subhakamana Store Management System has been developed and refined as a strong front-end prototype for a Nepali clothing and fashion business. The project now includes a customer-facing e-commerce website, an admin/ERP management platform, POS billing, inventory controls, product onboarding, barcode scanning support, reports, numerical analysis formulas, user manuals, UML files, branding assets, local launch files, and a marked complete demonstration folder.

The system is designed for demonstration and academic/project presentation. It can run locally without a domain and can save working prototype data in the browser. It is not yet a production system because it does not have a real backend server, shared database, secure authentication service, live payment gateway integration, or real mobile app backend connection.

The latest update also adds a Business Controls area for return, exchange, refund, stocktake, cycle count, and cashier shift workflows. These features make the local prototype closer to a real store operation while still clearly remaining local and front-end based.

---

## 2. Main Files and Package

The main project files are located in the `outputs` folder.

Important files include:

- `open-subhakamana-store-system.html`
- `subhakamana-store-ecommerce.html`
- `subhakamana-store-final-erp-platform.html`
- `subhakamana-ssms-full-system-audit-gap-analysis.md`
- `subhakamana-project-summary-report-polished.md`
- `subhakamana-store-erp-user-manual.md`
- `subhakamana-use-case-diagram.mmd`
- `subhakamana-use-case-diagram.svg`
- `subhakamana-use-case-layman-report.md`
- `Subhakamana_Brand_Color_Palette_Report.pdf`
- `assets/brand/subhakamana-store-logo.svg`

A marked complete folder was also maintained:

`OPEN_ME_SUBHAKAMANA_STORE_COMPLETE_SYSTEM`

This folder contains synced copies of the major files for demonstration and handover.

---

## 3. Customer E-Commerce Website

The customer-facing website was improved to feel like a real online clothing store rather than a simple demo page.

Completed work includes:

- Warm Nepali fashion-store visual style.
- Homepage polish and stronger customer-facing messaging.
- Product browsing experience.
- Product search, category filtering, and sorting concepts.
- Product cards with clearer product names, prices, images, badges, and actions.
- Product detail workflow.
- Cart and checkout flow.
- Payment options including Cash on Delivery, eSewa, Khalti, and Bank Transfer.
- Order confirmation concept.
- Trust sections such as delivery, exchange, quality, and support messaging.
- Footer with useful links, contact-style sections, and payment/social link planning.
- Responsive layout for desktop, tablet, and mobile.

The customer website is still a front-end prototype. Real customer accounts, payment verification, order tracking, and inventory synchronization require backend integration.

---

## 4. Admin ERP Platform

The ERP platform was improved into a broader store management dashboard for staff and owners.

Main ERP sections include:

- Dashboard
- Inventory
- Products
- POS
- Orders
- Delivery
- Suppliers
- Purchases
- Customers
- Reports
- Business Controls
- E-Commerce preview
- User Manual
- Settings

The dashboard now includes platform access shortcuts, role access summaries, supplier-to-sale workflow, KPIs, low-stock alerts, recent orders, notifications, and a future production architecture panel.

---

## 5. Product Management and Onboarding

The product entry workflow was expanded to support a realistic store process.

Product entry now includes:

- Product name
- SKU
- Barcode
- Category
- Subcategory
- Brand
- Cost price
- Selling price
- Original price
- Discount
- Opening stock
- Reorder level
- Stock status
- Size
- Color
- Variant SKU
- Variant stock
- Supplier
- Supplier code
- Product description
- Website visibility
- New arrival flag
- Featured flag
- Website preview
- Barcode and label preview

Data integrity improvements include:

- Duplicate SKU prevention.
- Duplicate barcode prevention.
- Opening stock movement record when a product is created.
- Created-by role labels for role-created records.

---

## 6. Phone Photo Product Onboarding

A product photo onboarding feature was added.

Staff can now:

- Use **Take Photo With Phone** when opening the product page on a mobile browser.
- Choose product images from saved files.
- Preview selected product images.
- Save selected local images with newly created products.
- Display the selected product image in the ERP storefront preview.

This feature is useful for local demonstration. In production, product images should be uploaded to AWS S3, Cloudinary, Firebase Storage, or another file storage service.

---

## 7. Demo Product Images

The project includes a demo image gallery for the Subhakamana EF2125 product image set.

The ERP product page lists the demo product images in demo mode. Images that are not created by an assigned role are marked as demo data, helping separate sample presentation records from role-created prototype records.

---

## 8. Inventory Management

Inventory features include:

- Product inventory table.
- Search by product, SKU, or barcode.
- Category filter.
- Stock status filter.
- In Stock, Low Stock, and Out of Stock badges.
- On-hand stock.
- Reserved stock.
- Committed stock.
- Available stock.
- Damaged stock.
- Returned stock.
- In-transit stock.
- Manual stock adjustment buttons.
- Reorder level tracking.
- Local stock movement records.

Stock movement history now records:

- Opening stock
- Manual adjustment
- Purchase receiving
- POS sale stock reduction

This makes the prototype more realistic and helps explain how stock should be controlled in a full ERP.

Available stock is calculated as:

`Available Stock = On Hand - Reserved - Committed`

---

## 9. Purchases and Stock Receiving

The Purchases page now includes a simple receive-stock workflow.

Staff can:

- Select supplier.
- Select product or variant.
- Enter received quantity.
- Enter purchase cost.
- Enter purchase reference.
- Save stock receiving.

When stock is received, the selected product stock increases and a stock movement record is created.

Full production still requires purchase orders, supplier bills, approvals, documents, Excel imports, and supplier payment tracking.

---

## 10. POS and Barcode Scanning

The POS section supports store billing and scanner-style product entry.

Implemented POS features include:

- Barcode/SKU input.
- Hardware scanner-ready focused input field.
- Add to cart.
- Customer selection.
- Payment method selection.
- Complete sale.
- Stock reduction after sale.
- Local order creation.
- Local payment record creation.
- Error message for unknown barcode/SKU.
- Prevention of out-of-stock sale.
- Prevention of cart quantity exceeding available stock.

Supported local payment records include:

- Cash
- eSewa
- Khalti
- Bank Transfer
- Cash on Delivery

Real payment gateway verification is a future backend feature.

---

## 11. Business Controls

A new Business Controls section was added to support important store management tasks that happen after sales and during daily operations.

Included workflows:

- Return, exchange, and refund request recording.
- Return reason, status, inspection result, refund method, and exchange replacement fields.
- Sellable returned items can be restocked after inspection.
- Damaged or defective returned items are separated from saleable stock.
- Refund records are added to the local payment ledger.
- Digital refunds are marked as pending verification until real payment gateway integration exists.
- Stocktake and cycle count records compare physical stock with system stock.
- Approved stock counts adjust inventory and create audit records.
- Cashier shifts can be opened and closed.
- Expected cash, actual closing cash, and cash difference are calculated.

Cashier shift formula:

`Expected Cash = Opening Cash + Cash Sales + Cash In - Cash Refunds - Cash Out`

In the current prototype, cash sales and cash refunds are calculated from local payment records. Cash-in and cash-out events are prepared as production workflow concepts.

---

## 12. Orders and Delivery

The Orders page shows online and POS order records.

The Delivery page supports local shipment creation with:

- Order selection
- Customer name
- Phone
- City
- Address
- COD amount
- Courier
- Weight
- Tracking number generation

The current delivery workflow is a prototype. Production integration should connect with courier APIs, delivery tracking, SMS/email notifications, and COD reconciliation.

---

## 13. Customers and Suppliers

Customer and supplier pages exist for store management demonstration.

Customer records show:

- Name
- Phone
- City
- Order count
- Lifetime spend
- Source label

Supplier records show:

- Supplier name
- Contact
- Outstanding balance
- Last purchase
- Status
- Source label

Future work should add create/edit forms, customer profiles, loyalty points, supplier bills, document uploads, payment history, and ledger reports.

---

## 14. Reports and Numerical Analysis

The Reports page now includes payment reporting, audit records, stock movements, and numerical analysis formulas.

Numerical analysis metrics include:

- Inventory Value
- Retail Stock Value
- Estimated Stock Profit
- Sales Revenue
- Cost of Goods Sold
- Gross Profit
- Gross Margin
- Average Order Value
- Sell-Through Rate
- Stock Turnover
- Reorder Need

Formula examples:

- Inventory Value = Cost Price x Current Stock
- Gross Profit = Sales Revenue - Cost of Goods Sold
- Gross Margin = Gross Profit / Sales Revenue x 100
- Average Order Value = Sales Revenue / Number of Paid Orders
- Sell-Through Rate = Units Sold / (Units Sold + Current Stock) x 100
- Stock Turnover = Cost of Goods Sold / Inventory Value
- Reorder Need = Products where Stock is less than or equal to Reorder Level

The CSV export now includes:

- Numerical analysis
- Product records
- Payment records
- Return, exchange, and refund records
- Stocktake and cycle count records
- Cashier shift records
- Stock movements
- Audit trail

---

## 15. Local Persistence

The ERP prototype now stores local working data in the browser using local storage.

Locally saved records include:

- Products
- Customers
- Suppliers
- Orders
- Shipments
- POS cart
- Payment records
- Return, exchange, and refund records
- Stocktake and cycle count records
- Cashier shift records
- Audit log
- Stock movements

This allows local demo work to survive refreshes on the same browser. It is still not a shared production database.

---

## 16. Role Access and Login

A prototype local login gate was added.

Demo roles include:

- Super Admin
- Admin
- Inventory Staff
- Sales & Delivery Staff

The app includes role-based page access and logs denied access attempts. This is useful for demonstration only. Real production must use secure backend authentication, hashed passwords, server sessions, and server-side permissions.

---

## 17. Branding and Visual Identity

The project branding was refined using the selected Subhakamana palette.

Applied brand colors:

- Primary / CTA: Deep Maroon `#9E3F4F`
- Heritage Accent: Saffron Gold `#D89A1D`
- Secondary Accent: Royal Violet `#71528B`
- Background: Warm Ivory `#FFF8F0`
- Surface: Clean White `#FFFFFF`
- Main Text: Deep Ink `#2B2725`
- Muted Text: Warm Gray `#756B66`
- Borders: Soft Sand `#E8DDD1`

The official vector logo was added and used in:

- ERP login
- ERP sidebar
- Customer website navbar
- Customer website footer
- Local start page

The logo asset is stored in:

`assets/brand/subhakamana-store-logo.svg`

---

## 18. UML and Use Case Documentation

The project includes UML/use case documentation for the Subhakamana Store Management System.

Actors include:

- Admin
- Customer

Admin use cases include:

- Admin Login
- Manage Products
- Manage Categories
- Manage Inventory Dashboard
- Manage Orders
- View Customer Details
- Link Website with Inventory Dashboard
- Send Order Notifications
- View Reports

Customer use cases include:

- Register/Login
- Browse Products
- Search Products
- Add Items to Cart
- Place Order
- Track Order
- Receive Order Notifications

Use case relationships include:

- Place Order includes Receive Order Notification.
- Manage Orders includes Send Order Notifications.
- All admin functions require Admin Login.

---

## 19. Local Running and Demonstration Files

The system can run without a domain for local use.

Local entry files include:

- `open-subhakamana-store-system.html`
- `open-subhakamana-store-system.command`
- `run-subhakamana-local.command`
- `run-subhakamana-overview-local.command`

The marked package folder includes the same launch and demonstration files so the project can be opened easily during presentation.

---

## 20. Future Production Architecture

The recommended future architecture is:

`Website Admin Panel -> Backend API + Database -> Image Storage -> Web Store / Android App / iPhone App`

In production:

- Staff use the admin panel to manage products, photos, stock, orders, payments, customers, and reports.
- The backend API controls secure business logic.
- The database stores real products, variants, customers, inventory, orders, payments, reports, and audit logs.
- Image storage stores product photos.
- The web store, Android app, and iPhone app all read from the same backend.

This prevents mismatched stock, missing images, duplicate records, and disconnected order data.

---

## 21. Current Limitations

The system is a strong front-end prototype, but it is not a complete production system yet.

Remaining limitations include:

- No real backend server.
- No shared database.
- No real secure login.
- No server-side role enforcement.
- No real eSewa/Khalti/bank verification.
- No live courier API.
- No real refund gateway verification.
- No production cashier/end-of-day approval process.
- No server-side stock ledger locking.
- No real SMS/email/WhatsApp notifications.
- No real Android or iPhone app.
- No real cloud image storage.
- No multi-user conflict control.
- No production backup and restore.

These items should be treated as future enhancements.

---

## 22. Final Conclusion

The Subhakamana Store Management System has been developed into a complete local demonstration prototype for an online fashion store and store management system. It now includes a polished customer website, ERP/admin dashboard, product management, phone photo onboarding, barcode-ready POS, inventory tracking, stock receiving, returns/exchanges/refunds, stocktake/cycle counting, cashier shift reconciliation, orders, delivery, customers, suppliers, reports, numerical formulas, branding, logo integration, UML documentation, local launcher files, and a marked handover folder.

The project is ready for demonstration and presentation as a front-end prototype. The next major step is to convert it into a full-stack production system with backend API, database, secure authentication, cloud image storage, payment verification, live inventory synchronization, and mobile app support.
