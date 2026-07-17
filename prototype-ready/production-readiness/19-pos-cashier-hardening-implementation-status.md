# POS and Cashier Hardening Implementation Status

Date: 2026-07-17

## Implemented in the ERP Prototype

The Billing Counter has been upgraded with operator-safety controls for the physical store workflow.

Implemented features:

- Secure cashier login remains role/PIN based in demo mode.
- Open-shift requirement before completing a sale.
- Hardware barcode scanner support through keyboard-mode barcode/SKU entry.
- Exact variant selection shown in POS product rows and cart lines.
- Live stock verification when scanning and before checkout.
- Transaction-style checkout preflight before stock is reduced.
- Rollback recovery if checkout fails after stock mutation begins.
- Idempotency key stored per completed POS sale.
- Duplicate-click protection during checkout.
- Bargained selling price per cart line.
- Item discount and bill discount kept separate.
- Role-based discount limits.
- Manager/owner PIN required for large discounts.
- Customer/member phone lookup.
- New member creation from POS phone lookup.
- Multiple payment methods.
- Split payment support.
- Digital/QR split payment verification requirement.
- Receipt generation.
- Thermal receipt-style printable receipt text.
- Receipt reprinting.
- Printer failure recovery by keeping receipt visible on screen.
- Park and resume sale.
- Sale void with manager approval and stock restoration.
- Wrong-payment correction with manager approval.
- Return by bill and partial-return quantity safety.

## Prototype Limits

These functions are implemented for the browser prototype and local demo records. Production must still move final enforcement into backend services and database transactions.

Production still needs:

- Server-side cashier authentication.
- Server-side shift enforcement.
- Real payment gateway verification.
- Real printer integration or print-agent support.
- Database transaction boundaries for checkout, voids, returns, and stock movements.
- Server-side idempotency table.
- Server-side discount policy enforcement.
- Full audit trail immutability.

## Validation

Local syntax validation passed for the ERP JavaScript after implementation.

