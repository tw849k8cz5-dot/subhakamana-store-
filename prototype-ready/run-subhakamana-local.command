#!/bin/zsh

cd "$(dirname "$0")"

PORT="${PORT:-8088}"
APP_FILE="subhakamana-store-final-erp-platform.html"

if [ ! -f "$APP_FILE" ]; then
  echo "Could not find $APP_FILE in this folder."
  echo "Please keep this launcher inside the same outputs folder as the ERP HTML file."
  read "?Press Enter to close..."
  exit 1
fi

echo "Starting Subhakamana Store ERP locally..."
echo ""
echo "Local address:"
echo "http://localhost:$PORT/$APP_FILE"
echo ""
echo "Keep this window open while using the system."
echo "To stop the local system, close this window or press Control + C."
echo ""

if command -v python3 >/dev/null 2>&1; then
  open "http://localhost:$PORT/$APP_FILE" >/dev/null 2>&1
  python3 -m http.server "$PORT"
else
  echo "Python 3 is required to run the local server."
  echo "You can still open $APP_FILE directly in a browser."
  read "?Press Enter to close..."
  exit 1
fi
