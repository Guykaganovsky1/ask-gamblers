# Project Deployment Guide (Cloudways + Node.js)

This project uses a custom Node.js Skill architecture to run on Cloudways. Because Cloudways is natively optimized for PHP, we use a Reverse Proxy + PM2 stack to ensure high availability and zero-downtime deployments.

## Quick Start (Local to Prod)

### 1. Initial Server Setup (One-Time)

Before the first deployment, ensure the following are configured in your Cloudways Application Panel:
- **App Type:** Custom PHP
- **Varnish:** Disabled (Settings & Packages > Varnish)
- **Folder:** Files must reside in `/public_html/`

### 2. Deployment Commands

We use npm scripts to manage the production lifecycle. Access your server via SSH and use:

| Command | Action |
|---------|--------|
| `npm run prod:start` | Launches the app for the first time using ecosystem.config.js |
| `npm run prod:reload` | Zero-Downtime update. Reloads code without dropping connections |
| `npm run prod:logs` | View real-time server output and errors |
| `npm run prod:stop` | Safely shuts down the Node processes |

## How it Works (The "Skill" Stack)

### The Gateway (.htaccess)

The .htaccess file acts as a traffic controller. It intercepts incoming requests on Port 80/443 and silently forwards them to the Node.js process running internally on Port 3000.

### The Manager (ecosystem.config.js)

We use PM2 in cluster mode. This allows the app to:
- **Auto-Restart:** If the app crashes, PM2 brings it back instantly
- **Self-Heal:** Restarts the process if memory usage exceeds 1GB
- **Scale:** Automatically spawns instances based on the number of CPU cores available

## Maintenance Notes

- **Environment Variables:** Always update them in ecosystem.config.js under the env_production block. After changing variables, you must run `pm2 reload ecosystem.config.js --update-env`
- **Port Conflicts:** If you deploy a second Node app on the same server, you must increment the port (e.g., 3001) in both .htaccess and ecosystem.config.js
- **Persistence:** After a successful start, run `pm2 save` to ensure the app starts automatically if the Cloudways server reboots

---

## ⚠️ Critical Issue: mod_proxy Module

### Problem Encountered (Feb 2026)

After deploying, the site returned **500 errors** for all static files (CSS, JS, fonts, images) even though:
- Node.js server was running correctly on port 3000
- Local `curl http://localhost:3000/` worked fine
- All files were uploaded correctly

### Apache Error Log

```
[proxy:warn] [pid 54899:tid 55348] AH01144: No protocol handler was valid for the URL /icon.svg (scheme 'http'). If you are using a DSO version of mod_proxy, make sure the proxy submodules are included in the configuration using LoadModule.
```

### Root Cause

The **`mod_proxy` Apache module was not enabled** on the Cloudways server. This is required for `.htaccess` to proxy requests to the Node.js backend.

### Resolution

**Contact Cloudways support** and request them to enable `mod_proxy`. They will run a command from the root user to enable the proxy submodules.

**Quote from Cloudways support:**
> "Please note that you had performed all the steps correctly. The issue came up due to mod_proxy as shown in the error logs. After I enabled it from the server by running a command from root user, the issue was resolved."

### Prevent Future Issues

Before deploying a Node.js app, verify `mod_proxy` is enabled:

```bash
apachectl -M | grep proxy
# Should output: proxy_module (shared), proxy_http_module (shared)
```

If not enabled, contact Cloudways support **before** deployment.
