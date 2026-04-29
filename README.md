# ASTA Health Tech — Website (Phase 1)

Premium, clinically-credible marketing site for ASTA.
Stack: **Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion**.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## What's here (Phase 1)

- Full homepage with 9 production-quality sections
- Design-system tokens in `tailwind.config.ts` + `app/globals.css`
- Reusable layout, UI, and section primitives
- Data-driven content (`content/*.ts`) — edit copy without touching JSX
- Stub pages for Solutions / Platform / Use-Cases / About / Contact

## Structure

```
app/(marketing)/       routes + layout
components/layout/     Header, Footer, Container
components/ui/         Button, Card, Badge, Eyebrow, SectionHeading, Reveal, Icon
components/sections/   Hero, TrustStrip, HowItWorks, Capabilities, PlatformIntelligence, Deployments, Outcomes, SecurityBand, FinalCTA
content/               home.ts, nav.ts  — all editable copy
lib/                   types, constants, cn helper
```

## Scaling into Phase 2

Each section component takes its content as a typed prop shape.
Phase-2 pages (`/solutions`, `/platform`, etc.) reuse the same primitives with new content files — e.g. `content/solutions.ts`.
