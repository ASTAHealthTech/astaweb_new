"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { LedgerRow } from "@/components/ui/LedgerRow";
import { aboutHero, aboutLeadership } from "@/content/about";

/**
 * — 01 Mission, leadership, and trust.
 * Server-rendered hero: eyebrow, ink headline with the accent phrase set in
 * the brand gradient, CTAs, micro-proof ledger, and a 2×2 grayscale
 * mosaic of the founding team in one hairline frame. Ticks hydrate later.
 */
export function AboutHero() {
  const mosaic = aboutLeadership.members.slice(0, 4);
  const reduced = useReducedMotion();

  return (
    <section className="relative pb-24 pt-40">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-brand-gradient-soft" />
      <Container>
        <div className="grid grid-cols-12 items-center gap-x-6 gap-y-14 lg:min-h-[80vh]">
          {/* Left — cols 1–7 */}
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3">
              <span aria-hidden className="block h-px w-6 bg-hairline-strong" />
              <span className="font-display text-label tnum text-ink-3">01</span>
              <span className="font-body text-label text-ink-2">{aboutHero.eyebrow}</span>
            </div>

            <h1 className="mt-6 max-w-measure-hero font-display text-display-1 text-balance text-ink">
              {aboutHero.headline}
              <br />
              <span className="text-gradient-brand animate-gradient-pan">
                {aboutHero.headlineAccent}
              </span>
            </h1>

            <p className="mt-6 max-w-[52ch] font-body text-body-lg text-pretty text-ink-2">
              {aboutHero.sub}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href={aboutHero.primaryCta.href}>{aboutHero.primaryCta.label}</Button>
              <Button href={aboutHero.secondaryCta.href} variant="secondary">
                {aboutHero.secondaryCta.label}
              </Button>
            </div>

            {aboutHero.microProof.length > 0 && (
              <div className="mt-12 border-t border-hairline pt-5">
                <ul className="flex flex-col gap-3">
                  {aboutHero.microProof.map((line, i) => (
                    <li key={line} className="flex items-baseline gap-3">
                      <span className="font-display text-label tnum text-ink-3">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-body text-body text-ink-2">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right — cols 8–12: team mosaic in one hairline frame */}
          <figure className="col-span-12 lg:col-span-5">
            <div className="relative" style={{ perspective: "1400px" }}>
              {/* Brand light source behind the glass group */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-24 -inset-y-16 scale-110 bg-brand-gradient-soft blur-3xl"
              />
              <motion.div
                className="relative z-10"
                style={{ rotateY: -10, rotateX: 3 }}
              >
                <motion.div
                  animate={reduced ? undefined : { y: [-7, 7] }}
                  transition={
                    reduced
                      ? undefined
                      : {
                          duration: 7.2,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: "easeInOut",
                        }
                  }
                >
                  <div className="rounded-card border border-hairline bg-surface p-2 shadow-glow-brand">
                    <div className="grid grid-cols-2 gap-2">
                      {mosaic.map((member, i) => (
                        <div key={member.name} className="relative aspect-square overflow-hidden rounded-[2px]">
                          <Image
                            src={member.photo}
                            alt={member.name}
                            fill
                            priority={i < 2}
                            sizes="(min-width: 1024px) 20vw, 45vw"
                            className="object-cover grayscale contrast-[1.05]"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <figcaption className="px-1 pt-2 font-body text-label text-ink-3">
                    Fig. 1 — The ASTA founding team
                  </figcaption>
                </motion.div>
              </motion.div>
            </div>
          </figure>

          {/* proofRow — full-width band */}
          <div className="col-span-12 mt-6 border-t border-hairline pt-8">
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
              {aboutHero.proofRow.map((stat) => (
                <LedgerRow key={stat.label} label={stat.label} value={stat.value} size="lg" />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
