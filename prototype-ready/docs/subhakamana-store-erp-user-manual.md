# Subhakamana Store ERP + E-Commerce System User Manual

**Store:** Subhakamana Store  
**Tagline:** Tradition you can wear, quality you can trust.  
**Manual Version Date:** July 3, 2026  

---

## 1. System Overview

The system has two connected platforms:

- **ERP Staff Platform:** Used by owners and staff to manage inventory, products, POS, orders, delivery, purchases, suppliers, customers, reports, and settings.
- **Customer E-Commerce Platform:** Used to preview the public online store, product availability, cart flow, checkout readiness, customer accounts, wishlist, and order tracking.

Both platforms use the same product, stock, order, customer, payment, and delivery information.

---

## 2. Start From The Dashboard

1. Open the system page.
2. Use the Dashboard as the main access point.
3. Select the user role from the top-right role menu.
4. Choose **Open ERP** for staff work.
5. Choose **Open Storefront** for the customer-facing platform.
6. Use the role shortcuts to open the pages allowed for the selected user.

---

## 3. User Roles

| Role | Access |
| --- | --- |
| Super Admin | Full system access, users, settings, exports, reports, API setup, and all modules. |
| Admin | Daily business operations, inventory, products, orders, delivery, purchases, suppliers, customers, and reports. |
| Inventory Staff | Product creation, stock updates, purchase receiving, low-stock checks, labels, and audits. |
| Sales & Delivery Staff | POS billing, orders, customers, dispatch, delivery tracking, and returns. |

---

## 4. Daily Workflows

### Check Stock

1. Open **Dashboard** or **Inventory**.
2. Review low-stock and out-of-stock items.
3. Search by product name, SKU, or barcode.
4. Use filters for category and stock status.

### Add Product

1. Open **Products**.
2. Enter product name, category, brand, size, color, cost price, selling price, opening stock, and reorder level.
3. Save the product variant.
4. Check the generated SKU/barcode label preview.

### Sell In Store

1. Open **POS**.
2. Scan or search the product SKU/barcode.
3. Add items to cart.
4. Select customer and payment method.
5. Complete sale.
6. Inventory reduces automatically.

### Handle Online Order

1. Open **Orders**.
2. Check order channel, payment status, order status, and delivery status.
3. Confirm the order.
4. Move the order to packing and dispatch.

### Create Delivery

1. Open **Delivery**.
2. Select the online order.
3. Confirm customer name, phone, city, address, COD amount, courier, and package weight.
4. Create shipment.
5. Track delivery status.

### Review Storefront

1. Open **Dashboard**.
2. Select **Open Storefront**.
3. Search products or filter by category and availability.
4. Confirm that stock labels match ERP inventory.

### View Reports

1. Open **Reports**.
2. Review sales, payments, inventory value, COD, and channel performance.
3. Use export when a file is needed.

---

## 5. Important Operating Rules

- Record every stock movement: sale, purchase, return, damaged item, missing item, or adjustment.
- Select the correct payment method for every sale.
- Confirm customer phone and address before dispatch.
- Keep low-stock items updated so reordering is easier.
- Use SKU/barcode for faster billing and fewer mistakes.
- Only Super Admin should manage system settings, API keys, users, and deployment configuration.

---

## 6. Production Notes

The current HTML file is a working prototype for review and presentation. For production, the final system should use a secure backend, database, user authentication, role permissions, payment gateway integration, Nepal Can Move integration, file storage, audit logs, and automated backups.

