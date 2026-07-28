# Security and RBAC Plan

## Subhakamana Store Management System

This plan replaces demo PIN access with real server-side authentication and permission checks.

---

## 1. Production Roles

Recommended roles:

- Super Admin
- Admin
- Manager
- Inventory Staff
- Cashier
- Sales Staff
- Delivery Staff
- Reports Viewer

---

## 2. Permission Modules

Permissions should be grouped by module.

| Module | Example Permissions |
|---|---|
| Products | products.read, products.create, products.update, products.archive |
| Inventory | inventory.read, inventory.adjust, inventory.stocktake, inventory.export |
| Purchases | purchases.read, purchases.create, purchases.approve, purchases.receive |
| Orders | orders.read, orders.update, orders.cancel |
| POS | pos.sell, pos.discount, pos.return, pos.shift |
| Delivery | deliveries.read, deliveries.create, deliveries.update, deliveries.cod_reconcile |
| Returns | returns.read, returns.create, returns.approve, returns.refund |
| Reports | reports.read, reports.export |
| Users | users.read, users.create, users.update, users.disable |
| Settings | settings.read, settings.update |
| Audit | audit.read, audit.export |

---

## 3. Role Permission Matrix

| Role | Access Summary |
|---|---|
| Super Admin | Full access to all modules and settings |
| Admin | Daily business operations, products, orders, customers, delivery, purchases, reports |
| Manager | Approvals, reports, stocktake, returns, purchases |
| Inventory Staff | Products, stock, purchases, labels, stocktake |
| Cashier | POS sales, cashier shifts, receipt, simple returns |
| Sales Staff | POS, customers, orders, delivery handoff |
| Delivery Staff | Delivery by bill number, dispatch, status updates |
| Reports Viewer | Read-only reports and dashboards |

---

## 4. Authentication Requirements

Implement:

- Secure login
- Password hashing with Argon2 or bcrypt
- Email verification
- Forgot password
- Password reset
- Session timeout
- Refresh token rotation
- Logout and token revocation
- Server-side session table
- Login rate limiting
- Brute-force protection

---

## 5. API Protection

Every protected endpoint must check:

1. User is authenticated.
2. Session is active.
3. Role is active.
4. Permission exists.
5. Request data is valid.
6. User action is audited where needed.

---

## 6. Data Validation

Validate server-side:

- SKU uniqueness
- Barcode uniqueness
- Product prices
- Stock quantities
- Phone numbers
- Email addresses
- Payment amounts
- Delivery bill number
- Refund amount
- File type and size

Frontend validation is helpful, but backend validation is mandatory.

---

## 7. Security Controls

Protect against:

- SQL injection through parameterized queries or ORM
- XSS through output encoding and sanitization
- CSRF through CSRF tokens or same-site cookies
- Broken authentication through secure session handling
- File upload attacks through validation and storage isolation
- Rate-limit bypass through IP and user-level rate limits
- Privilege escalation through server-side permission checks
- Sensitive data exposure through encryption and log filtering

---

## 8. Audit Requirements

Audit these actions:

- Login
- Logout
- Failed login
- Password reset
- User creation
- Permission change
- Product creation/edit/archive
- Price change
- Inventory adjustment
- Purchase receiving
- POS sale
- Discount approval
- Order edit
- Delivery status change
- Return approval
- Refund
- Export
- Delete or archive action

---

## 9. File Upload Security

Product image upload rules:

- Allow only JPEG, PNG, and WebP.
- Limit file size.
- Strip unsafe metadata.
- Rename file on upload.
- Store outside application server.
- Save public URL and storage key in database.
- Reject executable files.

---

## 10. Production Secrets

Never hardcode:

- Database password
- JWT secret
- Email credentials
- SMS keys
- eSewa keys
- Khalti keys
- Cloud storage keys
- Courier API keys

Use environment variables and secret management.
