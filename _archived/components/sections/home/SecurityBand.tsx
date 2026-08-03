import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DrawLines } from "@/components/ui/DrawLines";
import { security } from "@/content/home";

export function SecurityBand() {
  const { eyebrow, heading, quickMetrics } = security;

  return (
    <section className="relative bg-bg-alt py-14 dark:bg-night md:py-16">
      <DrawLines horizontal className="top-0" />
      <DrawLines horizontal className="bottom-0" />
      <Container>
        <Reveal>
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
            <div className="max-w-md text-center md:text-left">
              <p className="text-[0.8125rem] font-medium text-brand-600 dark:text-brand-400">{eyebrow}</p>
              <h2 className="mt-1 text-[1.25rem] font-semibold tracking-tight text-fg dark:text-frost md:text-[1.5rem]">
                {heading}
              </h2>
            </div>
            <div className="flex gap-6 md:gap-8">
              {quickMetrics.map((m) => (
                <div key={m.label} className="text-center">
                  <div className="text-[1.25rem] font-semibold text-fg dark:text-frost md:text-[1.5rem]">{m.val}</div>
                  <div className="text-[0.72rem] text-fg-subtle dark:text-frost/35">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
