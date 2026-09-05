"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Bezel } from "@/components/ui/Bezel";
import { Container } from "@/components/layout/Container";
import { Card, CardBody, CardFooter, CardMeta, CardTitle } from "@/components/ui/Card";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionEnd, SectionHeader } from "@/components/ui/SectionHeader";
import { sentenceCase } from "@/lib/motion";
import { platformStack } from "@/content/platform";
import { LivingStack } from "@/components/visual/LivingStack";
import { FooterLine } from "./FooterLine";

/**
 * §2 — "— 02 Clinical intelligence stack". The animated living stack
 * (isometric glass planes + flowing beams) as the showpiece, with the three
 * layer cards stacked in a column beside it. Fig. 1 — the narrated
 * deep-dive film of the clinical intelligence (muted autoplay ≥60% in view,
 * click toggles sound); Fig. 2 — the real council-brain screen.
 */

function DeepDiveFilm() {
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
        src="/film-deep-dive.mp4"
        poster="/film-deep-dive-poster.jpg"
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

export function PlatformIntelligenceStack() {
  const c = platformStack;
  return (
    <section className="py-section-sm">
      <Container>
        <SectionHeader
          number="02"
          label={sentenceCase(c.eyebrow)}
          headline={c.heading}
          lede={c.sub}
        />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:sticky lg:top-28 lg:col-span-6">
            <LivingStack />
          </Reveal>
          <Reveal stagger className="grid gap-6 lg:col-span-6">
            {c.layers.map((layer) => {
              const num = layer.tag.replace(/\D/g, "");
              return (
                <RevealItem key={layer.title}>
                  <Card>
                    <CardMeta number={num} label="Layer" className="justify-start" />
                    <CardTitle>{layer.title}</CardTitle>
                    <CardBody>{layer.body}</CardBody>
                    <CardFooter>
                      <ul className="space-y-3">
                        {layer.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-3 font-body text-body text-ink-2"
                          >
                            <span
                              aria-hidden
                              className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-ink"
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </CardFooter>
                  </Card>
                </RevealItem>
              );
            })}
          </Reveal>
        </div>

        {/* Fig. 1 — the narrated deep-dive film */}
        <Reveal className="mt-16">
          <Bezel
            label="asta — clinical intelligence deep dive"
            timestamp="sound on click"
            caption="Fig. 1 — Clinical intelligence deep dive: a narrated walkthrough of how monitor reading, physiological reasoning, and clinical output operate as one system"
          >
            <DeepDiveFilm />
          </Bezel>
        </Reveal>

        {/* Fig. 2 — real council-brain screen: independent model review */}
        <Reveal className="mt-16">
          <Bezel
            label="asta workspace — council brain"
            timestamp="model reviews"
            caption="Fig. 2 — Independent model review: five specialist models sit around the ASTA council; the active node returns its finding, confidence, and suggested check before a result is surfaced · recorded from the ASTA clinical workspace"
          >
            <Image
              src="/product/plat-council.webp"
              alt="ASTA council brain view: a pentagon of five model nodes named Lumen, Pulse, Aegis, Nyra and Atlas around a central ASTA council node, with the selected node Lumen showing 65 percent confidence, a review finding of elevated heart rate with waveform evidence, and a suggested ECG check."
              width={1920}
              height={1444}
              className="w-full h-auto"
            />
          </Bezel>
        </Reveal>

        <FooterLine className="mt-12">{c.footer}</FooterLine>
        <SectionEnd number="02" />
      </Container>
    </section>
  );
}
