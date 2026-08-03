import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { contactProofStrip } from "@/content/contact";

export function ContactProofStrip() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <Reveal>
          <div className="rounded-2xl border border-border bg-white p-6 dark:border-night-edge dark:bg-night-panel md:p-8">
            <div className="mb-6 border-b border-border pb-5 dark:border-night-edge">
              <h2 className="text-[1.25rem] font-semibold tracking-[-0.02em] text-fg dark:text-frost">
                {contactProofStrip.title}
              </h2>
              <p className="mt-1 max-w-2xl text-[0.84rem] leading-relaxed text-fg-muted dark:text-frost-muted">
                {contactProofStrip.note}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border dark:border-night-edge dark:bg-night-edge sm:grid-cols-5">
              {contactProofStrip.items.map((item) => (
                <div key={item.label} className="bg-bg p-4 text-center dark:bg-night">
                  <div className="font-mono text-[1.5rem] font-bold tracking-[-0.04em] text-accent">
                    {item.value}
                  </div>
                  <p className="mt-1 text-[0.75rem] text-fg-muted dark:text-frost-muted">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
