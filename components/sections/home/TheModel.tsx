"use client";

import { StageScrim } from "@/components/visual/StageScrim";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { howItWorks } from "@/content/home";
import { ScrollTrigger } from "@/lib/gsap";
import { useSceneShot } from "@/lib/scene/useSceneShot";

/**
 * §03 — the model.
 *
 * Pinned for four screens while the model builds itself on the right. The
 * copy runs four beats in step with the build; the readout under it is the
 * model's own vocabulary, taken from the product.
 */

const reason = howItWorks.steps.find((s) => s.step === "03")!;

const BEATS = [
  {
    at: 0,
    eyebrow: "Physiological Pattern Learning Model",
    head: "Trained on what the monitor saw.",
    body: reason.body,
    readout: [["parameters", "10–20B"], ["training frames", "100M+"], ["source", "certified monitor glass"]],
  },
  {
    at: 0.3,
    eyebrow: "The network",
    head: "A model of the patient, not a threshold on a number.",
    body: "Every vital is read as a trajectory — a thousand samples per signal in the window, not a single value — and the model learns how those trajectories move together before anything crosses a line.",
    readout: [["samples per vital", "1,000"], ["signals", "HR · SpO₂ · BP · MAP · RR"], ["threshold logic", "none"]],
  },
  {
    at: 0.55,
    eyebrow: "The council",
    head: "Five independent reviewers. One answer.",
    body: "A rapid assessment returns in seconds; a deep review runs five independent model reviewers and trained specialist screens — early sepsis, shock-perfusion — and reports where they agree and where they do not.",
    readout: [["reviewers", "Pulse · Aegis · Atlas · Nyra · Lumen"], ["modes", "Rapid → Deep"], ["specialist screens", "sepsis · perfusion"]],
  },
  {
    at: 0.78,
    eyebrow: "The forecast",
    head: "It says what comes next, and how sure it is.",
    body: "Guarded forecasts of each vital at +15 and +30 minutes, with the uncertainty shown rather than hidden — so a ward doctor sees the fluctuation coming, not the alarm after it.",
    readout: [["horizon", "+15 · +30 min"], ["paths", "3 transformer paths"], ["output", "direction · interval · confidence"]],
  },
];

export function TheModel() {
  const ref = useRef<HTMLElement>(null);
  const [beat, setBeat] = useState(0);

  useSceneShot(ref, "model", { start: "top top", end: "bottom bottom" });

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
    <section ref={ref} className="relative h-[400svh]">
      <div className="sticky top-0 flex h-[100svh] items-end overflow-hidden pb-8 pt-12 lg:items-center lg:pb-0">
        <StageScrim side="wide" />
        <Container wide>
          <div className="relative max-w-[32rem]">
            <div className="flex items-center gap-3">
              <span aria-hidden className="block h-px w-7 bg-hairline-strong" />
              <span className="machine text-ink-3">03</span>
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
                  <h2 className="max-w-[20ch] font-display text-[1.55rem] lg:text-[clamp(1.7rem,2.6vw,2.35rem)] font-medium leading-[1.08] tracking-[-0.025em] text-ink">
                    {b.head}
                  </h2>
                  <p className="mt-4 max-w-[42ch] font-body text-body text-pretty text-ink-2">{b.body}</p>
                </div>
              ))}
            </div>

            {/* the readout — the model's own vocabulary */}
            <dl className="mt-6 hidden border-t border-hairline pt-5 md:block">
              {BEATS[beat].readout.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 py-1.5">
                  <dt className="machine text-ink-3">{k}</dt>
                  <dd className="text-right font-machine text-[12.5px] text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="machine mt-4 text-ink-3 lg:mt-7">Scroll — the model builds</p>
          </div>
        </Container>
      </div>
    </section>
  );
}
