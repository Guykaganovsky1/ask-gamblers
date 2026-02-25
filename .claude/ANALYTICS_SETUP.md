# Ask Gamblers - Analytics & SEO Tracking Setup

**Status:** Setup Required
**Created:** February 25, 2026

---

## 1. Google Analytics 4 Setup

### Installation

Add GA4 tracking code to `app/layout.tsx`. Use Next.js Script component with strategy="afterInteractive" and insert your GA4 measurement ID.

### Environment Variable Required
```env
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXX
```

### Get Your GA4 ID
1. Go to Google Analytics (analytics.google.com)
2. Create new account (or use existing)
3. Create web property for "askgamblers.co.il"
4. Copy Measurement ID (starts with "G-")

---

## 2. Key Metrics to Track

### Business Goals (Conversions)
- Track affiliate clicks by casino name and source
- Track internal navigation patterns
- Track casino card interactions
- Track category page engagement

### Content Performance
- **Page views** by section (blog, casinos, categories)
- **Scroll depth** on blog posts and casino pages
- **Click-through rate** on casino cards
- **Affiliate link clicks** by casino

### User Behavior
- **New vs Returning** visitor split
- **Bounce rate** by page type
- **Session duration** by content type
- **Conversion path** (multi-touch attribution)

### Technical Metrics
- **Page load time** vs bounce rate correlation
- **Core Web Vitals** impact on engagement
- **Device type** (mobile vs desktop engagement)

---

## 3. Google Search Console Setup

### Connection to Analytics
1. Go to Google Search Console (search.google.com/search-console)
2. Add property: "https://askgamblers.co.il"
3. Link to GA4 in GSC settings
4. Verify ownership via DNS record or HTML file

### Key Reports to Monitor

**Performance Tab (Monthly)**
- Total Clicks (organic traffic indicator)
- Total Impressions (visibility)
- Average CTR (meta description optimization)
- Average Position (ranking progress)
- Clicks by Query (keyword performance)
- Clicks by Page (content performance)

**Coverage Tab (Monthly)**
- Valid pages (ensure all pages indexed)
- Excluded: Check for accidentally blocked pages
- Errors: Fix crawl/indexing issues immediately
- Sitemap submission status

**Enhancements Tab (Quarterly)**
- Mobile usability
- Structured data validation
- Breadcrumb navigation

### Revalidation Webhook (Already Configured)
- Endpoint: `/api/revalidate?secret=<token>`
- Triggered by: Sanity CMS updates
- Purpose: Refreshes ISR cache on content changes
- **Status:** ✅ Already configured in CLAUDE.md

---

## 4. Affiliate Tracking Implementation

### Click Tracking (Already Implemented)
```
Route: /go/[casino-slug]
Purpose: Track clicks before redirecting to affiliate URL
Implementation:
  1. Fetch real affiliate URL from Sanity
  2. Increment clicks counter (requires SANITY_WRITE_TOKEN)
  3. Redirect to affiliate URL
```

### Enhanced Tracking
Add UTM parameters for deeper tracking:
- utm_source=askgamblers
- utm_medium=affiliate
- utm_campaign=[campaign_name]
- utm_content=[placement]

### Sample Tracking Data Structure
```
GA4 Events to create:
1. affiliate_click
   - casino_name
   - source_page (blog, casino_review, etc)
   - placement (featured, sidebar, etc)

2. bonus_viewed
   - casino_name
   - bonus_amount
   - wagering_requirement

3. form_submission (if adding email signups)
   - email_captured
   - source_campaign
```

---

## 5. Custom Dashboards for Monitoring

### SEO Dashboard (Daily Check - 5 min)
1. Any new indexed pages? (GSC Coverage)
2. Any crawl errors? (GSC Errors)
3. Traffic vs. yesterday? (GA4 > Realtime)
4. Top traffic source? (GA4 > Traffic Source)

### Content Performance Dashboard (Weekly)
1. Which blog posts drove traffic?
2. Which casinos got most clicks?
3. What's the bounce rate trend?
4. Top 10 pages by traffic?

### Keyword Tracking Dashboard (Weekly/Monthly)
1. Target keyword positions (using Ahrefs/SEMrush)
2. Ranking progress toward top 10
3. Competitor position changes
4. New keyword opportunities

---

## 6. Implementation Roadmap

### Phase 1: Week 1 (CRITICAL)
- [ ] Set up Google Analytics 4 account
- [ ] Add GA4 tracking code to next/app layout
- [ ] Verify data collection in GA realtime
- [ ] Connect GSC (already verified likely)
- [ ] Add NEXT_PUBLIC_GA_ID to .env.local

### Phase 2: Week 2 (HIGH)
- [ ] Create GA4 custom events for:
  - Casino clicks (affiliate tracking)
  - Blog post engagement
  - Category page views
- [ ] Set up conversion goals in GA4
- [ ] Configure GSC to show in GA4

### Phase 3: Week 3 (MEDIUM)
- [ ] Set up keyword rank tracking tool
- [ ] Create monitoring dashboard in GA4
- [ ] Configure automated reporting (weekly emails)
- [ ] Add UTM parameters to internal links

### Phase 4: Week 4 (ONGOING)
- [ ] Weekly GSC review for errors
- [ ] Monthly ranking report
- [ ] Quarterly strategy reviews based on data

---

## 7. Recommended Tools

### Free Tools (Current Setup)
- ✅ Google Analytics 4 (free)
- ✅ Google Search Console (free)
- ✅ Google PageSpeed Insights (free)

### Recommended Additional Tools (Paid)

**For Keyword Tracking ($99-299/month):**
- Ahrefs (Rank Tracker)
- SEMrush (Position Tracking)
- Moz Pro (Keyword Tracker)

**For Backlink Monitoring ($99-299/month):**
- Ahrefs (Backlink Audit)
- SEMrush (Backlink Analytics)

**For Content Optimization (Free-$50/month):**
- Surfer SEO
- Clearscope
- MarketMuse

---

## 8. GA4 Custom Events

### Events to Implement
- casino_click: When user clicks affiliate link
- blog_read: When user engages with blog content
- category_view: When user browses category
- bonus_viewed: When user sees bonus offer
- form_submission: For any forms (email, signups)

### Event Properties
Each event should track:
- event_category (engagement, content, affiliate)
- event_label (specific name/title)
- source (where action originated)
- value (optional numeric value)

---

## 9. Monthly Reporting Template

### Report Date: _______

**Traffic Summary**
- Sessions: ___
- Users: ___
- Page views: ___
- Bounce rate: ___%
- Avg session duration: ___

**Top Performing Content**
1. ________________ (_____ sessions)
2. ________________ (_____ sessions)
3. ________________ (_____ sessions)

**Organic Traffic**
- Sessions from organic: _____
- Top keywords: ________________
- New ranking keywords: ________

**Affiliate Performance**
- Total casino clicks: _____
- Top casino: ________
- Best source: ________

**Opportunities**
- Pages with high bounce rate: ___
- Keywords ranking 11-20 (ready for optimization): ___
- Content gaps identified: ___

---

## 10. Success Criteria (6-Month)

✅ **Targets**
- [ ] 500+ monthly organic sessions (baseline)
- [ ] 15+ keywords in top 10
- [ ] 40-60% organic traffic increase
- [ ] <2% bounce rate on casino pages
- [ ] >3 min avg session on blog posts

---

**Next Action:** Implement Phase 1 this week
**Responsible:** Development Team
**Review Date:** Monthly on 25th
