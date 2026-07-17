# Migration Plan

## From Local Front-End Prototype to Production System

This plan explains how to move the current browser-storage prototype into a production backend without losing the existing UI and workflows.

---

## 1. Migration Principle

Do not replace the current system suddenly.

Use a staged migration:

1. Preserve current frontend.
2. Add backend API.
3. Add database.
4. Move one module at a time from localStorage to API.
5. Keep the local prototype as a fallback/demo mode until production is stable.

---

## 2. Current Local Data

The current ERP stores local data under:

`subhakamanaStoreErpLocalDbV1`

Current local data includes:

- products
- customers
- suppliers
- orders
- shipments
- cart
- payment records
- audit log
- stock movements
- returns
- stock counts
- cashier shifts

---

## 3. Migration Stages

### Stage 1: Export Local Prototype Data

Use the existing CSV export and add a JSON export in production.

Data should be exported as:

- products
- product variants
- inventory
- customers
- suppliers
- orders
- payments
- deliveries
- returns
- stock movements
- audit logs

### Stage 2: Create Database

Run the production schema:

`02-database-schema.sql`

Seed:

- roles
- permissions
- admin user
- categories
- brands
- demo products if needed

### Stage 3: Import Master Data

Import:

- categories
- brands
- suppliers
- products
- variants
- inventory
- customers
- addresses

### Stage 4: Import Transactions

Import:

- orders
- order items
- payments
- deliveries
- returns
- refunds
- stock movements
- cashier shifts
- stocktakes

### Stage 5: API Switch

Update frontend module by module:

1. Authentication
2. Products
3. Inventory
4. Purchases
5. POS
6. Checkout
7. Orders
8. Delivery
9. Returns
10. Reports

### Stage 6: Disable Production localStorage Writes

After backend is verified:

- Keep localStorage only for temporary UI preferences.
- Do not use localStorage as the source of truth.
- Use backend API for business data.

---

## 4. Data Mapping

| Prototype Field | Production Table |
|---|---|
| products | products, product_variants, inventory |
| customers | customers, addresses |
| suppliers | suppliers |
| orders | orders, order_items |
| shipments | deliveries |
| paymentRecords | payments |
| stockMovements | inventory_movements |
| returns | returns, return_items, refunds |
| stockCounts | stocktakes, stocktake_items |
| cashierShifts | cashier_shifts |
| auditLog | audit_logs |

---

## 5. Bill Number Migration

The current website checkout creates bill numbers like:

`SS-BILL-1000`

In production:

- bill number must be generated server-side
- bill number must be unique
- bill number should be stored in `orders.bill_number`
- delivery should reference `orders.bill_number`

---

## 6. Product Tracking Migration

The current Delivery page tracks products first and customer details second.

In production:

- product list should come from `order_items`
- product snapshot should be stored on each order item
- delivery should store `products_to_pack`
- customer contact should be copied from customer/address at order time

---

## 7. Inventory Migration

Prototype inventory fields:

- stock
- onHand
- reserved
- committed
- damaged
- returned
- inTransit

Production inventory table:

- on_hand
- reserved
- committed
- damaged
- returned
- in_transit

Production rule:

`available = on_hand - reserved - committed`

All changes should create inventory movement records.

---

## 8. Payment Migration

Prototype payment records are not verified by real gateways.

Migration rules:

- Cash payments can be imported as recorded payments.
- COD payments should be imported as pending or reconciled.
- eSewa/Khalti/bank records should be imported as pending verification unless real proof exists.

---

## 9. Migration Validation

After migration, validate:

- product count
- SKU uniqueness
- barcode uniqueness
- inventory totals
- order totals
- payment totals
- delivery bill numbers
- stock movement counts
- audit log count

---

## 10. Rollback Plan

Before migration:

- export local data
- backup database
- backup uploaded images
- keep static prototype files unchanged

If migration fails:

- restore database backup
- reload prototype from local files
- retry import after fixing mapping

---

## 11. Recommended First Production Module

Start with:

1. Database
2. Authentication
3. Products
4. Inventory

Reason:

Every other module depends on secure users, products, variants, and stock.
