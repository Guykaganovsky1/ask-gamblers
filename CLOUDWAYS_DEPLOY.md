# Deploy to Ask Gamblers

## Quick Deploy (Just push to GitHub)

```bash
git add .
git commit -m "Your changes"
git push
```

**Done!** The server auto-deploys within 1 minute.

---

## Manual Deploy (if needed)

```bash
sshpass -p 'Hdu483hfe' ssh -o StrictHostKeyChecking=no contact@adimpress.me@178.62.56.62
./deploy.sh
```

Or run on server:
```bash
./deploy.sh
```

---

## What happens automatically

Every minute, the server:
1. Pulls latest from GitHub
2. Restarts the app

No manual restart needed!
