# Grand Release Demo Script

## Opening Line

This is the Subhakamana Store Management System, a prototype-ready retail platform designed for a Nepali clothing and fashion store. It combines a customer website, Admin ERP, and physical-store POS into one organized system package.

## 1. Start Page

Open:

```text
START_HERE.html
```

Explain:

- This is the release home page.
- It links to the Admin ERP, Cashier POS, Customer Website, reports, manuals, and production-readiness files.
- It is designed for local demonstration without needing a public domain.

## 2. Admin ERP

Open:

```text
subhakamana-store-final-erp-platform.html#dashboard
```

Demo PIN:

```text
Owner: 0000
Manager: 1111
Inventory Staff: 2222
Cashier: 3333
```

Show:

- Dashboard and attention list.
- Stock List.
- Add Products.
- Receive Stock.
- Orders.
- Delivery.
- Payments.
- Returns / Counts.
- Reports.
- Manual.

Key message:

The ERP is the store management side. It tracks products, stock, orders, delivery, and business reporting.

## 3. Product And Inventory Flow

Show:

- Product Entry.
- SKU and barcode fields.
- Cost, selling price, original price, and discount fields.
- Inventory and reorder level.
- Size/color variant section.
- Photo upload and photo-use controls.
- Website preview.

Key message:

The store tracks products first. Customer details are secondary and mainly used for orders, delivery, membership, and support.

## 4. Cashier POS

Open:

```text
subhakamana-store-physical-pos.html
```

Show:

- Fast product search.
- Barcode-style lookup.
- Cart.
- Quantity and price adjustment.
- Item discount and bill discount.
- Payment method selection.
- Split payment concept.
- Receipt generation concept.
- Return-by-bill concept.

Key message:

The POS is separated from the ERP so the cashier can sell quickly without unnecessary distractions.

## 5. Customer Website

Open:

```text
subhakamana-store-ecommerce.html#home
```

Show:

- Homepage.
- Product cards.
- Product details.
- Cart.
- Checkout.
- Payment options.
- Trust badges.
- Contact and privacy links.

Key message:

The website is the customer-facing side of the same store concept.

## 6. Backend Foundation

Open:

```text
production-readiness/README.md
```

Show:

- Architecture.
- Database schema.
- API contract.
- Security/RBAC plan.
- PostgreSQL validation plan.
- Local backend API runner.

Key message:

The release includes the first backend foundation, but full production conversion still requires hosted deployment and complete API persistence.

## 7. Closing Line

This release is ready for demonstration, academic submission, GitHub sharing, and developer handoff. The next phase is production conversion: hosted backend, live database, secure authentication, payment verification, delivery integration, cloud image storage, monitoring, and backup.
