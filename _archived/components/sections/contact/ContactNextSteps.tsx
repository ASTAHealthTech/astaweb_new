import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { contactNextSteps } from "@/content/contact";

export function ContactNextSteps() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="mx-auto max-w-[640px] text-[1.8rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[2.375rem]">
              What happens after you <span className="text-accent">reach out</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost-muted">
              {contactNextSteps.sub}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border dark:border-night-edge dark:bg-night-edge sm:grid-cols-2 lg:grid-cols-4">
            {contactNextSteps.steps.map((item) => (
              <div key={item.step} className="flex flex-col justify-between bg-bg p-6 dark:bg-night">
                <div>
                  <span className="font-mono text-[0.7rem] font-bold uppercase tracking-wider text-accent">
                    {item.step}
                  </span>
                  <h3 className="mt-4 text-[1.05rem] font-semibold text-fg dark:text-frost">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.82rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
