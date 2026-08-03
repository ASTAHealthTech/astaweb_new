# ASTA Health Tech — SEO Best Practices (Signal Path rebuild)

Content stays unchanged, so this is purely the technical/on-page layer to bake in while rebuilding the design. Since the new theme is dark + animation-driven, a few points below exist specifically to stop that from hurting SEO.

---

## 1. Technical foundations
- Single canonical URL per page (`<link rel="canonical">`), no duplicate content across www/non-www or trailing slash variants.
- `robots.txt` allowing crawl, with an XML sitemap submitted to Google Search Console and Bing Webmaster Tools.
- Descriptive, unique `<title>` (50–60 chars) and `<meta name="description">` (150–160 chars) per page — pull from existing copy, don't invent new claims.
- Use real semantic HTML: one `<h1>` per page, logical `<h2>/<h3>` nesting matching the existing section order — don't skip levels just to hit a font size.
- Server-render or pre-render the page (Next.js/Astro/SSG) rather than a pure client-rendered SPA, so crawlers see full content without executing JS.

## 2. Structured data (schema.org, JSON-LD)
- `Organization` schema with logo, name, sameAs (LinkedIn, socials).
- `SoftwareApplication` or `MedicalDevice`/`Product` schema for the ASTA platform itself — pick whichever matches how you legally describe the product.
- `BreadcrumbList` if you add sub-pages later.
- If the compliance/audit section has genuine FAQ-style content, mark it up as `FAQPage` — only if it's real Q&A, not invented.

## 3. Performance / Core Web Vitals — dark theme specific
The Signal Path gradient animation and mono-heavy layout are cheap if built right, expensive if not:
- Animate the Signal Path with CSS transforms/opacity or a lightweight SVG stroke-dashoffset trick — not a canvas/WebGL loop running continuously. It should run once and stop (per the design spec), so there's no ongoing CPU/battery cost post-load.
- Self-host `Sora`, `Inter`, and `JetBrains Mono` as `woff2` with `font-display: swap` — three custom font families is the most common Core Web Vitals killer on a rebuild like this.
- Reserve space for every image/panel (explicit width/height or aspect-ratio) to keep CLS near zero, especially around the animated Signature Element.
- Compress the logo and any hero imagery to WebP/AVIF; the gradient mark compresses well as SVG — use SVG for the logo, not a PNG.
- Target LCP < 2.5s, CLS < 0.1, INP < 200ms. Test with PageSpeed Insights / Lighthouse on the actual hosted build, not just locally.

## 4. Accessibility (directly affects SEO ranking signals + is a legal/compliance concern for a health product)
- Dark backgrounds are where contrast most often quietly fails. Check these ratios before shipping:
  - `text-primary` (#F4F1F7) on `bg-void` (#08070C) — passes easily.
  - `text-secondary` (#948DA3) on `bg-void` — borderline; test with a contrast checker and darken/lighten if it dips under 4.5:1 for body-sized text.
  - `accent-live` (#E8447A) on `bg-void` for link text — check it meets 4.5:1, not just 3:1 (large-text threshold).
- Visible keyboard focus rings using `accent-live`, not just a color change (add an outline/glow so keyboard users can actually see it against the dark background).
- All interactive elements reachable by keyboard/tab order matching visual order.
- `alt` text on every real image (logos, diagrams) — descriptive, not keyword-stuffed.
- Respect `prefers-reduced-motion` (already in the design spec) — also helps avoid vestibular-disorder complaints, which Google's page-experience signals do factor in indirectly via user behavior.

## 5. On-page / content layer
- Keep existing headings and copy exactly as-is (per the brief), but make sure the new heading hierarchy in code matches the visual hierarchy in the design — don't let a styled `<div>` stand in for what should be an `<h2>`.
- Internal linking: nav and footer links should be real `<a href>` tags (not JS-only `onClick` navigation) so crawlers can follow them.
- Image-based text (e.g. the logo, any stat graphics) should still have the real number/word as text in the DOM somewhere, not only baked into an SVG/image with no text fallback.

## 6. Post-launch
- Verify domain in Google Search Console + Bing Webmaster Tools, submit sitemap.
- Run Lighthouse + PageSpeed Insights right after launch to catch regressions from the new animation/font stack before they sit live for weeks.
- Set up basic analytics (GA4 or privacy-friendlier alternative) to track Core Web Vitals field data (CrUX) over time, not just lab scores.
