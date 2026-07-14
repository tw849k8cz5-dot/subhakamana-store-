# Module 1: Production Database

## Purpose

This folder converts the existing Subhakamana Store front-end prototype into a production-ready database foundation.

It preserves the current ERP, POS, delivery-by-bill-number workflow, product-first tracking, customer website, reports, and local demo behavior. This module only defines the real database layer that later backend modules will connect to.

## Design

- Database: PostgreSQL
- ORM: Prisma
- Primary keys: UUID
- Data ownership: products and variants control inventory; customers do not control stock
- Stock model: on hand, reserved, committed, damaged, returned, transit, and calculated available stock
- Delivery model: delivery records stay searchable by bill number
- Sales model: order items store product, SKU, price, discount, and tax snapshots
- Security model: users, roles, permissions, sessions, and audit logs are first-class tables
- Data lifecycle: audit timestamps, soft delete, status fields, and optimistic locking where stock can change

## Database Changes

This module adds production models for:

- Users, roles, permissions, sessions
- Customers and addresses
- Products, variants, categories, brands, images, price history
- Suppliers, purchase orders, purchase items
- Inventory and immutable inventory movements
- Orders, order items, payments, deliveries
- Returns, return items, refunds
- Cashier shifts, stocktakes, stocktake items
- Audit logs, notifications, settings, idempotency keys

## API Changes

No frontend API calls are changed in this module. Later modules should use this database through backend endpoints such as:

- `/api/v1/auth/login`
- `/api/v1/products`
- `/api/v1/inventory`
- `/api/v1/orders`
- `/api/v1/deliveries/by-bill/:billNumber`
- `/api/v1/payments`
- `/api/v1/reports`

## Frontend Changes

No UI redesign is required. Existing screens can keep their current layout while replacing localStorage reads and writes one module at a time.

## Security

- Passwords are represented only by hashes.
- Authentication module must create those hashes with Argon2 before saving users.
- Refresh tokens are represented only by hashes.
- Permissions are stored server-side and attached to roles.
- Important actions are expected to write audit logs.
- Soft-delete fields keep business history available for investigation.

## Testing

Run the local file verification script:

```bash
npm run verify
```

When dependencies and PostgreSQL are available, run:

```bash
npm install
npm run db:generate
npm run db:migrate
npm run db:seed
```

## Validation Rules Covered

- SKU is unique.
- Barcode is unique when provided.
- Bill number is unique.
- Purchase number is unique.
- Return number is unique.
- Refund amount and payment amount are stored separately for reconciliation.
- Inventory quantity buckets cannot be negative.
- Available stock is calculated as `onHand - reserved - committed`.
- Stock rows include a `version` field for optimistic locking.
