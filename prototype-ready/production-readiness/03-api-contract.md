# Backend REST API Contract

## Subhakamana Store Management System

This API contract maps the current frontend prototype workflows to production backend endpoints.

Base URL example:

`https://api.subhakamanastore.com/api`

---

## 1. Authentication

### POST `/auth/register`

Creates a customer or staff account, depending on admin permission.

### POST `/auth/login`

Authenticates a user.

Required:

- email or phone
- password

Security:

- password hash verification
- rate limiting
- audit log
- session creation

### POST `/auth/logout`

Revokes active session or refresh token.

### POST `/auth/forgot-password`

Sends password reset link or OTP.

### POST `/auth/reset-password`

Resets password using verified reset token.

### POST `/auth/verify-email`

Verifies email address.

### POST `/auth/refresh`

Rotates refresh token and returns a new access token.

---

## 2. Users, Roles, and Permissions

### GET `/users`

List users.

Permission:

- `users.read`

### POST `/users`

Create staff user.

Permission:

- `users.create`

### PATCH `/users/{id}`

Update staff user.

Permission:

- `users.update`

### GET `/roles`

List roles.

### POST `/roles`

Create role.

### PUT `/roles/{id}/permissions`

Assign permissions to role.

---

## 3. Products

### GET `/products`

List products for ERP or website.

Query options:

- search
- category
- status
- stock_status
- show_on_website
- sort

### POST `/products`

Create product.

Validates:

- product name
- category
- brand
- SKU uniqueness
- barcode uniqueness
- price
- stock

### GET `/products/{id}`

View product details.

### PATCH `/products/{id}`

Update product.

### DELETE `/products/{id}`

Soft archive product.

### POST `/products/{id}/images`

Upload product image.

Security:

- validate file type
- validate file size
- compress image
- scan filename
- store in cloud storage

### POST `/products/bulk-import`

Bulk import product data.

### GET `/products/export`

Export products.

---

## 4. Product Variants

### POST `/products/{id}/variants`

Create product variant.

Required:

- size
- color
- SKU
- barcode
- cost price
- selling price
- reorder level

### PATCH `/variants/{id}`

Update variant.

### GET `/variants/{id}/history`

View price and inventory history.

---

## 5. Inventory

### GET `/inventory`

List inventory with:

- on hand
- reserved
- committed
- available
- damaged
- returned
- in transit

### POST `/inventory/adjust`

Manual stock adjustment.

Required:

- variant_id
- quantity
- reason

Rules:

- prevent negative stock
- create inventory movement
- create audit log

### GET `/inventory/movements`

List stock movement ledger.

### GET `/inventory/low-stock`

List low-stock products.

---

## 6. Purchases

### POST `/purchases`

Create purchase order.

### PATCH `/purchases/{id}/approve`

Approve purchase order.

### POST `/purchases/{id}/receive`

Receive stock.

Supports:

- partial receiving
- supplier invoice
- inventory update
- stock movement

### POST `/purchases/{id}/payments`

Record supplier payment.

---

## 7. POS

### POST `/pos/cart/scan`

Find product by SKU or barcode.

### POST `/pos/sales`

Complete POS sale.

Backend transaction:

1. Validate cashier permission.
2. Validate cart.
3. Validate stock.
4. Validate discount.
5. Create order.
6. Create payment.
7. Reduce inventory.
8. Create stock movement.
9. Create audit log.
10. Return receipt data.

### POST `/pos/returns`

Create POS return or exchange.

### POST `/pos/shifts/open`

Open cashier shift.

### POST `/pos/shifts/close`

Close cashier shift and calculate cash difference.

---

## 8. Website Checkout

### POST `/checkout/validate`

Validates checkout before order creation.

Checks:

- cart items
- stock
- address
- delivery or pickup
- coupon
- member discount
- shipping charge
- tax

### POST `/checkout/orders`

Creates an online order and bill number.

Returns:

- bill_number
- order_id
- total
- payment_status
- delivery_status

### GET `/checkout/orders/{billNumber}`

Customer order tracking by bill number.

---

## 9. Orders

### GET `/orders`

List orders.

### GET `/orders/{id}`

View order.

### PATCH `/orders/{id}/status`

Update order status.

### GET `/orders/by-bill/{billNumber}`

Find order by bill number.

---

## 10. Payments

### POST `/payments/esewa/initiate`

Create eSewa payment request.

### POST `/payments/esewa/verify`

Verify eSewa payment.

### POST `/payments/khalti/initiate`

Create Khalti payment request.

### POST `/payments/khalti/verify`

Verify Khalti payment.

### POST `/payments/bank-transfer`

Record bank transfer.

### POST `/payments/cod/reconcile`

Reconcile COD amount.

### POST `/payments/refund`

Create refund request.

---

## 11. Delivery

### GET `/deliveries`

List deliveries.

### POST `/deliveries/by-bill/{billNumber}`

Create shipment from bill number.

Required:

- courier
- contact name
- phone
- city
- address
- COD amount
- products to pack

### PATCH `/deliveries/{id}/status`

Update shipment status.

Statuses:

- packing
- pickup_pending
- dispatched
- in_transit
- delivered
- returned
- failed_delivery

### POST `/deliveries/{id}/cod-reconcile`

Reconcile COD.

---

## 12. Returns, Exchanges, and Refunds

### POST `/returns`

Create return request.

### PATCH `/returns/{id}/approve`

Approve return.

### POST `/returns/{id}/inspection`

Record inspection.

### POST `/returns/{id}/restock`

Restock sellable return.

### POST `/returns/{id}/exchange`

Create exchange order.

### POST `/returns/{id}/refund`

Create refund.

---

## 13. Reports

### GET `/reports/sales`

Sales report.

### GET `/reports/inventory`

Inventory report.

### GET `/reports/profit`

Profit report.

### GET `/reports/purchases`

Purchase report.

### GET `/reports/cash-flow`

Cash flow report.

### GET `/reports/top-products`

Top products.

### GET `/reports/dead-stock`

Dead stock.

### GET `/reports/export`

Export CSV/XLSX/PDF.

---

## 14. Audit Logs

### GET `/audit-logs`

List audit logs.

Query:

- user_id
- action
- entity_type
- date range

---

## 15. Notifications

### POST `/notifications/send`

Send notification.

Channels:

- email
- SMS
- WhatsApp
- in-app

### GET `/notifications`

List notification history.

---

## 16. Settings

### GET `/settings`

Read system settings.

### PATCH `/settings/{key}`

Update setting.

Secrets should be encrypted or stored in environment variables.
