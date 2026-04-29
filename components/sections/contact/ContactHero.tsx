import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CONTACT_WHATSAPP_URL, contactHero } from "@/content/contact";

const HERO_STATS = [
  { value: "5+", label: "Live deployments" },
  { value: "15+", label: "OEM brands" },
  { value: "98%", label: "CV accuracy" },
  { value: "< 24h", label: "Response time" },
];

export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[#060816] pb-0 pt-28 text-white md:pt-32">
      {/* BG */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-fine bg-[length:44px_44px] opacity-40" />
        <div className="absolute left-0 top-1/2 h-[480px] w-[480px] -translate-y-1/2 rounded-full bg-brand-500/[0.09] blur-[160px]" />
        <div className="absolute right-0 top-0 h-[340px] w-[340px] rounded-full bg-violet-500/[0.07] blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-[200px] w-[640px] -translate-x-1/2 rounded-full bg-cyan-400/[0.04] blur-[90px]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 70% at 50% 30%,transparent 30%,rgba(6,8,22,0.75) 100%)",
          }}
        />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.10] bg-white/[0.05] px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {contactHero.eyebrow} · System Active
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 text-balance text-[2.8rem] font-semibold leading-[1.06] tracking-[-0.045em] text-frost md:text-[3.5rem]">
              Talk to the team{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#4F6BFF 0%,#7C5CFF 45%,#28D7B5 100%)",
                }}
              >
                behind ASTA.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-lg text-[1.02rem] leading-relaxed text-white/52">
              Reach the ASTA team for hospital deployment, product walkthroughs, and institutional conversations.
            </p>
          </Reveal>

          <Reveal delay={0.16}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button href="#contact-form" variant="glow" size="lg" trailingIcon>
                Send an inquiry
              </Button>
              <Button
                href={CONTACT_WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                variant="outline-white"
                size="lg"
              >
                Chat on WhatsApp
              </Button>
            </div>
          </Reveal>
        </div>

        {/* ── Stats strip ── */}
        <Reveal delay={0.22}>
          <div className="mt-12 grid grid-cols-2 border-t border-white/[0.05] md:grid-cols-4">
            {HERO_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col gap-1 py-6"
                style={{
                  paddingLeft: i === 0 ? 0 : "1.5rem",
                  paddingRight: i === HERO_STATS.length - 1 ? 0 : "1.5rem",
                  borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.05)" : undefined,
                }}
              >
                <span className="font-mono text-[1.65rem] font-bold tracking-tight text-frost">
                  {stat.value}
                </span>
                <span className="text-[0.66rem] font-medium uppercase tracking-[0.14em] text-white/50">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
