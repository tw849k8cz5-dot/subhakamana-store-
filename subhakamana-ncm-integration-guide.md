# Subhakamana Store - Nepal Can Move Integration Guide

## Purpose

This document explains the Nepal Can Move (NCM) integration design added to the Subhakamana Store Management System prototype.

The current project is a local front-end prototype. It now includes a self-configuring NCM settings panel and demo shipment workflow. For real business use, the token, API calls, webhooks, encryption, background jobs, and database tables must run on a secure backend.

## What the Store Owner Sees

The administrator only needs:

1. NCM API Token
2. Environment: Demo or Production
3. Test Connection
4. Save NCM Settings

The system then shows:

- Connection status
- Masked token
- Detected base URL placeholder
- Account/vendor information placeholder
- Last API error
- Last successful sync
- NCM integration logs

## Local Prototype Behavior

In this local HTML prototype:

- The token is masked in the interface.
- The provided token is treated as a private credential and is not written into the public HTML file.
- Connection testing is simulated.
- NCM pickup creation is simulated when Nepal Can Move is selected as the courier.
- Shipments receive local NCM request IDs.
- Orders show tracking number and courier.
- Delivery table shows NCM pickup status.
- Dashboard shows NCM shipment counts, pending pickups, API health, and last sync.
- Logs are saved in browser localStorage.

## Production Requirements

For a live business system, the following must be built on the backend:

- Store the NCM token encrypted on the server.
- Load the token from a private backend secret such as `NCM_API_TOKEN`.
- Never send the token to the browser.
- Read official NCM API documentation and configure endpoints accordingly.
- Validate the API token against NCM.
- Create real pickup requests through NCM.
- Store NCM shipment IDs and tracking numbers.
- Sync shipment tracking status.
- Receive webhook updates at `/api/webhooks/ncm`.
- Verify webhook authenticity.
- Ignore duplicate webhook events.
- Update order status and delivery timeline.
- Trigger customer SMS/email/WhatsApp notifications if supported.
- Log all API requests, responses, failures, and retries.

## Suggested Backend Tables

- `integration_settings`
- `shipments`
- `shipment_events`
- `ncm_api_logs`
- `ncm_webhook_logs`
- `notification_logs`

Each table should include:

- ID
- created_at
- updated_at
- deleted_at for soft delete where needed
- created_by / updated_by where appropriate
- order_id foreign key where appropriate

## Suggested Services

- NcmApiClient
- NcmIntegrationService
- ShipmentService
- ShipmentRepository
- NcmWebhookController
- NcmWebhookVerifier
- NcmTrackingSyncJob
- NotificationService
- ApiLogRepository

## Status Mapping

Suggested NCM-to-store status mapping:

| NCM Event | Store Order Status | Shipment Status |
| --- | --- | --- |
| Pickup Requested | Dispatched | Pickup Requested |
| Picked Up | Dispatched | Picked Up |
| In Transit | In Transit | In Transit |
| Out for Delivery | In Transit | Out for Delivery |
| Delivered | Delivered | Delivered |
| Delivery Failed | Review | Delivery Failed |
| Returned | Returned | Returned |

## Security Notes

The current local prototype is not a secure place for a real production token. A production version must use:

- backend environment variables or encrypted secrets
- HTTPS
- server-side authentication
- role permissions
- audit logs
- token rotation
- restricted webhook validation

## Final Production Goal

After production backend integration, the store owner should only paste the NCM token, choose Demo or Production, test the connection, and save. The system should then automatically handle pickup creation, tracking, webhook updates, order status, logs, retries, and customer notifications.
