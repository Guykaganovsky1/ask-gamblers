# Ask Gamblers Brand Guidelines

## Logo System

### Primary Logo
**File:** `public/ask-gamblers-logo.svg`
- Full horizontal logo with icon, wordmark, and tagline
- Use for main branding (headers, hero sections, partnerships)
- Minimum width: 200px
- Preserves all design elements

### Icon Mark (Symbol Only)
**File:** `public/logo-mark.svg`
- Square icon format
- Use for favicon, social media avatars, app icons
- Works at sizes: 16px, 32px, 48px, 64px, 128px, 256px

### Favicon
**File:** `public/favicon.svg`
- Simplified shield design
- Optimized for browser tab display (16x16px)

---

## Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Gold (Primary)** | `#D4AF37` | Shield, primary branding, accents |
| **Emerald (Accent)** | `#00E676` | Center dot, tagline, CTAs, highlights |
| **Background** | `#0A0A0F` | Dark navy - matches site theme |
| **Text** | `#F5F5F5` | Off-white for contrast and readability |

### Color Combinations
- **On Dark Background:** Gold + Emerald (current)
- **On Light Background:** Invert to grayscale or use solid gold

---

## Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| "Ask" | Arial | 900 | 48px |
| "Gamblers" | Arial | 900 | 48px (Gold) |
| Tagline | Arial | 600 | 11px (Emerald) |

---

## Logo Spacing & Clearance

- Minimum clear space (padding): **8px** around all edges
- Icon + wordmark combined height: **120px**
- Accent line width: **2px**

---

## Usage Rules

✅ **DO:**
- Use high-quality SVG format
- Maintain aspect ratio when scaling
- Use full logo on white/light backgrounds
- Use icon mark for small applications (< 64px)
- Ensure 4.5:1 minimum contrast (WCAG AA)

❌ **DON'T:**
- Distort or skew the logo
- Change colors (except for accessibility conversions)
- Add effects (shadows, glows) without approval
- Place logo on busy backgrounds without contrast
- Resize below 16px width for icon mark

---

## Implementation

### HTML Usage
```html
<!-- Primary Logo -->
<img src="/ask-gamblers-logo.svg" alt="Ask Gamblers" />

<!-- Icon Mark -->
<img src="/logo-mark.svg" alt="Ask Gamblers" width="32" height="32" />

<!-- Favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

### CSS Background
```css
.logo {
  background: url('/ask-gamblers-logo.svg') no-repeat;
  background-size: contain;
  width: 400px;
  height: 200px;
}
```

---

## Brand Personality

**Modern | Bold | Geometric | Trustworthy | Premium**

The shield symbolizes safety and protection — core values for a casino affiliate trusted by Israeli players. The gold + emerald combination conveys luxury and winning potential while the geometric dice represent clear odds and fair play.

---

**Last Updated:** February 25, 2026
