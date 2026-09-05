"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LedgerTick } from "@/components/ui/LedgerTick";
import { ruleEase, sentenceCase } from "@/lib/motion";

/**
 * Hero variant of SectionHeader's row 1 — A1 plays on load (animate, not
 * whileInView) while the h1/sub/CTAs beneath stay plain server HTML.
 */
export function HeroEyebrow({ number, label }: { number: string; label: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="flex items-center gap-3">
      <motion.span
        aria-hidden
        className="block h-px w-6 origin-left bg-hairline-strong"
        initial={reduce ? false : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: ruleEase }}
      />
      <span className="font-display text-label tnum text-ink-3">
        <LedgerTick value={number} startImmediately />
      </span>
      <span className="font-body text-label text-ink-2">{sentenceCase(label)}</span>
    </div>
  );
}
