"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { clinicalAiInAction } from "@/content/home";
import { ruleEase, sentenceCase, springSettle, viewportOnce } from "@/lib/motion";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Bezel } from "@/components/ui/Bezel";
import { Button } from "@/components/ui/Button";
import { LedgerTick } from "@/components/ui/LedgerTick";
import { Reveal } from "@/components/ui/Reveal";

/**
 * §02 — Clinical AI in action. Walkthrough video in a Bezel (recorded
 * footage → neutral chrome dot, static label), numbered ledger list of
 * bullets on the right, metrics row below.
 */

function WalkthroughVideo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [interacted, setInteracted] = useState(false);

  // Muted autoplay at ≥60% in view; pause off-screen.
  useEffect(() => {
    const el = wrapRef.current;
    const video = videoRef.current;
    if (!el || !video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.6) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.6] }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative">
      <video
        ref={videoRef}
        src="/film-overview.mp4"
        poster="/film-overview-poster.jpg"
        muted={muted}
        loop
        playsInline
        preload="none"
        width={1280}
        height={720}
        onClick={() => {
          setMuted((m) => !m);
          setInteracted(true);
        }}
        className="h-auto w-full cursor-pointer"
      />
      {!interacted && (
        <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-body text-label text-panel-ink-2">
          Click for sound
        </span>
      )}
    </div>
  );
}

export function ClinicalAiInAction() {
  const c = clinicalAiInAction;

  return (
    <section className="py-section">
      <Container>
        <SectionHeader
          number="02"
          label={sentenceCase(c.eyebrow)}
          headline={c.heading}
          lede={c.sub}
        />

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-12">
          {/* LEFT — the film + the real assessment beneath it */}
          <div className="lg:col-span-7">
            <Reveal>
              <h3 className="mb-4 font-display text-title-sm text-ink">
                {c.mediaTitle}
              </h3>
              <Bezel
                label="asta — clinical intelligence film"
                timestamp="sound on click"
                caption={`Fig. 2 — ${c.mediaCaption}`}
              >
                <WalkthroughVideo />
              </Bezel>
            </Reveal>

            <Reveal className="mt-10">
              <Bezel
                label="asta workspace — ai assessment"
                timestamp="demo ward · bed 5"
                caption="Fig. 3 — ASTA AI assessment · recorded from the ASTA clinical workspace"
              >
                <Image
                  src="/product/home-ai-assessment.webp"
                  alt="ASTA AI assessment card: risk state moderate, headline 'Elevated heart rate with waveform evidence suggests potential arrhythmia', 74% assessment confidence ring, and Data 90% / Specialists 80% / Council 100% support chips"
                  width={1275}
                  height={1170}
                  className="h-auto w-full"
                />
              </Bezel>
            </Reveal>
          </div>

          {/* RIGHT — numbered ledger list (sticky so it tracks the tall left column) */}
          <div className="lg:col-span-5 lg:self-start lg:sticky lg:top-28 lg:pl-8">
            <motion.ol
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06 } },
              }}
            >
              {c.bullets.map((b, i) => (
                <motion.li
                  key={b.title}
                  className="relative py-5 first:pt-0"
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    show: { opacity: 1, y: 0, transition: springSettle },
                  }}
                >
                  {i > 0 && (
                    <motion.span
                      aria-hidden
                      className="absolute left-0 top-0 h-px w-full origin-left bg-hairline"
                      variants={{
                        hidden: { scaleX: 0 },
                        show: {
                          scaleX: 1,
                          transition: { duration: 0.6, ease: ruleEase },
                        },
                      }}
                    />
                  )}
                  <div className="font-display text-label tnum text-ink-3">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h4 className="mt-2 font-display text-title-sm text-ink">
                    {b.title}
                  </h4>
                  <p className="mt-2 font-body text-body text-ink-2">{b.body}</p>
                </motion.li>
              ))}
            </motion.ol>

            <div className="mt-6">
              <Button href={c.primaryCta.href} variant="secondary">
                {c.primaryCta.label}
              </Button>
            </div>
          </div>
        </div>

        {/* METRICS ROW */}
        <Reveal className="mt-16 border-t border-hairline pt-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {c.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-display text-stat-lg tnum text-ink">
                  <LedgerTick value={m.value} />
                </div>
                <div className="mt-2 font-body text-body text-ink-2">{m.label}</div>
                <div className="mt-1 font-body text-label text-ink-3">{m.note}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
