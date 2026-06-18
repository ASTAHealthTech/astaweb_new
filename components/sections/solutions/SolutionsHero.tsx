import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { solutionsHero } from "@/content/solutions";

export function SolutionsHero() {
  return (
    <section
      className="relative overflow-hidden bg-[#060816] pt-36 pb-24 text-white md:pt-44 md:pb-32"
    >
      {/* ── Background ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Grid */}
        <div className="absolute inset-0 bg-grid-fine bg-[length:44px_44px] opacity-50" />
        {/* Glow blobs */}
        <div className="absolute left-1/2 top-1/3 h-[600px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/[0.10] blur-[160px]" />
        <div className="absolute right-[10%] top-1/4 h-[350px] w-[350px] rounded-full bg-violet-500/[0.07] blur-[120px]" />
        <div className="absolute left-[8%] bottom-1/4 h-[300px] w-[300px] rounded-full bg-cyan-400/[0.05] blur-[100px]" />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, rgba(6,8,22,0.70) 100%)",
          }}
        />
        {/* Top + bottom rules */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center">

          {/* Eyebrow */}
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.06] px-4 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
              <Icon name="spark" className="h-3 w-3 text-cyan-400" />
              {solutionsHero.eyebrow}
            </div>
          </Reveal>

          {/* Heading */}
          <Reveal delay={0.06}>
            <h1 className="mt-6 text-h1 font-semibold leading-[1.06] tracking-[-0.045em] text-balance md:text-display">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#F0F4FF 0%,rgba(240,244,255,0.60) 100%)",
                }}
              >
                {solutionsHero.headline}{" "}
              </span>
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg,#4F6BFF,#7C5CFF 40%,#49C6FF)",
                }}
              >
                {solutionsHero.headlineAccent}
              </span>
            </h1>
          </Reveal>

          {/* Sub */}
          <Reveal delay={0.12}>
            <p className="mt-5 text-body-lg text-pretty leading-relaxed text-frost-muted">
              {solutionsHero.sub}
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.18}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Button href={solutionsHero.primaryCta.href} variant="glow" size="xl" trailingIcon>
                {solutionsHero.primaryCta.label}
              </Button>
              <Button href={solutionsHero.secondaryCta.href} variant="outline-white" size="xl">
                {solutionsHero.secondaryCta.label}
              </Button>
            </div>
          </Reveal>

          {/* Proof row */}
          <Reveal delay={0.24}>
            <div className="relative mt-14 overflow-hidden rounded-2xl border border-white/[0.07]">
              {/* Top rule */}
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(to right,transparent,rgba(79,107,255,0.50),rgba(40,215,181,0.40),transparent)",
                }}
              />
              <div className="grid grid-cols-2 divide-x divide-white/[0.06] sm:grid-cols-4">
                {solutionsHero.proofRow.map((p, i) => (
                  <div key={p.label} className="flex flex-col items-center gap-1 px-4 py-6">
                    <span
                      className="font-mono text-[1.75rem] font-bold leading-none tracking-[-0.04em]"
                      style={{
                        background:
                          i === 0 ? "linear-gradient(135deg,#4F6BFF,#7C5CFF)" :
                          i === 1 ? "linear-gradient(135deg,#28D7B5,#49C6FF)" :
                          i === 2 ? "linear-gradient(135deg,#49C6FF,#4F6BFF)" :
                                    "linear-gradient(135deg,#7C5CFF,#28D7B5)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {p.value}
                    </span>
                    <span className="text-[0.72rem] text-white/40">{p.label}</span>
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
