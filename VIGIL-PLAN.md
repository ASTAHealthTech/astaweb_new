# Vigil — ASTA site redesign plan

Branch: `redesign/vigil` · Scope: 12 routes · Content: kept as-is · 07 Sep 2026

---

## 01 · What the reference does right

The NIT AP club site (Fable-built) is working seven levers, all reproducible:

1. **Scroll drives a camera** — elements don't fade in; a 3D camera moves and the content is what it passes. This is the single biggest gap vs a normal animated site.
2. **One world, never broken** — blue wireframe on near-black from first frame to footer. Consistency is what reads as expensive.
3. **The animation has a punchline** — "You just flew through a 154-neuron network." Motion given retroactive meaning. A writing trick, not a code trick.
4. **Toys, not videos** — the arm has real IK you can drag; the playground genuinely trains.
5. **An "Explain" panel** — converts a demo into a lesson.
6. **Instrument chrome** — mono eyebrows, hairline rules, section counters. Cheap, and 40% of why it feels engineered.

**Where ASTA beats it:** the club site's content is toys — a rover on a plinth has no stakes. ASTA has real stakes (a patient deteriorating at 02:17), real proof (10+ named hospital deployments, MeitY/NIT/IISER/AIC-SEED backing), and a real model of its own.

---

## 02 · The direction: Vigil

**Scroll is time, not distance.** A clock sits in the corner from the first frame, starting at 21:40. As you scroll it advances through the night. The ward darkens. Around 60% down, one bed's numbers begin to drift. ASTA catches it at 02:17. The next round was 06:00.

**Two registers, never blended.** The room is soft (depth, fog, monitor glow, drift). The data is hard (mono, tabular, hairlines, zero blur). Every screen holds both. Visual translation of the pitch: the room is uncertain, the monitor is not.

**The site never stops moving.** At every scroll position at least one number is ticking at low intensity. `CADENCE_MS = 5000` in `lib/motion.ts` — the product's real capture cadence — becomes the whole site's heartbeat, extended into the 3D scene.

### Keep
- All copy in `content/*.ts`; the brand gradient; the shared-cadence architecture; contact form logic + `api/contact/route.ts`; SEO/JSON-LD/security headers; real assets in `/public`.

### Replace
- Every section component's layout and motion (45 of them); Space Grotesk as display face; Framer-Motion-only scroll work; flat SVG diagrams where depth earns its keep; the three stub pages.

---

## 03 · One scene, ten framings

**One** 3D scene and **one** canvas, mounted once in the marketing layout, alive across route changes. Pages ask the camera to move; they don't spin up their own WebGL context. Home → Platform becomes a camera flight, not a page load.

In the scene: six instanced beds; six emissive monitors with live numbers on render targets; the ASTA unit with its cone of attention; extraction particles lifting off the glass; the PPLM reasoning volume above the ward; room fog, three lights, no shadow maps (baked AO).

All geometry **built in code** — no GLTF, no Draco. That is exactly why the reference loads fast despite being fully 3D.

### Camera path (homepage zoom-out)

| Scroll | Framing | What it says |
|---|---|---|
| 0–12% | Locked on one monitor, numbers legible | This is a real patient, right now |
| 12–26% | Pull back — the ASTA unit enters frame | Something is watching it |
| 26–48% | Values lift off glass, become structured rows | Pixels → numbers, no integration |
| 48–70% | Full six-bed ward. Bed 4 begins to drift | One nurse, six beds, one night |
| 70–84% | Up through the ceiling → hospital → India | 10+ deployments, not a pilot |
| 84–100% | Back down to an empty ward, 06:00 | Everyone made it to morning |

**Platform runs it in reverse** — India → hospital → ward → bed → monitor → into one pixel of glass. Same scene, opposite direction.

---

## 04 · Type & tokens

**Colour stays.** The existing token sheet is well-considered. Three tokens added for the 3D scene.

**Type changes.** Space Grotesk reads start-up, not instrument. Replace with **Archivo** (grotesque with real width range, drawn for signage and data). Add **JetBrains Mono** for the machine layer — every readout, eyebrow, bed ID and timestamp — replacing generic `ui-monospace`. Inter stays for body.

Phase 1 also builds a private `/styleguide` route rendering every token, type step, motion primitive and 3D material. With 12 pages, this is what stops drift.

---

## 05 · Motion system

The codebase's rule — "the whole site uses exactly three animations" — is right. Extend to six; no component invents its own.

| Name | Does | Timing | Driven by |
|---|---|---|---|
| A · Drawn rule | Hairlines and section numbers draw in | 600ms · (.22,1,.36,1) | Framer Motion |
| B · Ledger tick | Numeral rolls prev → next | 400ms · linear | Framer Motion |
| C · Capture sweep | Scan line crossing a monitor | 5000ms loop | Shared cadence |
| D · Camera *(new)* | Scroll-driven camera + pinned scenes | scrub 1.2 | GSAP ScrollTrigger |
| E · Lift-off *(new)* | Value detaches from glass, lands as a row | 900ms · stagger 60ms | anime.js |
| F · Vigil pulse *(new)* | The never-blink ambient | 5000ms loop | Shared cadence |

**Library roles:** Lenis = buttery scroll (non-negotiable, most of why the reference *feels* expensive). GSAP+ScrollTrigger = long scroll timelines and pins. React Three Fiber = the 3D. anime.js = SVG line draw, staggers, counters. Framer Motion **stays** for component enter/hover — already wired into 45 components.

**The restraint that makes it work:** one section per page has zero motion. On home it's the compliance band. Silence after continuous movement reads as seriousness.

---

## 06 · The three interactives

### 1. The Ward — Home §03 (pinned) + Use Cases
For the medical superintendent and nursing head. Six beds in real time on the true 5s cadence. Bed 4 desaturates slowly. ASTA flags the trajectory, evidence panel opens, alert routes to duty clinician.

Controls: a **severity dial**, and — the important one — a **with ASTA / without ASTA** toggle. Off: a stopwatch runs to the 06:00 round. On: it stops at 02:17.

*Why it wins:* nobody in this category builds the "without" case. That toggle turns an abstract benefit into a number a buyer repeats in a meeting — **3h 43m**.

### 2. PPLM Explorer — Platform (pinned)
For the clinician and technical evaluator. Drag a vitals trajectory; watch signals weighted by contribution, patterns matched, a forecast cone six hours out. Every output traces back to the signals that caused it — *evidence-linked*, already your language. Carries an **Explain** panel (borrowed from the reference) on why trajectory beats threshold.

*Why it wins:* the reference's playground trains a generic toy network. This shows *your* model.

### 3. Cockpit Tour — Solutions (pinned, scroll-scrubbed)
For the buyer asking what nurses actually see. Scroll-driven tour of the five real ASTA Pro screens already in `/public/product` — ward live, bed cards, command, forecast, ECG workbench. Each tilts in 3D while live SVG annotations draw on.

*Why not video:* fraction of the weight, sharp on any display, readable by search engines, updated by swapping one image.

### One rule for all three
Each carries a small `DEMONSTRATION` chip in its chrome — a mono label, not a warning band. A buyer who assumes the ward is live and later learns it was simulated starts doubting the *real* deployment figures too. Labelling the simulation is what keeps the verified numbers credible.

---

## 07 · Page by page

**/** — *Home.* Job: make someone feel the night before reading a benefit. Opens locked on one monitor at 21:40; the corner clock never leaves and reaches 06:00 at the footer. Sections: hero → the unit sees → values lift off → **The Ward** (pinned) → zoom-out to India map with real pins (KS Kumbakonam, Seethapathy, TriLife, Southern Railway HQ) → institutional backing → **silent compliance band** → empty ward at dawn, CTA.

**/platform** — Job: convince a technical evaluator the deep tech is real. The reverse flight hero. The intelligence stack as three real planes in space (`LivingStack.tsx` is currently a clever SVG fake — becomes the real thing). **PPLM Explorer** pinned. Signal flow drawn line by line. Deployment architecture assembling isometrically. Validation plate, quiet.

**/solutions** — Job: show what a nurse actually sees. Ward-live screen floating on a slight 3D tilt catching room light. **Cockpit Tour** pinned. Capability grid where hover swaps in a live preview. Interop & governance as a quiet document plate.

**/use-cases** — Job: let a buyer find their own ward. Each use case *is* a bed; select one and the camera re-frames to it and plays its story. Then teaching-hospital value with real figures, and live proof with named deployments and real photos. Reuses homepage geometry — zero extra scene cost.

**/about** — Job: establish serious people, serious institutions. Editorial, not cinematic — the calmest page on the site. Founding thesis as one long prose column with the reasoning volume drifting beside it. Leadership and advisory as portrait plates lighting under the cursor. Pedigree as a horizontal timeline with a drawn line. MeitY/NIT/IISER/AIC-SEED as embossed marks, not a logo strip.

**/contact** — Job: start the conversation. Form on the left as an instrument panel; the ward keeps running behind glass on the right. Then what-happens-next as three timed steps, proof strip, office details as a plate. Visual only — form logic, validation, rate limiting and the mail route untouched.

**/blog · /careers · /press** — one shared index template *designed for empty*: a real page saying what's coming. Press gets the media kit and logo pack; careers gets the roles actually being hired. Drawn rules only.

**/security · /compliance · /privacy · /terms** — the quiet floor. Deliberately a different world: no 3D, near-monochrome, document layout with a sticky section index and a print stylesheet. A compliance page that animates undermines itself.

---

## 08 · Speed & fallbacks

Three device tiers, chosen automatically:

| Tier | Who | Renders |
|---|---|---|
| A · Full | Discrete GPU, 8+ cores, good connection | Full scene |
| B · Reduced | Integrated graphics, 4 cores, mobile | Half-res target, fog off, particles −70%, simple materials |
| C · Static | No WebGL, reduced-motion, or data saver | Pre-baked posters of each camera framing, rendered at build time from the same scene, cross-fading on scroll |

Tier C matters most: because posters come from the same scene, the fallback isn't a downgrade — it's the same picture held still. Nobody sees an empty box.

**Budgets:** under 40k triangles; beds and monitors instanced; no shadow maps (baked AO); no model files; three.js lazy-loaded in its own chunk after first paint; the **headline text** is LCP, never the canvas; canvas pauses off-screen and on hidden tabs. Targets: LCP < 2.0s mid-range laptop, CLS < 0.05, first-load JS < 220KB gzip excluding the deferred 3D chunk.

**Accessibility:** `prefers-reduced-motion` routes to Tier C and freezes the cadence. Every interactive keyboard-operable (severity dial = real slider, bed selector = real radio group). Canvas is `aria-hidden`; everything it says also exists as text. AA contrast holds on the existing `ink-2`/`ink-3` tokens.

---

## 09 · Branch & testing

```bash
# from E:\astaweb_new
git checkout -b redesign/vigil
npm install lenis gsap @react-three/fiber @react-three/drei animejs
npm install -D @types/animejs
npm run dev          # localhost:3000 — the new site
```

- Current homepage stays reachable at `/legacy` for the life of the branch — two tabs, flip between them.
- Push the branch; let Vercel build a preview URL. Send it to Varun and a hospital contact before anything merges.
- `npm run typecheck` and `npm run build` must both pass before every merge to `main`.
- Test on a genuinely bad machine — an old hospital desktop, not your laptop.

**Merge rule:** merge only after all 12 pages are done and reviewed. Half a redesign live is worse than none — two visual languages read as broken.

---

## 10 · Build order

| # | Phase | Contents | Gate |
|---|---|---|---|
| 00 | Foundations | Branch, deps, Lenis, GSAP registered, device-tier detection, persistent canvas shell, `/legacy` route | Scroll feels different immediately |
| 01 | Type & tokens | Archivo + JetBrains Mono, type scale, six motion primitives into `lib/motion.ts`, `/styleguide` | You approve the new type on screen |
| 02 | The ward scene | Geometry in code, materials, lighting, fog, monitor render targets, particles, camera rig on ScrollTrigger | Zoom-out runs end to end |
| 03 | Homepage | All nine sections on the scene, persistent clock, India map, silent compliance band | First real side-by-side vs the reference |
| 04 | The Ward interactive | Six-bed sim, severity dial, with/without toggle + stopwatch, evidence panel, routing | The 3h43m number lands |
| 05 | PPLM Explorer + Platform | Reverse flight, intelligence stack in 3D, explorer + Explain panel, signal flow, architecture | |
| 06 | Cockpit Tour + Solutions | Tilted screens, five-screen scrub, drawn SVG overlays, capability grid | |
| 07 | Use Cases, About, Contact | Bed-selector stories, editorial about, portrait plates, timeline, instrument form | |
| 08 | Quiet floor + stubs | Legal/trust pages as controlled documents with print CSS; blog/careers/press empty-state template | |
| 09 | Hardening | Tier B/C fallbacks, poster baking, Lighthouse, keyboard + screen reader, Safari/Firefox, old hardware, SEO/OG | Ready to merge |
