# Subhakamana Store Playwright QA Guide

Use this guide to run browser-based QA outside the Codex sandbox.

## Run on Mac

From the project folder:

```bash
pnpm install
pnpm exec playwright install chromium
pnpm exec playwright test --project=chromium --reporter=html
pnpm exec playwright show-report
```

Or run the prepared command:

```bash
./RUN_PLAYWRIGHT_QA.command
```

## What the QA Covers

- ERP loads and demo login reaches the dashboard.
- Main ERP pages avoid document-level horizontal scroll.
- Customer website opens and includes the Privacy Policy link.
- Prototype start page links to Admin ERP, Physical POS, and Customer Website.

## GitHub Actions

The workflow is available at:

`.github/workflows/playwright-qa.yml`

It installs dependencies, installs Chromium, runs Playwright with the HTML reporter, and uploads the report as an artifact.

