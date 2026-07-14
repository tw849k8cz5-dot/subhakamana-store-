# Subhakamana Store Management System

## Hosting Requirements Report

**Project:** Subhakamana Store Management System  
**Business Type:** Nepali fashion and clothing store  
**Prepared For:** Project presentation, planning, and future production deployment  
**Report Date:** July 13, 2026  

---

## 1. Executive Summary

The current Subhakamana Store Management System is a strong local front-end prototype. It can run on a computer without a domain, hosting subscription, live backend, or production database. This is suitable for project demonstration, academic submission, and local walkthroughs.

For real business use, the system will need production hosting. The live system should host three main user areas:

- Customer Website
- Admin ERP
- Cashier POS

These user areas should connect to a secure backend API, PostgreSQL database, object storage for product images, payment gateway services, notification services, monitoring, and backup/recovery.

The recommended hosting direction is a managed cloud setup rather than a single shared hosting plan. Shared hosting is usually not enough for an ERP/POS system because the system needs backend services, database transactions, secure authentication, file storage, payment verification, and backups.

---

## 2. Current Local Prototype Hosting

The current version does not need paid hosting.

It can run locally using:

- Local HTML files
- Local launcher files
- Browser localStorage
- Local product images and documents

This is useful for:

- Classroom demonstration
- Store workflow demonstration
- Offline review
- Project presentation
- Testing the user interface before backend development

### Current Local Limitation

Local use is not the same as production hosting. Local browser storage does not support:

- Multiple staff using the same data at the same time
- Real customer accounts
- Real online payments
- Real stock synchronization
- Secure admin authentication
- Central backup and restore
- Live mobile app connection

---

## 3. Recommended Production Hosting Model

For a real live system, Subhakamana Store should use a cloud-based production architecture.

Recommended model:

`Customer Website + Admin ERP/POS -> Backend API -> PostgreSQL Database -> Object Storage -> Backups`

This allows the customer website, admin system, and cashier POS to read and update the same business data.

---

## 4. Hosting Components Needed

| Hosting Component | Purpose | Required For Production |
| --- | --- | --- |
| Domain Name | Public website address, such as a store domain | Yes |
| DNS Management | Connects the domain to hosting services | Yes |
| Frontend Hosting | Hosts the customer website and admin interface | Yes |
| Backend/API Hosting | Runs business logic, login, checkout, POS, inventory, and reports | Yes |
| PostgreSQL Database Hosting | Stores products, stock, orders, payments, suppliers, staff roles, and reports | Yes |
| Object Storage | Stores product images, upload files, QR images, and documents | Yes |
| SSL/HTTPS | Secures all traffic between users and the system | Yes |
| Email/SMS Service | Sends order, delivery, login, and notification messages | Recommended |
| Payment Gateway Integration | Verifies eSewa, Khalti, bank transfer, COD, and refunds | Required for real payments |
| Backup Storage | Protects database and file records | Yes |
| Monitoring and Logs | Tracks errors, uptime, API health, and security issues | Yes |

---

## 5. Hosting Type Comparison

| Hosting Type | Suitable For | Strengths | Weaknesses | Recommendation |
| --- | --- | --- | --- | --- |
| Local Computer | Demonstration and offline use | Free, easy, no domain needed | Not usable as a real shared business system | Keep for demo only |
| Shared Web Hosting | Simple static websites | Cheap and beginner-friendly | Weak backend/database support for ERP/POS | Not recommended for full system |
| VPS Hosting | Small production app with manual server setup | Flexible and affordable | Requires server maintenance and security knowledge | Good if a developer manages it |
| Managed Platform Hosting | Frontend, backend, database, and deployment services | Easier deployment, scaling, logs, HTTPS, backups | Monthly cost, platform limits | Recommended |
| Enterprise Cloud | High-scale business system | Strong scaling, security, monitoring, and availability | More complex and expensive | Future option after growth |

---

## 6. Recommended Hosting Setup

### Best Practical Setup

For Subhakamana Store, the best practical setup is:

- Frontend hosting for Customer Website and Admin ERP/POS
- Backend API hosting for business logic
- Managed PostgreSQL database
- Object storage for product images
- HTTPS and domain setup
- Daily database backups
- Monitoring and error logs

This provides a good balance between professionalism, reliability, and manageable cost.

### Example Platform Categories

The system can be hosted using services such as:

- Frontend hosting: Vercel, Netlify, Cloudflare Pages, or static hosting on a cloud provider
- Backend hosting: Render, Railway, Fly.io, DigitalOcean App Platform, AWS, Google Cloud, or Azure
- Database hosting: Supabase PostgreSQL, Neon PostgreSQL, Railway PostgreSQL, Render PostgreSQL, DigitalOcean Managed PostgreSQL, AWS RDS, or Google Cloud SQL
- Object storage: AWS S3, Cloudinary, Firebase Storage, Supabase Storage, or Google Cloud Storage
- Monitoring: platform logs, uptime checks, Sentry-style error tracking, and server health checks

The final provider can be chosen based on budget, developer comfort, Nepal payment availability, and required reliability.

---

## 7. Minimum Production Hosting Requirements

For the first live version, the minimum recommended setup is:

1. Domain name
2. HTTPS/SSL
3. Frontend hosting
4. Backend API hosting
5. Managed PostgreSQL database
6. Object/image storage
7. Daily database backup
8. Environment variables and secret management
9. Basic logging and uptime monitoring
10. Payment gateway verification setup

This minimum setup is enough to support a real first version of the online store, admin dashboard, and POS system.

---

## 8. Recommended Production Architecture

The production architecture should follow this structure:

```text
Internet
  |
Load Balancer / Hosting Router
  |
Customer Website        Admin ERP / Cashier POS
  |                      |
  +----------+-----------+
             |
       Authentication
             |
       REST API / GraphQL
             |
       Business Services
             |
  +----------+-----------+
  |                      |
PostgreSQL Database   Object Storage
Business Data         Product Images
  |
Backup & Recovery
```

Business services should include:

- Product Service
- Inventory Service
- Sales/POS Service
- Purchase Service
- Customer Service
- Supplier Service
- Finance/Expense Service
- Reporting & Analytics
- Notification Service
- File/Image Service

---

## 9. Security Hosting Requirements

Production hosting must include:

- HTTPS for all pages and APIs
- Secure login
- Password hashing
- Role-based access control
- Protected API endpoints
- Environment variables for secrets
- File upload validation
- Rate limiting for login and checkout
- Database backups
- Audit logs
- Admin activity tracking

The production system should not store passwords, payment secrets, or admin keys inside front-end files.

---

## 10. Backup and Recovery Requirements

Backups are necessary because the system will store important business data.

Recommended backup plan:

- Daily PostgreSQL database backup
- Weekly full backup
- Backup retention policy
- Product image storage backup
- Restore testing
- Export archive for important reports

The store should know how to restore the system if data is deleted, hosting fails, or a deployment goes wrong.

---

## 11. Hosting Readiness Checklist

Before going live, confirm:

- Domain is purchased and connected
- HTTPS is active
- Frontend is deployed
- Backend API is deployed
- PostgreSQL database is created
- Database migrations are completed
- Object storage bucket is created
- Environment variables are configured
- Admin login is secure
- Payment gateway credentials are configured
- Backup job is active
- Error logs and uptime monitoring are active
- Smoke test is completed after deployment

---

## 12. Final Recommendation

For the current project demonstration, no paid hosting is required. The local launcher and complete folder are enough.

For real business use, Subhakamana Store should not use only shared web hosting. The recommended solution is a managed cloud hosting setup with:

- Frontend hosting
- Backend API hosting
- Managed PostgreSQL database
- Object storage
- HTTPS
- Backups
- Monitoring
- Payment gateway verification

This will allow the Customer Website, Admin ERP, and Cashier POS to work together as one reliable system.

