#!/bin/zsh

cd "$(dirname "$0")"

ENTRY_FILE="START_HERE.html"
PORT="${PORT:-8088}"

if [ ! -f "$ENTRY_FILE" ]; then
  echo "Could not find $ENTRY_FILE in this folder."
  read "?Press Enter to close..."
  exit 1
fi

echo "Starting Subhakamana Store Management System..."
echo ""
echo "Main local address:"
echo "http://localhost:$PORT/$ENTRY_FILE"
echo ""
echo "Keep this window open while using the system."
echo "To stop it, close this window or press Control + C."
echo ""

if command -v python3 >/dev/null 2>&1; then
  open "http://localhost:$PORT/$ENTRY_FILE" >/dev/null 2>&1
  python3 -m http.server "$PORT"
else
  echo "Python 3 is required to run the local server."
  echo "You can still open $ENTRY_FILE directly in a browser."
  read "?Press Enter to close..."
  exit 1
fi
