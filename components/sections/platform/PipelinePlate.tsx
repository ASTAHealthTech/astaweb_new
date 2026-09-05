"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Plate } from "@/components/ui/Plate";
import { ruleEase, springSettle, viewportOnce } from "@/lib/motion";
import { platformVisionLayer } from "@/content/platform";

/**
 * Fig. 3 — the four-stage extraction pipeline plate. One horizontal spine
 * with tick-rules, four ruled boxes carrying single-weight ink micro-glyphs.
 * Spine draws left→right on entry (0.9s), boxes fade in 80ms apart, then
 * static — no capture sweep here. Mobile: the SVG rail is replaced by a
 * left-rail step list (no cursor — the cursor lives only in §3).
 */
export function PipelinePlate({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const steps = platformVisionLayer.pipeline;

  const box = (i: number) => ({
    initial: reduce ? false : ({ opacity: 0, y: 8 } as const),
    whileInView: { opacity: 1, y: 0 },
    viewport: viewportOnce,
    transition: { ...springSettle, delay: 0.2 + i * 0.08 },
  });

  return (
    <Plate caption="Fig. 3 — Four-stage extraction pipeline." className={className}>
      {/* Desktop: engineering-drawing rail */}
      <div className="hidden md:block">
        <svg
          viewBox="0 0 1120 220"
          className="h-auto w-full"
          role="img"
          aria-label="Four-stage extraction pipeline: screen locate, layout classify, value extract, signal normalize."
        >
          {/* Horizontal spine, drawn left to right */}
          <motion.path
            d="M0 110 H20 M220 110 H313 M513 110 H607 M807 110 H900 M1100 110 H1120"
            className="stroke-ink"
            strokeWidth="1.5"
            fill="none"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: ruleEase }}
          />
          {/* Tick-rules in the spine gaps */}
          <motion.path
            d="M266 106 v8 M560 106 v8 M853 106 v8"
            className="stroke-ink"
            strokeWidth="1"
            fill="none"
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.4, delay: 0.7 }}
          />

          {/* Box 1 — Screen locate: viewfinder brackets around a monitor outline */}
          <motion.g {...box(0)}>
            <rect x="20" y="50" width="200" height="120" rx="2" className="stroke-ink" strokeWidth="1.5" fill="none" />
            <path
              d="M40 82 v-12 h12 M200 70 h-12 M200 70 v12 M40 138 v12 h12 M200 150 h-12 M200 150 v-12"
              className="stroke-ink"
              strokeWidth="1.5"
              fill="none"
            />
            <rect x="76" y="86" width="88" height="48" rx="2" className="stroke-ink" strokeWidth="1.5" fill="none" />
            <path d="M84 112 h14 l4 -8 5 12 4 -5 h25" className="stroke-ink" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
          </motion.g>

          {/* Box 2 — Layout classify: template-grid rectangles */}
          <motion.g {...box(1)}>
            <rect x="313" y="50" width="200" height="120" rx="2" className="stroke-ink" strokeWidth="1.5" fill="none" />
            <rect x="341" y="72" width="56" height="32" rx="2" className="stroke-ink" strokeWidth="1.5" fill="none" />
            <rect x="405" y="72" width="64" height="32" rx="2" className="stroke-ink" strokeWidth="1.5" fill="none" />
            <rect x="341" y="112" width="128" height="34" rx="2" className="stroke-ink" strokeWidth="1.5" fill="none" />
          </motion.g>

          {/* Box 3 — Value extract: numerals with a caret */}
          <motion.g {...box(2)}>
            <rect x="607" y="50" width="200" height="120" rx="2" className="stroke-ink" strokeWidth="1.5" fill="none" />
            <text x="668" y="124" fontSize="32" className="fill-ink font-display tnum">
              97
            </text>
            <path d="M726 100 l7 -7 7 7" className="stroke-ink" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
          </motion.g>

          {/* Box 4 — Signal normalize: timestamped row as plate labeling */}
          <motion.g {...box(3)}>
            <rect x="900" y="50" width="200" height="120" rx="2" className="stroke-ink" strokeWidth="1.5" fill="none" />
            <text x="922" y="112" fontSize="12" className="fill-ink-2 font-display tnum">
              12:04:31 · spo2 97
            </text>
            <path d="M922 124 h156" className="stroke-ink" strokeWidth="1" fill="none" />
          </motion.g>
        </svg>

        {/* Titles/bodies aligned under the boxes */}
        <div className="mt-6 grid grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.title} className="max-w-[24ch]">
              <div className="font-body text-body font-medium text-ink">{s.title}</div>
              <p className="mt-1 font-body text-label font-normal text-ink-2">{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: left-rail step list, no cursor */}
      <div className="md:hidden">
        <div className="ml-2 flex flex-col gap-8 border-l border-hairline pl-6">
          {steps.map((s, i) => (
            <div key={s.title} className="relative">
              <span aria-hidden className="absolute -left-7 top-3 h-px w-2 bg-hairline-strong" />
              <div className="font-display text-label tnum text-ink-3">{`0${i + 1}`}</div>
              <div className="mt-1 font-body text-body font-medium text-ink">{s.title}</div>
              <p className="mt-1 font-body text-label font-normal text-ink-2">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Plate>
  );
}
