"use client";

import { StageScrim } from "@/components/visual/StageScrim";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { capabilities } from "@/content/home";
import { ScrollTrigger } from "@/lib/gsap";
import { useSceneShot } from "@/lib/scene/useSceneShot";

/**
 * §04 — the lab.
 *
 * Four trained specialists on plinths; the camera pans along them. The copy
 * on the left changes as each one comes to the centre of the frame.
 */

const trajectoryCap = capabilities.items.find((c) => c.title === "Trajectory-aware alerts")!;

const BEATS = [
  {
    eyebrow: "Heart",
    head: "Rate, rhythm, perfusion — read as one system.",
    body: "Heart rate, blood pressure and mean arterial pressure are learned together, not thresholded apart. The ECG strip is found in the frame and its beats are marked for clinician review — beat spacing, not a diagnosis.",
    foot: "HR · NIBP · MAP · ECG lead II",
  },
  {
    eyebrow: "Lungs",
    head: "Oxygen and breath, with the context a nurse would add.",
    body: "SpO₂ and respiratory rate off the glass; oxygen flow, FiO₂, PEEP and lung findings added at the bedside in one tap. The model asks for what would change its answer, and only that.",
    foot: "SpO₂ · RR · O₂ L/min · FiO₂ · crackles / wheeze",
  },
  {
    eyebrow: "Deterioration",
    head: "The screens that watch for what kills on a ward.",
    body: "Trained specialist screens — early sepsis, shock-perfusion — each return a target-specific score that is reported on its own, never folded into a single number. A screen that has nothing to say abstains, visibly.",
    foot: "early sepsis · shock-perfusion · post-operative · cardiac · respiratory",
  },
  {
    eyebrow: "Trajectory",
    head: "The alert arrives before the line is crossed.",
    body: trajectoryCap.body,
    foot: "forecast paths · time-to-threshold · confidence interval",
  },
];

export function TheLab() {
  const ref = useRef<HTMLElement>(null);
  const [beat, setBeat] = useState(0);

  useSceneShot(ref, "lab", { start: "top top", end: "bottom bottom" });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // nearest plinth to the camera, so the copy and the object agree
        const next = Math.max(0, Math.min(BEATS.length - 1, Math.round(self.progress * (BEATS.length - 1))));
        setBeat((b) => (b === next ? b : next));
      },
    });
    return () => trigger.kill();
  }, []);

  return (
    <section ref={ref} className="relative h-[380svh]">
      <div className="sticky top-0 flex h-[100svh] items-end overflow-hidden pb-8 pt-12 lg:items-center lg:pb-0">
        <StageScrim side="narrow" />
        <Container wide>
          <div className="relative max-w-[30rem]">
            <div className="flex items-center gap-3">
              <span aria-hidden className="block h-px w-7 bg-hairline-strong" />
              <span className="machine text-ink-3">04</span>
              <span className="machine text-ink-2">Trained specialists · {BEATS[beat].eyebrow}</span>
            </div>

            <div className="relative mt-5 min-h-[14rem] lg:mt-6 lg:min-h-[17rem]">
              {BEATS.map((b, i) => (
                <div
                  key={b.eyebrow}
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

            {/* the index, lit by position */}
            <ol className="mt-4 hidden flex-wrap gap-x-5 gap-y-1 border-t border-hairline pt-4 md:flex lg:mt-6 lg:pt-5">
              {BEATS.map((b, i) => (
                <li key={b.eyebrow} className="machine transition-colors duration-300" style={{ color: i === beat ? "#F6F2F8" : i < beat ? "#ABA1B8" : "#7C7189" }}>
                  {String(i + 1).padStart(2, "0")} {b.eyebrow}
                </li>
              ))}
            </ol>
            <p className="machine mt-4 text-ink-3 lg:mt-7">Scroll — walk the lab</p>
          </div>
        </Container>
      </div>
    </section>
  );
}
