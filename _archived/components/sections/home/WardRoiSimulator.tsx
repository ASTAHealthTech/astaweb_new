"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { DrawLines } from "@/components/ui/DrawLines";

export function WardRoiSimulator() {
  const [beds, setBeds] = useState(25);
  const [wardType, setWardType] = useState<"general" | "hcu" | "peripheral">("general");

  const hoursMultiplier = wardType === "hcu" ? 18 : wardType === "peripheral" ? 14 : 16;
  const timeSaved = Math.round(beds * hoursMultiplier);
  const falseAlarmReduction = wardType === "hcu" ? 74 : 68;
  const costSavings = (beds * 4200).toLocaleString();

  return (
    <section className="bg-bg-alt py-20 dark:bg-night md:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="ROI Calculator"
            heading="See the impact for your ward."
          />
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-white p-6 dark:border-night-edge dark:bg-night-panel md:p-8">
            {/* Controls */}
            <div className="space-y-5">
              <div>
                <label className="text-[0.75rem] font-medium text-fg-subtle dark:text-frost/40">Ward type</label>
                <div className="mt-2 flex gap-2">
                  {[
                    { id: "general" as const, label: "General" },
                    { id: "hcu" as const, label: "Step-down / HCU" },
                    { id: "peripheral" as const, label: "Peripheral" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setWardType(item.id)}
                      className={`rounded-[10px] px-4 py-2 text-[0.8125rem] font-medium transition-all ${
                        wardType === item.id
                          ? "bg-fg text-white dark:bg-frost dark:text-night"
                          : "bg-bg-alt text-fg-muted hover:bg-bg-alt dark:bg-night-edge dark:text-frost/50"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[0.75rem] font-medium text-fg-subtle dark:text-frost/40">Monitored beds</label>
                  <span className="text-[0.9375rem] font-semibold text-fg dark:text-frost">{beds}</span>
                </div>
                <input
                  type="range" min={5} max={100} step={5} value={beds}
                  onChange={(e) => setBeds(Number(e.target.value))}
                  className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded bg-bg-alt accent-brand-600 dark:bg-night-edge"
                />
              </div>
            </div>

            {/* Results */}
            <div className="relative mt-6 grid grid-cols-3 gap-4 pt-6">
              <DrawLines horizontal className="top-0" />
              <div>
                <div className="text-[1.5rem] font-semibold tracking-tight text-fg dark:text-frost">{timeSaved}<span className="text-[0.75rem] font-normal text-fg-muted"> hrs/mo</span></div>
                <div className="text-[0.72rem] text-fg-subtle dark:text-frost/35">Nursing time saved</div>
              </div>
              <div>
                <div className="text-[1.5rem] font-semibold tracking-tight text-fg dark:text-frost">-{falseAlarmReduction}%</div>
                <div className="text-[0.72rem] text-fg-subtle dark:text-frost/35">False alarm reduction</div>
              </div>
              <div>
                <div className="text-[1.5rem] font-semibold tracking-tight text-fg dark:text-frost">${costSavings}</div>
                <div className="text-[0.72rem] text-fg-subtle dark:text-frost/35">Capital fleet savings</div>
              </div>
            </div>

            <div className="mt-6">
              <Button href="/contact?intent=demo" variant="glow" trailingIcon className="w-full justify-center">
                Request assessment
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
