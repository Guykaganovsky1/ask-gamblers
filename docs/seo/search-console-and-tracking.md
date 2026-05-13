# Search Console And Ranking Tracking

Status: working plan, not a public page.
Updated: 2026-05-13

## Google Search Console setup

1. Add a Domain property for `askgamblers.co.il`.
2. Verify via DNS, or set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel and use the HTML tag method.
3. Submit `https://askgamblers.co.il/sitemap.xml`.
4. Inspect and request indexing for:
   - `https://askgamblers.co.il/`
   - `https://askgamblers.co.il/casinos`
   - `https://askgamblers.co.il/bonuses`
   - the top 10 casino review URLs
   - the top 10 blog guide URLs

## Weekly tracking sheet columns

- Date
- Query
- Page
- Position
- Impressions
- Clicks
- CTR
- Change from last week
- Action needed

## Fix rules

- High impressions, low CTR: improve title and description.
- Position 8-20: add internal links, FAQ, and stronger intro answer.
- Position 20-50: improve depth, add comparison table, and build backlinks.
- Indexed but no impressions: check keyword targeting and internal links.
- Crawled but not indexed: improve uniqueness, word count, and trust signals.

