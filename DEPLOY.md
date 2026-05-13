# Ask Gamblers - Deploy Guide

## Current Production

Production is on Vercel, not Cloudways.

- Production domain: `https://askgamblers.co.il`
- Vercel project: `toptips-projects-8567ecd8/ask-gamblers`
- Vercel project id: `prj_dyDjNFrgGFAYqV892bKtLOjnbs6Z`

---

## Deploy From This Machine

Use the Vercel CLI:

```bash
vercel deploy --prod --scope toptips-projects-8567ecd8
```

If using a token:

```bash
VERCEL_TOKEN=<token> vercel deploy --prod --scope toptips-projects-8567ecd8
```

Do not commit tokens to the repo.

---

## Normal Change Flow

```bash
npm run build
git add <files>
git commit -m "Describe change"
git push origin main
vercel deploy --prod --scope toptips-projects-8567ecd8
```

---

## Troubleshooting

**Build fails?**
- Check Vercel build logs.
- Confirm the project is linked to `toptips-projects-8567ecd8/ask-gamblers`.
- Confirm required Vercel environment variables are set.
- Run `npm run build` locally before deploying.
