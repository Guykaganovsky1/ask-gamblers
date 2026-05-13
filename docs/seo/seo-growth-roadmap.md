# Ask Gamblers SEO Growth Roadmap

Status: working plan, not a public page.
Updated: 2026-05-13

## Priority 1: Indexing and measurement

- Verify `askgamblers.co.il` as a domain property in Google Search Console.
- Submit `https://askgamblers.co.il/sitemap.xml`.
- Inspect the homepage, `/casinos`, `/bonuses`, and the top casino review URLs after each deploy.
- Add the Google verification token with `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel. The code now renders the verification meta tag when this env var exists.
- Track these weekly: indexed pages, excluded pages, top queries, CTR below 2%, pages with impressions but low clicks, and any crawl errors.

## Priority 2: Money keyword landing pages

Drafts are prepared but intentionally unpublished in `docs/seo/landing-page-drafts/`.

Publish only after review:

- `casino-online-israel` for `קזינו אונליין בישראל`
- `casino-signup-bonus` for `בונוס הרשמה לקזינו`
- `fast-withdrawal-casinos` for `קזינו עם משיכה מהירה`
- `safe-online-casino` for `קזינו בטוח`
- `casino-comparison` for `השוואת קזינו אונליין`
- `mobile-casino-israel` for `קזינו במובייל`

Publishing checklist for each page:

- Unique title, meta description, H1, intro answer, FAQ, internal links, and comparison block.
- No fake review/rating schema.
- Only link to `/go/*` with `rel="nofollow sponsored"`.
- Add to sitemap only after final approval.
- Add to footer/nav only if it should receive crawl priority.

## Priority 3: Review quality and trust

Casino pages now support richer trust fields in Sanity:

- `reviewedBy`
- `lastCheckedAt`
- `operatorName`
- `licenseInfo`
- `withdrawalTime`
- `paymentMethods`
- `supportChannels`
- `mobileExperience`

Fill these for every casino review before scaling content. Pages will display the fields only when they exist, so there is no empty UI.

## Priority 4: Internal linking

The homepage now has a topic hub linking users and crawlers into:

- casino comparison and methodology
- bonuses and bonus guide
- payments, games, and mobile casino guides
- responsible gambling and disclosure pages

Next internal-link pass:

- Add 3-5 contextual links inside every long blog guide.
- Link every casino review to 2 related guides and 1 comparison page.
- Link every future landing page back to `/casinos`, `/bonuses`, `/review-methodology`, and 2 related blog guides.

## Priority 5: Authority and backlinks

Targets:

- Hebrew finance, tech, sports, entertainment, and consumer protection publications.
- Casino/software partner pages where editorial listing is allowed.
- Guest expert quotes on payments, responsible gambling, and bonus terms.
- Avoid bulk directory links, comment links, spun articles, and private link networks.

Outreach assets to create:

- A public review methodology explainer.
- A data page about bonus terms and withdrawal rules.
- A comparison table that journalists can cite.

## Priority 6: AI search visibility

The site now has:

- `llms.txt`
- AI-friendly robots directives
- Organization and WebSite schema
- short-answer support for long guides
- stronger entity/trust language

Next steps:

- Add short direct answer blocks to the highest-impression blog posts.
- Keep author and reviewer fields filled.
- Keep brand/entity wording consistent: `Ask Gamblers`, `Ask Gamblers Israel`, `Ask Gamblers ישראל`.

