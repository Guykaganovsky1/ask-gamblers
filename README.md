# Casino Raz - קזינו רז

Hebrew RTL casino affiliate website built with Next.js 16, Sanity CMS, and Tailwind CSS.

## Quick Start

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment

### Vercel (Recommended)

1. Connect GitHub repo to Vercel
2. Add environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `NEXT_PUBLIC_SITE_URL`
3. Deploy - auto-deploys on git push

### Cloudways (Node.js)

See `.claude/skills/cloudways-deployment-readme.md` for detailed setup.

## Tech Stack

- Next.js 16 (App Router)
- Sanity v5 (Headless CMS)
- Tailwind CSS v4
- Framer Motion

---

## Troubleshooting & Common Issues

If your application isn't loading or returns an error, follow this checklist in order.

### 1. The "503 Service Unavailable" Error

This usually means Apache is working, but it can't find your Node.js process on the specified port.

- Check PM2 Status: `pm2 status`
- Is it online? If stopped/errored, run `npm run prod:start`
- Port Mismatch: Ensure PORT in ecosystem.config.js matches .htaccess (default 3000)

### 2. The "Infinite Loading" or "Old Content" Issue

Caused by Varnish Cache.

- **Solution:** Cloudways App Settings → Varnish → Disable

### 3. Port Conflicts

Multiple Node apps need different ports.

- Identify: `netstat -tulpn | grep LISTEN`
- Change port to 3001+ in both ecosystem.config.js and .htaccess

### 4. Permission Denied (EACCES)

Files uploaded as root instead of app user.

- **Fix:** `chown -R [username]:[username] *` in public_html

## Log Inspection

```bash
pm2 logs                    # View all logs
pm2 logs --err             # Errors only
pm2 flush                  # Clear logs
```

## Error States

| Symptom | Cause | Fix |
|---------|-------|-----|
| 503 Error | Node process down | `pm2 restart all` |
| 404 Error | .htaccess missing | Re-upload .htaccess |
| 502 Error | Port mismatch | Align ports in configs |
| Login Loops | Varnish enabled | Disable Varnish |
