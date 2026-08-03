import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { aboutFoundingThesis } from "@/content/about";

export function AboutFoundingThesis() {
  const { narrative, pressures, response } = aboutFoundingThesis;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Sticky Left Heading & Narrative */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Reveal>
              <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.03em] text-fg dark:text-frost sm:text-[2.5rem]">
                Digitizing ward beds <span className="text-accent">without hardware replacement</span>.
              </h1>
              <div className="mt-4 space-y-3">
                {narrative.map((p, i) => (
                  <p key={i} className="text-[0.9375rem] leading-[1.65] text-fg-muted dark:text-frost-muted">
                    {p}
                  </p>
                ))}
              </div>
              <blockquote className="mt-8 border-l-2 border-accent pl-4">
                <p className="text-[1.1rem] font-medium leading-relaxed text-fg dark:text-frost">
                  &ldquo;{response}&rdquo;
                </p>
              </blockquote>
            </Reveal>
          </div>

          {/* Right Column Bento Cards */}
          <div className="space-y-4">
            {pressures.map((pressure, index) => (
              <Reveal key={pressure.title} delay={0.08 * index}>
                <div className="relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm dark:border-night-edge dark:bg-night-panel md:p-8">
                  {/* Typographic Anchoring Number */}
                  <span className="pointer-events-none absolute right-4 top-2 font-mono text-[3.5rem] font-bold text-neutral-200/50 dark:text-white/[0.04]">
                    0{index + 1}
                  </span>

                  <div className="relative">
                    <h3 className="text-[1.15rem] font-semibold text-fg dark:text-frost">
                      {pressure.title}
                    </h3>
                    <p className="mt-2 text-[0.84rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                      {pressure.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
