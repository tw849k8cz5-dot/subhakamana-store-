# Subhakamana Store Final ERP + E-Commerce System Report

**Store Name:** Subhakamana Store  
**Tagline:** Tradition you can wear, quality you can trust.  
**Final Version Date:** July 3, 2026  
**Prepared For:** Subhakamana Store  
**Document Status:** Final prototype handover version

---

## Final Handover Note

This final version combines the approved ERP and e-commerce working concept into one clear handover document. It explains the public website, ERP dashboard, POS terminal, inventory, purchasing, delivery, payments, reporting, and future production build direction.

The attached HTML prototype demonstrates the final screen structure and business workflows in a browser. It is suitable for review, presentation, and use as a functional guide before building the full production application.

---

## 1. Purpose of This Report

This report explains how the Subhakamana Store omnichannel ERP and e-commerce system works in simple language. It is written for owners, managers, admin users, inventory staff, sales staff, delivery staff, and future developers.

The goal of the future production system is to keep the website, POS counter, inventory, purchases, customers, payments, delivery, and reports connected through one database and one backend. The current supplied version is a front-end prototype that demonstrates these workflows before full backend development.

## 2. Big Picture: How the System Works

Subhakamana Store has three main working areas: the public website, the ERP dashboard, and the POS terminal. Customers use the website, staff use the ERP dashboard, and sales staff use the POS terminal. In the production version, all three should use the same product, inventory, customer, payment, and order records.

In the current front-end prototype, these workflows are demonstrated with local sample data. In the production version, whenever a product is sold online or in the physical store, inventory should be reduced automatically. Whenever new stock is received from a supplier, inventory should be increased automatically. Reports should update from the same records, so managers can see the real business situation.

- Public Website: Customers browse products, add to cart, complete prototype checkout, and view the order tracking concept.

- ERP Dashboard: Admin staff manage products, stock, purchases, suppliers, customers, orders, delivery, and reports.

- POS Terminal: Sales staff scan products, create bills, receive payment, print receipt, and reduce stock instantly.

- Single Database: A future production backend should keep website, ERP, POS, inventory, payment, and delivery information synchronized.

## 3. Main Users and What They Do

| User Type | Main Work | System Access |
| --- | --- | --- |
| Super Admin | Controls the full system, users, settings, reports, API keys, audit logs. | Full access. |
| Admin | Manages products, inventory, orders, purchases, customers, reports, and delivery. | Business operations access, but no system-level API/user control. |
| Inventory Staff | Receives stock, creates products, prints labels, performs audits, uploads images. | Inventory, labels, stock, and audits. |
| Sales & Delivery Staff | Uses POS, handles orders, dispatch, tracking, returns, and delivery updates. | POS, orders, dispatch, tracking, returns. |
| Customer | Shops online, tracks order, downloads invoice, manages account and wishlist. | Public website and customer account. |

## 4. Website Working Flow

The public website is where online customers shop. In production, product stock shown on the website should come directly from ERP inventory. If stock becomes low or out of stock, the website should show the correct availability automatically.

- Customer visits the Subhakamana Store website.

- Customer browses Home, Shop, Categories, Product Detail, Wishlist, Cart, Checkout, Track Order, About, and Contact pages.

- Customer selects size, color, and quantity.

- System checks stock from inventory in the production version.

- Customer selects eSewa, Khalti, bank transfer, or Cash on Delivery. Real payment verification requires payment gateway integration.

- Order is created and inventory is reduced in the production backend.

- Admin packs and dispatches the order.

- Customer tracks delivery using order number or tracking number after backend and courier integration are added.

## 5. Product and Variant Working Flow

A product is the main item, such as Red Banarasi Saree. A variant is a specific version of that product, such as size M, color Red, material Silk. Every variant has its own SKU, barcode, QR code, and stock quantity.

- Admin creates product name, description, category, brand, supplier, prices, reorder level, and images.

- Admin creates variants by size, color, and material.

- System creates unique SKU, barcode, and QR code for each variant.

- Inventory is tracked separately for each variant.

- Website and POS both use the same variant records.

## 6. Inventory Working Flow

Inventory is the center of the system. Every product movement must be recorded so staff can see where stock came from and where it went.

- Stock In: Supplier goods are received, purchase bill is entered, inventory quantity increases.

- Stock Out: POS sale, online sale, return adjustment, or manual stock-out reduces inventory.

- Adjustment: Admin corrects damaged, missing, or counted stock differences.

- Audit: Staff scan barcode, verify physical quantity, and update system quantity.

- Low Stock Alert: System warns when quantity is below reorder level.

- Inventory Movement History: Every stock change records product, quantity, user, date, and reason.

## 7. Purchase and Supplier Working Flow

Purchase management connects suppliers, purchase orders, bills, documents, and inventory. This makes it possible to trace a product from supplier bill to final customer sale.

- Admin creates supplier profile with contact details and purchase history.

- Admin creates purchase order for required goods.

- When goods arrive, staff create goods received record.

- Purchase bill is uploaded as PDF, JPG, PNG, Excel, or other supported document.

- Inventory increases based on received items.

- Supplier outstanding balance and purchase history update automatically.

## 8. POS Working Flow

The POS system is used inside the shop. It is not a separate application. In production, it should be part of the ERP and use the same inventory database as the website.

- Sales staff scans barcode or searches product.

- System adds item to cart and checks available stock.

- Customer is selected or created.

- Payment method is selected: cash, eSewa, Khalti, bank transfer, or cash on delivery.

- System generates invoice and receipt.

- Inventory is reduced immediately.

- Sales and payment reports update automatically.

## 9. Order Working Flow

Orders may come from the website or POS. Online orders usually need packing and delivery. POS orders are usually completed at the counter unless delivery is requested.

- New: Order is placed.

- Confirmed: Payment/customer details are verified.

- Packed: Staff prepares the parcel.

- Dispatched: Parcel is handed to delivery team or courier.

- In Transit: Courier is moving the parcel.

- Delivered: Customer receives the parcel.

- Returned or Cancelled: Order is reversed or closed with proper reason.

## 10. Payment Working Flow

The payment module records how money is received. It supports both online and in-store payment methods.

- Supported methods: Cash, eSewa, Khalti, bank transfer, and cash on delivery.

- Payment status: Pending, Paid, Failed, Refunded.

- Each payment stores transaction ID, timestamp, customer, order, amount, and method.

- Payment dashboard shows today, weekly, monthly, and yearly totals.

- Reports separate online revenue, POS revenue, COD, refunds, and pending payments.

## 11. Delivery and Nepal Can Move Working Flow

The delivery module prepares shipments and tracking. The system is ready for future Nepal Can Move integration. Until official API credentials are connected, staff can still create local shipment records and tracking references in the system.

- Admin selects an order for delivery.

- System fills customer name, phone, city, address, COD amount, and order details.

- Staff selects courier, package weight, and delivery information.

- System creates tracking number and shipment record.

- Order delivery status changes to Pickup Pending, In Transit, Delivered, Returned, or Cancelled.

- Customer enters order number or tracking number on /track to view timeline.

- When Nepal Can Move API is available, the backend sends shipment data to Nepal Can Move and receives official tracking updates.

## 12. Customer Management Working Flow

Customer management keeps all customer information in one place, whether the customer buys online or inside the store.

- Customer profile stores name, phone, email, addresses, wishlist, orders, payments, and deliveries.

- System shows both online purchases and POS purchases.

- Lifetime spending helps identify valuable repeat customers.

- Staff can view order history before handling returns, exchanges, or support questions.

## 13. Barcode and Label Working Flow

Barcode labels help staff scan products quickly and reduce manual entry mistakes.

- System generates SKU, barcode, QR code, and label for each product variant.

- Label includes store name, product name, SKU, barcode, price, size, and color.

- Staff can print a single label, bulk labels, category labels, or labels for new stock arrivals.

- Production printer support can include Zebra, XPrinter, Brother, and TSC.

## 14. Reports and Analytics Working Flow

Reports help the owner and managers understand business performance. Since all modules use the same database, reports are based on actual sales, purchases, stock, payment, and delivery records.

- Sales reports show total sales by date, product, channel, and staff.

- Inventory reports show stock value, low stock, dead stock, and slow-moving products.

- Purchase reports show supplier purchases, purchase bills, and outstanding amounts.

- Payment reports show cash, eSewa, Khalti, bank transfer, COD, refunds, and failed payments.

- Profit reports compare selling price, cost price, and expenses.

- Delivery reports show pending, in transit, delivered, returned, and delayed parcels.

- Reports can be exported as PDF, Excel, and CSV.

## 15. Document Management Working Flow

Document management keeps business documents connected to the correct supplier, purchase, order, return, or delivery record.

- Purchase bills are attached to purchase records.

- Supplier documents are stored inside supplier profiles.

- Delivery receipts are connected to shipments.

- Return documents are connected to returned orders.

- Invoices can be previewed, downloaded, searched, and categorized.

## 16. Real-Time Data Examples

| Event | What Happens Automatically |
| --- | --- |
| Supplier goods received | Purchase bill is saved, inventory increases, labels can be printed, reports update. |
| Online order placed | Payment is recorded, order is created, stock reduces, delivery can be created. |
| POS sale completed | Receipt is generated, stock reduces, revenue and payment reports update. |
| Delivery created | Tracking number is created, order delivery status updates, customer can track parcel. |
| Stock audit completed | Inventory quantity is corrected and movement history records the change. |

## 17. What the Current Working Prototype Demonstrates

The current working HTML prototype demonstrates the main system idea in a browser. It is not the final production database application, but it shows the structure, screens, and main workflows clearly.

- Dashboard KPI cards and chart-style widgets.

- Inventory table with search, filters, status, and stock adjustment.

- Product creation with SKU/barcode label preview.

- POS cart, customer selection, payment method, and sale completion.

- Orders table with channel, payment, status, and delivery state.

- Delivery form with Nepal Can Move readiness and shipment tracking table.

- Suppliers, purchases, customers, reports, e-commerce storefront, settings, dark mode, and CSV export.

## 18. Simple Staff Training Guide

| Task | Where To Go | Simple Steps |
| --- | --- | --- |
| Add new product | Products | Enter product details, size, color, price, stock, then create product variant. |
| Receive new stock | Inventory / Purchases | Enter purchase bill, confirm received goods, inventory increases. |
| Sell in shop | POS | Scan product, add to cart, choose customer/payment, complete sale. |
| Handle online order | Orders | Confirm order, pack item, create delivery shipment. |
| Create delivery | Delivery | Select order, confirm address/COD, choose courier, create shipment. |
| Check low stock | Dashboard / Inventory | Review low stock alerts and reorder from supplier. |
| View business performance | Reports | Open sales, inventory, payment, profit, and delivery reports. |

## 19. Important Benefits

- One system instead of many separate spreadsheets and apps.

- Less stock confusion between online sales and shop sales.

- Clear product traceability from supplier purchase to customer delivery.

- Faster billing through POS and barcode scanning.

- Better customer service through order and delivery tracking.

- Better management decisions through shared reports after production data integration.

- Future-ready structure for Nepal Can Move, eSewa, Khalti, and other integrations.

## 20. Final Summary

The Subhakamana Store system is designed to work as one complete retail ecosystem. Products, inventory, purchases, customers, payments, POS, website orders, delivery, and reports are all connected. This creates accurate stock, faster sales, better customer service, and clearer business control.

For production, the next step is to build the full Next.js, Express, PostgreSQL, and Prisma application using the approved prototype and this working report as the functional guide.
