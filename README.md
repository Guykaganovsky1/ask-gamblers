# Ask Gamblers

Hebrew RTL casino affiliate website built with Next.js 16, Sanity CMS, and Tailwind CSS.

## Quick Start

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment

### Vercel Production

Production is hosted on Vercel:

- Production domain: `https://askgamblers.co.il`
- Vercel project: `toptips-projects-8567ecd8/ask-gamblers`
- Production deploys should go through Vercel, not Cloudways.

Required Vercel environment variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `NEXT_PUBLIC_SITE_URL`

Manual production deploy, if needed:

```bash
vercel deploy --prod --scope toptips-projects-8567ecd8
```

## Tech Stack

- Next.js 16 (App Router)
- Sanity v5 (Headless CMS)
- Tailwind CSS v4
- Framer Motion

---

# askgamblers.co.il
