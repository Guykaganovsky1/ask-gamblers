# Cloudways Git Deployment

## Setup (One-time)

1. Go to **Cloudways Console** → Your App → **Git Deployment**
2. Click **Connect GitHub**
3. Select repo: `Guykaganovsky1/ask-gamblers`
4. Select branch: `main`
5. Click **Connect**

## Deploy

```bash
# Just push to GitHub - Cloudways will pull automatically
git add .
git commit -m "Your changes"
git push
```

Then go to Cloudways Console → Click **Deploy** (or it auto-deploys).

## If Build Fails

If Cloudways doesn't build automatically, manually trigger from Cloudways Console:
1. Go to your app
2. Click **Deploy**
3. Select the commit

## Manual Deploy (Alternative)

If Git Deployment isn't working, connect via SSH and run:

```bash
sshpass -p 'Hdu483hfe' ssh -o StrictHostKeyChecking=no contact@adimpress.me@178.62.56.62
cd /home/1553018.cloudwaysapps.com/dzdatjcdrp/public_html
git pull origin main
npm run build
# Restart from Cloudways Console
```
