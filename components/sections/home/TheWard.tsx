"use client";

import { StageScrim } from "@/components/visual/StageScrim";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { capabilities, howItWorks } from "@/content/home";
import { ScrollTrigger } from "@/lib/gsap";
import { useSceneShot } from "@/lib/scene/useSceneShot";

/**
 * §06 — the ward, and the hospital above it.
 *
 * Pinned for three screens. The room draws in from above with every bed's
 * readout; then the graph rises out of it — the product's own hospital graph,
 * hospital → ward → patient → bed. Then the argument widens to the network.
 */

const review = howItWorks.steps.find((s) => s.step === "05")!;
const visibility = capabilities.items.find((c) => c.title === "Ward-level visibility")!;
const workflow = capabilities.items.find((c) => c.title === "Workflow compatibility")!;

const BEATS = [
  {
    at: 0,
    eyebrow: "Every bed",
    head: "The whole ward, live, on one screen.",
    body: review.body,
    foot: "live bed status · NEWS2 · thresholds · critical alerts · image & video review",
  },
  {
    at: 0.4,
    eyebrow: "The hospital graph",
    head: "Hospital to ward to patient to bedside — one graph.",
    body: `${visibility.body} Click a node to enter the next layer: hospital to wards, ward to patients, patient to the assessment, the pattern match, the image, the vitals.`,
    foot: "1 hospital · wards · beds · active patients · pattern match",
  },
  {
    at: 0.72,
    eyebrow: "Connect it — or don't",
    head: "Additive to the hospital's systems. Never a prerequisite.",
    body: workflow.body,
    foot: "HMS connections · FHIR bundles · versioned, tenant-scoped APIs",
  },
];

export function TheWard() {
  const ref = useRef<HTMLElement>(null);
  const [beat, setBeat] = useState(0);

  useSceneShot(ref, "ward2", { start: "top top", end: "bottom bottom" });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const t = self.progress;
        let next = 0;
        for (let i = BEATS.length - 1; i >= 0; i -= 1) if (t >= BEATS[i].at) { next = i; break; }
        setBeat((b) => (b === next ? b : next));
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <section ref={ref} className="relative h-[320svh]">
      <div className="sticky top-0 flex h-[100svh] items-end overflow-hidden pb-8 pt-12 lg:items-center lg:pb-0">
        <StageScrim side="narrow" />
        <Container wide>
          <div className="relative max-w-[30rem]">
            <div className="flex items-center gap-3">
              <span aria-hidden className="block h-px w-7 bg-hairline-strong" />
              <span className="machine text-ink-3">06</span>
              <span className="machine text-ink-2">{BEATS[beat].eyebrow}</span>
            </div>
            <div className="relative mt-5 min-h-[14rem] lg:mt-6 lg:min-h-[17rem]">
              {BEATS.map((b, i) => (
                <div
                  key={b.head}
                  aria-hidden={i !== beat}
                  className="absolute inset-0 transition-[opacity,transform] duration-500 ease-rule"
                  style={{
                    opacity: i === beat ? 1 : 0,
                    transform: `translateY(${i === beat ? 0 : i < beat ? -14 : 14}px)`,
                    pointerEvents: i === beat ? "auto" : "none",
                  }}
                >
                  <h2 className="max-w-[18ch] font-display text-[1.55rem] lg:text-[clamp(1.7rem,2.6vw,2.35rem)] font-medium leading-[1.08] tracking-[-0.025em] text-ink">
                    {b.head}
                  </h2>
                  <p className="mt-4 max-w-[40ch] font-body text-body text-pretty text-ink-2">{b.body}</p>
                  <p className="machine mt-3 text-ink-3 lg:mt-5">{b.foot}</p>
                </div>
              ))}
            </div>
            <p className="machine mt-4 text-ink-3 lg:mt-7">Scroll — rise out of the ward</p>
          </div>
        </Container>
      </div>
    </section>
  );
}
