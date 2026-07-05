# Social and Backlink Plan

This plan closes the audit items that cannot be solved by code alone: social profile discovery, backlinks, referring domains, and authority signals.

## 1. Social Profile Setup

Create or confirm official Ask Gamblers Israel profiles with consistent branding, name, logo, description, and URL back to `https://askgamblers.co.il`.

Target profiles:

| Platform | Handle target | Purpose |
| --- | --- | --- |
| Facebook | `askgamblersil` or `askgamblers.co.il` | Trust page, page reviews, link citation |
| Instagram | `askgamblers.co.il` | Short visual explainers and responsible gambling reminders |
| YouTube | `@askgamblersil` | Long-form explainers and Shorts |
| X | `askgamblers_il` | News reactions, guide distribution, fast updates |
| LinkedIn | `askgamblers-israel` | Brand legitimacy and partner/outreach credibility |

After the profiles exist, set these Vercel environment variables and redeploy:

```txt
NEXT_PUBLIC_FACEBOOK_URL=https://www.facebook.com/<profile>
NEXT_PUBLIC_YOUTUBE_URL=https://www.youtube.com/@<channel>
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/<profile>/
NEXT_PUBLIC_X_URL=https://x.com/<profile>
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/company/<profile>/
```

The site will automatically render footer links and add the same URLs to Organization `sameAs` structured data.

## 2. Social Content Cadence

Use the existing site content as the content engine. Do not post gambling-win promises or fake success claims.

Weekly cadence:

| Day | Asset | Platforms | Link target |
| --- | --- | --- | --- |
| Sunday | One casino-safety checklist | LinkedIn, Facebook, X | `/review-methodology` |
| Monday | Bonus terms explainer | Instagram carousel, YouTube Short | `/bonuses` |
| Tuesday | Payment-method guide snippet | X thread, Facebook | relevant blog post |
| Wednesday | Responsible gambling reminder | all platforms | `/responsible-gambling` |
| Thursday | New article/news summary | X, Facebook, LinkedIn | `/news` or `/blog/<slug>` |
| Friday | Top 3 things to check before registering | Instagram Reel, YouTube Short | `/casinos` |

Monthly minimum output:

| Format | Count |
| --- | ---: |
| X posts/threads | 20 |
| Facebook posts | 8 |
| Instagram carousels/Reels | 8 |
| YouTube Shorts | 4 |
| LinkedIn posts | 4 |

## 3. Backlink Targets

Prioritize relevant, durable links over generic directories or paid link packages.

Tier 1 targets:

| Target type | Goal | Asset to pitch |
| --- | --- | --- |
| Israeli business directories | Foundational citations | Homepage or `/about` |
| Hebrew tech/consumer blogs | Editorial link | casino safety checklist |
| Responsible gambling resources | Trust link | `/responsible-gambling` |
| Payment/fintech explainers | Contextual link | payment methods guide |
| Gaming/casino affiliate directories | Niche citation | homepage or `/casinos` |

Tier 2 targets:

| Target type | Goal | Asset to pitch |
| --- | --- | --- |
| Guest posts | Contextual authority | guide about reading casino bonus terms |
| Podcast/newsletter mentions | Brand awareness | data-backed casino checklist |
| Broken-link outreach | Link reclamation | replacement guide pages |
| Competitor-link gap | Copy proven sources | pages linking to competing casino guides |

## 4. Linkable Assets to Build

Create these assets before outreach so pitches have something worth linking to:

| Asset | URL | Why it earns links |
| --- | --- | --- |
| Casino bonus terms checklist | `/blog/...` | Practical and non-promotional |
| Payment methods comparison | `/blog/...` | Helps Israeli users compare deposits/withdrawals |
| Responsible gambling resource page | `/responsible-gambling` | Trust/compliance citation |
| Casino review methodology | `/review-methodology` | Transparency asset |
| Israeli casino glossary | `/blog/...` | Evergreen Hebrew search asset |

## 5. Measurement

Track progress weekly in Google Search Console or Ahrefs Webmaster Tools.

KPIs:

| Metric | 30-day target | 90-day target |
| --- | ---: | ---: |
| Live social profile links | 5 | 5 |
| Referring domains | 5-10 | 25-40 |
| Quality dofollow links | 2-4 | 10-15 |
| Branded social mentions | 10 | 50 |
| Toxic/spam links | 0 pursued | 0 pursued |

Avoid:

| Tactic | Reason |
| --- | --- |
| Bulk directory blasts | Low quality and possible spam footprint |
| Exact-match anchor buying | Penguin/over-optimization risk |
| Fake social profiles or broken links | Trust and audit risk |
| Gambling-win promises | Compliance and credibility risk |
