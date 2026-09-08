"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { hero } from "@/content/home";
import { countTo, drawRule, liftOff, revealWords } from "@/lib/anim";
import { CADENCE_MS, usePrefersReducedMotion } from "@/lib/motion";
import { useSceneShot } from "@/lib/scene/useSceneShot";

/**
 * §00 — the signal.
 *
 * Headline left, the monitor and the unit right. The entrance is anime.js:
 * the rule draws, the headline builds word by word, the proof strip lifts in
 * and its numbers count. Behind it the monitor draws itself and lights up.
 */

const SPECS = [
  { n: 10, suffix: "–20B", k: "parameters", note: "physiological language model" },
  { n: 100, suffix: "M+", k: "labelled frames", note: "read from monitor glass" },
  { n: 15, suffix: "+", k: "OEM brands", note: "no integration required" },
  { n: 10, suffix: "+", k: "hospital deployments", note: "Tamil Nadu · Karnataka" },
];

function Words({ text }: { text: string }) {
  const parts = text.split(" ");
  return (
    <>
      {parts.map((w, i) => (
        <span key={`${w}-${i}`} data-word className="inline-block">
          {w}
          {i < parts.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

/** A value being read off the glass, on the product's real capture cadence. */
function LiveRead() {
  const SEQ = [92, 93, 92, 91, 92, 94, 93];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => n + 1), CADENCE_MS);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="inline-flex items-center gap-4 rounded-card border border-hairline bg-well/85 px-4 py-3">
      <span className="vigil inline-block h-1.5 w-1.5 shrink-0 rounded-pill bg-amber" />
      <span className="font-machine text-[26px] leading-none tabular-nums text-ink">
        {SEQ[i % SEQ.length]}
        <span className="ml-1 align-top text-[11px] text-ink-3">bpm</span>
      </span>
      <span className="machine max-w-[24ch] text-ink-3">
        read off the monitor glass · not a wearable estimate
      </span>
    </div>
  );
}

export function SignalHero() {
  const ref = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const specsRef = useRef<HTMLDListElement>(null);
  const reduced = usePrefersReducedMotion();

  useSceneShot(ref, "hero", { start: "top top", end: "bottom top" });

  useEffect(() => {
    if (reduced) return;
    if (ruleRef.current) drawRule(ruleRef.current, 120);
    if (headRef.current) revealWords(headRef.current, 220);
    if (specsRef.current) {
      liftOff(specsRef.current.querySelectorAll("[data-lift]"), 800);
      specsRef.current.querySelectorAll<HTMLElement>("[data-count]").forEach((el, i) => {
        countTo(el, Number(el.dataset.count), { duration: 1100 + i * 90 });
      });
    }
  }, [reduced]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col">
      {/* Ground under the type, thinning to nothing where the drawing sits. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background:
            "linear-gradient(100deg, rgba(12,8,18,0.96) 0%, rgba(12,8,18,0.9) 28%, rgba(12,8,18,0.66) 46%, rgba(12,8,18,0.22) 62%, rgba(12,8,18,0) 76%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            "linear-gradient(0deg, rgba(12,8,18,0.97) 0%, rgba(12,8,18,0.95) 48%, rgba(12,8,18,0.72) 60%, rgba(12,8,18,0.2) 72%, rgba(12,8,18,0) 84%)",
        }}
      />

      <div className="relative flex flex-1 items-end pb-10 pt-[44svh] lg:items-center lg:pb-14 lg:pt-32">
        <Container wide>
          <div className="max-w-[44rem]">
            <div className="flex items-center gap-3">
              <span ref={ruleRef} aria-hidden className="block h-px w-7 origin-left bg-hairline-strong" />
              <span className="machine text-ink-2">{hero.eyebrow}</span>
            </div>

            <h1
              ref={headRef}
              className="mt-5 max-w-[19ch] font-display text-[clamp(2.1rem,4.6vw,4.1rem)] lg:mt-7 font-medium leading-[1.02] tracking-[-0.03em] text-balance text-ink"
            >
              <Words text={hero.headline} />{" "}
              <span data-word className="inline-block text-gradient-brand">
                {hero.headlineAccent}
              </span>
            </h1>

            <p className="mt-5 max-w-[48ch] font-body text-body text-pretty text-ink-2 lg:mt-7 lg:text-body-lg">{hero.sub}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3 lg:mt-9 lg:gap-4">
              <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
              <Button href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </Button>
            </div>

            <div className="mt-8 hidden sm:block lg:mt-10">
              <LiveRead />
            </div>
          </div>
        </Container>
      </div>

      {/* ── the numbers that make this a deep-tech company ── */}
      <div className="relative border-t border-hairline bg-paper/90">
        <Container wide>
          <dl ref={specsRef} className="grid grid-cols-2 md:grid-cols-4">
            {SPECS.map((s, i) => (
              <div
                key={s.k}
                data-lift
                className={[
                  "py-6 pr-6",
                  i > 0 ? "md:border-l md:border-hairline md:pl-7" : "",
                  i >= 2 ? "border-t border-hairline md:border-t-0" : "",
                ].join(" ")}
              >
                <dt className="font-display text-[clamp(1.5rem,2.2vw,2.05rem)] font-medium leading-none tabular-nums tracking-[-0.02em] text-ink">
                  <span data-count={s.n}>{s.n}</span>
                  {s.suffix}
                </dt>
                <dd className="mt-2.5">
                  <span className="machine block text-ink-2">{s.k}</span>
                  <span className="mt-1 block text-[12.5px] leading-snug text-ink-3">{s.note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>
    </section>
  );
}
