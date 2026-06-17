'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Drives the whole site with Lenis inertia scrolling and keeps GSAP
 * ScrollTrigger perfectly in sync. Respects prefers-reduced-motion.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // ?nosmooth=1 disables Lenis (used for native-anchor testing / debugging).
    const noSmooth = new URLSearchParams(window.location.search).has('nosmooth');
    // On phones/tablets, Lenis fights the browser's native hardware-accelerated
    // scrolling and steals frame budget from on-scroll animations, making the
    // whole page feel laggy. Native scrolling is far smoother there — skip Lenis.
    const isMobile = window.matchMedia('(max-width: 980px), (pointer: coarse)').matches;
    if (reduce || noSmooth || isMobile) return undefined;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6
    });

    // Anchor links should route through Lenis for a smooth glide.
    const onClick = (event) => {
      const link = event.target.closest('a[href^="#"], a[href^="/#"]');
      if (!link) return;
      const hash = link.getAttribute('href').replace('/', '');
      if (hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target, { offset: -90 });
    };
    document.addEventListener('click', onClick);

    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Recalculate after fonts/images settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    const settle = setTimeout(refresh, 600);

    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('load', refresh);
      clearTimeout(settle);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return children;
}
