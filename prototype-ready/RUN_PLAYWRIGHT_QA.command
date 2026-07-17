#!/bin/zsh
set -euo pipefail

cd "$(dirname "$0")"

echo "Installing Playwright Chromium browser..."
pnpm exec playwright install chromium

echo ""
echo "Running Subhakamana Store Playwright QA..."
pnpm exec playwright test --project=chromium --reporter=html

echo ""
echo "Opening Playwright HTML report..."
pnpm exec playwright show-report

