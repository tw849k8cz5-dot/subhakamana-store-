#!/bin/zsh
set -euo pipefail

ROOT_DIR="$(dirname "$0")"
if [ -d "$ROOT_DIR/production-readiness/module-02-api-foundation" ]; then
  API_DIR="$ROOT_DIR/production-readiness/module-02-api-foundation"
elif [ -d "$ROOT_DIR/outputs/production-readiness/module-02-api-foundation" ]; then
  API_DIR="$ROOT_DIR/outputs/production-readiness/module-02-api-foundation"
else
  echo "Could not find production-readiness/module-02-api-foundation."
  exit 1
fi

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is required."
  echo "Use a non-production PostgreSQL database, then rerun this file."
  echo "Example:"
  echo "export DATABASE_URL='postgresql://postgres:password@localhost:5432/subhakamana_dev?schema=public'"
  exit 1
fi

export PORT="${PORT:-4000}"
export NODE_ENV="${NODE_ENV:-development}"
export SESSION_SECRET="${SESSION_SECRET:-local-development-session-secret-change-before-production}"
export ALLOWED_ORIGINS="${ALLOWED_ORIGINS:-http://localhost:8080,http://127.0.0.1:8080,null}"

cd "$API_DIR"

if [ ! -d node_modules ]; then
  echo "Installing Module 2 dependencies..."
  pnpm install --frozen-lockfile
fi

echo "Generating Prisma Client for backend runtime..."
pnpm exec prisma generate --schema ../module-01-database/prisma/schema.prisma

echo "Starting Subhakamana Store API at http://localhost:${PORT}"
echo "Use ERP API mode with backend URL: http://localhost:${PORT}/api/v1"
pnpm start
