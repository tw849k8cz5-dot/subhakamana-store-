# Subhakamana Store Management System

## Detailed Project Report From Day 1

**Project Name:** Subhakamana Store Management System  
**Business Type:** Nepali fashion and clothing store  
**Main Products:** Kurtas, Sarees, Dupattas, Blouses, and Festival Wear  
**Project Type:** Local front-end e-commerce, ERP, POS, inventory, delivery, reporting, and demonstration prototype  
**Current Report Date:** July 10, 2026  
**Prepared For:** Project submission, presentation, demonstration, and future development planning

---

## 1. Title Page

**Subhakamana Store Management System** is a front-end prototype designed for a Nepali clothing and fashion store. The system was developed to show how a small or medium-sized fashion business can manage online sales, product inventory, POS billing, delivery preparation, reports, returns, stocktake, and daily store operations from one connected local demonstration system.

The project is not only a website. It is a complete demonstration package that includes:

- A customer-facing e-commerce website.
- An admin/ERP management platform.
- POS billing and barcode-ready product lookup.
- Product onboarding and local image preview.
- Inventory management.
- Purchase receiving.
- Delivery preparation by bill number.
- Product-first tracking for delivery.
- Business controls for returns, refunds, stocktake, and cashier shifts.
- Reports and numerical analysis.
- UML use case diagram.
- Manuals and academic-style reports.
- QA and authenticity test reports.
- Local launch files.
- A marked complete demonstration folder.

---

## 2. Executive Summary

The Subhakamana Store Management System began as a project to improve and present an online clothing store for Subhakamana Store. Over the course of development, it was expanded from a simple front-end shopping concept into a broader local store management prototype.

The final system now demonstrates both sides of a real retail workflow:

1. The customer side, where shoppers can browse products, add items to cart, choose delivery or in-store pickup, enter member phone numbers for discounts, place an order, and receive a bill number.
2. The staff side, where store staff can manage products, stock, POS sales, orders, delivery by bill number, purchases, returns, stocktake, cashier shifts, reports, and local audit records.

The system is suitable for academic presentation and project demonstration. It runs locally without a domain and saves working prototype data in the browser. However, it is still a front-end prototype. Real business use will require a backend API, database, secure login, payment verification, courier API, cloud image storage, and production hosting.

---

## 3. Project Background

Subhakamana Store is presented as a Nepali fashion and clothing store that sells traditional and modern clothing items such as Kurtas, Sarees, Dupattas, Blouses, and festival wear.

The project was built around a practical business need: a store should be able to manage both online orders and physical shop activity from one system. A normal online shop only shows products to customers, but a real store also needs to manage stock, billing, delivery, purchases, returns, and reports.

For this reason, the project gradually became a combined e-commerce and ERP prototype.

---

## 4. Day 1 Starting Point

On Day 1, the project direction was centered on improving the Subhakamana Store website and turning it into a more realistic online fashion store.

The early goals included:

- Polish the homepage.
- Make the design feel like a real Nepali fashion store.
- Improve product wording and spelling.
- Use consistent words such as “Kurta” and “Saree.”
- Improve product cards.
- Add clear product actions such as Add to Cart and View Details.
- Build a clean checkout flow.
- Add trust sections.
- Improve mobile responsiveness.
- Keep the style warm, elegant, and simple.

At this stage, the system was mainly customer-facing and focused on shopping experience.

---

## 5. Phase 1: Customer E-Commerce Website

The first major phase focused on the customer-facing website.

Completed features included:

- A stronger homepage hero section.
- Fashion-store headline and call-to-action.
- Product listing section.
- Product cards with product name, category, price, image-style visual, stock badge, wishlist button, Add to Cart, and View Details.
- Product detail page with product information, price, size selection, quantity selector, Add to Cart, and Buy Now.
- Cart page with product quantity, price, subtotal, delivery charge, and total.
- Checkout page with customer name, phone number, address, payment method, and order summary.
- Order confirmation page.
- Search, category filter, and sorting.
- Trust badges for Cash on Delivery, Easy Exchange, Fast Delivery, Quality Checked Products, and Customer Support.
- Footer with useful links, contact details, and payment methods.

The website was designed with a warm Nepali fashion-store look and a clean, simple customer experience.

---

## 6. Phase 2: Text, Branding, and Visual Polish

The next phase improved presentation quality.

Improvements included:

- Consistent product wording.
- Professional customer-facing text.
- Better spacing and typography.
- Clearer product names.
- More polished buttons.
- Cleaner section layout.
- Consistent use of “Kurta” and “Saree.”
- Removal of rough demo-style wording where possible.

The project then received a formal brand direction.

Brand colors applied:

| Role | Color | HEX |
|---|---|---|
| Primary / CTA | Deep Maroon | `#9E3F4F` |
| Heritage Accent | Saffron Gold | `#D89A1D` |
| Secondary Accent | Royal Violet | `#71528B` |
| Background | Warm Ivory | `#FFF8F0` |
| Surface | Clean White | `#FFFFFF` |
| Main Text | Deep Ink | `#2B2725` |
| Muted Text | Warm Gray | `#756B66` |
| Borders | Soft Sand | `#E8DDD1` |

The official Subhakamana logo was also added into the project and used across the ERP, website, local start page, and complete package folder.

---

## 7. Phase 3: ERP and Admin Platform

After the customer website was improved, the project was expanded into a store management platform.

The ERP platform was created to support staff and owners. It includes:

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
- E-Commerce Preview
- User Manual
- Settings

The ERP dashboard became the central control area for staff operations. It includes KPIs, low-stock alerts, recent orders, platform shortcuts, production architecture notes, and supplier-to-sale workflow guidance.

---

## 8. Phase 4: Product Management

The product entry workflow was improved to resemble a real store product onboarding process.

Product fields include:

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
- Product image preview
- Barcode and label preview

Important data integrity improvements were added:

- Duplicate SKU prevention.
- Duplicate barcode prevention.
- Opening stock movement record.
- Created-by role labels.
- Demo labels for sample data.

---

## 9. Phase 5: Product Images and Phone Photo Onboarding

A simple photo onboarding workflow was added.

Staff can:

- Take product photos with a phone camera.
- Choose product images from files.
- Preview product images.
- Use selected images in the ERP storefront preview.
- Save local image previews with locally created products.

The system also lists the Subhakamana EF2125 product images in demo mode. These are clearly marked as demo images when they are not created by an assigned staff role.

In production, the same concept should connect to cloud image storage such as AWS S3, Cloudinary, Firebase Storage, or a similar service.

---

## 10. Phase 6: Inventory Management

Inventory management was expanded beyond simple stock numbers.

The inventory page now includes:

- Product table.
- Search by product, SKU, or barcode.
- Category filter.
- Stock status filter.
- Manual stock adjustment.
- Reorder level tracking.
- Stock status badges.
- Local movement history.

Advanced inventory states include:

- On Hand
- Reserved
- Committed
- Available
- Damaged
- Returned
- In Transit

The core formula is:

`Available Stock = On Hand - Reserved - Committed`

This allows the system to demonstrate more realistic inventory control.

---

## 11. Phase 7: Purchases and Stock Receiving

The Purchases page was created to demonstrate how new stock enters the system.

Staff can:

- Select supplier.
- Select product or variant.
- Enter received quantity.
- Enter purchase cost.
- Enter purchase reference.
- Save the stock receiving record.

When stock is received:

- Product stock increases locally.
- Product cost can be updated.
- A stock movement record is created.
- An audit record is created.

In production, this should become a fuller purchase order and goods-received workflow.

---

## 12. Phase 8: POS and Barcode Scanning

The POS page was added for in-store sales.

POS features include:

- Barcode/SKU scan input.
- Hardware scanner-ready workflow.
- Focus scanner button.
- Product add-to-cart.
- Customer selection.
- Default walk-in customer.
- Member phone discount.
- Payment method selection.
- Complete sale button.
- Local order creation.
- Local payment record creation.
- Automatic stock reduction.
- Error handling for unknown SKU/barcode.
- Protection against selling out-of-stock products.

Supported local payment methods:

- Cash
- eSewa
- Khalti
- Bank Transfer
- Cash on Delivery

Real payment gateway verification remains a future production requirement.

---

## 13. Phase 9: Checkout Improvements

The website checkout was improved several times to support practical store use.

Checkout now includes:

- Default customer details for quick demonstration.
- Member phone number field.
- Friends and family discount option.
- Store member discount option.
- Festival offer discount option.
- Delivery or In-Store Pickup selection.
- Delivery city.
- Preferred courier.
- Delivery type.
- COD amount.
- Delivery address.
- Delivery notes.
- Payment method.
- Order summary.
- Bill number confirmation.

Discount logic:

- Friends & Family: 10%
- Festival Offer: 7%
- Store Member: 5%

If In-Store Pickup is selected:

- Delivery charge becomes zero.
- Payment changes to Pay at Store.
- Address and notes adjust for pickup.

---

## 14. Phase 10: Delivery by Bill Number

The delivery workflow was refined to match real store practice.

The user clarified that the store tracks the product, not the customer. The system was then updated so the Delivery page is product-first and bill-number based.

Website checkout now generates a bill number such as:

`SS-BILL-1000`

The ERP Delivery page now includes:

- Checkout Bill Number dropdown.
- Bill / Order Reference field.
- Products to Pack field.
- Contact name.
- Contact phone.
- City.
- COD amount.
- Address.
- Courier.
- Weight.
- Create Shipment button.

The shipment table shows:

- Tracking number
- Bill number
- Products
- Courier
- City
- COD
- Status
- Source

This makes the delivery process easier for staff because they can prepare orders by bill number and product list, while customer information is used only for contact and handoff.

---

## 15. Phase 11: Business Controls

A Business Controls section was added to support operational work after sales.

It includes:

- Return records.
- Exchange records.
- Refund records.
- Inspection status.
- Restock decision.
- Damaged/defective tracking.
- Refund method.
- Exchange replacement product.
- Price difference.
- Stocktake and cycle counting.
- Physical count vs system count.
- Variance calculation.
- Cashier shift opening.
- Cashier shift closing.
- Expected cash calculation.
- Actual cash entry.
- Difference calculation.

Cashier formula:

`Expected Cash = Opening Cash + Cash Sales + Cash In - Cash Refunds - Cash Out`

The current prototype calculates cash sales and cash refunds from local payment records.

---

## 16. Phase 12: Reports and Numerical Analysis

The Reports page was added to explain business performance using simple formulas.

Metrics include:

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

Example formulas:

- Inventory Value = Cost Price x Current Stock
- Gross Profit = Sales Revenue - Cost of Goods Sold
- Gross Margin = Gross Profit / Sales Revenue x 100
- Average Order Value = Sales Revenue / Number of Paid Orders
- Sell-Through Rate = Units Sold / (Units Sold + Current Stock) x 100
- Stock Turnover = Cost of Goods Sold / Inventory Value

The CSV export includes:

- Numerical analysis
- Product records
- Payment records
- Return/exchange/refund records
- Stocktake records
- Cashier shifts
- Stock movements
- Audit trail

---

## 17. Phase 13: Navigation Bridges

To improve staff efficiency, bridge shortcuts were added across the ERP.

Bridge shortcuts connect pages according to likely workflows:

- Dashboard to Add Product, Receive Stock, POS, Delivery, Controls, Reports.
- Inventory to Products, Purchases, POS, Stocktake, Reports.
- Products to Inventory, Purchases, Storefront Preview, POS.
- POS to Orders, Inventory, Shift Closing, Reports.
- Orders to Delivery by Bill, POS, Returns, Reports.
- Delivery to Orders, Storefront, Reports, Returns.
- Suppliers to Purchases, Products, Inventory, Reports.
- Purchases to Suppliers, Products, Inventory, Reports.
- Customers to Orders, POS, Delivery, Returns.
- Reports to Inventory, Orders, Delivery, Controls.
- Business Controls to Orders, Inventory, POS, Reports.
- E-Commerce Preview to Customer Website, Orders, Delivery, Products, Reports.

This makes the ERP easier to use because staff can move through the workflow without returning to the sidebar every time.

---

## 18. Phase 14: Demo Product Catalog Expansion

The project catalog was expanded to better represent a real clothing store.

Demo products include:

- Red Banarasi Saree
- Blue Printed Kurta Set
- Golden Silk Blouse
- Maroon Net Dupatta
- Emerald Festival Kurta
- Ivory Embroidered Saree
- Mustard Cotton Kurta
- Royal Violet Party Saree
- Pink Chiffon Dupatta
- Black Velvet Blouse
- Teal Daily Wear Kurta
- Golden Bridal Dupatta

The ERP includes matching demo seed products with SKU, barcode, cost, price, stock, and reorder level.

A safe demo merge step was added so new demo products can appear even if the browser already has older local demo data saved.

---

## 19. Phase 15: Role Access and User Manual

The ERP includes local prototype roles:

- Super Admin
- Admin
- Inventory Staff
- Sales & Delivery Staff

The role access system is useful for demonstration. It controls page visibility at the front-end level and logs denied access attempts.

The User Manual explains:

- How to start from the dashboard.
- How to check low stock.
- How to add a product.
- How to receive stock.
- How to sell in POS.
- How to process online orders.
- How to create delivery records.
- How to review reports.

For production, role access must be replaced with secure backend authentication and server-side permission control.

---

## 20. Phase 16: UML and Documentation

The project includes UML and documentation files.

UML actors:

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

Documentation files include:

- Polished project summary report.
- Layman user report.
- Full audit and gap analysis.
- Complete work summary report.
- Authenticity test report.
- QA test report.
- Local use guide.
- ERP user manual.

---

## 21. Phase 17: Local Launch and Complete Folder

The system can run locally without a domain.

Local launcher and guide files include:

- `open-subhakamana-store-system.html`
- `open-subhakamana-store-system.command`
- `run-subhakamana-local.command`
- `run-subhakamana-overview-local.command`
- `subhakamana-local-use-guide.md`

A marked folder was created and maintained:

`OPEN_ME_SUBHAKAMANA_STORE_COMPLETE_SYSTEM`

This folder contains synced copies of the main demonstration files so the project can be opened easily for presentation.

---

## 22. Phase 18: QA and Authenticity Testing

QA testing was performed on the current prototype.

Automated QA result:

`76 checks out of 76 passed`

Checks included:

- File existence.
- JavaScript parsing.
- Duplicate HTML ID check.
- ERP section coverage.
- Website section coverage.
- Local persistence wiring.
- Inventory and POS logic.
- Website checkout flow.
- Delivery by bill number.
- Product tracking.
- Business controls.
- Reports and export wiring.
- Bridge shortcuts.
- Package synchronization.
- Demo catalog count.

The authenticity test also confirmed that the system is structurally valid as a local front-end prototype.

Live browser testing was limited because local `file://` inspection and local server binding were blocked by the tool environment. Therefore, the QA results are based on direct file parsing, JavaScript validation, section checks, data-flow checks, and package comparison.

---

## 23. Current System Status

The current system is a strong local front-end prototype.

It supports:

- Customer product browsing.
- Product details.
- Cart.
- Checkout.
- Delivery or pickup selection.
- Bill number generation.
- Member discounts.
- ERP dashboard.
- Product entry.
- Phone photo onboarding.
- Inventory control.
- Purchase receiving.
- POS billing.
- Barcode-ready scanning.
- Orders.
- Delivery by bill number.
- Product-first delivery tracking.
- Customers.
- Suppliers.
- Reports.
- Returns and refunds.
- Stocktake.
- Cashier shift.
- Local audit trail.
- CSV export.
- QA and documentation.

---

## 24. What Is Real in the Prototype

The following are working locally in the browser:

- Product creation.
- SKU/barcode duplicate checking.
- Local product photo preview.
- Local inventory storage.
- Stock adjustment.
- Purchase receiving.
- POS cart.
- POS sale completion.
- Stock reduction after POS sale.
- Local order creation.
- Local payment record creation.
- Website checkout order creation.
- Bill number generation.
- Delivery record creation.
- Return/refund record creation.
- Stocktake record creation.
- Cashier shift record creation.
- Audit log.
- CSV export.
- Local persistence using browser storage.

These features are real inside the local prototype environment.

---

## 25. What Is Demo or Prototype Only

The following are still demo or front-end-only:

- Demo products.
- Demo customers.
- Demo suppliers.
- Demo orders.
- Demo role PINs.
- Demo dashboard trends.
- Demo product images.
- Local browser storage.
- Payment status labels.
- Courier status labels.
- Front-end role access.
- Static reports from local data.

These features are useful for project demonstration but should not be treated as production business infrastructure.

---

## 26. Current Limitations

The system does not yet include:

- Real backend server.
- Real shared database.
- Real secure login.
- Hashed passwords.
- Server-side permissions.
- Real payment gateway verification.
- Bank reconciliation.
- Real courier API connection.
- SMS/email/WhatsApp notification.
- Cloud image storage.
- Multi-user stock locking.
- Production backup and restore.
- Production audit table.
- Android app.
- iPhone app.

These limitations are expected because the current project is a front-end prototype.

---

## 27. Recommended Future Production Architecture

Recommended future architecture:

`Website Admin Panel -> Backend API + Database -> Image Storage -> Web Store / Android App / iPhone App`

In production:

- Staff should manage products, stock, orders, payments, delivery, and reports from the admin panel.
- The backend API should control real business logic.
- The database should store products, variants, inventory, customers, orders, payments, returns, audit logs, and reports.
- Image storage should store product photos.
- The web store and future mobile apps should read from the same backend.
- Payment gateways should verify payment status.
- Courier APIs should update delivery status.
- Notifications should send order and delivery updates.

---

## 28. Future Enhancement Plan

### Phase 1: Backend Foundation

- Build backend API.
- Add database.
- Move local storage data into database tables.
- Add backup and restore.

### Phase 2: Secure Authentication

- Add real staff login.
- Hash passwords.
- Add server-side role permissions.
- Add session timeout.

### Phase 3: Product and Inventory Upgrade

- Add full product editing.
- Add product archive.
- Add multi-variant matrix.
- Add bulk import.
- Add barcode label printing.
- Add stock ledger.

### Phase 4: Orders and Delivery

- Connect website orders to backend.
- Add delivery status updates.
- Add courier API.
- Add COD reconciliation.

### Phase 5: Payment Integration

- Add eSewa verification.
- Add Khalti verification.
- Add bank transfer reconciliation.
- Add refund approval workflow.

### Phase 6: Customer Experience

- Add customer accounts.
- Add loyalty points.
- Add member offers.
- Add order tracking.
- Add notifications.

### Phase 7: Reporting

- Add profit reports.
- Add tax reports.
- Add stock aging.
- Add sales by product.
- Add staff performance.

---

## 29. Final Conclusion

From Day 1, the Subhakamana Store project grew from a customer-facing online fashion store into a complete local store management prototype.

The final prototype now demonstrates how Subhakamana Store can manage:

- Products
- Inventory
- POS sales
- Online checkout
- Bill-number delivery
- Product-first tracking
- Purchases
- Customers
- Suppliers
- Returns
- Refunds
- Stocktake
- Cashier shifts
- Reports
- QA documentation
- Local launch and handover files

The project is ready for academic submission, presentation, and local demonstration. It clearly shows the business workflow of a Nepali clothing store and provides a strong foundation for future full-stack development.

The next major step is to convert the local prototype into a production-ready system with a backend, database, secure login, payment verification, courier integration, and real multi-user inventory control.
