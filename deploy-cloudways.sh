#!/bin/bash
# Ask Gamblers - Cloudways Deployment Script (Standalone)
# Usage: ./deploy-cloudways.sh [--skip-build]
#
# This script deploys the Next.js standalone build to Cloudways.
# Tested and verified on: Feb 24, 2026

set -e

# Configuration
SERVER="phpstack-1553018-6228296.cloudwaysapps.com"
USER="contact@adimpress.me"
PASSWORD="Hdu483hfe"
REMOTE_PATH="/home/1553018.cloudwaysapps.com/pwnubhceem/public_html"
SSH_OPTS="-o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null"
RSYNC_CMD="sshpass -p '$PASSWORD' rsync -avz -e \"ssh $SSH_OPTS\""
SSH_CMD="sshpass -p '$PASSWORD' ssh $SSH_OPTS $USER@$SERVER"

SKIP_BUILD=false
if [ "$1" == "--skip-build" ]; then
  SKIP_BUILD=true
fi

echo "🚀 Deploying Ask Gamblers to Cloudways..."
echo "Server: $SERVER"
echo "Path: $REMOTE_PATH"
echo ""

# Step 1: Build locally
if [ "$SKIP_BUILD" = false ]; then
  echo "📦 Building production standalone..."
  npm run build
  echo ""
fi

# Step 2: Kill old server process
echo "🛑 Stopping old server..."
eval "$SSH_CMD \"pkill -9 -f 'node\\|next' 2>/dev/null || true\""
sleep 2

# Step 3: Upload standalone build files
echo ""
echo "📤 Uploading server.js and package.json..."
sshpass -p "$PASSWORD" rsync -avz -e "ssh $SSH_OPTS" \
  .next/standalone/server.js .next/standalone/package.json \
  "$USER@$SERVER:$REMOTE_PATH/"

echo "📤 Uploading node_modules..."
sshpass -p "$PASSWORD" rsync -avz -e "ssh $SSH_OPTS" \
  .next/standalone/node_modules/ \
  "$USER@$SERVER:$REMOTE_PATH/node_modules/"

echo "📤 Uploading .next directory..."
sshpass -p "$PASSWORD" rsync -avz -e "ssh $SSH_OPTS" \
  .next/standalone/.next/ \
  "$USER@$SERVER:$REMOTE_PATH/.next/"

echo "📤 Uploading static files..."
sshpass -p "$PASSWORD" rsync -avz -e "ssh $SSH_OPTS" \
  .next/static/ \
  "$USER@$SERVER:$REMOTE_PATH/.next/static/"

echo "📤 Uploading public folder..."
sshpass -p "$PASSWORD" rsync -avz -e "ssh $SSH_OPTS" \
  public/ \
  "$USER@$SERVER:$REMOTE_PATH/public/"

# Step 4: Create symlinks (CRITICAL for Cloudways nginx)
# Cloudways nginx doesn't serve .next (hidden) or public/ subdirectories
echo ""
echo "🔗 Creating symlinks for static file access..."
eval "$SSH_CMD \"cd $REMOTE_PATH && ln -sf .next _next\""                    # For /_next/static/*
eval "$SSH_CMD \"cd $REMOTE_PATH && ln -sf public/images images\""           # For /images/*
eval "$SSH_CMD \"cd $REMOTE_PATH && ln -sf public/logos logos\""             # For /logos/*
eval "$SSH_CMD \"cd $REMOTE_PATH && ln -sf public/logo.svg logo.svg\""       # For /logo.svg

# Step 5: Start server
echo ""
echo "🚀 Starting Node.js server..."
eval "$SSH_CMD \"cd $REMOTE_PATH && nohup node server.js > /tmp/node.log 2>&1 &\""
sleep 3

# Step 6: Generate static files from dynamic routes
# These are served by Node.js but nginx needs direct file access
echo ""
echo "📄 Generating static files from routes..."
eval "$SSH_CMD \"cd $REMOTE_PATH && curl -s http://localhost:3000/icon.svg > icon.svg\""
eval "$SSH_CMD \"cd $REMOTE_PATH && curl -s http://localhost:3000/robots.txt > robots.txt\""

# Step 7: Verify deployment
echo ""
echo "✅ Verifying deployment..."
RESPONSE=$(curl -s https://phpstack-1553018-6228296.cloudwaysapps.com/ | grep -o '<title>.*</title>' || echo "")

if echo "$RESPONSE" | grep -q "Ask Gamblers"; then
  echo "✅ Deployment successful!"
  echo "   Title: $RESPONSE"
  echo ""
  echo "🌐 Live at: https://phpstack-1553018-6228296.cloudwaysapps.com/"
  
  # Verify static files
  echo ""
  echo "🔍 Verifying static files..."
  ICON_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://phpstack-1553018-6228296.cloudwaysapps.com/icon.svg)
  HERO_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://phpstack-1553018-6228296.cloudwaysapps.com/images/hero-bg.webp)
  CSS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://phpstack-1553018-6228296.cloudwaysapps.com/_next/static/chunks/4e2d12393b6868ed.css)
  
  echo "   icon.svg: $ICON_STATUS"
  echo "   hero-bg.webp: $HERO_STATUS"
  echo "   main CSS: $CSS_STATUS"
else
  echo "⚠️  Warning: Could not verify deployment. Check server logs:"
  echo "   $SSH_CMD \"cat /tmp/node.log\""
fi
