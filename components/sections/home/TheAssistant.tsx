"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { howItWorks, outcomes } from "@/content/home";
import { ROUTES } from "@/lib/constants";
import { liftOff } from "@/lib/anim";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useSceneShot } from "@/lib/scene/useSceneShot";

/**
 * §05 — the assistant. What the ward actually gets.
 *
 * A working card deck of ASTA Pro's own sections, in the product's own
 * vocabulary, on one demo case. The reader can click through it — the
 * reference site let you take hold of the robot arm; this lets you take hold
 * of the assessment. Violet: this is the clinical-output layer.
 */

const alert = howItWorks.steps.find((s) => s.step === "04")!;
const escalation = outcomes.items.find((o) => o.audience === "Escalation quality")!;

type Card = {
  id: string;
  tab: string;
  kicker: string;
  title: string;
  body: React.ReactNode;
};

function Row({ k, v, tone }: { k: string; v: string; tone?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-hairline/70 py-2">
      <span className="machine text-ink-3">{k}</span>
      <span className="text-right font-machine text-[12.5px] tabular-nums" style={{ color: tone ?? "#F6F2F8" }}>{v}</span>
    </div>
  );
}

const CARDS: Card[] = [
  {
    id: "command",
    tab: "Command",
    kicker: "What needs attention now",
    title: "Obtain serial CRP and procalcitonin levels",
    body: (
      <>
        <p className="text-[13.5px] leading-relaxed text-ink-2">
          Elevated CRP and procalcitonin suggest ongoing inflammation or infection; serial measurements assess response to treatment and catch persistent or worsening infection.
        </p>
        <div className="mt-4">
          <Row k="current risk" v="Moderate" tone="#F0B429" />
          <Row k="assessment confidence" v="62 / 100" />
          <Row k="missing context" v="3 decision-changing questions" tone="#DE2588" />
          <Row k="patient signal" v="CRP · abnormal · 128 mg/L · 11.8 h ago" />
        </div>
      </>
    ),
  },
  {
    id: "forecast",
    tab: "Forecast",
    kicker: "Possible vital changes · trained transformer output",
    title: "Heart rate: falling. Next model point 94.4 bpm at +15 min.",
    body: (
      <>
        <p className="text-[13.5px] leading-relaxed text-ink-2">
          Trajectory from the trained model; no application-authored threshold interpretation applied. Direction, interval and confidence are reported separately.
        </p>
        <div className="mt-4">
          <Row k="last recorded" v="98 bpm" tone="#F09030" />
          <Row k="+15 min" v="94.4 bpm" tone="#8A4FE0" />
          <Row k="+30 min" v="95.1 bpm" tone="#8A4FE0" />
          <Row k="SpO₂ · systolic BP" v="flat · falling" />
        </div>
      </>
    ),
  },
  {
    id: "council",
    tab: "Council",
    kicker: "Independent model reviews",
    title: "Lumen active · four reviewers held for Deep mode",
    body: (
      <>
        <p className="text-[13.5px] leading-relaxed text-ink-2">
          Rapid mode returns in seconds from one reviewer. Deep mode runs all five independently — 5 to 15 minutes, in the background — and reports where they agree.
        </p>
        <div className="mt-4">
          {[["Pulse", "not requested in Rapid"], ["Aegis", "not requested in Rapid"], ["Atlas", "not requested in Rapid"], ["Nyra", "not requested in Rapid"], ["Lumen", "active · 75% node confidence"]].map(([k, v]) => (
            <Row key={k} k={k} v={v} tone={k === "Lumen" ? "#8A4FE0" : undefined} />
          ))}
        </div>
      </>
    ),
  },
  {
    id: "questions",
    tab: "Questions",
    kicker: "Improve the packet · 12 resolved · 3 remaining",
    title: "Does the chest pain occur with exertion or at rest?",
    body: (
      <>
        <p className="text-[13.5px] leading-relaxed text-ink-2">
          Generated from the current record, not a checklist. Saving an answer adds it to the record and reruns the Rapid assessment; the next question is chosen from the updated packet.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Yes", "No", "Unknown", "Not measured", "Ordered / pending"].map((o) => (
            <span key={o} className="rounded-pill border border-hairline px-3 py-1 font-machine text-[12px] text-ink-2">{o}</span>
          ))}
        </div>
        <div className="mt-4">
          <Row k="priority" v="Medium" tone="#F0B429" />
          <Row k="if yes" v="consider cardiac causes — angina, MI" />
          <Row k="if no" v="consider musculoskeletal or GI causes" />
        </div>
      </>
    ),
  },
  {
    id: "path",
    tab: "Decision path",
    kicker: "How ASTA reached this · not hidden chain-of-thought",
    title: "Observed → clinician context → learned synthesis → next acquisition",
    body: (
      <ol className="mt-1 space-y-2.5">
        {[
          ["01", "Observed patient signals", "HR 96 → 98 · systolic 145 → 166 across 1,000 points"],
          ["02", "Clinician-supplied context", "12 model questions resolved and persisted"],
          ["03", "Learned synthesis", "Risk: Moderate — intermittent central chest pain, raised CRP and procalcitonin"],
          ["04", "Suggested next acquisition", "Serial CRP and procalcitonin"],
        ].map(([n, k, v]) => (
          <li key={n} className="grid grid-cols-[2rem_1fr] gap-x-2">
            <span className="machine text-ink-3">{n}</span>
            <span>
              <span className="machine block text-ink">{k}</span>
              <span className="block text-[12.5px] leading-snug text-ink-2">{v}</span>
            </span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: "chat",
    tab: "Clinical chat",
    kicker: "Ask, add context, act — by card",
    title: "Draft handover note · SBAR from the current packet",
    body: (
      <>
        <div className="grid grid-cols-3 gap-2">
          {[
            ["Understand", ["Patient summary", "What changed in the last hour", "Why this confidence score", "What could go wrong next"]],
            ["Improve the packet", ["Add a lab value", "Add a symptom or finding", "Upload a report", "Answer the open question"]],
            ["Act", ["Run Deep review", "Compare with 6 hours ago", "Draft handover note", "Record an outcome"]],
          ].map(([h, items]) => (
            <div key={h as string} className="rounded-card border border-hairline bg-well/40 p-2.5">
              <div className="machine text-violet">{h as string}</div>
              <ul className="mt-2 space-y-1">
                {(items as string[]).map((i) => (
                  <li key={i} className="text-[11.5px] leading-snug text-ink-2">{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[12px] text-ink-3">Outcomes recorded here — rapid response, ICU transfer, stable, discharge — feed the learning loop.</p>
      </>
    ),
  },
];

export function TheAssistant() {
  const ref = useRef<HTMLElement>(null);
  const deck = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = usePrefersReducedMotion();

  useSceneShot(ref, "assistant");

  useEffect(() => {
    if (reduced || !deck.current) return;
    liftOff(deck.current.querySelectorAll("[data-lift]"), 60);
  }, [active, reduced]);

  const card = CARDS[active];

  return (
    <section ref={ref} className="relative py-section">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-paper/85" />
      <Container wide>
        <div className="relative grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden className="block h-px w-7 bg-hairline-strong" />
              <span className="machine text-ink-3">05</span>
              <span className="machine text-ink-2">The assistant</span>
            </div>
            <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(1.9rem,3vw,2.7rem)] font-medium leading-[1.06] tracking-[-0.025em] text-ink">{escalation.title}</h2>
            <p className="mt-5 max-w-[42ch] font-body text-body text-pretty text-ink-2">{alert.body}</p>
            <p className="mt-4 max-w-[42ch] text-[13.5px] leading-relaxed text-ink-3">
              ASTA separates observations, trained scores, forecasts and model reasoning so no single output is mistaken for a diagnosis. PPLM is clinical decision support; every card carries the boundary.
            </p>
            <div className="mt-8">
              <Button href={ROUTES.platform} variant="secondary">See the platform</Button>
            </div>
          </div>

          {/* ── the deck ── */}
          <div>
            <div role="tablist" aria-label="ASTA Pro sections" className="flex flex-wrap gap-1.5 border-b border-hairline pb-3">
              {CARDS.map((c, i) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => setActive(i)}
                  className={[
                    "rounded-pill px-3.5 py-1.5 font-machine text-[12px] transition-colors duration-200",
                    i === active ? "bg-violet/20 text-ink ring-1 ring-violet/60" : "text-ink-3 hover:text-ink-2",
                  ].join(" ")}
                >
                  {c.tab}
                </button>
              ))}
            </div>

            <div ref={deck} key={card.id} className="mt-5 rounded-card border border-hairline bg-well/80 p-6 shadow-card">
              <div data-lift className="flex items-center justify-between gap-4">
                <span className="machine text-violet">{card.kicker}</span>
                <span className="machine text-ink-3">Bed 04 · Medical Ward 1</span>
              </div>
              <h3 data-lift className="mt-3 font-display text-[clamp(1.15rem,1.6vw,1.45rem)] font-medium leading-snug text-ink">{card.title}</h3>
              <div data-lift className="mt-4">{card.body}</div>
              <div data-lift className="mt-5 flex items-center justify-between border-t border-hairline pt-3">
                <span className="machine text-ink-3">Clinician review required</span>
                <span className="machine text-ink-3">request trace preserved</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
