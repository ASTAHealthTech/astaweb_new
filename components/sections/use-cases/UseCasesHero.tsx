import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { useCasesHero } from "@/content/use-cases";

export function UseCasesHero() {
  return (
    <section
      data-hero-root
      className="relative overflow-hidden bg-[#060816] pb-24 pt-36 text-white md:pb-32 md:pt-44"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-fine bg-[length:44px_44px] opacity-50" />
        <div className="absolute left-1/2 top-1/3 h-[620px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/[0.11] blur-[170px]" />
        <div className="absolute right-[10%] top-1/4 h-[360px] w-[360px] rounded-full bg-violet-500/[0.08] blur-[130px]" />
        <div className="absolute left-[8%] bottom-1/4 h-[320px] w-[320px] rounded-full bg-cyan-400/[0.06] blur-[110px]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 18%, rgba(6,8,22,0.74) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.06] px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
              <Icon name="hospital" className="h-3 w-3 text-cyan-400" />
              {useCasesHero.eyebrow}
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-6 text-balance text-h1 font-semibold leading-[1.06] tracking-[-0.045em] md:text-display">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#F0F4FF 0%,rgba(240,244,255,0.62) 100%)",
                }}
              >
                {useCasesHero.headline}{" "}
              </span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg,#4F6BFF,#7C5CFF 42%,#49C6FF)",
                }}
              >
                {useCasesHero.headlineAccent}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mx-auto mt-5 max-w-3xl text-body-lg leading-relaxed text-frost-muted">
              {useCasesHero.sub}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button href={useCasesHero.primaryCta.href} variant="glow" size="xl" trailingIcon>
                {useCasesHero.primaryCta.label}
              </Button>
              <Button href={useCasesHero.secondaryCta.href} variant="outline-white" size="xl">
                {useCasesHero.secondaryCta.label}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              {useCasesHero.microProof.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 text-[0.68rem] font-medium text-frost/65"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {item}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="relative mt-14 overflow-hidden rounded-2xl border border-white/[0.07]">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(to right,transparent,rgba(79,107,255,0.55),rgba(73,198,255,0.35),transparent)",
                }}
              />
              <div className="grid grid-cols-2 divide-x divide-white/[0.06] sm:grid-cols-4">
                {useCasesHero.proofRow.map((item, index) => (
                  <div key={item.label} className="flex flex-col items-center gap-1 px-4 py-6">
                    <span
                      className="font-mono text-[1.75rem] font-bold leading-none tracking-[-0.04em]"
                      style={{
                        background:
                          index === 0
                            ? "linear-gradient(135deg,#4F6BFF,#7C5CFF)"
                            : index === 1
                              ? "linear-gradient(135deg,#28D7B5,#49C6FF)"
                              : index === 2
                                ? "linear-gradient(135deg,#49C6FF,#4F6BFF)"
                                : "linear-gradient(135deg,#7C5CFF,#28D7B5)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {item.value}
                    </span>
                    <span className="max-w-[11rem] text-center text-[0.72rem] text-white/40">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
