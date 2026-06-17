# ASTA Health Tech — video-matched landing page

This is a fresh Next.js / React replacement landing page built to match the supplied video direction.
It uses Motion through the official `motion/react` import path and local React Bits-style animated components.

## Run locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Main files

- `app/page.tsx` — home route
- `app/layout.tsx` — app metadata/layout
- `app/globals.css` — theme, responsive layout, dark/cream sections, grid, glass, hologram styling
- `components/video-landing/LandingPage.jsx` — complete landing page sections and Motion logic
- `components/video-landing/react-bits.jsx` — editable React Bits-style components used by the page
- `components/video-landing/content.js` — ASTA content, team/advisor/product/use-case data
- `ANIMATION_MAP.md` — list of video-matched animations/components

## Included sections

- Fixed glass navbar with logo, primary links, Login, Request demo
- Hero: “Clinical intelligence from noise.” with live ward signal dashboard
- Signal-to-reviewable-output pipeline
- Scroll story cards based on monitor-room noise
- Clinical brain / council hologram
- Pulse, Aegis, Atlas, Nyra, Lumen specialist lanes
- Reasoning reveal console with tabs
- Product theater / clinical conversation screen
- Trust / governance / pilot-ready cards
- Use cases
- Product landing CTA
- About/team/advisors
- Contact/demo form style section

## Stack

- Next.js App Router
- React 18
- Motion (`motion/react`)
- React Bits-style editable components
- Tailwind config kept for compatibility with the uploaded project structure
- Public assets copied from the supplied project zip
