#!/bin/zsh
set -euo pipefail

ROOT_DIR="$(dirname "$0")"
if [ -d "$ROOT_DIR/production-readiness/module-02-api-foundation" ]; then
  cd "$ROOT_DIR/production-readiness/module-02-api-foundation"
elif [ -d "$ROOT_DIR/outputs/production-readiness/module-02-api-foundation" ]; then
  cd "$ROOT_DIR/outputs/production-readiness/module-02-api-foundation"
else
  echo "Could not find production-readiness/module-02-api-foundation."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing Module 2 dependencies..."
  pnpm install --frozen-lockfile
fi

echo "Running backend tests that do not require local HTTP listeners or PostgreSQL..."
node --test \
  test/auth-rbac-foundation.test.js \
  test/auth-session.test.js \
  test/catalog-service.test.js \
  test/foundation.test.js \
  test/prisma-repositories.test.js
