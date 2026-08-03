import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { contactDetails } from "@/content/contact";

export function ContactDetails() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="mx-auto max-w-[640px] text-[1.8rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[2.375rem]">
              Direct outreach channels <span className="text-accent">by context</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost-muted">
              {contactDetails.sub}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-between rounded-xl border border-border bg-white p-6 dark:border-night-edge dark:bg-night-panel md:p-8">
              <div>
                <span className="text-[0.7rem] font-bold uppercase tracking-wider text-accent">
                  Primary Contact Point
                </span>
                <a
                  href={`mailto:${contactDetails.primaryEmail}`}
                  className="mt-3 block text-[1.25rem] font-semibold tracking-[-0.02em] text-fg hover:text-accent dark:text-frost md:text-[1.5rem]"
                >
                  {contactDetails.primaryEmail}
                </a>
                <p className="mt-3 text-[0.84rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                  One address for hospitals, teaching institutions, and deployment partners. ASTA routes outreach directly based on clinical and technical context.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border dark:border-night-edge dark:bg-night-edge sm:grid-cols-2">
              {contactDetails.channels.map((item) => (
                <div key={item.title} className="flex flex-col justify-between bg-bg p-6 dark:bg-night">
                  <div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-[0.95rem] font-semibold text-fg dark:text-frost">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.8rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                      {item.body}
                    </p>
                  </div>
                  <a
                    href={`mailto:${item.email}`}
                    className="mt-4 inline-block font-mono text-[0.78rem] font-semibold text-accent hover:underline"
                  >
                    {item.email}
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
