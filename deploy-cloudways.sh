#!/bin/bash
# Casino Raz - Cloudways Deployment Script
# Usage: ./deploy-cloudways.sh SERVER_IP APP_ID

set -e

SERVER_IP=$1
APP_ID=$2
REMOTE_PATH="/home/master/applications/$APP_ID/nextapp"
LOCAL_PATH="$(pwd)"

if [ -z "$SERVER_IP" ] || [ -z "$APP_ID" ]; then
  echo "Usage: ./deploy-cloudways.sh SERVER_IP APP_ID"
  echo "Example: ./deploy-cloudways.sh 123.45.67.89 abc123xyz"
  exit 1
fi

echo "🚀 Deploying Casino Raz to Cloudways..."
echo "Server: $SERVER_IP"
echo "App ID: $APP_ID"
echo ""

# Step 1: Upload files
echo "📦 Uploading files via rsync..."
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude 'deploy' \
  --exclude 'deploy-standalone' \
  --exclude 'deploy-standalone.zip' \
  --exclude '.env.local' \
  --exclude '.DS_Store' \
  "$LOCAL_PATH/" "master@$SERVER_IP:$REMOTE_PATH/"

# Step 2: Install dependencies and build
echo ""
echo "📥 Installing dependencies and building..."
ssh master@$SERVER_IP << EOF
  cd $REMOTE_PATH
  
  # Copy env file if not exists
  if [ ! -f .env.local ]; then
    if [ -f .env.production ]; then
      cp .env.production .env.local
      echo "✓ Copied .env.production to .env.local"
    fi
  fi
  
  npm install
  npm run build
EOF

# Step 3: Restart PM2
echo ""
echo "🔄 Restarting PM2..."
ssh master@$SERVER_IP << EOF
  cd $REMOTE_PATH
  pm2 restart casino-raz || pm2 start ecosystem.config.js --env production
  pm2 save
EOF

echo ""
echo "✅ Deployment complete!"
echo "Visit your site to verify."
