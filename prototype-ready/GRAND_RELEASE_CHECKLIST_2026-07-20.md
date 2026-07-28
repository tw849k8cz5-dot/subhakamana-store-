# Grand Release Checklist

Release date: 2026-07-20

## 1. Package Readiness

- [x] Main release folder is marked: `SUBHAKAMANA_STORE_PROTOTYPE_READY_2026-07-17`.
- [x] Main entry file exists: `START_HERE.html`.
- [x] Local launcher exists: `OPEN_PROTOTYPE.command`.
- [x] Admin ERP exists.
- [x] Cashier POS exists.
- [x] Customer Website exists.
- [x] Simple overview exists.
- [x] User manuals are included.
- [x] Reports are included.
- [x] UML/use-case files are included.
- [x] Production-readiness documents are included.

## 2. Demo Flow Readiness

- [x] Start page links to Admin ERP.
- [x] Start page links to Cashier POS.
- [x] Start page links to Customer Website.
- [x] Start page links to reports.
- [x] Start page links to production-readiness documentation.
- [x] Demo mode remains available for local presentation.
- [x] API mode is clearly described for backend-backed workflows.

## 3. Operator Workflow Readiness

- [x] New physical sale flow is represented in POS.
- [x] Product search and barcode-style lookup are represented.
- [x] Product and inventory workflows are represented.
- [x] Receive stock workflow is represented.
- [x] Return-by-bill workflow is represented.
- [x] Delivery/order tracking workflow is represented.
- [x] Reports and dashboard attention areas are represented.

## 4. Backend Foundation Readiness

- [x] PostgreSQL/Prisma schema foundation included.
- [x] Hardened seed process included.
- [x] Auth/session/RBAC foundation included.
- [x] Product API repository foundation included.
- [x] Inventory API repository foundation included.
- [x] Local backend API launcher included.
- [x] GitHub Actions workflow files included.

## 5. Validation Readiness

- [x] Static validation runner included.
- [x] Playwright QA runner included.
- [x] Backend offline test runner included.
- [x] PostgreSQL validation runner included.
- [x] Local validation status report included.

## 6. GitHub Release Readiness

- [x] GitHub-ready README included.
- [x] GitHub handoff report included.
- [x] Export/update command prepared.
- [x] Workflows can be triggered after pushing through local GitHub CLI.

## 7. Must Not Be Claimed Yet

- [ ] Live production hosting complete.
- [ ] Real payment gateway settlement complete.
- [ ] Real courier production account live.
- [ ] Full server-side persistence for every POS/order/payment/return workflow complete.
- [ ] Security audit complete.
- [ ] Backup/restore drill complete.
- [ ] Production monitoring complete.

## Release Decision

The project is ready for a grand prototype release and developer handoff. It should be presented as a polished prototype plus backend foundation, not as a live production deployment.
