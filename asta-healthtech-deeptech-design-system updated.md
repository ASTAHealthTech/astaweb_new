# ASTA Health Tech — "Signal Path" Design System
### Deep-tech AI positioning · design-only revamp · content unchanged

---

## Why this theme (3 lines)

ASTA's product is a computer-vision + AI pipeline that turns raw pixels off any bedside monitor into structured, trustworthy clinical signal — so the site should read like the *output* of that pipeline, not like a hospital-equipment brochure. Instead of borrowing literal monitor furniture (bezels, ECG traces, green/cyan vitals as decor), the signature visual is the logo's own four-stop gradient running through the page as an animated "signal" — connecting the brand mark directly to the product story: pixels in, structured signal out. Everything else stays dark, technical, and monospace-driven, so ASTA reads as an AI infrastructure company that happens to operate in healthcare, not a MedTech device vendor — closer to how a YC deeptech/infra startup (Modal, Baseten, an OpenPipe or Hegel-AI style site) presents itself than a clinical SaaS template.

This deliberately does **not** fully reuse the earlier "clinical instrument" brief — that version borrowed monitor-bezel and vitals-panel literalism as its signature. Here the signature is pulled from the *brand mark* instead, so the AI/deeptech read comes first and the healthcare context comes second.

---

## 0. Brand mark reference

- **Mark**: four rounded-rectangle petals forming a plus/cross, gradient amber → coral → magenta → violet, rounded terminals, no sharp corners.
- **Wordmark**: heavy geometric sans, tight, rounded terminals, all-caps, two-line lockup (ASTA / HEALTH TECH).
- **Design inference from the mark**: rounded geometry (not the sharp/hairline instrument look), a 4-stop warm-to-cool gradient as the one bold color move, and enough contrast to sit on near-black.

---

## 1. Color tokens

| Token | Hex | Use |
|---|---|---|
| `bg-void` | `#08070C` | Page background — near-black, warm-neutral undertone (not clinical navy) |
| `bg-panel` | `#100E17` | Card / panel surface |
| `bg-panel-raised` | `#17141F` | Nested panels, modals, sticky nav |
| `border-hairline` | `#241F2E` | All borders, dividers — 1px only |
| `text-primary` | `#F4F1F7` | Headlines, body |
| `text-secondary` | `#948DA3` | Supporting copy, captions |
| `signal-amber` | `#F5A623` | Gradient stop 1 (from logo) |
| `signal-coral` | `#F1573B` | Gradient stop 2 |
| `signal-magenta` | `#D8267A` | Gradient stop 3 |
| `signal-violet` | `#6C2C93` | Gradient stop 4 |
| `accent-live` | `#E8447A` | Flat everyday UI accent (links, focus rings, hover) — sampled from the gradient midpoint so UI never needs the full gradient just to be interactive |
| `state-ok` | `#34D399` | Success / normal-range data states |
| `state-info` | `#38BDF8` | Informational data states |
| `state-warn` | `#FBBF24` | Threshold / warning states |
| `state-critical` | `#F87171` | Escalation states only |

**Rules:**
1. The full 4-stop `signal-*` gradient appears in exactly three places: the logo itself, the primary CTA fill, and the Signature Element (§5). It is never used as a page-background wash or section divider — that's the "generic AI gradient hero" default this brief is avoiding.
2. `accent-live` (flat magenta) is the everyday interactive color — links, focus states, active nav, hover.
3. `state-*` tokens are reserved strictly for real data/status values in the actual product content (queue status, compliance results, uptime) — never decorative. Deliberately named `state-*`, not `vital-*`, to keep the framing "AI system status," not "hospital monitor."

---

## 2. Typography

| Role | Face | Notes |
|---|---|---|
| Display (H1/H2) | `Sora` (fallback `General Sans`, `Inter`) | Semibold, tight tracking (-1.5% to -2%), rounded terminals to echo the wordmark's geometry. Size carries the weight — avoid maxing out boldness. |
| Body | `Inter` | 16–18px, 1.6 line-height, humanist and neutral so the display face and mono face do the personality work |
| Mono (data/technical) | `JetBrains Mono` (fallback `IBM Plex Mono`) | Every number, timestamp, eyebrow label, log line, badge, nav item counter — this is the "deeptech tell": mono typography is what separates an AI-infra site from a generic SaaS site |

**Type scale (desktop):**
- H1: `68px / 1.04`, -2% tracking
- H2: `42px / 1.08`, -1.5% tracking
- H3: `26px / 1.25`
- Body: `17px / 1.6`
- Caption / mono label: `13px / 1.4`, +0.03em letter-spacing, uppercase for eyebrows only

Mobile: scale H1→40px, H2→28px, H3→20px; body and mono unchanged.

---

## 3. Layout

- 12-column grid, 1280px max content width, 88–96px section padding (48px mobile, 64px tablet).
- **Radius — deliberately rounder than a literal "instrument" theme**, matching the logo's rounded plus petals: `16px` on panels/cards, `999px` (full pill) on badges and buttons. This is the clearest visual break from a medical-device aesthetic toward a modern AI-product one.
- Elevation: no drop shadows anywhere. Depth comes from `border-hairline` plus, on the Signature Element only, a soft 10%-opacity glow using the full `signal-*` gradient behind the panel edge.

**Section map** (matches existing page order — copy unchanged):

1. **Nav** — logo left, links center, ghost "Login" + gradient-fill "Request demo" pill right. Transparent until scroll, then `bg-panel-raised` with hairline bottom border.
2. **Hero** — left: headline/subhead/CTAs, eyebrow in mono ("COMPUTER VISION · CLINICAL SIGNAL"). Right: the Signature Element (§5) visualizing raw pixels resolving into structured data — this replaces a literal "vitals monitor" render with something that reads as an AI pipeline in motion.
3. **Trust strip** — AIC-SEED / MeitY / IISER / NIT logos, monochrome, quiet, hairline-divided row, no cards.
4. **"From pixels to clinical action"** — full-width Signal Path showcase at larger scale: camera frame → extraction → reasoning → alert → log, each stage marked with the rounded-plus node glyph instead of a generic icon.
5. **How it works** — the 5 real steps (Capture → Extract → Reason → Alert → Review). Mono `01–05` prefixes, connected by a thin traveling gradient line (not arrows) — numbering is earned here since it's a real sequence.
6. **Platform capabilities** — asymmetric bento grid: 2 large cards (Monitoring, Alerting) + 4 small (Visibility, Compliance, Integration, Deployment). Card radius 16px, hairline borders, no icons where a mono label already says the thing.
7. **Deployment model** — 4 stat blocks (₹0 capex / 24×7 / 100% / <2s) in large mono numerals with small node-glyph mark, count-up once on scroll into view.
8. **Compliance center** — styled as a terminal/log panel: mono timestamp + status tag + message per line, 4%-opacity scanline overlay. This is the one section allowed to feel closest to "instrument," since it's genuinely audit-log content.
9. **Final CTA** — single centered panel, gradient-fill button, no gradient background wash behind it.
10. **Footer** — standard 3-column, mono copyright line, monochrome logo mark.

---

## 4. Components

- **Badge / pill**: mono text, fully rounded, 1px hairline border, no fill unless status is "live" (then `accent-live` at 12% background + solid pulsing dot, pulse plays once).
- **Buttons**: primary = full `signal-*` gradient fill, dark or white text depending on contrast; secondary = ghost pill with hairline border, `accent-live` text. No gradients anywhere else on buttons-adjacent UI.
- **Stat card**: large mono numeral + small sans label in `text-secondary` + tiny rounded-plus node glyph (the logo mark, monochrome, used as a structural bullet — not a stock icon).
- **Data readout card**: mono digits colored by `state-*` token per real data value, small threshold/range caption beneath. No literal ECG waveform decoration — if a waveform appears, it should visually resemble a data/signal trace, not a hospital monitor sweep.
- **Process step**: numbered only because it's a real sequence — mono `01` prefix, thin gradient connector line between steps terminating in a node-glyph, not arrows.
- **Log / terminal panel**: monospace, left-aligned timestamp + status tag + message, 4%-opacity scanline overlay, kept for the compliance section specifically.
- **Trust logo strip**: monochrome, no cards, hairline dividers only.

---

## 5. Signature element — "Signal Path"

A thin line, rendered in the full `signal-*` gradient, threads through every panel that shows real pipeline data (hero visualization, the pixels-to-action showcase, the how-it-works connector, the compliance log). At each meaningful node along the line — a pipeline stage, a data point, a stat — the line terminates in a small rounded-plus glyph: a monochrome or gradient echo of the logo mark itself.

On first scroll into view, the gradient travels once along the path from start to end (like a signal propagating through a circuit), then rests as a static hairline-thin gradient trace. It never loops or idles — a real signal doesn't animate for attention once it has already resolved.

This is the one deliberate departure from the earlier "Live Monitor Frame" concept: instead of framing data panels like a physical bedside-monitor housing (which reads as *medical device*), the Signal Path visualizes the product's actual computational pipeline and ties it directly back to the brand mark (which reads as *AI infrastructure*). This is the single bold move on the page; everything else stays quiet around it.

---

## 6. Motion rules

- Signal Path travel: once, on first view, per panel.
- Stat count-up: once, on scroll into view.
- Live-badge pulse: once, then rests (unless representing a genuinely active real-time status).
- Alert pulse: only on elements representing an actual active escalation in the real content, never ambient.
- No parallax, no floating blobs, no infinite gradient animation, no looping scanlines outside the compliance log section.
- `prefers-reduced-motion` respected — all motion becomes instant reveal.

---

## Ready-to-paste vibecode prompt

```
Redesign this website's visual design only — do not change any copy, headings, or content. Keep every existing section, in the same order, with the same text.

DESIGN DIRECTION: "Signal Path" — a deep-tech AI aesthetic for ASTA Health Tech, a computer-vision + AI company that turns bedside patient-monitor pixels into structured clinical signal. Position it visually as an AI infrastructure company first, healthcare second — think YC deeptech/AI-infra startup site, not a MedTech device brochure. Avoid literal hospital-monitor styling (no ECG-sweep decoration, no monitor-bezel framing as the main visual device).

BRAND MARK: A rounded-plus/cross logo in a 4-stop gradient — amber to coral to magenta to violet — paired with a heavy geometric black wordmark. Pull the site's one signature color move directly from this gradient.

COLORS (use exactly):
- Background: #08070C (near-black, warm-neutral undertone)
- Panel surface: #100E17, raised panel: #17141F
- Hairline borders: #241F2E (1px only, no drop shadows anywhere)
- Primary text: #F4F1F7, secondary text: #948DA3
- Brand gradient (logo, primary CTA, and the signature "Signal Path" element ONLY — never a background wash): #F5A623 → #F1573B → #D8267A → #6C2C93
- Everyday flat UI accent (links, focus rings, hover, active nav): #E8447A
- Real data/status colors (used ONLY on actual data values, never decoratively): success/normal #34D399, info #38BDF8, warning #FBBF24, critical #F87171

TYPOGRAPHY:
- Display/headings: Sora or General Sans (fallback Inter), semibold, tight tracking (-1.5% to -2%), rounded terminals echoing the logo's rounded geometry. Restraint over max boldness.
- Body: Inter, 16-18px, 1.6 line-height.
- ALL numbers, timestamps, data values, badges, and eyebrow labels: JetBrains Mono or IBM Plex Mono — non-negotiable, this is the core "deeptech" signal.

LAYOUT: 12-col grid, 1280px max width, 88-96px section padding (48px mobile). Radius: 16px on panels/cards, fully rounded (999px) pills on badges and buttons — rounder than a typical "clinical instrument" theme, matching the logo's rounded plus shape. No gradients as backgrounds, no drop shadows — depth comes only from hairline borders, plus a soft 10%-opacity gradient glow behind the signature element specifically.

SIGNATURE ELEMENT — "Signal Path": A thin line rendered in the full brand gradient threads through every panel showing real pipeline data (hero visualization, the "pixels to clinical action" showcase, the how-it-works step connector, the compliance log). At each real data node the line terminates in a small rounded-plus glyph echoing the logo mark. On first scroll into view, the gradient travels once along the path like a signal propagating, then rests as a static trace — no looping. Do not apply this to plain content sections, only to panels showing real pipeline/data content.

COMPONENTS:
- Buttons: primary = full brand-gradient fill; secondary = ghost pill, hairline border, flat accent (#E8447A) text.
- Badges/pills: monospace text, fully rounded, hairline border, filled only for "live" status (flat accent at 12% opacity + a solid dot that pulses once).
- Stat blocks: large monospace numeral + small secondary-color label + tiny rounded-plus node glyph instead of a stock icon, count-up once on scroll into view.
- Process steps: keep numbering (01-05, it's a real pipeline) — mono numeral prefix, gradient connector line with node-glyph terminals, not arrows.
- Log/terminal panel (compliance/audit section only): monospace, timestamp + status tag + message per line, faint 4%-opacity scanline overlay.

MOTION: Minimal and purposeful — Signal Path travel once per panel on first view, stat count-up once, live-badge pulse once, alert pulse only on elements representing a real active escalation in the content. No ambient looping animation, no parallax, no floating gradient blobs. Respect prefers-reduced-motion (swap animations for instant reveals).

Keep the trust-badge/partner-logo row quiet and monochrome — no cards around logos, just a hairline-divided strip. Do not use literal hospital-monitor iconography (ECG sweeps, heart icons, bezel framing) as decoration — the AI/data framing should come from the mono typography and Signal Path element, not from medical device visual cliches.
```
