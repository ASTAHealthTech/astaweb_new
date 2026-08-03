"use client";

import { useState, useEffect, useCallback } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { clinicalAiInAction } from "@/content/home";

export function ClinicalAiInAction() {
  const { eyebrow, heading, sub, bullets, metrics } = clinicalAiInAction;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % bullets.length);
  }, [bullets.length]);

  // Auto-rotate every 4s
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section className="bg-bg-alt py-20 dark:bg-night md:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={eyebrow} heading={heading} sub={sub} />
        </Reveal>

        {/* Metrics row */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-6 md:gap-10">
            {metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-[1.75rem] font-semibold tracking-tight text-fg dark:text-frost md:text-[2rem]">
                  {m.value}
                </div>
                <div className="mt-0.5 text-[0.75rem] text-fg-muted dark:text-frost/50">{m.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Auto-rotating feature tabs — Converge style */}
        <Reveal delay={0.18}>
          <div
            className="mx-auto mt-14 max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Tab bar */}
            <div className="flex border-b border-border dark:border-night-edge">
              {bullets.map((b, i) => (
                <button
                  key={b.title}
                  onClick={() => setActive(i)}
                  className={`relative flex-1 px-3 py-3 text-[0.8125rem] font-medium transition-colors md:text-[0.875rem] ${
                    active === i
                      ? "text-fg dark:text-frost"
                      : "text-fg-subtle hover:text-fg-muted dark:text-frost/35 dark:hover:text-frost/55"
                  }`}
                >
                  {b.title}
                  {/* Progress bar under active tab */}
                  {active === i && (
                    <span className="absolute inset-x-0 -bottom-px h-[2px] bg-brand-500">
                      {!paused && (
                        <span
                          className="block h-full bg-brand-600 dark:bg-brand-400"
                          style={{
                            animation: "progress-fill 4s linear forwards",
                          }}
                        />
                      )}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Content area */}
            <div className="mt-8 min-h-[100px]">
              <p className="text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost/55 md:text-base">
                {bullets[active].body}
              </p>
            </div>
          </div>
        </Reveal>
      </Container>

      <style jsx>{`
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}
