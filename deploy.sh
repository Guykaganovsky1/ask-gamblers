#!/bin/bash
# Git-based deploy script for Cloudways
# Run on server: bash deploy.sh
set -e

APP=/home/1553018.cloudwaysapps.com/dzdatjcdrp/public_html
PM2=/home/master/.next/node_modules/.bin/pm2
export PM2_HOME=/tmp/.pm2_askgamblers

echo "=== [1/5] Pulling latest code ==="
cd $APP
git pull origin main

echo "=== [2/5] Installing dependencies ==="
npm ci --prefer-offline --cache /tmp/npm-cache

echo "=== [3/5] Building ==="
npm run build

echo "=== [4/5] Installing linux-x64 sharp ==="
npm install @img/sharp-linux-x64 --cache /tmp/npm-cache

echo "=== [5/5] Restarting server ==="
$PM2 restart all

echo ""
echo "✓ Deploy complete"
