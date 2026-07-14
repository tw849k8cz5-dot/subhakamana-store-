# Subhakamana Store ERP Local Use Guide

This guide explains how to run the Subhakamana Store ERP + E-Commerce prototype locally without a domain, hosting, or internet server.

## What You Need

- A computer with a web browser.
- Python 3 installed. Most macOS computers already include it or can install it easily.
- The files inside this outputs folder.

## Best Way To Run Everything

1. Open the outputs folder.
2. Double-click **open-subhakamana-store-system.command**.
3. A terminal window will open and start one local server.
4. Your browser should open this address:

   `http://localhost:8088/open-subhakamana-store-system.html`

5. From that home page, open the main system, overview, manuals, reports, and resources.

## How To Run Only The Main Store System

1. Open the outputs folder.
2. Double-click **run-subhakamana-local.command**.
3. A terminal window will open and start the local system.
4. Your browser should open this address:

   `http://localhost:8088/subhakamana-store-final-erp-platform.html`

5. Keep the terminal window open while using the system.
6. To stop the system, close the terminal window or press `Control + C`.

## What Localhost Means

`localhost` means the software is running only on your own computer. It does not require a domain name and it is not publicly hosted online.

## Files Included

- **subhakamana-store-final-erp-platform.html**: Main ERP + e-commerce prototype.
- **open-subhakamana-store-system.html**: Main home page that links everything together.
- **open-subhakamana-store-system.command**: Best one-click launcher for the whole local package.
- **subhakamana-store-ecommerce.html**: Customer shopping website with products, cart, checkout, and confirmation.
- **run-subhakamana-local.command**: One-click local launcher for macOS.
- **subhakamana-store-erp-user-manual.md**: User manual.
- **subhakamana-store-final-erp-ecommerce-report.pdf**: Final project report.

## If The Browser Does Not Open Automatically

Copy and paste this address into your browser:

`http://localhost:8088/open-subhakamana-store-system.html`

## If Port 8088 Is Busy

Open the command file in a text editor and change:

`PORT="${PORT:-8088}"`

to another number, for example:

`PORT="${PORT:-8090}"`

Then run the command file again.

## Important Note

This local version is a prototype. It works in the browser and demonstrates the ERP, POS, inventory, delivery, reporting, and e-commerce workflows. For real business production use with multiple staff, permanent data storage, login security, and online customer access, the system should be built with a backend server and database.

## QR Contact Links

The customer website has QR cards for Google Maps, Instagram, and TikTok.

To replace the placeholder links, open **subhakamana-store-ecommerce.html** and search for:

- `PASTE_GOOGLE_MAPS_LOCATION_LINK_HERE`
- `PASTE_INSTAGRAM_PROFILE_LINK_HERE`
- `PASTE_TIKTOK_PROFILE_LINK_HERE`

Paste the real links inside the `contactLinks` section.
