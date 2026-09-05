"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { LedgerTick } from "@/components/ui/LedgerTick";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { sentenceCase, spring, usePrefersReducedMotion } from "@/lib/motion";
import { platformSignalFlow } from "@/content/platform";
import { DrawnRule } from "./DrawnRule";

/**
 * §3 — "— 03 Signal flow". The hairline-spine rail with the page's single
 * magenta position cursor. DISCRETE parking: an IntersectionObserver picks
 * the step whose block midpoint is nearest viewport center; the dot springs
 * (stiffness 120 / damping 20) to that step's anchor. Never scroll-scrubbed.
 * Reduced motion: parked at step 01.
 */
export function PlatformSignalFlow() {
  const c = platformSignalFlow;
  const reduce = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [anchors, setAnchors] = useState<number[]>([]);

  // Measure each step block's vertical midpoint relative to the rail container.
  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      if (!container) return;
      const top = container.getBoundingClientRect().top;
      setAnchors(
        stepRefs.current.map((el) => {
          if (!el) return 0;
          const r = el.getBoundingClientRect();
          return r.top - top + r.height / 2;
        })
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Discrete parking: the step near viewport center becomes active.
  useEffect(() => {
    if (reduce) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx ?? 0);
            setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [reduce]);

  const dotY = (anchors[reduce ? 0 : active] ?? 0) - 8;

  return (
    <section className="py-section-sm">
      <Container>
        <SectionHeader
          number="03"
          label={sentenceCase(c.eyebrow)}
          headline={c.heading}
          lede={c.sub}
        />

        <div ref={containerRef} className="relative mt-14">
          {/* The rail */}
          <span aria-hidden className="absolute inset-y-0 left-4 w-px bg-hairline lg:left-10" />

          {/* The position cursor — page's one magenta pulse dot, parked discretely */}
          {anchors.length > 0 && (
            <motion.div
              aria-hidden
              className="absolute left-4 top-0 z-10 lg:left-10"
              initial={false}
              animate={{ x: "-50%", y: dotY }}
              transition={reduce ? { duration: 0 } : spring}
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full border border-hairline bg-paper">
                <span className="h-2 w-2 rounded-full bg-accent" />
              </span>
            </motion.div>
          )}

          <div className="flex flex-col gap-16 pl-12 lg:pl-28">
            {c.steps.map((s, i) => {
              const m = s.step.match(/^(0*)(\d+)$/);
              return (
                <div
                  key={s.step}
                  ref={(el) => {
                    stepRefs.current[i] = el;
                  }}
                  data-idx={i}
                  className="relative pb-10"
                >
                  {/* Tick crossing the rail at the block midpoint */}
                  <span
                    aria-hidden
                    className="absolute -left-9 top-1/2 h-px w-2 bg-hairline-strong lg:-left-[76px]"
                  />
                  <div className="font-display text-stat-lg tnum text-ink-3">
                    {m ? (
                      <>
                        {m[1]}
                        <LedgerTick value={m[2]} />
                      </>
                    ) : (
                      s.step
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-title text-ink">{s.title}</h3>
                  <p className="mt-3 max-w-[52ch] font-body text-body text-pretty text-ink-2">
                    {s.body}
                  </p>
                  <DrawnRule className="absolute inset-x-0 bottom-0 h-px bg-hairline" />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
