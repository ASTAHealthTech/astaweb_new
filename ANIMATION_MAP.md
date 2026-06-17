# ASTA video landing animation map

This build is the video landing page rebuilt as a fresh Next.js/React app. The animation code is not just CSS decoration: the interactive and scroll-driven parts are implemented with Motion through `motion/react`, and the reusable animated pieces live as editable React Bits-style components in `components/video-landing/react-bits.jsx`.

## Stack used

- Next.js App Router + React 18
- Motion package via `import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "motion/react"`
- React Bits-style source components: `SplitText`, `Reveal`, `SpotlightCard`, `MagneticButton`, `TiltCard`, `Orbit`, `Ticker`, `ScrollProgress`, `MouseHalo`, `AnimatedCounter`, `GradientLine`, `ScrollPinLine`
- ASTA public assets copied from the supplied zip into `public/`

## Video-matched animation coverage

1. **Fixed glass navbar** — dark translucent rail, blur, white logo pill, gold CTA, video-style top positioning.
2. **Motion scroll progress** — thin gold/mint progress line at the top using `useScroll` + `useSpring`.
3. **Pointer-following halo** — cursor glow driven by Motion values and springs.
4. **Ambient clinical particle field** — floating monitor-room particles over the dark grid background.
5. **SplitText hero reveal** — word-by-word staggered reveal for the large “Clinical intelligence from noise.” headline.
6. **Section title reveals** — every major heading/body block enters on scroll with blur/y Motion reveal.
7. **Hero parallax glow** — background glow scales with page scroll progress.
8. **Magnetic CTA buttons** — Request demo / Explore platform buttons move toward the pointer and spring back.
9. **Live ECG waveform** — SVG path draw/re-draw animation with gradient stroke.
10. **Monitor dashboard pulses** — animated vital chips, packet bars, mini activity bars, confidence cards.
11. **Ranked-lane orbital council** — rotating orbit/radar rings around Pulse/Aegis/Atlas/Nyra/Lumen.
12. **Ticker marquee** — continuous clinical keyword strip matching the video’s moving signal labels.
13. **Spotlight hover cards** — pointer-following radial light on story, trust, and lane cards.
14. **3D Tilt cards** — main dashboard/use-case cards tilt on pointer movement.
15. **Scroll-story monitor cards** — stacked ward-monitor narrative cards with gold progress orb.
16. **Vertical scroll pin line** — Motion scaleY line beside the story cards.
17. **Clinical brain hologram** — glowing rings, animated nodes, drawing paths, changing layer focus.
18. **Brain layer active state** — hover/click layer switching with Motion state transitions.
19. **AnimatePresence detail swaps** — active clinical layer/reasoning panel content fades/slides in/out.
20. **Specialist lane stagger** — Pulse, Aegis, Atlas, Nyra, Lumen cards reveal with stagger and hover lift.
21. **Reasoning console tabs** — “why / what confirms / what missing” tab switching with animated panel replacement.
22. **Packet highlight bars** — source-grounded evidence rows pulse and redraw.
23. **Product theater horizontal scroll** — large clinical conversation screen moves horizontally, scales, and fades based on scroll.
24. **Dark-to-cream theme transition** — video-style shift from dark signal room to warm product/about sections.
25. **Cream grid product cards** — light product/about sections with subtle grid, shadows, and hover lift.
26. **Team/advisor cards** — uploaded team images with Motion hover elevation and overlay treatment.
27. **Contact/demo CTA motion** — final cards/buttons keep the same glass/gold hover language.

## Where to edit

- Main page/sections: `components/video-landing/LandingPage.jsx`
- Animated reusable components: `components/video-landing/react-bits.jsx`
- Copy/content/team/advisors/use cases: `components/video-landing/content.js`
- Theme and layout: `app/globals.css`
