# Subhakamana Store Management System

## Complete Project Summary Report

**Project Title:** Subhakamana Store Management System  
**Project Type:** Front-End Prototype for an Online Clothing Store and Admin/ERP System  
**Business Domain:** Nepali Fashion and Clothing Retail  
**Prepared For:** Subhakamana Store  
**Prepared Date:** July 9, 2026  

---

## Executive Summary

The Subhakamana Store Management System is a front-end prototype designed for a Nepali fashion and clothing store. The project demonstrates how a clothing business can manage both customer-facing online shopping and internal store operations from a connected digital system.

The prototype includes a customer e-commerce website, an admin/ERP store management interface, a simple overview page, local launch files, user manuals, project reports, UML use case diagram files, and a complete marked folder for demonstration. The current version is suitable for project presentation, academic submission, client demonstration, and future development planning.

The system presents a strong foundation for a complete retail management platform. It includes shopping features such as product browsing, product details, cart, checkout, order confirmation, contact QR codes, and trust sections. It also includes admin-side features such as dashboard, inventory, products, POS, orders, delivery, purchases, customers, reports, settings, dark mode, and user guidance.

At this stage, the project is a front-end prototype. Backend functions such as real user login, database storage, payment gateway verification, live inventory synchronization, real notifications, and secured admin authentication are identified as future enhancements.

---

## 1. Project Introduction

Subhakamana Store Management System is developed as a digital prototype for Subhakamana Store, a Nepali fashion and clothing store that sells items such as Kurtas, Sarees, Dupattas, and festival wear.

The project focuses on two major areas:

- A customer-facing online storefront where customers can view products, add items to cart, place orders, and access store contact information.
- An admin/ERP interface where store staff can manage products, inventory, orders, purchases, delivery, customers, reports, and store operations.

The purpose of the prototype is to show how the store can move toward a more organized digital workflow while keeping the user interface simple, clean, and understandable for both technical and non-technical users.

---

## 2. Project Objectives

The main objectives of the project are:

- To create a professional front-end prototype for Subhakamana Store.
- To provide a customer-friendly e-commerce website for browsing and ordering products.
- To provide an admin/ERP interface for managing store operations.
- To improve product presentation, cart flow, checkout flow, and order confirmation.
- To organize all project files into one clear local package.
- To provide documentation, reports, diagrams, and user guidance for presentation and future development.
- To clearly separate the current front-end prototype from future backend requirements.

---

## 3. System Overview

The current system is organized into several connected parts:

### Customer E-Commerce Website

The customer website allows users to browse Subhakamana Store products, search and filter items, view product details, add items to cart, proceed to checkout, and receive order confirmation.

### Admin/ERP Store Management System

The admin/ERP side provides a dashboard and store management tools for inventory, products, POS, orders, delivery, suppliers, purchases, customers, reports, settings, and manual guidance.

### Simple Overview Page

The simple overview explains the system in plain language. It is intended for users who want to understand the project without technical details.

### Local Launch System

Local launch files allow the project to run without a domain or web hosting. The best launcher opens a single home page that links to the full project.

### Documentation and Reports

The project includes user manuals, project reports, local-use guides, UML diagram files, and layman-friendly explanations.

---

## 4. Customer E-Commerce Website Features

**Main File:** `subhakamana-store-ecommerce.html`

The customer-facing website was improved to look and feel like a real online fashion store. It uses a warm, elegant visual style suitable for a Nepali clothing business.

### Homepage

The homepage includes:

- A polished hero section.
- A strong brand message: **Tradition You Can Wear. Quality You Can Trust.**
- Clear call-to-action buttons.
- Featured product section.
- Trust-building information for customers.

### Product Listing

The product listing page includes:

- Product search by name.
- Category filtering.
- Price sorting from low to high and high to low.
- Latest/new arrivals sorting.
- Responsive product grid.

### Product Cards

Each product card clearly displays:

- Product visual.
- Product name.
- Category.
- Price.
- Product badge such as New, Best Seller, or In Stock.
- Wishlist heart icon.
- Add to Cart button.
- View Details button.

### Product Detail Page

The product detail page includes:

- Large product visual.
- Product name.
- Price.
- Product description.
- Size selection.
- Quantity selector.
- Fabric/material details.
- Delivery information.
- Return/exchange policy.
- Add to Cart button.
- Buy Now button.
- Related products.

### Cart and Checkout

The cart page includes:

- Product image.
- Product name.
- Size.
- Price.
- Quantity controls.
- Remove button.
- Subtotal.
- Delivery charge.
- Final total.

The checkout page includes:

- Customer name.
- Phone number.
- Delivery address.
- Payment method.
- Order summary.
- Place Order button.

Payment options shown in the prototype are:

- Cash on Delivery.
- eSewa.
- Khalti.
- Bank Transfer.

### Order Confirmation

After checkout, the system displays an order confirmation message. This gives the customer clear feedback that the order has been placed.

### Track Order Section

The storefront includes a track order section with the improved message:

**Use your order number and tracking number to check packing, dispatch, transit, and delivery status.**

### Contact and QR Code Section

A **Scan to Find Us Online** section was added with three QR cards:

- Store Location.
- Instagram.
- TikTok.

The placeholder links are easy to replace in the code:

- `PASTE_GOOGLE_MAPS_LOCATION_LINK_HERE`
- `PASTE_INSTAGRAM_PROFILE_LINK_HERE`
- `PASTE_TIKTOK_PROFILE_LINK_HERE`

The QR codes are generated using `api.qrserver.com`. This requires internet access when displaying the QR images. For production or offline use, these QR codes can later be replaced with saved local image files.

### Text and Language Improvements

The storefront text was reviewed and standardized:

- **Kurta** is used consistently.
- **Saree** is used consistently.
- **Add to Cart** is used consistently.
- **View Details** is used instead of vague labels.
- Wishlist action uses a heart icon.
- Product prices use clear NPR formatting.
- Payment names are written cleanly.

---

## 5. Admin/ERP System Features

**Main File:** `subhakamana-store-final-erp-platform.html`

The admin/ERP system was preserved and improved without removing existing functionality.

### Main Admin Features

The admin/ERP prototype includes:

- Dashboard.
- Inventory management.
- Product management.
- POS billing.
- Orders.
- Delivery/shipping.
- Suppliers.
- Purchases.
- Customers.
- Reports.
- E-commerce/storefront preview.
- Settings.
- Dark mode.
- CSV export.
- Built-in user manual page.

### Dashboard Improvements

The dashboard includes access paths for both:

- Staff/admin store operations.
- Customer-facing storefront.

A link was added so the admin dashboard can open the customer website directly.

### Product and Inventory Improvements

Product wording was standardized across the admin side:

- Kurta.
- Saree.
- Add to Cart.

The product, inventory, and storefront preview sections continue to work as part of the prototype.

### Admin Features Preserved

The following admin/ERP features were kept intact:

- Product creation.
- Inventory dashboard.
- Purchases section.
- Delivery section.
- Barcode/label preview.
- Reports.
- Dark mode.
- Navigation.
- Existing sample data.

---

## 6. Documentation and Manuals

Several documentation files were created to make the project easier to understand and present.

### User Manual

**File:** `subhakamana-store-erp-user-manual.md`

This manual explains how staff can use the system for daily work such as dashboard review, product management, inventory, POS, orders, delivery, and reports.

### Local Use Guide

**File:** `subhakamana-local-use-guide.md`

This guide explains how to run the system locally without a domain or hosting.

### Simple Blueprint

**File:** `subhakamana-store-simple-blueprint.md`

This document explains the overall store management concept in simple language.

### Complete Work Summary

**File:** `subhakamana-complete-work-summary-report.md`

This document summarizes the project work completed so far.

---

## 7. UML Use Case Diagram Summary

Two UML use case diagram files were created:

- `subhakamana-use-case-diagram.svg`
- `subhakamana-use-case-diagram.mmd`

The diagram represents the main users and actions in the Subhakamana Store Management System.

### Actors

The diagram includes two primary actors:

- Admin.
- Customer.

### Admin Use Cases

Admin use cases include:

- Admin Login.
- Manage Products.
- Manage Categories.
- Manage Inventory Dashboard.
- Manage Orders.
- View Customer Details.
- Link Website with Inventory Dashboard.
- Send Order Notifications.
- View Reports.

### Customer Use Cases

Customer use cases include:

- Register/Login.
- Browse Products.
- Search Products.
- Add Items to Cart.
- Place Order.
- Track Order.
- Receive Order Notifications.

### Use Case Relationships

The diagram includes the following relationships:

- Place Order includes Receive Order Notifications.
- Manage Orders includes Send Order Notifications.
- All admin functions require Admin Login.

### Layman Use Case Report

**File:** `subhakamana-use-case-layman-report.md`

This report explains the UML use case diagram in simple language so that non-technical readers can understand it.

---

## 8. Local Launch and Complete Package

A marked project folder was created:

**OPEN_ME_SUBHAKAMANA_STORE_COMPLETE_SYSTEM**

This folder contains the complete project package.

The recommended file to open first is:

**OPEN_THIS_FIRST.command**

This starts a local server and opens the main entry page.

The entry page links to:

- Customer shopping website.
- Main ERP/admin system.
- Simple overview.
- Manuals.
- Reports.
- Resources.
- Launch files.

This makes the project easier to demonstrate and use without searching through many separate files.

---

## 9. Testing and Validation

Validation checks were performed during development.

### Files Checked

The main checked files include:

- `subhakamana-store-ecommerce.html`
- `subhakamana-store-final-erp-platform.html`
- `open-subhakamana-store-system.html`
- `subhakamana-store-simple-overview.html`

### Checks Completed

The following checks were performed:

- JavaScript syntax validation.
- Link validation for key entry files.
- Storefront link checks.
- ERP/admin link checks.
- Product wording consistency checks.
- Checks for inconsistent terms such as Kurtha or mixed Sari/Saree usage.
- Add to Cart and View Details wording checks.
- QR placeholder confirmation.
- Packaged folder entry link validation.

The prototype files passed the performed validation checks.

---

## 10. Current Limitations

The current project is a strong front-end prototype. However, it does not yet include a production backend.

The following features are currently simulated or front-end only:

- Customer account registration and real login.
- Admin authentication and role security.
- Permanent product database.
- Permanent cart and order storage.
- Live inventory synchronization.
- Payment gateway verification.
- Real order tracking.
- Real SMS, email, WhatsApp, or app notifications.
- Real delivery/courier integration.
- Server-side reporting.
- Secure backup system.

These limitations are expected for a front-end prototype and can be addressed in future development phases.

---

## 11. Future Enhancements

Future development should focus on converting the prototype into a production-ready system.

Recommended enhancements include:

- Backend development for user accounts, orders, products, and inventory.
- Database integration for permanent storage.
- Secure admin login and role-based permissions.
- Real eSewa and Khalti payment gateway integration.
- Bank transfer verification workflow.
- Live stock synchronization between website and admin dashboard.
- Order tracking with real delivery updates.
- Notification system through SMS, email, WhatsApp, or app notifications.
- Product image upload and media management.
- Reports generated from real sales and inventory data.
- Backup and data recovery system.
- Deployment to a secure hosting environment.

---

## 12. How to Run and Demonstrate the Project

### Recommended Method

Open the folder:

**OPEN_ME_SUBHAKAMANA_STORE_COMPLETE_SYSTEM**

Then double-click:

**OPEN_THIS_FIRST.command**

This opens the main home page for the project.

### Demonstration Flow

For a complete demonstration, follow this order:

1. Open the main home page.
2. Open the customer website.
3. Browse products.
4. Search and filter products.
5. Open a product detail page.
6. Add a product to the cart.
7. Update cart quantity.
8. Proceed to checkout.
9. Place an order.
10. View order confirmation.
11. Open the admin/ERP system.
12. Review dashboard, inventory, products, orders, delivery, reports, and manual.
13. Open the UML use case diagram and layman report if needed for presentation.

---

## Final Conclusion

The Subhakamana Store Management System has been developed into a complete and presentation-ready front-end prototype. It now demonstrates both the customer shopping experience and the admin/ERP store management workflow.

The project includes a polished e-commerce website, an organized admin system, a simple overview page, local launch support, manuals, reports, UML diagram files, and a complete marked folder for demonstration.

The current version is suitable for academic presentation, project review, and client demonstration. It clearly shows the intended structure and functionality of the system while also identifying backend features required for future production use.

Overall, the project provides a strong foundation for building a full digital store management system for Subhakamana Store.

