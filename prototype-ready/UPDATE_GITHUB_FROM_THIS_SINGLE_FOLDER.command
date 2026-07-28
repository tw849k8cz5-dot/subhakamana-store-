#!/bin/zsh
set -euo pipefail

SOURCE_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKSPACE_DIR="/Users/bibekadhikari/Documents/Codex/2026-07-03/files-mentioned-by-the-user-subhakamana"
REPO_DIR="/Users/bibekadhikari/Documents/GitHub/subhakamana store "
BRANCH_NAME="prototype-ready-package-2026-07-17"
TARGET_DIR="prototype-ready"

echo "Updating GitHub from single grand release folder"
echo "Source: $SOURCE_DIR"
echo ""

if [ ! -d "$REPO_DIR/.git" ]; then
  echo "Missing Git repository:"
  echo "$REPO_DIR"
  exit 1
fi

cd "$REPO_DIR"

if git show-ref --verify --quiet "refs/heads/$BRANCH_NAME"; then
  git switch "$BRANCH_NAME"
else
  git switch -c "$BRANCH_NAME"
fi

mkdir -p "$TARGET_DIR"

rsync -a --delete \
  --exclude '.DS_Store' \
  --exclude '*.zip' \
  "$SOURCE_DIR/" "$TARGET_DIR/"

chmod +x "$TARGET_DIR"/*.command 2>/dev/null || true

mkdir -p tests scripts .github/workflows production-readiness
cp "$SOURCE_DIR/package.json" package.json
cp "$SOURCE_DIR/GITHUB_SYSTEM_REPORT.md" GITHUB_SYSTEM_REPORT.md
cp "$SOURCE_DIR/playwright.config.js" playwright.config.js
cp "$SOURCE_DIR/scripts/validate-static.mjs" scripts/validate-static.mjs
cp "$SOURCE_DIR/RUN_STATIC_VALIDATION.command" RUN_STATIC_VALIDATION.command
cp "$SOURCE_DIR/RUN_PLAYWRIGHT_QA.command" RUN_PLAYWRIGHT_QA.command
cp "$SOURCE_DIR/RUN_BACKEND_OFFLINE_TESTS.command" RUN_BACKEND_OFFLINE_TESTS.command
cp "$SOURCE_DIR/RUN_POSTGRESQL_VALIDATION_LOCAL.command" RUN_POSTGRESQL_VALIDATION_LOCAL.command
cp "$SOURCE_DIR/RUN_BACKEND_API_LOCAL.command" RUN_BACKEND_API_LOCAL.command
cp "$SOURCE_DIR/PLAYWRIGHT_QA_GUIDE.md" PLAYWRIGHT_QA_GUIDE.md
cp "$SOURCE_DIR/tests/subhakamana-system.spec.js" tests/subhakamana-system.spec.js
cp "$SOURCE_DIR/.github/workflows/playwright-qa.yml" .github/workflows/playwright-qa.yml
cp "$SOURCE_DIR/.github/workflows/postgresql-validation.yml" .github/workflows/postgresql-validation.yml
rsync -a --delete \
  --exclude '.DS_Store' \
  "$SOURCE_DIR/production-readiness/" production-readiness/

cp "$SOURCE_DIR/GITHUB_READY_README.md" README.md

chmod +x RUN_STATIC_VALIDATION.command RUN_PLAYWRIGHT_QA.command RUN_BACKEND_OFFLINE_TESTS.command RUN_POSTGRESQL_VALIDATION_LOCAL.command RUN_BACKEND_API_LOCAL.command

echo "Verifying release markers..."
grep -q "Grand Release Center" "$TARGET_DIR/RELEASE_CENTER.html"
grep -q "Subhakamana Store Management System" "$TARGET_DIR/START_HERE.html"
grep -q "API mode selected. Backend login is required" "$TARGET_DIR/subhakamana-store-final-erp-platform.html"
grep -q "Privacy Policy" "$TARGET_DIR/subhakamana-store-privacy-policy.html"

git add "$TARGET_DIR" README.md GITHUB_SYSTEM_REPORT.md package.json playwright.config.js scripts/validate-static.mjs RUN_STATIC_VALIDATION.command RUN_PLAYWRIGHT_QA.command RUN_BACKEND_OFFLINE_TESTS.command RUN_POSTGRESQL_VALIDATION_LOCAL.command RUN_BACKEND_API_LOCAL.command PLAYWRIGHT_QA_GUIDE.md tests/subhakamana-system.spec.js production-readiness .github/workflows/playwright-qa.yml .github/workflows/postgresql-validation.yml

if git diff --cached --quiet; then
  echo "No grand release changes to commit."
else
  git commit -m "Prepare grand release single folder package"
fi

git push -u origin "$BRANCH_NAME"

if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  gh workflow run "PostgreSQL Validation" --ref "$BRANCH_NAME" || true
  gh workflow run "Playwright QA" --ref "$BRANCH_NAME" || true
  gh run list --branch "$BRANCH_NAME" --limit 5 || true
fi

echo ""
echo "Done."
