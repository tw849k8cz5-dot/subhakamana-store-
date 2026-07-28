# Subhakamana Store Physical POS Guide

## Purpose

The Physical Store POS is a separate counter billing screen for Subhakamana Store. It is designed for fast in-store sales with fewer distractions than the full Admin ERP.

Main file:

`subhakamana-store-physical-pos.html`

## Who Should Use It

- Cashier
- Sales staff
- Store counter staff

## Main Features

- Fast barcode, SKU, or product-name search
- USB barcode scanner support through the search field
- Quick product buttons
- Cart quantity increase/decrease
- Manual selling price entry for bargaining
- Whole-bill checkout adjustment for final counter negotiation
- Walk-in customer default
- Member / Friends & Family phone discount area
- Add or update members by phone number
- Saved member list with quick **Use** button
- Payment methods:
  - Cash
  - Bank QR Payment
  - eSewa
  - Khalti
  - Bank Transfer
- Bill number generation
- Receipt preview
- Print receipt button
- Physical store sales list
- Daily sales and bill count
- Stock reduction in the local prototype database
- Member order count and spend update after sale
- Bargain discount tracking in the saved sale record
- Checkout adjustment reason saved with the bill

## How It Connects to the ERP Prototype

The Physical POS uses the same browser localStorage database key as the Admin ERP prototype:

`subhakamanaStoreErpLocalDbV1`

This means sales completed in the Physical POS can appear in the ERP orders, payments, stock movement, and reports when opened in the same browser.

This is still local prototype behavior. In production, the POS and ERP should connect to the same backend API and PostgreSQL database.

## How To Use

1. Open `open-subhakamana-store-system.html`.
2. Click **Open Physical Store POS**.
3. Scan a barcode or type a SKU/product name.
4. Press Enter or click **Add Item**.
5. Adjust quantity if needed.
6. If the customer bargains, enter the final agreed selling price in the cart item.
7. Use checkout adjustment if the whole bill needs a final adjustment.
8. Enter member phone number if a member discount applies.
9. Select payment method.
10. Click **Complete Physical Store Sale**.
11. Print or close the receipt.

## Manual Selling Price For Bargaining

Some customers may not understand percentage discounts. In that case, staff can simply type the final agreed selling price for the product.

Example:

- Listed price: NPR 2,400
- Customer bargain price: NPR 2,200
- Staff enters: `2200`

The POS will keep the listed price, final agreed price, and bargain difference in the bill record. This makes the counter workflow easier while still keeping the sale traceable for reports and audit.

## Checkout Adjustment

Use checkout adjustment when the cashier needs to adjust the whole bill instead of one product line.

Examples:

- Customer asks to round the final bill down by NPR 50: enter `50`
- Owner approves a whole-bill discount of NPR 200: enter `200`
- Extra charge needs to be added: enter a negative number, such as `-100`

Always add a short reason, such as:

- Bargain
- Rounding
- Owner approved
- Extra packing charge

The POS saves this adjustment separately from item bargaining and member discount.

## How To Add A New Member

1. Open the **Members** section in the Physical Store POS.
2. Enter the customer phone number.
3. Enter the member name.
4. Select the member type:
   - Member - 5%
   - Friends & Family - 10%
   - Staff - 15%
5. Add city or notes if useful.
6. Click **Add / Update Member**.
7. Click **Use** beside a saved member to load that member into the current bill.

When a saved member phone number is entered during checkout, the POS can load the member name and discount type automatically.

## Production Note

For real store use, this POS should later connect to:

- Secure cashier login
- Backend API
- PostgreSQL database
- Server-side stock validation
- Payment verification
- Receipt printer setup
- Cash drawer support
- Barcode scanner hardware
- Daily cashier shift closing
- Backup and audit logs
