import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { outcomes } from "@/content/home";

export function Outcomes() {
  const { eyebrow, heading, sub, items } = outcomes;

  return (
    <section className="bg-white py-20 dark:bg-night md:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={eyebrow} heading={heading} sub={sub} />
        </Reveal>

        <div className="mx-auto mt-14 max-w-3xl space-y-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={0.05 + i * 0.05}>
              <div className="rounded-2xl border border-border bg-bg-alt p-6 dark:border-night-edge dark:bg-night-panel">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 text-[0.72rem] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {item.audience}
                  </span>
                </div>
                <h3 className="mt-2 text-[1rem] font-semibold text-fg dark:text-frost">{item.title}</h3>
                <p className="mt-1.5 text-[0.875rem] leading-relaxed text-fg-muted dark:text-frost/50">{item.body}</p>
                {item.metric && (
                  <div className="mt-3 text-[0.8125rem] font-medium text-fg-subtle dark:text-frost/40">
                    → {item.metric}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
