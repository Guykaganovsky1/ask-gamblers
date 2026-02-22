# Cloudways Node.js Deployment Skill

## Purpose
This skill defines the architecture and deployment workflow for running a Node.js application on a Cloudways Custom PHP Server using PM2 for process management and Apache for reverse proxying.

## Architecture Specs
- **Server Stack:** Apache/Nginx (Hybrid) + Node.js Runtime
- **App Directory:** `/home/master/applications/[APP_FOLDER]/public_html/`
- **Process Manager:** PM2 (Cluster Mode)
- **Internal Port:** 3000 (Default)
- **Edge Gateway:** .htaccess Reverse Proxy to 127.0.0.1:3000

## Configuration Files

### 1. PM2 Process Control (ecosystem.config.js)
```javascript
module.exports = {
  apps: [{
    name: "cloudways-node-app",
    script: "./server.js",
    instances: "max",
    exec_mode: "cluster",
    env_production: {
      NODE_ENV: "production",
      PORT: 3000
    }
  }]
};
```

### 2. Reverse Proxy (.htaccess)
```
DirectoryIndex disabled
RewriteEngine On
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
RewriteCond %{HTTP:Upgrade} websocket [NC]
RewriteCond %{HTTP:Connection} upgrade [NC]
RewriteRule .* ws://127.0.0.1:3000%{REQUEST_URI} [P,L]
```

### 3. package.json Scripts
```json
"scripts": {
  "start": "node server.js",
  "prod:start": "pm2 start ecosystem.config.js --env production",
  "prod:reload": "pm2 reload ecosystem.config.js --update-env",
  "prod:stop": "pm2 stop ecosystem.config.js",
  "prod:logs": "pm2 logs"
}
```

## Deployment Workflow

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Sync files** to Cloudways `public_html/` via rsync (include .next/standalone and .next/static):
   ```bash
   rsync -avz --delete \
     --exclude 'node_modules' \
     --exclude '.next/cache' \
     -e "ssh -i ~/.ssh/cloudways" \
     .next/standalone/ master@<server>:/home/master/applications/<app>/public_html/.next/standalone/
   rsync -avz --delete \
     -e "ssh -i ~/.ssh/cloudways" \
     .next/static/ master@<server>:/home/master/applications/<app>/public_html/.next/static/
   ```

3. **SSH into server** and setup:
   ```bash
   # Create _next folder in public_html for Apache to serve static files
   mkdir -p /home/master/applications/<app>/public_html/_next/static
   cp -r /home/master/applications/<app>/public_html/.next/static/* /home/master/applications/<app>/public_html/_next/static/

   # Copy public assets
   cp -r /home/master/applications/<app>/public_html/.next/standalone/public/* /home/master/applications/<app>/public_html/

   # Start Node.js server
   cd /home/master/applications/<app>/public_html/.next/standalone
   nohup node server.js > /tmp/nextjs.log 2>&1 &
   ```

4. **Create .htaccess** in public_html:
   ```
   RewriteEngine On
   RewriteBase /
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
   ```

5. **For future deployments**, create a deployment script:
   ```bash
   #!/bin/bash
   # Deploy script - run locally
   npm run build
   
   # Sync files
   rsync -avz --delete --exclude 'node_modules' --exclude '.next/cache' -e "ssh -i ~/.ssh/cloudways" .next/standalone/ master@<server>:/home/master/applications/<app>/public_html/.next/standalone/
   rsync -avz -e "ssh -i ~/.ssh/cloudways" .next/static/ master@<server>:/home/master/applications/<app>/public_html/.next/static/
   
   # SSH to server and restart
   ssh -t master@<server> "
     cp -r /home/master/applications/<app>/public_html/.next/static/* /home/master/applications/<app>/public_html/_next/static/
     cp -r /home/master/applications/<app>/public_html/.next/standalone/public/* /home/master/applications/<app>/public_html/
     pkill -f 'next-server' || true
     cd /home/master/applications/<app>/public_html/.next/standalone
     nohup node server.js > /tmp/nextjs.log 2>&1 &
   "
   ```

## Known Constraints

- **Varnish:** Must be DISABLED in Cloudways Application Settings
- **Ports:** If 3000 occupied, use 3001+ in both ecosystem.config.js and .htaccess
- **Permissions:** Files must be owned by the application's system user
- **proxy_http module:** Not available on Cloudways by default - use static files copy approach instead

## Troubleshooting

- 502 Bad Gateway: Check if Node.js is running (`netstat -tlnp | grep 3000`)
- Static files 404: Ensure _next/static folder exists in public_html root (Apache can't proxy static files without proxy_http module)
- Node won't start: Check /tmp/nextjs.log for errors
- Homepage works but static 404: Copy .next/static to _next/static in public_html
