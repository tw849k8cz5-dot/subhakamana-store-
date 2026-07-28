# Local Validation Status - 2026-07-17

## Scope

This note records the local validation completed inside the Codex workspace for the Subhakamana Store Management System prototype package.

## Completed Locally

- Verified bundled Node.js runtime: `v24.14.0`.
- Ran static validation for backend source files and inline scripts in:
  - Admin ERP
  - Customer Website
  - Physical POS
- Ran local backend unit/service tests that do not require PostgreSQL or a local HTTP listener.
- Confirmed the core next-step workflows are covered at service level:
  - ERP Product List reads products from backend service.
  - Add Product creates a backend product.
  - Inventory View reads stock rows.
  - Receive Stock updates inventory and records a movement.
- Confirmed auth/session/RBAC local tests pass using an offline-safe password hashing fallback when `bcryptjs` is not installed locally.

## Local Test Result

Backend non-listener local test subset:

```text
tests: 18
pass: 18
fail: 0
```

Static validation:

```text
Admin ERP inline script: OK
Customer Website inline script: OK
Physical POS inline script: OK
Backend source files: OK
Database seed/verification scripts: OK
```

## Local Environment Limits

The current Codex sandbox could not complete these items locally:

- PostgreSQL runtime validation, because Docker/psql are not available inside this sandbox.
- Dependency installation from npm registry, because network access is restricted.
- HTTP route tests that bind to `127.0.0.1`, because the sandbox blocks local listener creation.

These checks remain appropriate for GitHub Actions or the user's Mac terminal environment.

## Local Backend API Runner

Added:

```text
RUN_BACKEND_API_LOCAL.command
```

This starts the backend API after `DATABASE_URL` is configured and dependencies are available.

ERP API mode should use:

```text
http://localhost:4000/api/v1
```

## Current Local Conclusion

The prototype package is locally validated as far as this sandbox permits. The next production-grade validation remains PostgreSQL-backed GitHub Actions or a Mac terminal run with Docker/PostgreSQL and npm dependency access.
