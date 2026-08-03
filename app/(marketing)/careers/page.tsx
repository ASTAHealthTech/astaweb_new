import type { Metadata } from "next";
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
    title: "Clinical focus",
    body: "We ship to wards, not demos. Every technical decision is evaluated against whether it helps clinicians act faster and hospitals operate better.",
  },
  {
    title: "Technical depth",
    body: "From computer vision pipelines to physiological reasoning models, the problem demands real ML, embedded systems, and reliable production software.",
  },
  {
    title: "Deployment reality",
    body: "Our work runs in active patient-care environments. We operate at the quality bar that live hospital deployment demands, not lab benchmarks.",
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
    <div className="pt-20 md:pt-24">
      {/* What we look for - Bento Section */}
      <section className="py-16 md:py-20">
        <Container>
          <Reveal>
            <div className="mb-10 text-center">
              <h2 className="text-[1.8rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[2.375rem]">
                Building clinical AI that <span className="text-accent">runs in real wards</span>.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[0.88rem] text-fg-muted dark:text-frost-muted">
                ASTA is assembled at the intersection of machine learning, clinical environments, and hospital deployment.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border dark:border-night-edge dark:bg-night-edge md:grid-cols-3">
              {VALUES.map((v) => (
                <div key={v.title} className="flex flex-col bg-bg p-6 md:p-8 dark:bg-night">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <h3 className="mt-4 text-[1.05rem] font-semibold text-fg dark:text-frost">{v.title}</h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-fg-muted dark:text-frost-muted">{v.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Open roles bento card */}
      <section className="pb-24">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-border bg-white p-8 dark:border-night-edge dark:bg-night-panel md:p-12">
              <h2 className="text-[1.5rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[1.8rem]">
                Join ASTA engineering. <span className="text-accent">Let us know you&apos;re interested.</span>
              </h2>
              <p className="mt-3 max-w-xl text-[0.86rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                If you&apos;re working on AI, computer vision, or clinical systems and want to be considered ahead of our next round of openings, reach out directly.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {INTEREST_AREAS.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-border bg-bg px-3.5 py-1 text-[0.75rem] font-medium text-fg-muted dark:border-night-edge dark:bg-night dark:text-frost-muted"
                  >
                    {area}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button
                  href={`mailto:${CONTACT_EMAIL}?subject=Career%20inquiry%20%7C%20ASTA`}
                  variant="primary"
                  size="lg"
                  trailingIcon
                >
                  Send your profile
                </Button>
                <span className="text-[0.8125rem] text-fg-subtle dark:text-frost-muted">
                  {CONTACT_EMAIL}
                </span>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
