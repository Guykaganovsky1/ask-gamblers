# Ask Gamblers - Deploy Guide

## Quick Deploy (Just push to GitHub)

```bash
git add .
git commit -m "Your changes"
git push
```

Server auto-deploys within **1 minute** via cron job.

---

## How It Works

1. **GitHub** → Code lives here
2. **Server cron** → Pulls from GitHub every minute
3. **Screen session** → Keeps app running

---

## Server Details

| | |
|---|---|
| **IP** | `178.62.56.62` |
| **SSH** | `contact@adimpress.me` |
| **Password** | `Hdu483hfe` |
| **App Path** | `/home/1553018.cloudwaysapps.com/dzdatjcdrp/public_html` |
| **Port** | `3334` |

---

## Manual Deploy ( worksif SSH)

```bash
sshpass -p 'Hdu483hfe' ssh -o StrictHostKeyChecking=no contact@adimpress.me@178.62.56.62

# On server:
cd /home/1553018.cloudwaysapps.com/dzdatjcdrp/public_html

# Pull latest
git pull origin main

# Restart (if not using cron)
screen -dmS next bash -c 'cd /home/1553018.cloudwaysapps.com/dzdatjcdrp/public_html && npx next start -p 3334'
```

---

## If Server Crashes

```bash
# SSH in and restart
sshpass -p 'Hdu483hfe' ssh -o StrictHostKeyChecking=no contact@adimpress.me@178.62.56.62

screen -dmS next bash -c 'cd /home/1553018.cloudwaysapps.com/dzdatjcdrp/public_html && npx next start -p 3334'
```

---

## Troubleshooting

**Site down?**
1. Check if server running: `ss -tlnp | grep 3334`
2. If not, restart with screen command above

**Port 3334 not responding?**
- Cloudways may have changed routing
- Restart from Cloudways Console

**Build fails?**
- Check Node version: `node --version` (need v20+)
- Clear cache: `rm -rf .next`
