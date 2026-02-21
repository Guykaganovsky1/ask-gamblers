#!/bin/bash
set -e

# Config - edit these
SERVER_USER="1553018"
SERVER_HOST="phpstack-1553018-6228296.cloudwaysapps.com"
SERVER_PATH="/home/1553018.cloudwaysapps.com/pwnubhceem"
BRANCH="main"

echo "Building..."
npm ci
npm run build

echo "Copying to server..."
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.next/cache' \
  --exclude '.env.local' \
  .next/standalone/ ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/

rsync -avz .next/static/ ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/.next/static/
rsync -avz public/ ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/public/

echo "Restarting app..."
ssh ${SERVER_USER}@${SERVER_HOST} "cd ${SERVER_PATH} && pkill -f 'node server.js' || true; nohup node server.js > /dev/null 2>&1 &"

echo "Deployed!"
