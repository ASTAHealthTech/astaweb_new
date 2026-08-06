"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { DrawLines } from "@/components/ui/DrawLines";
import { Icon } from "@/components/ui/Icon";
import {
  hero,
  clinicalAiInAction,
  institutionalTrust,
  howItWorks,
  capabilities,
  outcomes,
  security,
  finalCta,
} from "@/content/home";
import type { IconName } from "@/lib/types";

import { StripeGridWrapper, GridRow, CrossLine } from "@/components/layout/StripeGridWrapper";

/* ════════════════════════════════════════════════════════════
   1. HERO SECTION
   Large, elegant headline. Dark green accent phrase. No eyebrow.
   ════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="pb-0 pt-32 md:pt-40">
      <Container className="text-center">
        <Reveal>
          <h1 className="mx-auto max-w-[840px] text-[2.75rem] font-semibold leading-[1.08] tracking-[-0.035em] text-fg sm:text-[3.5rem] md:text-[4.25rem] lg:text-[4.75rem] text-balance dark:text-frost">
            {hero.headline}{" "}
            <span className="text-accent">{hero.headlineAccent}</span>
          </h1>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mx-auto mt-5 max-w-[840px] text-[1.0625rem] leading-[1.65] text-fg-muted dark:text-frost-muted md:text-[1.125rem]">
            {hero.sub}
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button href={hero.primaryCta.href} variant="primary" size="lg" trailingIcon>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline" size="lg">
              {hero.secondaryCta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   2. VIDEO PLACEHOLDER SECTION
   Massive styled card below hero with soft gradient background
   ════════════════════════════════════════════════════════════ */
function VideoSection() {
  return (
    <section className="px-4 pb-12 pt-10 md:px-8 md:pb-20 md:pt-14">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-black">
            <video
              src="/asta3.mp4"
              controls
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   3. METRICS BAND
   Three key numbers in a bordered strip
   ════════════════════════════════════════════════════════════ */
function MetricsBand() {
  return (
    <section className="relative py-0 border-y border-border/60 dark:border-night-edge/60">
      <Container className="py-0">
        <div className="grid grid-cols-1 overflow-hidden sm:grid-cols-3">
          {clinicalAiInAction.metrics.map((m, i) => (
            <div key={m.label} className="relative py-10 text-center md:py-12">
              <span className="text-[2.75rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[3.25rem]">
                {m.value}
              </span>
              <p className="mt-1 text-[0.8125rem] text-fg-muted dark:text-frost-muted">{m.label}</p>
              <p className="mt-0.5 text-[0.72rem] text-fg-subtle dark:text-frost-muted">{m.note}</p>

              {i < clinicalAiInAction.metrics.length - 1 && <DrawLines className="right-0 hidden sm:block" delay={i * 100} />}
              {i < clinicalAiInAction.metrics.length - 1 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={i * 100} />}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   4. PROCESS SECTION (Auto-rotating Converge-style tabs)
   ════════════════════════════════════════════════════════════ */
function ProcessSection() {
  const { steps } = howItWorks;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActive((p) => (p + 1) % steps.length);
  }, [steps.length]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <h2 className="mx-auto max-w-[600px] text-center text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.025em] text-fg dark:text-frost md:text-[2.375rem]">
            From monitor reading to{" "}
            <span className="text-accent">clinical action</span> in five steps.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="mx-auto mt-14 max-w-3xl"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Tabs */}
            <div className="relative flex">
              <DrawLines horizontal className="bottom-0" />
              {steps.map((s, i) => (
                <button
                  key={s.step}
                  onClick={() => setActive(i)}
                  className={`relative flex-1 pb-3.5 pt-1.5 text-center text-[0.8125rem] font-medium transition-colors md:text-[0.875rem] ${active === i
                    ? "text-fg dark:text-frost"
                    : "text-fg-subtle hover:text-fg-muted dark:text-frost-muted"
                    }`}
                >
                  {s.title}
                  {active === i && (
                    <span className="absolute inset-x-0 -bottom-px h-[2px] overflow-hidden bg-border/50 dark:bg-night-edge">
                      <span
                        key={`prog-${active}`}
                        className="block h-full bg-accent"
                        style={{
                          animation: paused ? "none" : "progress-fill 5s linear forwards",
                        }}
                      />
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Active Content */}
            <div className="mt-8 flex items-start gap-4 md:mt-10">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-[0.8125rem] font-bold text-white shadow-sm">
                {steps[active].step}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="text-[1.125rem] font-semibold text-fg dark:text-frost">
                    {steps[active].title}
                  </h3>
                  {steps[active].subtitle && (
                    <span className="text-[0.8125rem] font-medium text-accent">
                      · {steps[active].subtitle}
                    </span>
                  )}
                </div>

                <p className="mt-2 text-[0.90625rem] leading-[1.7] text-fg-muted dark:text-frost-muted">
                  {steps[active].body}
                </p>

                {steps[active].highlights && (
                  <div className="mt-4 grid gap-2 border-t border-border/60 pt-4 dark:border-night-edge/60 sm:grid-cols-1 md:grid-cols-3">
                    {steps[active].highlights.map((h) => {
                      const [label, val] = h.split(": ");
                      return (
                        <div key={h} className="rounded-xl border border-border/80 bg-bg p-3 dark:border-night-edge/80 dark:bg-night">
                          <span className="text-[0.78rem] font-semibold text-accent">{label}</span>
                          {val && (
                            <p className="mt-1 text-[0.75rem] leading-snug text-fg-subtle dark:text-frost-muted">{val}</p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      <style jsx>{`
        @keyframes progress-fill {
          from { width: 0; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   5. HOSPITAL DEPLOYMENTS (Bento Logo Grid)
   ════════════════════════════════════════════════════════════ */
const DEPLOYMENT_GRID = [
  { name: "Southern Railway HQ Hospital", logo: "/hospitals/southern-railway-hq.jpeg", scope: "Multi-ward vital monitoring", location: "Chennai" },
  { name: "Karnataka ENT Hospital", logo: "/hospitals/karnataka-ent.jpg", scope: "ENT-specific alert routing", location: "Chitradurga" },
  { name: "Aksha Hospital", logo: "/hospitals/aksha.png", scope: "Cross-department vital coverage", location: "Bangalore" },
  { name: "Seethapathy Clinic", logo: "/hospitals/seethapathy.png", scope: "Clinic-grade escalation protocols", location: "Chennai" },
  { name: "K.S. Hospital", logo: "/hospitals/ks.png", scope: "Bedside monitor integration", location: "Kumbakonam" },
  { name: "Sugam Hospital", logo: "/hospitals/sugam.png", scope: "Continuous ward-level coverage", location: "Kumbakonam" },
  { name: "Anbu Hospital", logo: "/hospitals/anbu.png", scope: "Ward monitoring deployment", location: "Kumbakonam" },
];

function DeploymentsSection() {
  return (
    <section className="relative">
      <Container className="py-16 md:py-24">
        <Reveal>
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
            <h2 className="max-w-[440px] text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.025em] text-fg dark:text-frost md:text-[2.375rem]">
              Live in <span className="text-accent">7+ hospitals</span> across India.
            </h2>
            <p className="max-w-[380px] text-[0.9375rem] leading-[1.65] text-fg-muted dark:text-frost-muted">
              Named, verified deployments in active patient-care environments. Not pilots, not proof-of-concept installations.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border dark:border-night-edge dark:bg-night-edge md:grid-cols-12">
            {DEPLOYMENT_GRID.map((d, i) => (
              <div
                key={d.name}
                className={`flex flex-col items-center justify-center gap-3 bg-bg px-4 py-8 dark:bg-[#0F0F0F] md:py-10 ${i < 3 ? "md:col-span-4 lg:col-span-4" : "md:col-span-6 lg:col-span-3"
                  }`}
              >
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg">
                  <Image
                    src={d.logo}
                    alt={d.name}
                    width={48}
                    height={48}
                    className="h-10 w-10 object-contain"
                    unoptimized
                  />
                </div>
                <div className="text-center">
                  <p className="text-[0.8125rem] font-semibold text-fg dark:text-frost">{d.name}</p>
                  <p className="mt-0.5 text-[0.72rem] text-fg-subtle dark:text-frost-muted">{d.scope}</p>
                  <p className="mt-0.5 text-[0.65rem] text-fg-subtle/60 dark:text-frost-muted/60">{d.location}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   6. OEM & INTEGRATION COMPATIBILITY (Bento Cards)
   ════════════════════════════════════════════════════════════ */
const OEM_BRANDS = [
  { name: "Philips IntelliVue", detail: "Display numerics + waveforms" },
  { name: "GE Healthcare Carescape", detail: "Multi-parameter displays" },
  { name: "Mindray BeneVision", detail: "ICU & ward monitors" },
  { name: "Dräger Infinity", detail: "High-acuity bedside displays" },
  { name: "Nihon Kohden Life Scope", detail: "Portable & telemetry monitors" },
  { name: "Edan iM Series", detail: "General ward vital monitors" },
];

const INTEGRATIONS = [
  { title: "HL7 v2.x / FHIR R4", detail: "Seamless EMR & EHR sync" },
  { title: "REST & Webhook APIs", detail: "Custom escalation feeds" },
  { title: "Standalone Deployment", detail: "Zero hospital IT dependency" },
  { title: "Role-Based Routing", detail: "Nurse & doctor mobile alerts" },
];

function CompatibilitySection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <h2 className="mx-auto max-w-[620px] text-center text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.025em] text-fg dark:text-frost md:text-[2.375rem]">
            Works with <span className="text-accent">15+ OEM monitor brands</span> out of the box.
          </h2>
          <p className="mx-auto mt-3 max-w-[480px] text-center text-[0.9375rem] text-fg-muted dark:text-frost-muted">
            No hardware tap. No API required from the monitor manufacturer. Camera mounts on the display, not the patient.
          </p>
        </Reveal>

        {/* OEM Monitor Grid */}
        <Reveal delay={0.08}>
          <div className="mt-12 grid overflow-hidden rounded-xl border border-border dark:border-night-edge sm:grid-cols-2 lg:grid-cols-3">
            {OEM_BRANDS.map((b, i) => {
              const isRightColDesktop = (i + 1) % 3 === 0;
              const isRightColMobile = (i + 1) % 2 === 0;
              const isBottomRowDesktop = i >= OEM_BRANDS.length - 3;
              const isBottomRowMobile = i >= OEM_BRANDS.length - (OEM_BRANDS.length % 2 === 0 ? 2 : 1);

              return (
                <div key={b.name} className="relative flex flex-col bg-bg p-5 dark:bg-night">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <h3 className="mt-3 text-[0.875rem] font-semibold text-fg dark:text-frost">{b.name}</h3>
                  <p className="mt-1 text-[0.75rem] text-fg-subtle dark:text-frost-muted">{b.detail}</p>

                  {!isRightColDesktop && <DrawLines className="right-0 hidden lg:block" delay={i * 100} />}
                  {!isRightColMobile && <DrawLines className="right-0 lg:hidden" delay={i * 100} />}

                  {!isBottomRowDesktop && <DrawLines horizontal className="bottom-0 hidden lg:block" delay={i * 100} />}
                  {!isBottomRowMobile && <DrawLines horizontal className="bottom-0 lg:hidden" delay={i * 100} />}
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* Integration Strip */}
        <Reveal delay={0.14}>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {INTEGRATIONS.map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-white p-4 dark:border-night-edge dark:bg-night-panel">
                <p className="text-[0.8125rem] font-semibold text-fg dark:text-frost">{item.title}</p>
                <p className="mt-0.5 text-[0.72rem] text-fg-subtle dark:text-frost-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   7. WARD USE CASE CLUSTERS (4 Bento Cards)
   ════════════════════════════════════════════════════════════ */
const WARD_CLUSTERS = [
  {
    title: "High-Acuity ICU Wards",
    desc: "Continuous vital extraction with trajectory-aware alert filtering to eliminate alarm fatigue.",
    badge: "ICU & CCU",
    metric: "<2s latency",
  },
  {
    title: "Step-Down / HCU Wards",
    desc: "Transitional care oversight identifying deterioration signals before clinical arrest.",
    badge: "Step-Down",
    metric: "74% false alarm drop",
  },
  {
    title: "General Inpatient Wards",
    desc: "Converting standard bedside monitors into continuous smart observation beds.",
    badge: "General Ward",
    metric: "16 hrs/bed saved",
  },
  {
    title: "Peripheral & Rural Wards",
    desc: "Low-infrastructure, zero-IT continuous monitoring for resource-constrained clinical settings.",
    badge: "Peripheral",
    metric: "Zero IT dependency",
  },
];

function WardUseCasesSection() {
  return (
    <section className="relative py-20 md:py-28">
      <Container>
        <Reveal>
          <h2 className="mx-auto max-w-[560px] text-center text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.025em] text-fg dark:text-frost md:text-[2.375rem]">
            Built for <span className="text-accent">every ward acuity tier</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 grid overflow-hidden rounded-xl border border-border dark:border-night-edge sm:grid-cols-2">
            {WARD_CLUSTERS.map((w, i) => {
              const isRightCol = (i + 1) % 2 === 0;
              const isBottomRow = i >= WARD_CLUSTERS.length - 2;

              return (
                <div key={w.title} className="relative flex flex-col justify-between bg-bg p-6 md:p-7 dark:bg-night">
                  <div>
                    <span className="inline-block rounded-md bg-accent/10 px-2.5 py-1 text-[0.7rem] font-semibold text-accent">
                      {w.badge}
                    </span>
                    <h3 className="mt-3 text-[1rem] font-semibold text-fg dark:text-frost">{w.title}</h3>
                    <p className="mt-1.5 text-[0.8125rem] leading-[1.65] text-fg-muted dark:text-frost-muted">{w.desc}</p>
                  </div>
                  <div className="relative mt-4 pt-3">
                    <DrawLines horizontal className="top-0" delay={i * 100} />
                    <span className="text-[0.75rem] font-semibold text-fg dark:text-frost">→ {w.metric}</span>
                  </div>

                  {!isRightCol && <DrawLines className="right-0 hidden sm:block" delay={i * 100} />}
                  {!isBottomRow && <DrawLines horizontal className="bottom-0 hidden sm:block" delay={i * 100} />}
                  {i < WARD_CLUSTERS.length - 1 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={i * 100} />}
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   8. PLATFORM FEATURES (Bento Grid of 6)
   ════════════════════════════════════════════════════════════ */
function FeaturesSection() {
  const { items } = capabilities;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <h2 className="mx-auto max-w-[580px] text-center text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.025em] text-fg dark:text-frost md:text-[2.375rem]">
            A productized platform, built for{" "}
            <span className="text-accent">hospital deployment</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 grid overflow-hidden rounded-xl border border-border dark:border-night-edge sm:grid-cols-2 lg:grid-cols-3">
            {items.map((cap, index) => {
              const isRightColDesktop = (index + 1) % 3 === 0;
              const isRightColTablet = (index + 1) % 2 === 0;
              const isBottomRowDesktop = index >= items.length - 3;
              const isBottomRowTablet = index >= items.length - (items.length % 2 === 0 ? 2 : 1);

              return (
                <div key={cap.title} className="relative flex flex-col justify-between bg-bg p-6 md:p-7 dark:bg-night">
                  {/* Typographic Anchoring Number */}
                  <span className="pointer-events-none absolute right-4 top-2 font-mono text-[2.75rem] font-bold text-neutral-200/50 dark:text-white/[0.04]">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="text-[0.9375rem] font-semibold text-fg dark:text-frost">{cap.title}</h3>
                    <p className="mt-1.5 text-[0.8125rem] leading-[1.65] text-fg-muted dark:text-frost-muted">{cap.body}</p>
                  </div>

                  {!isRightColDesktop && <DrawLines className="right-0 hidden lg:block" delay={index * 100} />}
                  {!isRightColTablet && <DrawLines className="right-0 hidden sm:block lg:hidden" delay={index * 100} />}

                  {!isBottomRowDesktop && <DrawLines horizontal className="bottom-0 hidden lg:block" delay={index * 100} />}
                  {!isBottomRowTablet && <DrawLines horizontal className="bottom-0 hidden sm:block lg:hidden" delay={index * 100} />}

                  {index < items.length - 1 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={index * 100} />}
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   9. INTERACTIVE WARD ROI CALCULATOR
   ════════════════════════════════════════════════════════════ */
function WardRoiSection() {
  const [beds, setBeds] = useState(25);
  const [wardType, setWardType] = useState<"general" | "hcu" | "peripheral">("general");

  const hoursMultiplier = wardType === "hcu" ? 18 : wardType === "peripheral" ? 14 : 16;
  const timeSaved = Math.round(beds * hoursMultiplier);
  const falseAlarmReduction = wardType === "hcu" ? 74 : 68;
  const costSavings = (beds * 4200).toLocaleString("en-US");

  return (
    <section className="relative py-20 md:py-28">
      <Container>
        <Reveal>
          <h2 className="mx-auto max-w-[500px] text-center text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.025em] text-fg dark:text-frost md:text-[2.375rem]">
            Calculate the impact for <span className="text-accent">your ward</span>.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-border bg-white p-6 dark:border-night-edge dark:bg-night-panel md:p-8">
            <div className="space-y-5">
              <div>
                <label className="text-[0.75rem] font-medium text-fg-subtle dark:text-frost-muted">Ward type</label>
                <div className="mt-2 flex gap-2">
                  {[
                    { id: "general" as const, label: "General Ward" },
                    { id: "hcu" as const, label: "Step-Down / HCU" },
                    { id: "peripheral" as const, label: "Peripheral" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setWardType(item.id)}
                      className={`flex-1 rounded-[10px] px-3 py-2 text-[0.8125rem] font-medium transition-all ${wardType === item.id
                        ? "bg-fg text-white dark:bg-frost dark:text-night"
                        : "bg-bg text-fg-muted hover:text-fg dark:bg-night-edge dark:text-frost-muted"
                        }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-[0.75rem] font-medium text-fg-subtle dark:text-frost-muted">Monitored beds</label>
                  <span className="text-[0.9375rem] font-semibold text-fg dark:text-frost">{beds} beds</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={5}
                  value={beds}
                  onChange={(e) => setBeds(Number(e.target.value))}
                  className="mt-2 h-1.5 w-full cursor-pointer appearance-none rounded bg-border accent-accent dark:bg-night-edge"
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 border-t border-border pt-6 dark:border-night-edge">
              <div>
                <div className="text-[1.375rem] font-semibold text-fg dark:text-frost md:text-[1.625rem]">
                  {timeSaved}<span className="text-[0.72rem] font-normal text-fg-muted"> hrs/mo</span>
                </div>
                <div className="text-[0.72rem] text-fg-subtle dark:text-frost-muted">Nursing time saved</div>
              </div>
              <div>
                <div className="text-[1.375rem] font-semibold text-fg dark:text-frost md:text-[1.625rem]">
                  -{falseAlarmReduction}%
                </div>
                <div className="text-[0.72rem] text-fg-subtle dark:text-frost-muted">False alarm drop</div>
              </div>
              <div>
                <div className="text-[1.375rem] font-semibold text-fg dark:text-frost md:text-[1.625rem]">
                  ${costSavings}
                </div>
                <div className="text-[0.72rem] text-fg-subtle dark:text-frost-muted">Fleet capex saved</div>
              </div>
            </div>

            <div className="mt-6">
              <Button href="/contact?intent=demo" variant="primary" trailingIcon className="w-full justify-center">
                Request ward assessment
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   10. OPERATING MODEL (Bento Grid of 4)
   ════════════════════════════════════════════════════════════ */
function OperatingModelSection() {
  const { items } = outcomes;

  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <h2 className="mx-auto max-w-[540px] text-center text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.025em] text-fg dark:text-frost md:text-[2.375rem]">
            A practical operating model.{" "}
            <span className="text-fg-muted dark:text-frost-muted">Not a demo-stage AI promise.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border dark:border-night-edge dark:bg-night-edge sm:grid-cols-2">
            {items.map((item) => (
              <div key={item.title} className="flex flex-col bg-bg p-6 md:p-7 dark:bg-night">
                <span className="text-[0.72rem] font-semibold uppercase tracking-wider text-accent">{item.audience}</span>
                <h3 className="mt-2 text-[0.9375rem] font-semibold text-fg dark:text-frost">{item.title}</h3>
                <p className="mt-1.5 text-[0.8125rem] leading-[1.65] text-fg-muted dark:text-frost-muted">{item.body}</p>
                {item.metric && (
                  <span className="mt-3 text-[0.75rem] font-medium text-fg-subtle dark:text-frost-muted">→ {item.metric}</span>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   11. DATA SECURITY & COMPLIANCE STRIP
   ════════════════════════════════════════════════════════════ */
function ComplianceStrip() {
  const { heading, quickMetrics } = security;
  return (
    <section className="relative border-y border-border/60 dark:border-night-edge/60">
      <Container className="py-0">
        <div className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between md:py-12">
          <h3 className="max-w-[400px] text-[1.125rem] font-semibold leading-snug text-fg dark:text-frost md:text-[1.375rem]">
            {heading}
          </h3>
          <div className="flex gap-8 md:gap-10">
            {quickMetrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="text-[1.25rem] font-semibold text-fg dark:text-frost md:text-[1.5rem]">{m.val}</div>
                <div className="text-[0.72rem] text-fg-subtle dark:text-frost-muted">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   12. FOUNDER'S NOTE
   Large testimonial block matching Converge AI style
   ════════════════════════════════════════════════════════════ */
function FounderNote() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background Watermark Text */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none text-[8rem] font-black tracking-tighter text-neutral-200/30 dark:text-white/[0.02] md:text-[14rem]">
        ASTA
      </div>

      <Container>
        <Reveal>
          <div className="mx-auto max-w-[760px] text-center">
            <blockquote className="text-[1.5rem] font-medium leading-[1.35] tracking-[-0.02em] text-fg dark:text-frost md:text-[2rem]">
              &ldquo;ASTA reads existing bedside monitors and structures vitals in real time. We turn passive ward displays into{" "}
              <span className="text-accent">active clinical intelligence</span>.&rdquo;
            </blockquote>

            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border border-border bg-bg shadow-sm dark:border-night-edge dark:bg-night">
                <Image
                  src="/team/adyanta.jpeg"
                  alt="Adyanta Dubey"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="text-left">
                <p className="text-[0.9375rem] font-semibold text-fg dark:text-frost">Adyanta Dubey</p>
                <p className="text-[0.78rem] text-fg-muted dark:text-frost-muted">CTO &amp; Co-Founder</p>
              </div>
              <div className="h-6 w-px bg-border dark:bg-night-edge" />
              <div className="flex items-center gap-2">
                <Image
                  src="/logo/logo-asta.png"
                  alt="ASTA Health Tech"
                  width={1280}
                  height={723}
                  className="h-auto w-[76px] opacity-90 dark:brightness-200"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   13. INSTITUTIONAL TRUST & BACKING BAND
   ════════════════════════════════════════════════════════════ */
function TrustBand() {
  const partners = institutionalTrust.items;
  return (
    <section className="relative border-y border-border/60 dark:border-night-edge/60">
      <Container className="py-0">
        <div className="relative py-3 text-center">
          <DrawLines horizontal className="bottom-0" />
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.1em] text-fg-muted dark:text-frost-muted">
            Backed & Supported By
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4">
          {partners.map((p, i) => (
            <div
              key={p.name}
              className="relative flex flex-col items-center justify-center px-4 py-8 text-center md:py-10"
            >
              <span className="text-[1rem] font-semibold text-fg dark:text-frost md:text-[1.125rem]">{p.name}</span>
              <span className="mt-1 max-w-[160px] text-[0.7rem] leading-tight text-fg-subtle dark:text-frost-muted">
                {p.descriptor}
              </span>

              {i < partners.length - 1 && <DrawLines className="right-0 hidden md:block" delay={i * 150} />}
              {i % 2 === 0 && <DrawLines className="right-0 md:hidden" delay={i * 150} />}
              {i < 2 && <DrawLines horizontal className="bottom-0 md:hidden" delay={i * 150} />}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   14. FINAL CTA SECTION
   ════════════════════════════════════════════════════════════ */
function FinalCtaSection() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-[520px] text-center">
            <h2 className="text-[1.75rem] font-semibold tracking-[-0.025em] text-fg dark:text-frost md:text-[2.375rem]">
              {finalCta.heading}
            </h2>
            <p className="mt-3 text-[0.9375rem] leading-[1.65] text-fg-muted dark:text-frost-muted">
              {finalCta.sub}
            </p>
            <div className="mt-7 flex items-center justify-center gap-3">
              <Button href={finalCta.primaryCta.href} variant="primary" size="lg" trailingIcon>
                {finalCta.primaryCta.label}
              </Button>
              {finalCta.secondaryCta && (
                <Button href={finalCta.secondaryCta.href} variant="outline" size="lg">
                  {finalCta.secondaryCta.label}
                </Button>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════
   FULL NARRATIVE FLOW COMPOSED HOMEPAGE
   ════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VideoSection />

      <StripeGridWrapper>
        <GridRow striped={false}>
          <CrossLine />
          <MetricsBand />
        </GridRow>

        <GridRow striped>
          <CrossLine dashed />
          <ProcessSection />
        </GridRow>

        <GridRow striped={false}>
          <CrossLine />
          <DeploymentsSection />
        </GridRow>

        <GridRow striped>
          <CrossLine dashed />
          <CompatibilitySection />
        </GridRow>

        <GridRow striped={false}>
          <CrossLine />
          <WardUseCasesSection />
        </GridRow>

        <GridRow striped>
          <CrossLine dashed />
          <FeaturesSection />
        </GridRow>

        <GridRow striped={false}>
          <CrossLine />
          <WardRoiSection />
        </GridRow>

        <GridRow striped>
          <CrossLine dashed />
          <OperatingModelSection />
        </GridRow>

        <GridRow striped={false}>
          <CrossLine />
          <ComplianceStrip />
        </GridRow>

        <GridRow striped>
          <CrossLine dashed />
          <FounderNote />
        </GridRow>

        <GridRow striped={false}>
          <CrossLine />
          <TrustBand />
        </GridRow>

        <GridRow striped>
          <CrossLine dashed />
          <FinalCtaSection />
        </GridRow>
      </StripeGridWrapper>
    </>
  );
}
