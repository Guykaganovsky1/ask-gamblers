# Context - Ask Gamblers Project

---
## Goal

Rebrand "Casino Raz" to "Ask Gamblers" - Hebrew RTL casino affiliate website targeting the Israeli market.

## Brand Changes

- Brand name: "קזינו רז" / "Casino Raz" → "Ask Gamblers"
- Domain: `casinoraz.co.il` → `askgamblers.co.il`
- Hebrew grammar: Use "בתי קזינו" (plural) instead of "הקזינו" when referring to multiple casinos

## Cloudways Server Details

| Setting | Value |
|---------|-------|
| Server | `phpstack-1553018-6228296.cloudwaysapps.com` |
| App User | `contact@adimpress.me` |
| App Password | `Hdu483hfe` |
| Deploy Path | `/home/1553018.cloudwaysapps.com/pwnubhceem/public_html` |
| SSH Key | `~/.ssh/id_rsa_cloudways_askgamblers.pub` |
| Live URL | https://phpstack-1553018-6228296.cloudwaysapps.com/ |

---

## Quick Deploy

```bash
./deploy-cloudways.sh          # Build and deploy
./deploy-cloudways.sh --skip-build  # Deploy without building
```

---

## Manual Deployment (Step by Step)

### 1. Build locally
```bash
npm run build
```

### 2. Kill old server process
```bash
sshpass -p 'Hdu483hfe' ssh -o StrictHostKeyChecking=no contact@adimpress.me@phpstack-1553018-6228296.cloudwaysapps.com \
  "pkill -9 -f 'node|next' 2>/dev/null; sleep 2"
```

### 3. Upload files
```bash
SERVER="contact@adimpress.me@phpstack-1553018-6228296.cloudwaysapps.com"
PATH="/home/1553018.cloudwaysapps.com/pwnubhceem/public_html"
RSYNC="sshpass -p 'Hdu483hfe' rsync -avz -e 'ssh -o StrictHostKeyChecking=no'"

# Upload root files
$RSYNC .next/standalone/server.js .next/standalone/package.json $SERVER:$PATH/

# Upload node_modules
$RSYNC .next/standalone/node_modules/ $SERVER:$PATH/node_modules/

# Upload .next from standalone
$RSYNC .next/standalone/.next/ $SERVER:$PATH/.next/

# Upload static files
$RSYNC .next/static/ $SERVER:$PATH/.next/static/

# Upload public folder
$RSYNC public/ $SERVER:$PATH/public/
```

### 4. Create symlinks (CRITICAL!)
```bash
sshpass -p 'Hdu483hfe' ssh -o StrictHostKeyChecking=no contact@adimpress.me@phpstack-1553018-6228296.cloudwaysapps.com \
  "cd /home/1553018.cloudwaysapps.com/pwnubhceem/public_html && \
   ln -sf .next _next && \
   ln -sf public/images images && \
   ln -sf public/logos logos && \
   ln -sf public/logo.svg logo.svg"
```

### 5. Start server
```bash
sshpass -p 'Hdu483hfe' ssh -o StrictHostKeyChecking=no contact@adimpress.me@phpstack-1553018-6228296.cloudwaysapps.com \
  "cd /home/1553018.cloudwaysapps.com/pwnubhceem/public_html && nohup node server.js > /tmp/node.log 2>&1 &"
```

### 6. Generate static files from dynamic routes
```bash
sshpass -p 'Hdu483hfe' ssh -o StrictHostKeyChecking=no contact@adimpress.me@phpstack-1553018-6228296.cloudwaysapps.com \
  "cd /home/1553018.cloudwaysapps.com/pwnubhceem/public_html && \
   curl -s http://localhost:3000/icon.svg > icon.svg && \
   curl -s http://localhost:3000/robots.txt > robots.txt"
```

### 7. Verify
```bash
curl -s https://phpstack-1553018-6228296.cloudwaysapps.com/ | grep '<title>'
# Should show: <title>Ask Gamblers - המדריך המלא לקזינו אונליין</title>
```

---

## Common Issues & Fixes

### Issue: Static chunks 404 (/_next/static/*)
**Cause:** Cloudways nginx doesn't serve `.next` directory (dot prefix = hidden)
**Fix:** Create symlink `_next` → `.next`

### Issue: Images 404 (/images/*)
**Cause:** Cloudways nginx doesn't serve from `public/` subdirectory
**Fix:** Create symlinks:
```bash
ln -sf public/images images
ln -sf public/logos logos
ln -sf public/logo.svg logo.svg
```

### Issue: icon.svg or robots.txt 404
**Cause:** These are dynamic routes served by Next.js, nginx doesn't proxy to Node.js
**Fix:** Generate static files from running server:
```bash
curl -s http://localhost:3000/icon.svg > icon.svg
curl -s http://localhost:3000/robots.txt > robots.txt
```

### Issue: Old content showing after deployment
**Cause:** Old Node.js process still running with cached content
**Fix:** Kill all node processes before starting new server:
```bash
pkill -9 -f 'node|next'
fuser -k 3000/tcp  # If port still occupied
```

### Issue: Permission denied on `.next/standalone/.next/server/` files
**Cause:** Files created by previous deployment under different user
**Fix:** Don't use `--delete` flag with rsync; upload fresh files over existing ones

### Issue: CSS not loading / wrong styles
**Cause:** Old CSS file hash cached
**Verify:** Check CSS filename in HTML matches `.next/static/chunks/*.css`

### Issue: PM2 not found
**Note:** PM2 is not installed globally. Use direct `node server.js` instead.

### Issue: Port 3000 already in use
**Fix:**
```bash
lsof -i :3000          # Find process
fuser -k 3000/tcp      # Kill process on port
```

---

## Server File Structure

```
/home/1553018.cloudwaysapps.com/pwnubhceem/public_html/
├── server.js          # Next.js standalone server
├── package.json       # Package info
├── node_modules/      # Dependencies
├── icon.svg           # Static favicon (generated from route)
├── robots.txt         # Static robots.txt (generated from route)
├── logo.svg -> public/logo.svg    # SYMLINK
├── images -> public/images         # SYMLINK
├── logos -> public/logos           # SYMLINK
├── .next/             # Build output (hidden from nginx)
│   ├── static/        # Static assets (CSS, JS, fonts)
│   ├── server/        # Server-side rendered pages
│   └── ...            # Build manifests
├── _next -> .next     # SYMLINK (for nginx to serve static files)
└── public/            # Static public files
    ├── images/
    ├── logos/
    └── logo.svg
```

---

## Tech Stack

- **Next.js 16** (App Router, RSC, TypeScript, standalone output)
- **Sanity v5** — Headless CMS, embedded studio at `/studio`
- **Tailwind CSS v4** — Styling via `@theme` block in `globals.css`
- **Fonts:** Heebo (headings), Assistant (body), Inter (numbers/English)

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build (standalone output) |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type-check |

---

## Completed Tasks

- [x] Package & config files updated
- [x] Domain URLs changed (`casinoraz.co.il` → `askgamblers.co.il`)
- [x] Brand name changed ("קזינו רז" → "Ask Gamblers")
- [x] Logo updated
- [x] Hebrew grammar fixed
- [x] Git commits pushed
- [x] Deployed to Cloudways server
- [x] Fixed static chunks 404 (symlink fix)
- [x] Fixed images 404 (symlink fix)
- [x] Fixed icon.svg and robots.txt 404

## Remaining Tasks

- [x] Update JSON-LD URLs from `casinoraz.co.il` to `askgamblers.co.il` (in `lib/seo.ts`)
- [ ] Update Sanity casino affiliate links from `example.com` to real URLs
- [ ] Configure `askgamblers.co.il` domain in Cloudways
- [ ] Set up PM2 for production (optional)
