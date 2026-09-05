"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Bezel } from "@/components/ui/Bezel";
import { Card, CardBody, CardFooter, CardMeta, CardTitle } from "@/components/ui/Card";
import { EvidenceChip, Pill } from "@/components/ui/Pill";
import { Reveal, RevealItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { teachingHospitalValue } from "@/content/use-cases";
import { ruleEase, sentenceCase, spring, usePrefersReducedMotion, viewportOnce } from "@/lib/motion";

/**
 * B§03 — academic value. Holds the page's single featured card
 * ("Research & publications") and the pathway spine rail. The rail's
 * magenta cursor uses DISCRETE parking (ruling 4): scroll progress is
 * quantized to a step index and the dot springs to that step's anchor —
 * never continuous scrubbing. Reduced motion: parked at step 01.
 */

function PathwayRail() {
  const c = teachingHospitalValue;
  const reduce = usePrefersReducedMotion();
  const railRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const measure = () => {
      const rail = railRef.current;
      if (!rail) return;
      const rect = rail.getBoundingClientRect();
      setPositions(
        nodeRefs.current.map((node) => {
          if (!node) return { x: 0, y: 0 };
          const r = node.getBoundingClientRect();
          return { x: r.left - rect.left + r.width / 2, y: r.top - rect.top + r.height / 2 };
        })
      );
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Discrete parking: quantize section scroll to a step index; the dot
  // springs between the four parked anchors only.
  const { scrollYProgress } = useScroll({ target: railRef, offset: ["start 80%", "end 40%"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    setActive(Math.max(0, Math.min(3, Math.floor(v * 4))));
  });

  const anchor = positions[reduce ? 0 : active];

  return (
    <div ref={railRef} className="relative mt-20">
      {/* the spine — horizontal on desktop, vertical left rail on mobile */}
      <motion.span
        aria-hidden
        className="absolute left-0 right-0 top-[3.5px] hidden h-px origin-left bg-hairline md:block"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: ruleEase }}
      />
      <motion.span
        aria-hidden
        className="absolute bottom-0 left-[3.5px] top-1 w-px origin-top bg-hairline md:hidden"
        initial={reduce ? false : { scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease: ruleEase }}
      />
      {/* the position cursor */}
      {anchor && (
        <motion.span
          aria-hidden
          className="absolute left-0 top-0 z-10 h-1.5 w-1.5 rounded-full bg-accent"
          initial={false}
          animate={{ x: anchor.x - 3, y: anchor.y - 3 }}
          transition={reduce ? { duration: 0 } : spring}
        />
      )}
      <div className="grid gap-y-10 md:grid-cols-4 md:gap-x-6">
        {c.pathway.map((step, i) => (
          <div key={step.title} className="relative pl-8 md:pl-0">
            <span
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              aria-hidden
              className="absolute left-0 top-1 block h-2 w-2 rounded-full border border-hairline-strong bg-surface md:static"
            />
            <h4 className="font-display text-title-sm text-ink md:mt-6">{step.title}</h4>
            <p className="mt-2 font-body text-body text-ink-2">{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TeachingHospitalValue() {
  const c = teachingHospitalValue;

  return (
    <section className="pt-section-sm">
      <Container>
        <SectionHeader
          number="03"
          label={sentenceCase(c.eyebrow)}
          headline={c.heading}
          lede={c.sub}
          headlineMax="max-w-[26ch]"
        />

        <Reveal className="mt-8 flex flex-wrap gap-2">
          {c.audiences.map((audience) => (
            <Pill key={audience}>{audience}</Pill>
          ))}
        </Reveal>

        <Reveal stagger className="mt-16 grid auto-rows-fr grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:grid-cols-4">
          {c.pillars.map((pillar, i) => (
            <RevealItem key={pillar.title} className="h-full">
              <Card featured={pillar.title === "Research & publications"}>
                {pillar.title === "Research & publications" && (
                  <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-brand-gradient" />
                )}
                <CardMeta number={String(i + 1).padStart(2, "0")} />
                <CardTitle>{pillar.title}</CardTitle>
                <CardBody>{pillar.body}</CardBody>
                <CardFooter>
                  <EvidenceChip>{pillar.stat}</EvidenceChip>
                </CardFooter>
              </Card>
            </RevealItem>
          ))}
        </Reveal>

        {/* real product figure — the multi-model council behind the
            "research-grade AI" claim, recorded from the live workspace */}
        <Reveal className="mt-16">
          <Bezel
            label="asta workspace — council brain"
            timestamp="demo ward · 5 model nodes"
            caption="Fig. 2 — Independent model council on one monitored patient: five specialist nodes review the case and return a consolidated risk with per-node confidence · recorded from the ASTA clinical workspace"
          >
            <Image
              src="/product/uc-council-brain.webp"
              alt="ASTA council brain view: five independent model nodes — Lumen, Pulse, Aegis, Nyra, Atlas — arranged around the ASTA council, with the selected node Lumen reporting elevated heart rate with waveform evidence and a suggested ECG check"
              width={1920}
              height={1708}
              className="w-full h-auto"
            />
          </Bezel>
        </Reveal>

        <PathwayRail />
      </Container>
    </section>
  );
}
