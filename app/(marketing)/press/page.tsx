import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CONTACT_EMAIL } from "@/content/contact";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Press",
  description:
    "Media coverage, institutional recognition, and deployment milestones from ASTA Healthtech.",
  path: "/press",
  keywords: [
    "ASTA press",
    "healthtech media coverage",
    "clinical AI milestones",
    "ASTA news",
  ],
});

const INSTITUTIONAL_BACKING = [
  {
    name: "MeitY Startup Hub",
    descriptor: "Ministry of Electronics & IT, Government of India",
    note: "National innovation program backing for ASTA's role in digital health infrastructure.",
    color: "#4F6BFF",
    badge: "Government backing",
  },
  {
    name: "IISER Pune",
    descriptor: "Indian Institute of Science Education and Research",
    note: "Research institution support grounding ASTA's clinical AI development in scientific rigour.",
    color: "#28D7B5",
    badge: "Research institution",
  },
  {
    name: "AIC-SEED",
    descriptor: "Atal Incubation Centre - SEED",
    note: "Incubation and accelerator backing through ASTA's translational medtech journey.",
    color: "#7C5CFF",
    badge: "Incubation program",
  },
  {
    name: "NIT Andhra Pradesh",
    descriptor: "National Institute of Technology, Andhra Pradesh",
    note: "Engineering and founder-pathway institution behind ASTA's technical build.",
    color: "#49C6FF",
    badge: "Engineering institute",
  },
];

export default function PressPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#060816] pb-16 pt-28 md:pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-grid-fine bg-[length:44px_44px] opacity-40" />
          <div className="absolute left-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-brand-500/[0.08] blur-[140px]" />
          <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-cyan-400/[0.06] blur-[110px]" />
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
                Media &amp; Press · ASTA Healthtech
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 text-balance text-[2.8rem] font-semibold leading-[1.06] tracking-[-0.045em] text-frost md:text-[3.5rem]">
                ASTA{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg,#4F6BFF 0%,#7C5CFF 45%,#28D7B5 100%)",
                  }}
                >
                  in the media.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-lg text-[1.02rem] leading-relaxed text-white/52">
                Institutional recognition, deployment milestones, and media coverage
                as ASTA builds the clinical intelligence layer for Indian hospital wards.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Institutional backing */}
      <section className="bg-canvas py-20 dark:bg-[#060816]">
        <Container>
          <Reveal>
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 text-[0.67rem] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
                Institutional recognition
              </div>
              <h2 className="mt-4 text-[1.8rem] font-semibold tracking-[-0.03em] text-frost md:text-[2.2rem]">
                Recognised by institutions that matter.
              </h2>
              <p className="mt-3 max-w-xl text-[0.88rem] text-white/50">
                ASTA is backed by national innovation programs, premier research
                institutions, and public-sector technology development mandates.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {INSTITUTIONAL_BACKING.map((item) => (
              <Reveal key={item.name}>
                <div className="flex h-full gap-4 rounded-2xl border border-white/[0.07] bg-[#040810] p-5">
                  <div
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[0.70rem] font-bold tracking-tight"
                    style={{
                      background: item.color + "18",
                      color: item.color,
                      border: `1px solid ${item.color}28`,
                    }}
                  >
                    {item.name.slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[0.90rem] font-semibold text-frost">
                        {item.name}
                      </span>
                      <span
                        className="rounded-full px-2 py-0.5 font-mono text-[0.57rem] font-semibold uppercase tracking-[0.12em]"
                        style={{
                          background: item.color + "12",
                          color: item.color,
                          border: `1px solid ${item.color}22`,
                        }}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <p className="mt-0.5 text-[0.75rem] text-white/40">{item.descriptor}</p>
                    <p className="mt-2 text-[0.80rem] leading-relaxed text-white/55">
                      {item.note}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Coverage + media inquiry */}
      <section className="bg-canvas pb-24 dark:bg-[#060816]">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {/* Coverage coming soon */}
            <Reveal>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/[0.07] bg-[#040810] p-7">
                <div className="mb-1 font-mono text-[0.60rem] uppercase tracking-[0.20em] text-white/28">
                  Media coverage
                </div>
                <h3 className="text-[1.15rem] font-semibold text-frost">
                  Articles and features coming soon.
                </h3>
                <p className="text-[0.82rem] leading-relaxed text-white/48">
                  We are compiling published coverage of ASTA's deployments, institutional
                  backing, and clinical AI development. Check back as we update this page
                  with links and references.
                </p>
                <div className="mt-auto flex items-center gap-2 rounded-xl border border-brand-400/15 bg-brand-400/[0.05] px-4 py-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400/60" />
                  <span className="text-[0.75rem] text-white/40">
                    Coverage updates in progress
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Media inquiry */}
            <Reveal>
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-white/[0.07] bg-[#040810] p-7">
                <div className="mb-1 font-mono text-[0.60rem] uppercase tracking-[0.20em] text-white/28">
                  Press inquiries
                </div>
                <h3 className="text-[1.15rem] font-semibold text-frost">
                  Media kit and press contact.
                </h3>
                <p className="text-[0.82rem] leading-relaxed text-white/48">
                  For interview requests, coverage inquiries, product briefings, and
                  access to ASTA's media kit, reach out directly. We respond to all
                  media inquiries within 24 hours.
                </p>
                <div className="mt-auto">
                  <Button
                    href={`mailto:${CONTACT_EMAIL}?subject=Press%20inquiry%20%7C%20ASTA`}
                    variant="glow"
                    size="lg"
                    trailingIcon
                  >
                    Contact for press
                  </Button>
                  <p className="mt-2.5 text-[0.72rem] text-white/30">{CONTACT_EMAIL}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
