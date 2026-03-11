# Ask Gamblers - Server Credentials

## Cloudways Server

| Field | Value |
|-------|-------|
| **Public IP** | `178.62.56.62` |
| **SSH User** | `contact@adimpress.me` |
| **SSH Password** | `Hdu483hfe` |
| **App Path** | `/home/1553018.cloudwaysapps.com/dzdatjcdrp/public_html` |

## Connection

```bash
# SSH command
sshpass -p 'Hdu483hfe' ssh -o StrictHostKeyChecking=no contact@adimpress.me@178.62.56.62

# Or use SSH key
ssh -i ~/.ssh/id_rsa_cloudways contact@adimpress.me@178.62.56.62
```

## URLs

- **Live:** https://askgamblers.co.il
- **Staging:** https://phpstack-1553018-6265432.cloudwaysapps.com

## Git

- **Repo:** https://github.com/Guykaganovsky1/ask-gamblers.git

## Deploy Commands (via SSH)

```bash
cd /home/1553018.cloudwaysapps.com/dzdatjcdrp/public_html

# Pull latest
git pull origin main

# Install (if needed) - use /tmp for cache
npm install --cache /tmp/npm-cache

# Build
npm run build

# Start (port 3334)
npm run start
```

## Troubleshooting

- **npm EACCES:** Use `--cache /tmp/npm-cache` flag
- **Port in use:** Kill old process `pkill -f 'node.*server'`
