# Subhakamana Store Management System

## ERP UX Declutter and Preservation Change Report

**Date:** 12 July 2026  
**System:** Subhakamana Store Management System  
**Scope:** Existing ERP/admin platform user experience cleanup  

---

## 1. Current-State Problems Identified

The ERP platform already contained many working business modules, including dashboard, inventory, products, POS, orders, delivery, payments, suppliers, purchases, customers, reports, stock entry, business controls, storefront preview, manual, and settings.

The main issue was not missing capability. The issue was too many decisions visible at the same time:

- Too many first-level sidebar links.
- Too many dashboard shortcuts and technical sections.
- Product creation showed too many fields at once.
- Stock entry showed quick and detailed workflows side by side.
- Payment Center showed filters immediately instead of essentials first.
- Inventory showed too many operational columns by default.
- Header controls competed for attention.

---

## 2. Files Inspected

- `subhakamana-store-final-erp-platform.html`
- `subhakamana-store-ecommerce.html`
- `open-subhakamana-store-system.html`
- Existing report and QA files in the `outputs` folder
- Existing complete demo folder

---

## 3. Files Changed

- `subhakamana-store-final-erp-platform.html`
- `open-subhakamana-store-system.html`

---

## 4. Files Created

- `subhakamana-erp-ux-declutter-change-report.md`

Backups were also created before the UX changes:

- `outputs/backups/subhakamana-store-final-erp-platform-before-ux-declutter.html`
- `outputs/backups/open-subhakamana-store-system-before-ux-declutter.html`

---

## 5. Navigation Changes

The sidebar was reorganized from many first-level links into grouped navigation:

- Dashboard
- Sales
- Stock
- Orders
- People
- Reports
- More

Existing routes were preserved. Pages such as `#inventory`, `#products`, `#pos`, `#orders`, `#delivery`, `#payments`, `#stockentry`, `#reports`, `#manual`, and `#settings` still exist.

---

## 6. Dashboard Changes

The dashboard was simplified to answer three daily questions:

1. What happened today?
2. What needs attention?
3. What should I do next?

The dashboard now shows:

- Four main KPIs
- Needs Attention
- Three role-aware quick actions
- Recent Activity
- Advanced dashboard details collapsed below

Technical architecture and long workflow information were moved away from the main daily view.

---

## 7. Header Changes

The header was reduced to:

- Page title
- Search
- Notifications button
- User menu

Role switching, dark mode, export, system home, settings, and logout were moved into the user menu.

---

## 8. Product Form Changes

Product creation was converted into a progressive step workflow:

1. Basic Information
2. Variants & Stock
3. Images
4. Review & Publish

All existing product fields and submit logic were preserved. Demo images are now collapsed behind “Browse Demo Product Images.”

---

## 9. Stock Entry Changes

Stock Entry now uses tabs:

- Quick Entry
- Detailed Receiving

Quick Entry is the default view. Detailed Receiving remains available when needed.

---

## 10. Inventory Table Changes

The default inventory table now shows essential columns:

- Product
- SKU
- Stock
- Available
- Status
- Action

Advanced inventory fields such as reserved, committed, damaged, returned, in transit, reorder level, cost, price, barcode, and movement-related context are preserved in a side drawer.

---

## 11. Payment Center Changes

Payment Center now starts with business totals first:

- Today’s total
- Bank QR
- eSewa/Khalti
- Pending/failed

Advanced filters are collapsed behind a Filters section.

---

## 12. Role-Based Visibility Changes

Existing role logic was preserved and made more useful visually:

- Super Admin can access all modules.
- Admin can access business operations.
- Inventory Staff sees stock/product/purchase-related modules.
- Sales & Delivery sees sales, orders, payments, delivery, customers, and controls.

Navigation links now hide when the selected role should not see them in the prototype.

---

## 13. Documentation Moved

Technical and production information is no longer emphasized on the daily dashboard. It remains available through:

- More
- User Manual
- Settings
- Production Readiness links

---

## 14. Existing Features Preserved

The following major features remain available:

- Dashboard
- POS
- Inventory
- Product creation
- Product images
- Barcode/SKU handling
- Orders
- Delivery
- Payment Center
- Suppliers
- Purchases
- Customers
- Reports
- Returns/refunds
- Stocktake
- Cashier shifts
- Stock entry
- E-commerce preview
- User manual
- Settings
- CSV export
- localStorage persistence

---

## 15. Data Compatibility Status

The localStorage keys were preserved:

- `subhakamanaStoreErpLocalDbV1`
- `subhakamanaStoreErpSessionV1`

The existing data schema version was preserved. No product, order, payment, inventory, shipment, customer, supplier, return, stocktake, shift, or audit data structure was removed.

---

## 16. Tests Performed

The first regression checks confirmed:

- JavaScript syntax passed.
- HTML IDs are unique.
- Direct JavaScript DOM ID references exist.

Additional QA was performed after syncing the complete folder.

---

## 17. Known Limitations

This remains a front-end prototype. Production use still requires:

- Backend API
- Database
- Secure login
- Server-side role permissions
- Payment gateway webhooks
- Real inventory synchronization
- Real audit logging
- Cloud image storage

---

## 18. Recommended Next Step

The next improvement should be a manual click-through with the store owner or staff member using real daily tasks:

1. Open POS and complete a sale.
2. Add a new product through the step form.
3. Receive stock through Stock Entry.
4. Review a payment in Payment Center.
5. Open inventory details through the side drawer.

This will confirm whether the new information architecture feels easier for actual daily use.
