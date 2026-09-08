"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/motion";
import { releaseScene } from "@/lib/scene/state";

/**
 * Lenis, driven off GSAP's ticker rather than its own rAF loop.
 *
 * Two loops running side by side is the classic cause of scroll jitter on
 * ScrollTrigger sites: Lenis writes the scroll position on one frame and
 * ScrollTrigger reads it on another. Sharing GSAP's ticker means the read
 * always happens after the write, in the same frame.
 *
 * Renders nothing. Mounted once, in the marketing layout.
 */
export function SmoothScroll() {
  const reduced = usePrefersReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    // Reduced motion gets the browser's own scrolling, untouched. So does
    // ?nosmooth — a QA switch for machines where the smoothing itself is
    // suspected, and for headless screenshots that scroll by script.
    if (reduced) return;
    if (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("nosmooth")) return;

    // Same settings as the club site, which scrolls the way it should.
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      autoRaf: false,
    });

    document.documentElement.classList.add("lenis");

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    // GSAP's ticker gives time in seconds; Lenis wants milliseconds.
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", onScroll);
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      document.documentElement.classList.remove("lenis");
      lenis.destroy();
    };
  }, [reduced]);

  // A route change is a new camera timeline. Drop the old triggers, hand the
  // scene back to its idle shot, and re-measure once the new page has painted.
  useEffect(() => {
    releaseScene();
    window.scrollTo(0, 0);

    const id = requestAnimationFrame(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
