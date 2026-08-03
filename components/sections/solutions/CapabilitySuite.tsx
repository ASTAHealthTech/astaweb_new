import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DrawLines } from "@/components/ui/DrawLines";
import { capabilitySuite } from "@/content/solutions";

export function CapabilitySuite() {
  const { modules, comingSoon } = capabilitySuite;

  const getModuleId = (index: number) => {
    switch (index) {
      case 0:
        return "cv-reading";
      case 1:
        return "physiological-model";
      case 2:
        return "escalation-engine";
      default:
        return `module-${index}`;
    }
  };

  return (
    <section id="capability-suite" className="relative py-16 md:py-24 bg-bg/50 dark:bg-night/50">
      <DrawLines horizontal className="top-0" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Sticky Left Column Heading */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <Reveal>
              <h2 className="text-[2rem] font-semibold leading-[1.15] tracking-[-0.03em] text-fg dark:text-frost sm:text-[2.5rem]">
                A complete clinical intelligence suite for <span className="text-accent">real wards</span>.
              </h2>
              <p className="mt-4 text-[0.9375rem] leading-[1.65] text-fg-muted dark:text-frost-muted">
                Built to read existing bedside monitors, detect early deterioration signals, and escalate alerts without hospital hardware dependency.
              </p>
              <div className="mt-8 rounded-xl border border-border bg-white p-4 dark:border-night-edge dark:bg-night">
                <p className="text-[0.8125rem] font-medium text-fg dark:text-frost">
                  {comingSoon.label}
                </p>
                <p className="mt-1 text-[0.75rem] text-fg-subtle dark:text-frost-muted">
                  {comingSoon.note}
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Asymmetrical Bento Cards with Individual Module IDs */}
          <div className="space-y-4">
            {modules.map((mod, index) => (
              <Reveal key={mod.title} delay={0.08 * index}>
                <div
                  id={getModuleId(index)}
                  className="relative overflow-hidden rounded-2xl border border-border bg-white p-6 shadow-sm dark:border-night-edge dark:bg-night-panel md:p-8 scroll-mt-24"
                >
                  {/* Typographic Anchoring Number */}
                  <span className="pointer-events-none absolute right-4 top-2 font-mono text-[3.5rem] font-bold text-neutral-200/50 dark:text-white/[0.04]">
                    0{index + 1}
                  </span>

                  <div className="relative">
                    <h3 className="text-[1.15rem] font-semibold text-fg dark:text-frost">
                      {mod.title}
                    </h3>
                    <p className="mt-2 text-[0.84rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                      {mod.body}
                    </p>

                    <div className="relative mt-5 pt-4">
                      <DrawLines horizontal className="top-0" />
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {mod.bullets.map((b) => (
                          <li key={b} className="flex items-center gap-2 text-[0.78rem] text-fg-subtle dark:text-frost-muted">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
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
