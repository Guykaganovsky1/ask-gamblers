# Ask Gamblers - Performance Optimization Guide

**Status:** Action Items
**Created:** February 25, 2026
**Priority:** HIGH (Impacts SEO & User Experience)

---

## 1. Quick Wins (Implement This Week)

### 1.1 Framer Motion Optimization
**Current Issue:** Heavy animations can block main thread, increasing INP

**Solutions:**
```typescript
// Use CSS animations instead of Framer Motion for hero:
// Replace:
<motion.div animate={{ opacity: 1 }} />
// With:
<div className="animate-fade-in" />
```

**Action Items:**
- [ ] Audit all Framer Motion usage in hero section
- [ ] Move animations to CSS (@keyframes)
- [ ] Keep Framer Motion for complex interactions only
- [ ] Expected impact: -200ms on first interaction

### 1.2 Image Optimization
**Current Status:** ✅ WebP format confirmed in globals.css

**Additional Optimizations:**
- [ ] Add AVIF format support (better compression)
- [ ] Lazy load images below fold
- [ ] Add explicit width/height to all Next.js Image components
- [ ] Expected impact: -150-300ms on LCP

```typescript
// Already good pattern in code:
<Image
  src={urlFor(casino.logo).width(320).height(160).url()}
  alt={casino.name}
  sizes="(max-width: 768px) 160px, 160px"
/>
```

### 1.3 Code Splitting (Already Implemented ✅)
**Current Status:** Dynamic imports configured

```typescript
// Good pattern already in place:
const FAQSection = dynamic(
  () => import("@/components/sections/faq-section"),
  { loading: () => <div className="min-h-[200px]" /> }
);
```

---

## 2. Core Web Vitals Optimization

### LCP (Largest Contentful Paint) - Target: <2.5s

**Current Setup:** Hero image preload
```html
<link rel="preload" as="image" href="/images/hero-bg.webp" />
```

**Improvements:**
- [ ] Verify hero image is actual LCP element
- [ ] Add CDN headers (Cache-Control: max-age=86400)
- [ ] Serve image from cdn.sanity.io (already configured)
- [ ] Minimize server response time (<200ms)

**Monitoring:**
```bash
# Test locally:
npm run build
npm run start

# Test with PageSpeed Insights:
# https://pagespeed.web.dev/?url=https://askgamblers.co.il
```

### INP (Interaction to Next Paint) - Target: <200ms

**Current Risk:** Framer Motion animations
**Solution:** CSS-first animation approach

```css
/* Use for entrance animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp 0.5s ease-out;
}
```

### CLS (Cumulative Layout Shift) - Target: <0.1

**Current Status:** ✅ Good (fonts preload, explicit sizes)

**Verify:**
- [ ] All images have explicit width/height
- [ ] Fonts use display: swap (already done)
- [ ] Sidebar doesn't cause shift on load
- [ ] No async content causes layout jump

---

## 3. Bundle Size Optimization

### Analyze Current Bundle
```bash
npm run build

# Check output:
# .next/standalone/server/pages/
```

**Current Optimizations (✅ Confirmed):**
- `optimizePackageImports` for Sanity packages
- `optimizePackageImports` for Framer Motion
- Dynamic imports with code splitting

**Additional Measures:**
- [ ] Tree-shake unused Framer Motion features
- [ ] Remove unused Tailwind classes (already configured)
- [ ] Minify CSS and JavaScript (Next.js default)
- [ ] Target: Main bundle <150KB (gzip)

---

## 4. Sanity API Optimization

### Response Time
**Current Setup:** ISR with 60s revalidation

**Optimizations:**
- [ ] Add response caching headers
- [ ] Implement query pagination for large datasets
- [ ] Cache GROQ query results at edge

```typescript
// Already optimized:
export const revalidate = 60; // ISR revalidation

// Consider CDN edge caching:
// Set-Cookie headers for cache-control
```

### Query Optimization
```typescript
// Good practices already implemented:
// ✅ Only select needed fields
// ✅ Limit results: [0...6]
// ✅ Order by field (rating desc)
// ❌ Consider adding pagination for large results
```

---

## 5. Database Performance (Sanity)

### Sanity Best Practices
- [ ] Implement reference expansion efficiently
- [ ] Use field projections (already done)
- [ ] Avoid N+1 queries (use batch references)
- [ ] Cache taxonomy (categories, providers)

**Already Implemented:**
- ✅ Categorized query structure
- ✅ Limited relationships (categories[])
- ✅ Efficient reference fetching

---

## 6. Production Build Checklist

### Before Each Deploy
```bash
# Build production
npm run build

# Check bundle size
du -sh .next

# Verify no console errors
npm run lint

# Type check
npx tsc --noEmit

# Optional: Analyze bundle
npm install --save-dev @next/bundle-analyzer
```

### Environment Verification
- [ ] All required env vars set in production
- [ ] SANITY_WRITE_TOKEN secured (not in code)
- [ ] NEXT_PUBLIC_SITE_URL correct
- [ ] Next.js caching headers configured

---

## 7. Monitoring & Tracking

### Set Up Real User Monitoring
```typescript
// In app/layout.tsx after GA4:
// Add Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

// Send to Google Analytics
getCLS(metric => gtag.event('page_view', { metric }));
getLCP(metric => gtag.event('page_view', { metric }));
```

### Monitor in Google Search Console
- Check Core Web Vitals report monthly
- Track "good", "needs improvement", "poor"
- Target: 75%+ "good" pages

---

## 8. Performance Testing Tools

### Free Tools
- **Google PageSpeed Insights:** https://pagespeed.web.dev
- **Google Lighthouse:** Built into Chrome DevTools
- **Web Vitals Extension:** https://chrome.google.com/webstore
- **GTmetrix:** https://gtmetrix.com

### Recommended Paid Tools
- **Databox:** Monitor KPIs
- **Speedcurve:** Continuous monitoring
- **Calibre:** Automated testing

---

## 9. Optimization Roadmap

### Week 1: Foundation
- [ ] Audit current Core Web Vitals (use PageSpeed)
- [ ] Optimize Framer Motion animations
- [ ] Add performance monitoring code
- [ ] Document baseline metrics

### Week 2: Optimization
- [ ] Implement CSS animations
- [ ] Verify image optimization
- [ ] Test bundle size reduction
- [ ] Measure improvement

### Week 3+: Monitoring
- [ ] Set up real user monitoring
- [ ] Track metrics weekly
- [ ] Identify and fix regressions
- [ ] Document improvements

---

## 10. Expected Impact

### Before Optimization (Estimated)
- **LCP:** 2.8-3.2s
- **INP:** 250-350ms (high with animations)
- **CLS:** 0.08 (acceptable)
- **Bundle:** 180-220KB (gzip)

### After Optimization (Target)
- **LCP:** <2.5s ✅
- **INP:** <150ms ✅
- **CLS:** <0.05 ✅
- **Bundle:** <130KB ✅

### SEO Impact
- +5-10% CTR improvement
- Reduced bounce rate on mobile
- Improved rankings for performance-sensitive queries
- Better mobile user engagement

---

## 11. Ongoing Monitoring Checklist

### Daily
- [ ] No errors in production logs
- [ ] Performance metrics stable

### Weekly
- [ ] Check Core Web Vitals (PageSpeed)
- [ ] Monitor Sanity API response times
- [ ] Review error logs

### Monthly
- [ ] Full performance audit
- [ ] Competitive benchmark
- [ ] User experience testing

---

**Next Action:** Implement Week 1 items
**Responsible:** Frontend Team
**Review Date:** March 4, 2026

