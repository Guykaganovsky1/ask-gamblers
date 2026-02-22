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
