import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { contactProofStrip } from "@/content/contact";

export function ContactProofStrip() {
  return (
    <section className="relative overflow-hidden bg-[#060816] py-12 text-white md:py-14">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid-fine bg-[length:44px_44px] opacity-45" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <Container className="relative">
        <Reveal>
          <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#040810]">
            <div className="border-b border-white/[0.06] px-5 py-4 md:px-6">
              <div className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/30">
                {contactProofStrip.eyebrow}
              </div>
              <div className="mt-2 grid gap-2 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-8">
                <h2 className="text-[1.04rem] font-semibold tracking-[-0.03em] text-frost">
                  {contactProofStrip.title}
                </h2>
                <p className="text-[0.82rem] leading-relaxed text-white/56">{contactProofStrip.note}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-y divide-white/[0.06] md:grid-cols-5 md:divide-y-0">
              {contactProofStrip.items.map((item, index) => (
                <div key={item.label} className="px-4 py-5 text-center">
                  <div
                    className="font-mono text-[1.55rem] font-bold leading-none tracking-[-0.04em]"
                    style={{
                      background:
                        index === 0
                          ? "linear-gradient(135deg,#4F6BFF,#7C5CFF)"
                          : index === 1
                            ? "linear-gradient(135deg,#28D7B5,#49C6FF)"
                            : index === 2
                              ? "linear-gradient(135deg,#49C6FF,#4F6BFF)"
                              : index === 3
                                ? "linear-gradient(135deg,#7C5CFF,#49C6FF)"
                                : "linear-gradient(135deg,#28D7B5,#7C5CFF)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {item.value}
                  </div>
                  <p className="mx-auto mt-2 max-w-[10rem] text-[0.72rem] leading-snug text-white/44">
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
