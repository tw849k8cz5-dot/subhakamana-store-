# Grand Release Handoff

## Project

Subhakamana Store Management System

## Repository

```text
https://github.com/tw849k8cz5-dot/subhakamana-store-
```

## Release Branch

```text
prototype-ready-package-2026-07-17
```

## Local Package

```text
outputs/SUBHAKAMANA_STORE_PROTOTYPE_READY_2026-07-17/
```

## Primary Entry

```text
START_HERE.html
```

## Local Launch

```text
OPEN_PROTOTYPE.command
```

## Push Latest Local Release To GitHub

Run from the Codex workspace:

```bash
./outputs/UPDATE_GITHUB_WITH_LATEST_PROTOTYPE_CHANGES.command
```

## QA Commands

Static validation:

```bash
./RUN_STATIC_VALIDATION.command
```

Browser QA:

```bash
./RUN_PLAYWRIGHT_QA.command
```

Backend offline tests:

```bash
./RUN_BACKEND_OFFLINE_TESTS.command
```

PostgreSQL validation:

```bash
DATABASE_URL="postgresql://..." TEST_DATABASE_URL="postgresql://..." SEED_ADMIN_PASSWORD="..." ./RUN_POSTGRESQL_VALIDATION_LOCAL.command
```

Local backend API:

```bash
DATABASE_URL="postgresql://..." ./RUN_BACKEND_API_LOCAL.command
```

## GitHub Secrets Required For PostgreSQL CI

```text
CI_POSTGRES_PASSWORD
CI_SEED_ADMIN_PASSWORD
CI_SESSION_SECRET
```

## Suggested Release Tag

```text
prototype-grand-release-2026-07-20
```

## Suggested Commit Message

```text
Prepare grand prototype release package
```

## Handoff Summary

The project is ready to be shared as a polished prototype package with backend foundation and clear production-conversion documentation. Developers should continue from the production-readiness modules and avoid treating browser localStorage workflows as final production persistence.
