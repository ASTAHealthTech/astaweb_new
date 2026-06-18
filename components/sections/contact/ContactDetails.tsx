import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { contactDetails } from "@/content/contact";

export function ContactDetails() {
  return (
    <section className="relative overflow-hidden bg-[#060816] py-20 text-white md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-fine bg-[length:44px_44px] opacity-50" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/25 to-transparent" />
        <div className="absolute left-[8%] top-1/4 h-[280px] w-[280px] rounded-full bg-brand-500/[0.06] blur-[100px]" />
        <div className="absolute right-[10%] bottom-0 h-[260px] w-[260px] rounded-full bg-cyan-400/[0.05] blur-[90px]" />
      </div>

      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <SectionHeading
            eyebrow={contactDetails.eyebrow}
            title={contactDetails.heading}
            sub={contactDetails.sub}
            maxWidth="max-w-xl"
          />

          <div className="grid gap-4">
            <Reveal delay={0.08}>
              <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#040810]">
                <div
                  aria-hidden
                  className="h-px w-full"
                  style={{
                    background:
                      "linear-gradient(to right,transparent,rgba(79,107,255,0.7),rgba(73,198,255,0.34),transparent)",
                  }}
                />
                <div className="px-5 py-5 md:px-6">
                  <div className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/30">
                    Primary contact point
                  </div>
                  <a
                    href={`mailto:${contactDetails.primaryEmail}`}
                    className="mt-3 inline-block text-[1.15rem] font-semibold tracking-[-0.03em] text-frost underline-offset-4 transition hover:text-cyan-300 hover:underline md:text-[1.35rem]"
                  >
                    {contactDetails.primaryEmail}
                  </a>
                  <p className="mt-3 max-w-2xl text-[0.84rem] leading-relaxed text-white/56">
                    One address for hospitals, teaching institutions, and serious partners. ASTA routes outreach
                    based on context rather than sending buyers through separate queues.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-4">
              {contactDetails.channels.map((item, index) => (
                <Reveal key={item.title} delay={0.12 + index * 0.04}>
                  <article className="flex gap-4 rounded-[26px] border border-white/[0.08] bg-[#040810] p-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-cyan-300 ring-1 ring-white/10">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-[0.98rem] font-semibold tracking-[-0.03em] text-frost">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[0.8rem] leading-relaxed text-white/58">{item.body}</p>
                      <a
                        href={`mailto:${item.email}`}
                        className="mt-3 inline-block text-[0.8rem] font-medium text-cyan-300/85 underline-offset-4 transition hover:text-cyan-200 hover:underline"
                      >
                        {item.email}
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
