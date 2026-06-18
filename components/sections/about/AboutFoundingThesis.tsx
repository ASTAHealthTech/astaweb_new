import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { aboutFoundingThesis } from "@/content/about";

const PRINCIPLE_COLORS = ["#4F6BFF", "#28D7B5", "#7C5CFF"];

export function AboutFoundingThesis() {
  return (
    <section
      id="why-asta-exists"
      className="relative overflow-hidden bg-canvas py-24 md:py-32 dark:bg-[#060816]"
    >
      {/* ── BG ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,22,40,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(10,22,40,0.03) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="absolute inset-0 hidden bg-grid-fine bg-[length:44px_44px] opacity-60 dark:block" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/40 to-transparent dark:via-brand-400/25" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200/50 to-transparent dark:via-white/[0.05]" />
        <div className="absolute left-1/2 top-1/4 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-brand-500/[0.03] blur-[160px] dark:bg-brand-500/[0.06]" />
        <div className="absolute right-0 bottom-0 h-[350px] w-[350px] rounded-full bg-violet-500/[0.02] blur-[120px] dark:bg-violet-500/[0.05]" />
      </div>

      <Container className="relative">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-[#040810] text-white shadow-[0_8px_40px_-12px_rgba(10,22,40,0.18)] dark:border-white/[0.07] dark:shadow-none">

            {/* Glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-10 top-0 h-52 w-52 rounded-full bg-brand-500/[0.10] blur-[90px]" />
              <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-violet-500/[0.08] blur-[80px]" />
            </div>

            {/* Top shine */}
            <div
              aria-hidden
              className="absolute inset-x-[5%] top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.55),rgba(73,198,255,0.35),transparent)",
              }}
            />

            {/* Panel header */}
            <div className="relative flex items-center gap-2.5 border-b border-white/[0.05] px-7 py-4">
              <Icon name="stethoscope" className="h-3.5 w-3.5 text-cyan-400" />
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/28">
                {aboutFoundingThesis.eyebrow}
              </span>
            </div>

            {/* ── SPLIT ── */}
            <div className="relative grid lg:grid-cols-[1.2fr_1px_0.8fr]">

              {/* Left — narrative */}
              <div className="flex flex-col gap-6 p-8 lg:p-10">
                <h2 className="text-balance text-h2 font-semibold tracking-[-0.04em] text-frost md:text-h2-lg">
                  {aboutFoundingThesis.heading}
                </h2>
                <p className="text-[0.88rem] leading-relaxed text-white/52">
                  {aboutFoundingThesis.sub}
                </p>

                <div className="space-y-3">
                  {aboutFoundingThesis.narrative.map((para) => (
                    <p key={para.slice(0, 30)} className="text-[0.8rem] leading-relaxed text-white/44">
                      {para}
                    </p>
                  ))}
                </div>

                {/* ASTA response — standout quote */}
                <div className="relative mt-auto overflow-hidden rounded-xl border border-brand-400/[0.20] bg-brand-500/[0.08] p-5">
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background:
                        "linear-gradient(to right,transparent,rgba(79,107,255,0.65),rgba(73,198,255,0.38),transparent)",
                    }}
                  />
                  <div className="mb-2.5 font-mono text-[0.58rem] font-bold uppercase tracking-[0.16em] text-brand-300">
                    ASTA response
                  </div>
                  <p className="text-[0.96rem] font-semibold leading-snug tracking-[-0.025em] text-frost">
                    &ldquo;{aboutFoundingThesis.response}&rdquo;
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden bg-white/[0.05] lg:block" />

              {/* Right — diagnostic panel */}
              <div className="flex flex-col gap-0 border-t border-white/[0.05] p-8 lg:border-t-0 lg:p-10">

                <div className="mb-6 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.20em] text-white/28">
                    Ward pressures
                  </span>
                </div>

                {/* Pressure items */}
                <div className="space-y-6">
                  {aboutFoundingThesis.pressures.map((item, i) => (
                    <div key={item.title} className="flex items-start gap-4">
                      <div
                        className="flex h-10 w-10 flex-none items-center justify-center rounded-xl text-white"
                        style={{
                          background: `linear-gradient(135deg,${item.color},${item.colorTo})`,
                          boxShadow: `0 4px 14px ${item.color}28`,
                        }}
                      >
                        <Icon name={item.icon} className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="font-mono text-[0.6rem] font-bold"
                            style={{ color: item.color }}
                          >
                            0{i + 1}
                          </span>
                          <h3 className="text-[0.88rem] font-semibold tracking-[-0.02em] text-frost">
                            {item.title}
                          </h3>
                        </div>
                        <p className="mt-0.5 text-[0.75rem] leading-relaxed text-white/42">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Design principles */}
                <div className="mt-auto border-t border-white/[0.05] pt-6">
                  <div className="mb-3 font-mono text-[9px] uppercase tracking-[0.20em] text-white/28">
                    Design principles
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {aboutFoundingThesis.principles.map((item, i) => (
                      <span
                        key={item}
                        className="rounded-full px-3 py-1.5 text-[0.72rem] font-semibold"
                        style={{
                          background: PRINCIPLE_COLORS[i % 3] + "14",
                          color: PRINCIPLE_COLORS[i % 3],
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
