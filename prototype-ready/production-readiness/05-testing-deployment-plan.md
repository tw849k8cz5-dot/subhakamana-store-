# Testing and Deployment Plan

## Subhakamana Store Management System

This plan defines how to test and deploy the production version.

---

## 1. Testing Strategy

Testing should cover:

- Unit tests
- Integration tests
- API tests
- Security tests
- Performance tests
- End-to-end tests
- Regression tests

---

## 2. Unit Tests

Test individual business functions:

- SKU generation
- Barcode validation
- Available stock formula
- Discount calculation
- Tax calculation
- Shipping calculation
- Bill number generation
- Cashier shift formula
- Refund amount calculation
- Stocktake variance calculation

---

## 3. Integration Tests

Test workflows across services:

- Product creation creates inventory record.
- Purchase receiving increases stock.
- POS sale creates order, payment, stock movement, and audit log.
- Website checkout creates bill number and reserves stock.
- Delivery by bill number creates shipment.
- Return inspection restocks sellable products.
- Refund creates payment reversal record.
- Stocktake adjustment updates inventory ledger.

---

## 4. API Tests

Test:

- Authentication endpoints
- Product endpoints
- Inventory endpoints
- Purchase endpoints
- POS endpoints
- Checkout endpoints
- Payment endpoints
- Delivery endpoints
- Return endpoints
- Report endpoints

Every protected endpoint should test:

- unauthenticated request
- unauthorized role
- invalid data
- valid data
- audit log creation where required

---

## 5. Security Tests

Test against:

- SQL injection
- XSS
- CSRF
- brute-force login
- broken access control
- file upload attack
- privilege escalation
- payment replay
- duplicate payment
- negative stock attempt

---

## 6. End-to-End Tests

Recommended E2E flows:

1. Admin logs in.
2. Admin creates product.
3. Inventory staff receives stock.
4. Customer places website checkout order.
5. System generates bill number.
6. Delivery staff creates shipment by bill number.
7. Cashier completes POS sale.
8. Manager approves return.
9. Refund is recorded.
10. Reports show updated sales and stock.

---

## 7. Performance Tests

Test:

- product list load time
- POS scan response time
- checkout creation time
- report generation time
- export generation time
- database query performance

Suggested target:

- POS scan lookup under 300 ms
- checkout creation under 1 second
- normal dashboard load under 2 seconds

---

## 8. Deployment Requirements

Production deployment should include:

- Dockerfile
- Docker Compose for local production-like testing
- environment variables
- database migrations
- HTTPS
- domain setup
- build pipeline
- CI/CD
- health check endpoint
- logs
- monitoring
- backup job

---

## 9. Environment Variables

Recommended variables:

- `DATABASE_URL`
- `APP_ENV`
- `APP_URL`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `SESSION_TIMEOUT_MINUTES`
- `CLOUD_STORAGE_BUCKET`
- `CLOUD_STORAGE_KEY`
- `ESEWA_MERCHANT_ID`
- `ESEWA_SECRET`
- `KHALTI_SECRET`
- `COURIER_API_KEY`
- `EMAIL_PROVIDER_KEY`
- `SMS_PROVIDER_KEY`

---

## 10. Health Checks

Add:

- `/health`
- `/health/database`
- `/health/storage`
- `/health/payments`

Health checks should not reveal secrets.

---

## 11. Backup Plan

Backups should include:

- Daily database backup
- Weekly full backup
- Backup retention policy
- Restore test
- Export archive
- Product image storage backup

---

## 12. Release Process

Recommended release steps:

1. Run lint.
2. Run unit tests.
3. Run integration tests.
4. Run API tests.
5. Run security checks.
6. Build production app.
7. Run database migration.
8. Deploy backend.
9. Deploy frontend.
10. Run smoke tests.
11. Monitor logs.

---

## 13. Production Smoke Test

After deployment, verify:

- login works
- product list loads
- POS scan works
- checkout creates bill number
- delivery by bill number works
- reports load
- audit logs record action
- logout works
