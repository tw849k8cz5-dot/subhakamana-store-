#!/bin/zsh
set -euo pipefail

ROOT_DIR="$(dirname "$0")"
if [ -d "$ROOT_DIR/production-readiness/module-01-database" ]; then
  DB_DIR="$ROOT_DIR/production-readiness/module-01-database"
  API_DIR="$ROOT_DIR/production-readiness/module-02-api-foundation"
elif [ -d "$ROOT_DIR/outputs/production-readiness/module-01-database" ]; then
  DB_DIR="$ROOT_DIR/outputs/production-readiness/module-01-database"
  API_DIR="$ROOT_DIR/outputs/production-readiness/module-02-api-foundation"
else
  echo "Could not find production-readiness modules."
  exit 1
fi

if [ -z "${DATABASE_URL:-}" ] || [ -z "${TEST_DATABASE_URL:-}" ]; then
  echo "Set DATABASE_URL and TEST_DATABASE_URL before running this script."
  echo "Use non-production PostgreSQL databases only."
  exit 1
fi

if [ -z "${SEED_ADMIN_PASSWORD:-}" ] && [ -z "${SEED_ADMIN_PASSWORD_HASH:-}" ]; then
  echo "Set SEED_ADMIN_PASSWORD or SEED_ADMIN_PASSWORD_HASH before seeding."
  exit 1
fi

echo "Installing Module 1 dependencies..."
cd "$DB_DIR"
pnpm install --frozen-lockfile

echo "Generating Prisma Client..."
pnpm db:generate

echo "Applying migrations to development database..."
pnpm db:deploy

echo "Applying migrations to test database..."
DATABASE_URL="$TEST_DATABASE_URL" pnpm db:deploy

echo "Running hardened seed on development database..."
pnpm db:seed

echo "Installing Module 2 dependencies..."
cd "$API_DIR"
pnpm install --frozen-lockfile

echo "Generating Prisma Client for Module 2 runtime..."
../module-01-database/node_modules/.bin/prisma generate --schema ../module-01-database/prisma/schema.prisma

echo "Running gated PostgreSQL integration test..."
node --test test/postgres-integration.test.js

echo "Running all Module 2 tests..."
pnpm verify

