# Cloudways Node.js Deployment Skill

## Credentials
- **Server:** phpstack-1553018-6228296.cloudwaysapps.com
- **User:** 1553018
- **Path:** /home/1553018.cloudwaysapps.com/pwnubhceem
- **SSH Key:** ~/.ssh/id_rsa (RSA fingerprint: SHA256:MgN+pDyvSIq1oHG5CN2ggwUMmZw0wPkws3GBxB+aVX4)

## Important: SSH Key Setup
1. Add key to SSH agent before connecting:
   ```bash
   ssh-add ~/.ssh/id_rsa
   ```
2. Key must be added to Cloudways SSH Keys in Server Settings

## Deployment Steps

### 1. Build locally
```bash
cd /Users/guykaganovsky/Documents/Projects/casino\ raz
npm run build
```

### 2. Upload files via rsync
```bash
# Upload standalone app
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.next/cache' \
  --exclude '.env.local' \
  -e "ssh -i ~/.ssh/id_rsa" \
  .next/standalone/ \
  1553018@phpstack-1553018-6228296.cloudwaysapps.com:/home/1553018.cloudwaysapps.com/pwnubhceem/

# Upload static files
rsync -avz \
  -e "ssh -i ~/.ssh/id_rsa" \
  .next/static/ \
  1553018@phpstack-1553018-6228296.cloudwaysapps.com:/home/1553018.cloudwaysapps.com/pwnubhceem/.next/static/

# Upload public folder
rsync -avz \
  -e "ssh -i ~/.ssh/id_rsa" \
  public/ \
  1553018@phpstack-1553018-6228296.cloudwaysapps.com:/home/1553018.cloudwaysapps.com/pwnubhceem/public/
```

### 3. Restart app
```bash
ssh -i ~/.ssh/id_rsa 1553018@phpstack-1553018-6228296.cloudwaysapps.com \
  "cd /home/1553018.cloudwaysapps.com/pwnubhceem && \
   pkill -f 'node server.js' || true; \
   nohup node server.js > /tmp/nextjs.log 2>&1 &"
```

## Quick Deploy Script
```bash
#!/bin/bash
set -e

cd /Users/guykaganovsky/Documents/Projects/casino\ raz

echo "Building..."
npm run build

echo "Uploading..."
rsync -avz --delete --exclude 'node_modules' --exclude '.git' --exclude '.next/cache' --exclude '.env.local' -e "ssh -i ~/.ssh/id_rsa" .next/standalone/ 1553018@phpstack-1553018-6228296.cloudwaysapps.com:/home/1553018.cloudwaysapps.com/pwnubhceem/
rsync -avz -e "ssh -i ~/.ssh/id_rsa" .next/static/ 1553018@phpstack-1553018-6228296.cloudwaysapps.com:/home/1553018.cloudwaysapps.com/pwnubhceem/.next/static/
rsync -avz -e "ssh -i ~/.ssh/id_rsa" public/ 1553018@phpstack-1553018-6228296.cloudwaysapps.com:/home/1553018.cloudwaysapps.com/pwnubhceem/public/

echo "Restarting..."
ssh -i ~/.ssh/id_rsa 1553018@phpstack-1553018-6228296.cloudwaysapps.com "cd /home/1553018.cloudwaysapps.com/pwnubhceem && pkill -f 'node server.js' || true; nohup node server.js > /tmp/nextjs.log 2>&1 &"

echo "Done!"
```

## Troubleshooting
- **Permission denied**: Run `ssh-add ~/.ssh/id_rsa` first
- **Connection timeout**: SSH port may be blocked - run commands locally in Terminal
- **502 Bad Gateway**: Check if Node.js is running on server
- **Static files 404**: Ensure .next/static is uploaded

## Live URL
https://phpstack-1553018-6228296.cloudwaysapps.com
