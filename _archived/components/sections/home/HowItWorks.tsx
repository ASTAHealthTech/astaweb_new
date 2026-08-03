import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { howItWorks } from "@/content/home";

export function HowItWorks() {
  const { eyebrow, heading, sub, steps } = howItWorks;

  return (
    <section className="bg-white py-20 dark:bg-night md:py-28">
      <Container>
        <Reveal>
          <SectionHeading eyebrow={eyebrow} heading={heading} sub={sub} />
        </Reveal>

        <div className="mx-auto mt-14 max-w-2xl space-y-0">
          {steps.map((step, i) => (
            <Reveal key={step.step} delay={0.06 + i * 0.06}>
              <div className="relative flex gap-5 pb-10 last:pb-0">
                {/* Vertical line */}
                {i < steps.length - 1 && (
                  <div aria-hidden className="absolute left-[15px] top-8 bottom-0 w-px bg-line dark:bg-line-dark" />
                )}
                {/* Step number */}
                <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-brand-100 text-[0.75rem] font-semibold text-brand-700 dark:bg-brand-400/10 dark:text-brand-400">
                  {step.step}
                </div>
                {/* Content */}
                <div className="pt-0.5">
                  <h3 className="text-[0.9375rem] font-semibold text-fg dark:text-frost">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[0.875rem] leading-relaxed text-fg-muted dark:text-frost/50">
                    {step.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
