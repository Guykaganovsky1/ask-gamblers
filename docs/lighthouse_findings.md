# Lighthouse Audit Findings & Optimization Report

This report summarizes the performance, accessibility, SEO, best practices, and agentic crawling findings from the local Lighthouse audit for **askgamblers.co.il**, detailing the specific code-level fixes required to resolve each issue.

---

## 1. Audit Score Overview

| Category | Score | Status | Key Opportunity |
| :--- | :---: | :---: | :--- |
| **Performance** | 84% | Needs Improvement | Improve LCP and restore Back/Forward Cache |
| **Accessibility** | 96% | Excellent | Fix color contrast on theme accent links |
| **Best Practices** | 100% | Optimal | Fully compliant |
| **SEO** | 100% | Optimal | Fully compliant |
| **Agentic Browsing** | 67% | Needs Improvement | Fix links format in `llms.txt` |

---

## 2. Detailed Findings & Specific Fixes

### Finding A: Largest Contentful Paint (LCP) is 4.3s (Score: 0.42)

* **Issue**: The LCP element is the hero background image (`public/images/hero-bg.webp`) rendered by the Next.js `/_next/image` endpoint. Lighthouse flags that the preload request is missing `fetchpriority="high"`.
* **Impact**: 4.3 seconds is in the "poor" threshold. A slow LCP delays the visual loading state of the site, hurting user experience and search ranking.
* **Code Location**: Homepage hero image component.
* **Fix**: Ensure that the background image in your hero component has the `priority` attribute and explicitly uses `fetchPriority="high"`.
  ```tsx
  // Example fix in your hero image element:
  <Image
    src="/images/hero-bg.webp"
    alt="בתי קזינו מובילים בישראל - Ask Gamblers"
    fill
    priority // Generates a preload tag
    fetchPriority="high" // Injects fetchpriority="high" into the link/img elements
    className="absolute inset-0 object-cover opacity-100"
  />
  ```

---

### Finding B: Color Contrast Failures (Score: 0)

* **Issue**: Background and foreground colors do not have a sufficient contrast ratio. 
* **Impact**: Renders text illegible for visually impaired users, dropping the accessibility score.
* **Specific Failures**:
  - The "מדריך מהיר" text in `components/sections/seo-topic-hub.tsx` (Line 40) is styled with `text-accent`.
  - The buttons in the `SeoTopicHub` grid (Line 60) are styled with `text-accent` and `border-accent/25`.
* **Root Cause**: In [app/globals.css](file:///Users/guykaganovsky/.openclaw/workspace/ask-gamblers/app/globals.css), `--color-accent` is defined as purple (`#9333EA`). This purple text has a **2.3:1 contrast ratio** against the very dark backgrounds (`#0B0E14` and `#131825`), which is below the WCAG AA minimum of **4.5:1**.
* **Fix**: Change the classes to use the light accent variant (`text-accent-light`, defined as `#D8B4FE` in your theme) for text elements on dark backgrounds. This achieves a **10+:1 contrast ratio** (WCAG AAA compliant).
  ```tsx
  // In components/sections/seo-topic-hub.tsx:
  // Before:
  <p className="text-sm font-bold text-accent">מדריך מהיר</p>
  
  // After:
  <p className="text-sm font-bold text-accent-light">מדריך מהיר</p>
  ```
  And for the grid links:
  ```tsx
  // Before:
  className="rounded-lg border border-accent/25 px-3 py-2 text-sm font-bold text-accent transition-colors hover:bg-accent/10"
  
  // After:
  className="rounded-lg border border-accent-light/25 px-3 py-2 text-sm font-bold text-accent-light transition-colors hover:bg-accent-light/10"
  ```

---

### Finding C: Back/Forward Cache (bf-cache) Failure (Score: 0)

* **Issue**: Lighthouse identified two failure reasons preventing the page from using the Back/Forward Cache:
  1. `MainResourceHasCacheControlNoStore` (The main page returns `Cache-Control: no-store`).
  2. `JsNetworkRequestReceivedCacheControlNoStoreResource` (Some subresources return `no-store`).
* **Impact**: When users click a casino card and then press the browser's "back" button, the page must do a full reload instead of restoring instantly, resulting in lag.
* **Fix**: Ensure that the Next.js standalone server does not add `no-store` headers to pages unless they are highly dynamic or user-specific. You can configure custom cache headers in `next.config.ts` or at your CDN/Cloudways Nginx proxy level to allow `must-revalidate` rather than forcing a strict `no-store` on static content.
* **Resolution (2026-06-12)**: Verified as a measurement artifact — no code change needed. The `no-store` headers came from auditing the local dev server (`next dev` always emits `Cache-Control: no-store` on HTML and JS chunks). Production was verified directly: `curl -sI https://askgamblers.co.il/` returns `cache-control: public, max-age=0, must-revalidate` with a Varnish `age` header — bfcache-eligible, no `no-store`. Adding an HTML-route `headers()` rule in `next.config.ts` would conflict with Next.js's own ISR Cache-Control handling and risk breaking working cache behavior. **Action: re-run Lighthouse against the production URL, not localhost.**

---

### Finding D: llms.txt Format Error (Score: 0)

* **Issue**: The `llms.txt` audit flagged that the file does not follow recommendations: **"File does not appear to contain any links."**
* **Root Cause**: In [public/llms.txt](file:///Users/guykaganovsky/.openclaw/workspace/ask-gamblers/public/llms.txt), key pages are written as text or code blocks (e.g. `` - `/casinos` ``). LLM crawling specifications require actual Markdown link tags (e.g. `[link text](url)`) to discover resources.
* **Fix**: Edit `public/llms.txt` to format all routes as markdown links:
  ```markdown
  ### Key Pages
  - [/casinos](https://askgamblers.co.il/casinos) - Full casino directory with reviews
  - [/blog](https://askgamblers.co.il/blog) - Blog posts about casinos and gaming
  - [/bonuses](https://askgamblers.co.il/bonuses) - Current casino promotions and bonuses
  ```

---

## 3. Recommended Roadmap

1. **Immediate (10 minutes)**: Update `components/sections/seo-topic-hub.tsx` to use `text-accent-light` to instantly fix the accessibility score.
2. **Immediate (10 minutes)**: Format `public/llms.txt` routes as Markdown links to fix the Agentic Browsing score.
3. **High Priority (15 minutes)**: Add `priority` and `fetchPriority="high"` attributes to the hero section image to optimize LCP.
4. **Medium Priority**: Investigate Next.js/CDN Cache-Control headers to resolve the Back/Forward cache warnings.
