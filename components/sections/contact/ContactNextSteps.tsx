"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ruleEase, spring, viewportOnce } from "@/lib/motion";
import { contactNextSteps } from "@/content/contact";

/** Spine x-position — shared by the line, the numbers, and the cursor dot. */
const SPINE_X = "left-4 lg:left-[20%]";

/**
 * — 05 What happens next. The hairline spine with a DISCRETE parking
 * cursor: an IntersectionObserver selects the step nearest viewport
 * center and the magenta dot springs to that step's anchor. Never
 * scroll-scrubbed. Reduced motion: parked at step 01, static.
 */
export function ContactNextSteps() {
  const railRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [tops, setTops] = useState<number[]>([]);
  const reduce = useReducedMotion();

  // Measure each step's anchor (just below its number square) on the spine.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const measure = () => {
      setTops(stepRefs.current.map((el) => (el ? el.offsetTop + 40 : 0)));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(rail);
    return () => ro.disconnect();
  }, []);

  // Discrete parking: the step intersecting the viewport-center band wins.
  useEffect(() => {
    if (reduce) return;
    const els = stepRefs.current.filter((el): el is HTMLLIElement => el !== null);
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = els.indexOf(entry.target as HTMLLIElement);
            if (index !== -1) setActive(index);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduce]);

  const dotY = tops[reduce ? 0 : active] ?? 0;

  return (
    <section className="py-section">
      <Container>
        <SectionHeader
          number="05"
          label={contactNextSteps.eyebrow}
          headline={contactNextSteps.heading}
          lede={contactNextSteps.sub}
        />

        <div ref={railRef} className="relative mt-14">
          {/* Spine — drawn top→bottom on entry */}
          <motion.span
            aria-hidden
            className={`absolute inset-y-0 w-px origin-top bg-hairline ${SPINE_X}`}
            initial={reduce ? false : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: ruleEase }}
          />

          {/* Position cursor — the section's only magenta */}
          {tops.length > 0 && (
            <span aria-hidden className={`absolute top-0 -translate-x-1/2 ${SPINE_X}`}>
              <motion.span
                className="block h-1.5 w-1.5 rounded-full bg-accent"
                initial={false}
                animate={{ y: dotY }}
                transition={reduce ? { duration: 0 } : spring}
              />
            </span>
          )}

          <ol className="space-y-14">
            {contactNextSteps.steps.map((step, i) => (
              <li
                key={step.step}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className="relative pl-12 lg:pl-[calc(20%+3.5rem)]"
              >
                <span
                  className={`absolute top-0 grid h-8 w-8 -translate-x-1/2 place-items-center bg-paper font-display text-title-sm tnum text-ink-3 ${SPINE_X}`}
                >
                  {step.step}
                </span>
                <h3 className="font-display text-title-sm text-ink">{step.title}</h3>
                <p className="mt-2 max-w-[52ch] font-body text-body text-pretty text-ink-2">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
