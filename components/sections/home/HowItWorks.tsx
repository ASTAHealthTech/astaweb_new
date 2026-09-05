"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { howItWorks } from "@/content/home";
import {
  ruleEase,
  sentenceCase,
  spring,
  springSettle,
  usePrefersReducedMotion,
  viewportOnce,
} from "@/lib/motion";
import { cn } from "@/lib/cn";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

/**
 * §05 — How it works. Sticky header left, hairline step rail right.
 * The magenta cursor dot uses DISCRETE parking: an IntersectionObserver
 * picks the step nearest viewport center, the dot springs to that step's
 * node anchor. Never scroll-scrubbed. Reduced motion: parked at step 01.
 */
export function HowItWorks() {
  const h = howItWorks;
  const reduce = usePrefersReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [anchors, setAnchors] = useState<number[]>([]);

  const measure = useCallback(() => {
    setAnchors(stepRefs.current.map((el) => (el ? el.offsetTop + 46 : 0)));
  }, []);

  useEffect(() => {
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    if (railRef.current) ro.observe(railRef.current);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    if (reduce) return;
    const els = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = els.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActive(idx);
          }
        }
      },
      // a band around the viewport center selects the parked step
      { rootMargin: "-40% 0px -40% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduce]);

  const cursorY = anchors[reduce ? 0 : active] ?? 0;

  return (
    <section className="py-section">
      <Container>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeader
                number="05"
                label={sentenceCase(h.eyebrow)}
                headline={h.heading}
                lede={h.sub}
                headlineMax="max-w-[20ch]"
              />
            </div>
          </div>

          <div ref={railRef} className="relative lg:col-span-8">
            {/* Spine */}
            <motion.span
              aria-hidden
              className="absolute bottom-4 left-[3px] top-4 w-px origin-top bg-hairline-strong"
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.9, ease: ruleEase }}
            />

            {/* Position cursor — discrete parking */}
            <motion.span
              aria-hidden
              className="absolute left-[0.5px] top-0 h-1.5 w-1.5 rounded-full bg-accent"
              initial={false}
              animate={{ y: cursorY }}
              transition={reduce ? { duration: 0 } : spring}
            />

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {h.steps.map((s, i) => (
                <motion.div
                  key={s.step}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  className="relative py-10 pl-12 max-md:pl-10"
                  variants={
                    reduce
                      ? undefined
                      : {
                          hidden: { opacity: 0, y: 12 },
                          show: { opacity: 1, y: 0, transition: springSettle },
                        }
                  }
                >
                  {/* Node */}
                  <span
                    aria-hidden
                    className="absolute left-0 top-[43px] h-[7px] w-[7px] rounded-full border border-hairline-strong bg-paper"
                  />
                  <div
                    className={cn(
                      "font-display text-label tnum transition-colors duration-200",
                      (reduce ? i === 0 : i === active) ? "text-ink" : "text-ink-3"
                    )}
                  >
                    {s.step}
                  </div>
                  <h3 className="mt-2 font-display text-title text-ink">{s.title}</h3>
                  <p className="mt-3 max-w-[52ch] font-body text-body text-ink-2 max-lg:max-w-none">
                    {s.body}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
