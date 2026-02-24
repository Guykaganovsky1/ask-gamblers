# Cloudways Node.js Deployment Skill

## ⚠️ GOLDEN RULE

**If something fails, check logs first. Never guess.**

```bash
pm2 logs ask-gamblers
# Or for system issues:
pm2 logs
```

---

## Credentials

- **Server:** phpstack-1553018-6228296.cloudwaysapps.com
- **App User:** contact@adimpress.me
- **App Password:** Hdu483hfe
- **SSH Key:** ~/.ssh/id_rsa_cloudways_askgamblers.pub
- **Path:** /home/1553018.cloudwaysapps.com/pwnubhceem/public_html
- **Live URL:** https://phpstack-1553018-6228296.cloudwaysapps.com

---

## ⚠️ IMPORTANT: Node.js on Cloudways

**Node apps DO NOT run from `public_html` like PHP.** They run as a persistent process (PM2 recommended).

This project uses Next.js with `output: "standalone"` - the build creates a self-contained server.

---

## Method 1: Manual Deployment (Standalone Build)

### Step 1: Build Locally

```bash
cd /Users/guykaganovsky/Documents/Projects/casino\ raz
npm run build
```

Ensure build completes without errors before continuing.

### Step 2: Upload Files via rsync

```bash
# Upload standalone app
sshpass -p 'Hdu483hfe' rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.next/cache' \
  --exclude '.env.local' \
  -e "ssh -o StrictHostKeyChecking=no" \
  .next/standalone/ \
  contact@adimpress.me@phpstack-1553018-6228296.cloudwaysapps.com:/home/1553018.cloudwaysapps.com/pwnubhceem/public_html/

# Upload static files (required for CSS/JS)
sshpass -p 'Djhg78LLK' rsync -avz \
  -e "ssh -o StrictHostKeyChecking=no" \
  .next/static/ \
  contact@adimpress.me@phpstack-1553018-6228296.cloudwaysapps.com:/home/1553018.cloudwaysapps.com/pwnubhceem/public_html/.next/static/

# Upload public folder (images, favicon, etc.)
sshpass -p 'Djhg78LLK' rsync -avz \
  -e "ssh -o StrictHostKeyChecking=no" \
  public/ \
  contact@adimpress.me@phpstack-1553018-6228296.cloudwaysapps.com:/home/1553018.cloudwaysapps.com/pwnubhceem/public_html/public/
```

### Step 3: Set Environment Variables

In Cloudways Console or via SSH, create `.env`:

```bash
cd /home/1553018.cloudwaysapps.com/pwnubhceem/public_html
cat > .env << 'ENVEOF'
NEXT_PUBLIC_SANITY_PROJECT_ID=<from sanity.io>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SITE_URL=https://phpstack-1553018-6228296.cloudwaysapps.com
SANITY_WRITE_TOKEN=<for click tracking>
SANITY_REVALIDATE_SECRET=<for webhook auth>
ENVEOF
```

### Step 4: Restart Node.js

Via Cloudways Application Console:

```bash
cd /home/1553018.cloudwaysapps.com/pwnubhceem/public_html
pkill -f 'node server.js' || true
nohup node server.js > /tmp/nextjs.log 2>&1 &
```

**Or using PM2 (recommended):**

```bash
pm2 start server.js --name ask-gamblers
pm2 save
```

---

## Method 2: Git Deployment

### Step 1: Configure Git in Cloudways

1. Go to Cloudways → Application → Git Deployment
2. Add repo: `https://github.com/Guykaganovsky1/casino-raz.git`
3. Branch: `main`
4. Click Deploy

### Step 2: Build on Server

Via Application Console:

```bash
cd /home/1553018.cloudwaysapps.com/pwnubhceem/public_html
npm install
npm run build
pm2 restart ask-gamblers
```

### Step 3: Future Updates

```bash
cd /home/1553018.cloudwaysapps.com/pwnubhceem/public_html
git pull
npm install
npm run build
pm2 restart ask-gamblers
```

---

## PM2 Commands Reference

```bash
# Check status
pm2 list

# View logs (FIRST THING TO CHECK)
pm2 logs ask-gamblers

# Monitor
pm2 monit

# Restart
pm2 restart ask-gamblers

# Stop
pm2 stop ask-gamblers

# Save process list (persists across reboots)
pm2 save

# Enable auto-start on server boot
pm2 startup
# (copy and run the command it outputs)
```

---

## Cloudways Panel Configuration

Go to **Cloudways → Application → Application Settings**:

- **Application Type:** Node.js
- **App Root:** `/public_html` (or your deployed path)
- **Port:** 3000
- **Domain:** Configure your custom domain

Restart application from panel after changes.

---

## Troubleshooting

### ❌ 502 Bad Gateway

**Check logs first:** `pm2 logs ask-gamblers`

Common causes:
- App crashed → Check logs, fix error, restart
- Wrong port → Ensure app listens on `0.0.0.0:3000`
- PM2 not running → `pm2 list` then `pm2 restart ask-gamblers`

### ❌ Error: EADDRINUSE (Port in use)

```bash
lsof -i :3000
# Kill the process using the port
kill -9 <PID>
# Or change port
```

### ❌ App Works in SSH but Not in Browser

Likely causes:
- **Wrong port configured** in Cloudways panel
- **App bound to localhost only**

```javascript
// BAD - only accessible locally
app.listen(3000, "127.0.0.1")

// GOOD - accessible from outside
app.listen(3000, "0.0.0.0")
```

This project uses `-H 0.0.0.0` in package.json start script.

### ❌ npm install Fails

```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### ❌ Static Files 404

Ensure `.next/static/` folder was uploaded correctly:

```bash
ls -la /home/1553018.cloudwaysapps.com/pwnubhceem/public_html/.next/static/
```

### ❌ Old Version Showing

- Clear browser cache
- Hard refresh: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
- Check if build was uploaded: verify timestamps on server

### ❌ Environment Variables Not Working

- Verify `.env` file exists on server
- Restart app after adding/changing env vars
- For Next.js, rebuild if `NEXT_PUBLIC_*` vars changed

---

## Deployment Checklist

- [ ] SSH connection works
- [ ] Files uploaded successfully
- [ ] Node version correct (`node -v`)
- [ ] npm install completed
- [ ] Build completed without errors
- [ ] App running with PM2 (`pm2 list`)
- [ ] Port 3000 configured in Cloudways
- [ ] App listening on `0.0.0.0:3000`
- [ ] PM2 process saved (`pm2 save`)
- [ ] Environment variables set
- [ ] Static files uploaded (`.next/static/`)
- [ ] Public folder uploaded
- [ ] Test all pages work
- [ ] Check logs for errors: `pm2 logs ask-gamblers`

---

## Quick Deployment Command (One-Liner)

From project root, after successful build:

```bash
sshpass -p 'Hdu483hfe' rsync -avz --delete \
  --exclude 'node_modules' --exclude '.git' --exclude '.next/cache' --exclude '.env.local' \
  -e "ssh -o StrictHostKeyChecking=no" \
  .next/standalone/ \
  contact@adimpress.me@phpstack-1553018-6228296.cloudwaysapps.com:/home/1553018.cloudwaysapps.com/pwnubhceem/public_html/ && \
sshpass -p 'Djhg78LLK' rsync -avz -e "ssh -o StrictHostKeyChecking=no" \
  .next/static/ \
  contact@adimpress.me@phpstack-1553018-6228296.cloudwaysapps.com:/home/1553018.cloudwaysapps.com/pwnubhceem/public_html/.next/static/ && \
sshpass -p 'Djhg78LLK' rsync -avz -e "ssh -o StrictHostKeyChecking=no" \
  public/ \
  contact@adimpress.me@phpstack-1553018-6228296.cloudwaysapps.com:/home/1553018.cloudwaysapps.com/pwnubhceem/public_html/public/
```

---

## Critical: mod_proxy Module Requirement

### ❌ Error: "No protocol handler was valid for the URL"

If you see this error in Apache logs:

```
[proxy:warn] [pid 54899:tid 55348] [client 202.47.45.112:0] AH01144: No protocol handler was valid for the URL /icon.svg (scheme 'http'). If you are using a DSO version of mod_proxy, make sure the proxy submodules are included in the configuration using LoadModule.
```

**Cause:** The `mod_proxy` Apache module is not enabled on the Cloudways server. This is required for the `.htaccess` reverse proxy to work correctly.

**Solution:** Contact Cloudways support and request them to enable `mod_proxy` from the server root user. They need to run the appropriate command to enable the proxy submodules.

**What Cloudways support did:**
> "Please note that you had performed all the steps correctly. The issue came up due to mod_proxy as shown in the error logs. After I enabled it from the server by running a command from root user, the issue was resolved."

### How to Check if mod_proxy is Enabled

```bash
# Via SSH - check loaded modules
apachectl -M | grep proxy

# Should show something like:
# proxy_module (shared)
# proxy_http_module (shared)
```

### Required .htaccess Configuration

Once `mod_proxy` is enabled, use this `.htaccess`:

```apache
# Cloudways Node.js Reverse Proxy Configuration
# Proxy all requests to Node.js server running on port 3000

<IfModule mod_proxy.c>
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/
</IfModule>

# Fallback: Rewrite if mod_proxy not available
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
</IfModule>
```

### Symptoms of Missing mod_proxy

- ✅ Site works locally on server: `curl http://localhost:3000/` returns 200
- ❌ Site returns 500/502 from browser
- ❌ Static files (CSS, JS, fonts) return 500 error
- ❌ Apache error log shows `AH01144` error

### Quick Fix Checklist

1. [ ] Verify Node.js server running: `lsof -i :3000`
2. [ ] Test locally on server: `curl http://localhost:3000/`
3. [ ] Check Apache error logs for `AH01144` error
4. [ ] If error found, contact Cloudways support to enable `mod_proxy`
5. [ ] After fix, verify all assets load: CSS, JS, fonts, images
