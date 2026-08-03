import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CONTACT_EMAIL } from "@/content/contact";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Press",
  description:
    "Media coverage, institutional recognition, and deployment milestones from ASTA Health Tech.",
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
    badge: "Government backing",
  },
  {
    name: "IISER Pune",
    descriptor: "Indian Institute of Science Education and Research",
    note: "Research institution support grounding ASTA's clinical AI development in scientific rigour.",
    badge: "Research institution",
  },
  {
    name: "AIC-SEED",
    descriptor: "Atal Incubation Centre - SEED",
    note: "Incubation and accelerator backing through ASTA's translational medtech journey.",
    badge: "Incubation program",
  },
  {
    name: "NIT Andhra Pradesh",
    descriptor: "National Institute of Technology, Andhra Pradesh",
    note: "Engineering and founder-pathway institution behind ASTA's technical build.",
    badge: "Engineering institute",
  },
];

export default function PressPage() {
  return (
    <div className="pt-20 md:pt-24">
      {/* Title */}
      <section className="py-12 md:py-16">
        <Container>
          <Reveal>
            <div className="mx-auto max-w-[640px] text-center">
              <h1 className="text-[2.25rem] font-semibold leading-[1.12] tracking-[-0.03em] text-fg dark:text-frost sm:text-[2.75rem] md:text-[3.25rem]">
                ASTA <span className="text-accent">in the media</span>.
              </h1>
              <p className="mt-3 text-[0.9375rem] leading-[1.65] text-fg-muted dark:text-frost-muted">
                Institutional recognition, deployment milestones, and media coverage as ASTA builds the clinical intelligence layer for hospital wards.
              </p>
            </div>
          </Reveal>

          {/* Institutional Backing Bento Grid */}
          <Reveal delay={0.08}>
            <div className="mt-12">
              <h2 className="text-[1.5rem] font-semibold tracking-[-0.025em] text-fg dark:text-frost">
                Recognised by institutions <span className="text-accent">that matter</span>.
              </h2>
              <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border dark:border-night-edge dark:bg-night-edge sm:grid-cols-2">
                {INSTITUTIONAL_BACKING.map((item) => (
                  <div key={item.name} className="flex flex-col justify-between bg-bg p-6 dark:bg-night">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[0.95rem] font-semibold text-fg dark:text-frost">
                          {item.name}
                        </span>
                        <span className="rounded-md bg-accent/10 px-2.5 py-0.5 text-[0.68rem] font-semibold text-accent">
                          {item.badge}
                        </span>
                      </div>
                      <p className="mt-0.5 text-[0.75rem] text-fg-subtle dark:text-frost-muted">{item.descriptor}</p>
                      <p className="mt-3 text-[0.82rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                        {item.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Coverage & Inquiries Bento Split */}
          <Reveal delay={0.12}>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="flex flex-col justify-between rounded-xl border border-border bg-white p-6 dark:border-night-edge dark:bg-night-panel md:p-8">
                <div>
                  <h3 className="text-[1.15rem] font-semibold text-fg dark:text-frost">
                    Articles and features coming soon.
                  </h3>
                  <p className="mt-2 text-[0.84rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                    We are compiling published coverage of ASTA&apos;s deployments, institutional backing, and clinical AI development. Check back as we update this page.
                  </p>
                </div>
                <div className="mt-6 rounded-lg bg-bg p-3.5 text-[0.78rem] text-fg-subtle dark:bg-night dark:text-frost-muted">
                  Coverage updates in progress
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-border bg-white p-6 dark:border-night-edge dark:bg-night-panel md:p-8">
                <div>
                  <h3 className="text-[1.15rem] font-semibold text-fg dark:text-frost">
                    Media kit and press contact.
                  </h3>
                  <p className="mt-2 text-[0.84rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                    For interview requests, coverage inquiries, product briefings, and access to ASTA&apos;s media kit, reach out directly.
                  </p>
                </div>
                <div className="mt-6">
                  <Button
                    href={`mailto:${CONTACT_EMAIL}?subject=Press%20inquiry%20%7C%20ASTA`}
                    variant="primary"
                    size="md"
                  >
                    Contact for press →
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
