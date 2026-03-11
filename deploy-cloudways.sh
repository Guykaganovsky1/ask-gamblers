#!/bin/bash
# Ask Gamblers - Cloudways Deployment Script
# Updated: Feb 27, 2026 — PM2 cluster mode, correct standalone paths
# Usage: ./deploy-cloudways.sh [--skip-build]

set -e

# ─── Configuration ────────────────────────────────────────────────────────────
# Server IP: 178.62.56.62 (use IP instead of hostname - hostname doesn't resolve)
SERVER="178.62.56.62"
SSH_USER="contact@adimpress.me"  # user@email format for Cloudways
SSH_KEY="$HOME/.ssh/id_rsa_cloudways"
REMOTE_PATH="/home/1553018.cloudwaysapps.com/dzdatjcdrp/public_html"
SSH_OPTS="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ConnectTimeout=10"

# Project directory
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Next.js standalone outputs directly to .next/standalone/
STANDALONE="$PROJECT_DIR/.next/standalone"

SKIP_BUILD=false
if [ "$1" == "--skip-build" ]; then
  SKIP_BUILD=true
fi

echo "🚀 Deploying Ask Gamblers to Cloudways..."
echo "   Server:     $SERVER"
echo "   Remote:     $REMOTE_PATH"
echo "   Standalone: $STANDALONE"
echo ""

# ─── Step 1: Build ────────────────────────────────────────────────────────────
if [ "$SKIP_BUILD" = false ]; then
  echo "📦 Building production standalone..."
  npm run build
  echo ""
fi

# ─── Step 2: Stage assets into standalone dir ─────────────────────────────────
echo "📋 Staging assets into standalone directory..."
cp -rf "$PROJECT_DIR/public/"           "$STANDALONE/public/"
cp -rf "$PROJECT_DIR/.next/static/"    "$STANDALONE/.next/static/"
cp     "$PROJECT_DIR/.htaccess"        "$STANDALONE/.htaccess"
cp     "$PROJECT_DIR/ecosystem.config.js" "$STANDALONE/ecosystem.config.js"
echo "   ✅ Assets staged"
echo ""

# ─── Step 3: Stop old server ──────────────────────────────────────────────────
echo "🛑 Stopping old server..."
ssh -i "$SSH_KEY" $SSH_OPTS "$SSH_USER@$SERVER" \
  "pm2 stop ask-gamblers 2>/dev/null; pm2 delete ask-gamblers 2>/dev/null; pkill -9 -f 'node\|next' 2>/dev/null; true" || true
sleep 2

# ─── Step 4: Upload via rsync ─────────────────────────────────────────────────
echo "📤 Uploading application files (rsync)..."
rsync -avz --delete \
  -e "ssh -i '$SSH_KEY' $SSH_OPTS" \
  --exclude='.git' \
  --exclude='*.map' \
  --filter='protect .next/static/chunks/*.css' \
  --filter='protect .next/static/chunks/*.js' \
  --filter='protect .next/static/media/*' \
  "$STANDALONE/" \
  "$SSH_USER@$SERVER:$REMOTE_PATH/"
echo "   ✅ Upload complete"

# ─── Step 5: Start with PM2 (reload if running, start if new) ────────────────
echo ""
echo "🚀 Starting with PM2..."
ssh -i "$SSH_KEY" $SSH_OPTS "$SSH_USER@$SERVER" \
  "cd \"$REMOTE_PATH\" && (pm2 reload ecosystem.config.js --update-env 2>/dev/null || npm run prod:start) && pm2 save && pm2 list"
sleep 3

# ─── Step 6: Generate route-based static files ────────────────────────────────
echo ""
echo "📄 Generating static route files..."
ssh -i "$SSH_KEY" $SSH_OPTS "$SSH_USER@$SERVER" "
  cd \"$REMOTE_PATH\" && \
  curl -sf http://localhost:3000/robots.txt -o robots.txt && echo '   ✅ robots.txt' || echo '   ⚠️  robots.txt failed' && \
  curl -sf http://localhost:3000/icon.svg   -o icon.svg   && echo '   ✅ icon.svg'   || echo '   ⚠️  icon.svg failed'
" || true

# ─── Step 7: Create symlinks for static file serving ─────────────────────────
echo ""
echo "🔗 Creating symlinks..."
ssh -i "$SSH_KEY" $SSH_OPTS "$SSH_USER@$SERVER" "
  cd \"$REMOTE_PATH\" && \
  ln -sf .next _next 2>/dev/null || true && \
  echo '   ✅ _next → .next'
" || true

# ─── Step 8: Verify ───────────────────────────────────────────────────────────
echo ""
echo "✅ Verifying deployment..."
sleep 2
RESPONSE=$(curl -sk -L --max-time 10 "https://$SERVER/" | grep -o '<title>.*</title>' || echo "")

if echo "$RESPONSE" | grep -qi "gamblers\|קזינו\|גמבל"; then
  echo ""
  echo "🎉 Deployment SUCCESSFUL!"
  echo "   Title: $RESPONSE"
  echo ""
  echo "🌐 Live at: https://$SERVER/"
  echo ""
  echo "🔍 Static file checks:"
  ICON=$(curl -s -o /dev/null -w "%{http_code}" "https://$SERVER/icon.svg")
  CSS=$(curl -s -o /dev/null -w "%{http_code}" "https://$SERVER/_next/static/css/app/layout.css" 2>/dev/null || \
        curl -s -o /dev/null -w "%{http_code}" "https://$SERVER/_next/static/chunks/main.js" 2>/dev/null || echo "?")
  echo "   icon.svg:  $ICON"
  echo "   CSS/JS:    $CSS"
else
  echo ""
  echo "⚠️  Could not verify title. Server may still be starting."
  echo "   HTTP status: $(curl -sk -o /dev/null -w "%{http_code}" "https://$SERVER/")"
  echo ""
  echo "   Check logs: ssh -i '$SSH_KEY' $SSH_OPTS $SSH_USER@$SERVER 'pm2 logs ask-gamblers --lines 30'"
fi
