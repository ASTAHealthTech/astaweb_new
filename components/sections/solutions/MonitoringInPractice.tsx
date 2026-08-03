import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DrawLines } from "@/components/ui/DrawLines";
import { monitoringInPractice } from "@/content/solutions";

export function MonitoringInPractice() {
  const { scenarios } = monitoringInPractice;

  const getScenarioId = (index: number) => {
    switch (index) {
      case 0:
        return "icu";
      case 1:
        return "general-wards";
      case 2:
        return "step-down";
      case 3:
        return "high-dependency";
      default:
        return `scenario-${index}`;
    }
  };

  return (
    <section id="ward-contexts" className="py-16 md:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Sticky Left Column Heading */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Reveal>
              <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.03em] text-fg dark:text-frost sm:text-[2.5rem]">
                How ASTA behaves across <span className="text-accent">ward contexts</span>.
              </h1>
              <p className="mt-4 text-[0.9375rem] leading-[1.65] text-fg-muted dark:text-frost-muted">
                The same monitor-reading and physiological reasoning stack adapts to the observation pattern and staffing reality of each ward.
              </p>
            </Reveal>
          </div>

          {/* Right Column: 2x2 Bento Grid with Individual Card IDs */}
          <Reveal delay={0.08}>
            <div className="grid overflow-hidden rounded-2xl border border-border dark:border-night-edge sm:grid-cols-2">
              {scenarios.map((s, index) => (
                <div
                  key={s.title}
                  id={getScenarioId(index)}
                  className="relative flex flex-col justify-between bg-bg p-6 dark:bg-night md:p-8 scroll-mt-24"
                >
                  {/* Typographic Anchoring Number */}
                  <span className="pointer-events-none absolute right-4 top-2 font-mono text-[3.5rem] font-bold text-neutral-200/50 dark:text-white/[0.04]">
                    0{index + 1}
                  </span>

                  <div>
                    <h3 className="text-[1.05rem] font-semibold text-fg dark:text-frost">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-[0.84rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                      {s.body}
                    </p>
                  </div>

                  {index < scenarios.length - 1 && <DrawLines className="right-0 hidden sm:block" delay={index * 100} />}
                  {index < scenarios.length - 2 && <DrawLines horizontal className="bottom-0 hidden sm:block" delay={index * 100} />}
                  {index < scenarios.length - 1 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={index * 100} />}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
