#!/bin/zsh
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
BUNDLED_NODE="/Users/bibekadhikari/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"

cd "$PROJECT_DIR"

if command -v node >/dev/null 2>&1; then
  NODE_BIN="$(command -v node)"
elif [ -x "$BUNDLED_NODE" ]; then
  NODE_BIN="$BUNDLED_NODE"
else
  echo "Node.js was not found."
  echo "Install Node.js or run this from Codex where the bundled runtime is available."
  exit 1
fi

"$NODE_BIN" scripts/validate-static.mjs
