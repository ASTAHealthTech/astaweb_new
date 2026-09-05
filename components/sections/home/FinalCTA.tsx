"use client";

import { motion } from "framer-motion";
import { finalCta } from "@/content/home";
import { ruleEase, sentenceCase, viewportOnce } from "@/lib/motion";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

/**
 * §10 — Final CTA. The page's one centered section, closing with the
 * ECG-blip signature on a hairline (the Footer alone says
 * "End of document").
 */
export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-section">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-brand-gradient-soft"
      />
      <Container className="relative">
        <div className="mx-auto max-w-[52rem] text-center">
          <SectionHeader
            number="10"
            label={sentenceCase(finalCta.eyebrow)}
            headline={finalCta.heading}
            lede={finalCta.sub}
            center
            headlineMax="max-w-[16ch]"
          />

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href={finalCta.primaryCta.href}>{finalCta.primaryCta.label}</Button>
            <Button href={finalCta.secondaryCta.href} variant="secondary">
              {finalCta.secondaryCta.label}
            </Button>
          </div>
        </div>

        {/* Closing signature — ECG blip in a true gap on a full-width rule
            (a gap, not a paper-colored mask, so it sits cleanly on the glow) */}
        <div className="mt-20 flex w-full items-center">
          <span aria-hidden className="h-px flex-1 bg-hairline" />
          <span className="flex h-12 w-12 items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-ink" fill="none" aria-hidden>
              <motion.path
                d="M1 12 H7 L9.5 6 L13 18 L15.5 12 H23"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.9, ease: ruleEase }}
              />
            </svg>
          </span>
          <span aria-hidden className="h-px flex-1 bg-hairline" />
        </div>
        <p className="mt-8 text-center font-body text-label text-ink-3">
          ASTA Health Tech
        </p>
      </Container>
    </section>
  );
}
