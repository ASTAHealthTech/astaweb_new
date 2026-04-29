import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CONTACT_EMAIL } from "@/content/contact";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Careers",
  description:
    "Join the team building clinical AI for real hospital wards. Roles in ML/CV engineering, clinical informatics, and full-stack development.",
  path: "/careers",
  keywords: [
    "healthtech careers",
    "clinical AI jobs",
    "hospital AI engineering roles",
    "ASTA careers",
  ],
});

const VALUES = [
  {
    step: "01",
    title: "Clinical focus",
    body: "We ship to wards, not demos. Every technical decision is evaluated against whether it helps clinicians act faster and hospitals operate better.",
    color: "#4F6BFF",
  },
  {
    step: "02",
    title: "Technical depth",
    body: "From computer vision pipelines to physiological reasoning models, the problem demands real ML, embedded systems, and reliable production software.",
    color: "#28D7B5",
  },
  {
    step: "03",
    title: "Deployment reality",
    body: "Our work runs in active patient-care environments. We operate at the quality bar that live hospital deployment demands, not lab benchmarks.",
    color: "#7C5CFF",
  },
];

const INTEREST_AREAS = [
  "ML / Computer Vision engineers",
  "Clinical informatics professionals",
  "Full-stack engineers with healthcare domain interest",
  "Clinical advisors and ward workflow specialists",
];

export default function CareersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#060816] pb-16 pt-28 md:pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-grid-fine bg-[length:44px_44px] opacity-40" />
          <div className="absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-brand-500/[0.08] blur-[140px]" />
          <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-violet-500/[0.06] blur-[110px]" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 70% at 50% 30%,transparent 30%,rgba(6,8,22,0.75) 100%)",
            }}
          />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.10] bg-white/[0.05] px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                We're Building · Join ASTA
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 text-balance text-[2.8rem] font-semibold leading-[1.06] tracking-[-0.045em] text-frost md:text-[3.5rem]">
                Build clinical AI that{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg,#4F6BFF 0%,#7C5CFF 45%,#28D7B5 100%)",
                  }}
                >
                  runs in real wards.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-lg text-[1.02rem] leading-relaxed text-white/52">
                We're assembling a team that operates at the intersection of machine learning,
                clinical environments, and hospital deployment. If you work best where
                hardware meets medicine, we want to talk.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8">
                <Button
                  href={`mailto:${CONTACT_EMAIL}?subject=Career%20inquiry%20%7C%20ASTA`}
                  variant="glow"
                  size="lg"
                  trailingIcon
                >
                  Send your profile
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* What we look for */}
      <section className="bg-canvas py-20 dark:bg-[#060816]">
        <Container>
          <Reveal>
            <div className="mb-10 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 text-[0.67rem] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
                What we look for
              </div>
              <h2 className="mt-4 text-[1.8rem] font-semibold tracking-[-0.03em] text-frost md:text-[2.2rem]">
                The profile we're building around.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[0.88rem] text-white/50">
                ASTA is not a single-discipline company. We need people who can operate
                across the full clinical-to-deployment path.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {VALUES.map((v) => (
              <Reveal key={v.step}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/[0.07] bg-[#040810] p-6">
                  <span
                    className="font-mono text-[0.62rem] font-bold"
                    style={{ color: v.color }}
                  >
                    {v.step}
                  </span>
                  <h3 className="text-[1.05rem] font-semibold text-frost">{v.title}</h3>
                  <p className="text-[0.82rem] leading-relaxed text-white/50">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Open roles */}
      <section className="bg-canvas pb-24 dark:bg-[#060816]">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#040810] p-8 md:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <div className="absolute -right-10 -top-10 h-[280px] w-[280px] rounded-full bg-brand-500/[0.07] blur-[90px]" />
              </div>

              <div className="relative">
                <div className="mb-2 font-mono text-[0.60rem] uppercase tracking-[0.20em] text-white/28">
                  Open positions
                </div>
                <h2 className="text-[1.5rem] font-semibold tracking-[-0.03em] text-frost md:text-[1.8rem]">
                  Roles coming soon.{" "}
                  <span className="text-white/45">Let us know you're interested.</span>
                </h2>
                <p className="mt-3 max-w-xl text-[0.86rem] leading-relaxed text-white/50">
                  We're growing fast. If you're working on AI, clinical systems, or hospital
                  deployment and want to be considered ahead of our next round of openings,
                  reach out directly.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {INTEREST_AREAS.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[0.72rem] text-white/50"
                    >
                      {area}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Button
                    href={`mailto:${CONTACT_EMAIL}?subject=Career%20inquiry%20%7C%20ASTA`}
                    variant="glow"
                    size="lg"
                    trailingIcon
                  >
                    Send your profile
                  </Button>
                  <span className="text-[0.76rem] text-white/30">
                    {CONTACT_EMAIL}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
