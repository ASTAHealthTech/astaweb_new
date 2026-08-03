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
  },
  {
    tag: "Deployment",
    title: "What makes hospital AI deployment different from enterprise software.",
    excerpt:
      "Ward workflows, mixed monitor estates, and clinical governance create constraints that standard SaaS deployment models do not anticipate.",
  },
  {
    tag: "Platform",
    title: "Computer vision for vital sign extraction: OEM variability and training scale.",
    excerpt:
      "Reading 15+ monitor brands reliably at clinical cadence requires more than OCR. A look at what goes into monitor-agnostic vital extraction.",
  },
];

export default function BlogPage() {
  return (
    <div className="pt-20 md:pt-24">
      {/* Off-white Page Title Section */}
      <section className="py-12 md:py-16">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-[640px] text-center">
              <h1 className="text-[2.25rem] font-semibold leading-[1.12] tracking-[-0.03em] text-fg dark:text-frost sm:text-[2.75rem] md:text-[3.25rem]">
                Perspectives on <span className="text-accent">hospital AI</span>.
              </h1>
              <p className="mt-3 text-[0.9375rem] leading-[1.65] text-fg-muted dark:text-frost-muted">
                Smart ward deployment, clinical reasoning architecture, and practical hospital intelligence from the ASTA team.
              </p>
            </div>
          </Reveal>

          {/* Articles Bento Grid */}
          <Reveal delay={0.08}>
            <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border dark:border-night-edge dark:bg-night-edge md:grid-cols-3">
              {PLACEHOLDER_TOPICS.map((post) => (
                <div key={post.title} className="flex flex-col justify-between bg-bg p-6 md:p-8 dark:bg-night">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-md bg-accent/10 px-2.5 py-1 text-[0.7rem] font-semibold text-accent">
                        {post.tag}
                      </span>
                      <span className="text-[0.7rem] font-medium text-fg-subtle dark:text-frost-muted">
                        Coming soon
                      </span>
                    </div>
                    <h2 className="mt-4 text-[1.05rem] font-semibold leading-snug text-fg dark:text-frost">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-[0.82rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Newsletter Bento Banner */}
      <section className="pb-24">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-border bg-white p-8 dark:border-night-edge dark:bg-night-panel md:p-12">
              <div className="mx-auto max-w-lg text-center">
                <h2 className="text-[1.5rem] font-semibold tracking-[-0.025em] text-fg dark:text-frost md:text-[1.75rem]">
                  Be first to read when <span className="text-accent">we publish</span>.
                </h2>
                <p className="mx-auto mt-2 max-w-sm text-[0.84rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                  Clinical AI perspectives and deployment stories from the ASTA team. No spam. Unsubscribe anytime.
                </p>
                <div className="mx-auto mt-6 max-w-sm">
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
