import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description:
    "Clinical AI insights, smart ward deployment perspectives, and hospital intelligence updates from the ASTA team.",
  path: "/blog",
  keywords: [
    "clinical AI blog",
    "hospital intelligence insights",
    "smart ward articles",
    "healthcare AI updates",
  ],
});

const PLACEHOLDER_TOPICS = [
  {
    tag: "Clinical AI",
    title: "How physiological reasoning changes bedside alert design.",
    excerpt:
      "The gap between threshold-triggered alerts and trajectory-aware clinical output, and why it matters for nurse response quality.",
    color: "#4F6BFF",
  },
  {
    tag: "Deployment",
    title: "What makes hospital AI deployment different from enterprise software.",
    excerpt:
      "Ward workflows, mixed monitor estates, and clinical governance create constraints that standard SaaS deployment models do not anticipate.",
    color: "#28D7B5",
  },
  {
    tag: "Platform",
    title: "Computer vision for vital sign extraction: OEM variability and training scale.",
    excerpt:
      "Reading 15+ monitor brands reliably at clinical cadence requires more than OCR. A look at what goes into monitor-agnostic vital extraction.",
    color: "#7C5CFF",
  },
];

export default function BlogPage() {
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
                Clinical AI Insights · ASTA
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="mt-6 text-balance text-[2.8rem] font-semibold leading-[1.06] tracking-[-0.045em] text-frost md:text-[3.5rem]">
                Perspectives on{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg,#4F6BFF 0%,#7C5CFF 45%,#28D7B5 100%)",
                  }}
                >
                  hospital AI.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mx-auto mt-5 max-w-lg text-[1.02rem] leading-relaxed text-white/52">
                Smart ward deployment, clinical reasoning architecture, and practical
                hospital intelligence — from the ASTA team.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Coming soon articles */}
      <section className="bg-canvas py-20 dark:bg-[#060816]">
        <Container>
          <Reveal>
            <div className="mb-2 font-mono text-[0.60rem] uppercase tracking-[0.20em] text-white/28">
              Articles
            </div>
            <h2 className="mb-8 text-[1.5rem] font-semibold tracking-[-0.03em] text-frost">
              First articles coming soon.
            </h2>
          </Reveal>

          <div className="grid gap-4 md:grid-cols-3">
            {PLACEHOLDER_TOPICS.map((post) => (
              <Reveal key={post.title}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-white/[0.07] bg-[#040810] p-6 opacity-60">
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-full px-2.5 py-0.5 font-mono text-[0.59rem] font-semibold uppercase tracking-[0.12em]"
                      style={{
                        background: post.color + "18",
                        color: post.color,
                        border: `1px solid ${post.color}28`,
                      }}
                    >
                      {post.tag}
                    </span>
                    <span className="ml-auto rounded-full border border-white/[0.07] bg-white/[0.03] px-2 py-0.5 font-mono text-[0.57rem] text-white/30">
                      Coming soon
                    </span>
                  </div>
                  <h3 className="text-[0.92rem] font-semibold leading-snug text-frost/80">
                    {post.title}
                  </h3>
                  <p className="text-[0.78rem] leading-relaxed text-white/38">
                    {post.excerpt}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter */}
      <section className="bg-canvas pb-24 dark:bg-[#060816]">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#040810] p-8 md:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <div className="absolute -left-10 -top-10 h-[240px] w-[240px] rounded-full bg-brand-500/[0.07] blur-[80px]" />
              </div>
              <div className="relative mx-auto max-w-lg text-center">
                <div className="mb-2 font-mono text-[0.60rem] uppercase tracking-[0.20em] text-white/28">
                  Newsletter
                </div>
                <h2 className="text-[1.4rem] font-semibold tracking-[-0.03em] text-frost">
                  Be first to read when we publish.
                </h2>
                <p className="mx-auto mt-2.5 max-w-sm text-[0.82rem] text-white/48">
                  Clinical AI perspectives and deployment stories from the ASTA team.
                  No spam. Unsubscribe anytime.
                </p>
                <div className="mx-auto mt-6 max-w-sm">
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
