import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ContactInquiryForm } from "@/components/sections/contact/ContactInquiryForm";
import {
  contactForm,
  contactMain,
  contactNextSteps,
  CONTACT_WHATSAPP_URL,
} from "@/content/contact";

const STEP_COLORS = ["#4F6BFF", "#28D7B5", "#7C5CFF", "#49C6FF"];

export function ContactMainSection() {
  return (
    <section
      id="contact-form"
      className="relative overflow-hidden bg-canvas pb-24 pt-8 md:pb-32 md:pt-12 dark:bg-[#060816]"
    >
      {/* BG */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage:
              "linear-gradient(rgba(10,22,40,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(10,22,40,0.03) 1px,transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div className="absolute inset-0 hidden bg-grid-fine bg-[length:44px_44px] opacity-55 dark:block" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-300/30 to-transparent dark:via-brand-400/20" />
      </div>

      <Container className="relative">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-[#040810] text-white shadow-[0_8px_40px_-12px_rgba(10,22,40,0.18)] dark:border-white/[0.07] dark:shadow-none">

            {/* Top shine */}
            <div
              aria-hidden
              className="absolute inset-x-[5%] top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right,transparent,rgba(79,107,255,0.60),rgba(124,92,255,0.35),rgba(73,198,255,0.25),transparent)",
              }}
            />

            {/* Glow */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -left-14 top-0 h-56 w-56 rounded-full bg-brand-500/[0.09] blur-[90px]" />
              <div className="absolute bottom-0 right-0 h-52 w-52 rounded-full bg-violet-500/[0.07] blur-[80px]" />
            </div>

            {/* Panel header */}
            <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.05] px-7 py-4">
              <div className="flex items-center gap-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/28">
                  Inquiry Portal · ASTA Healthtech Private Limited
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/[0.06] px-2.5 py-0.5 font-mono text-[0.60rem] font-bold uppercase tracking-[0.12em] text-emerald-400/70">
                  Response &lt; 24h
                </span>
                <span className="rounded-full border border-white/[0.07] bg-white/[0.04] px-2.5 py-0.5 font-mono text-[0.60rem] text-white/36">
                  info@astahealthtech.com
                </span>
              </div>
            </div>

            {/* Main grid */}
            <div className="relative grid lg:grid-cols-[1fr_1.45fr]">

              {/* ══ Left: Contact details ══ */}
              <div
                className="flex flex-col gap-6 p-7 lg:p-8"
                style={{ borderRight: "1px solid rgba(255,255,255,0.05)" }}
              >
                {/* Section header */}
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 text-[0.67rem] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
                    <Icon name="workflow" className="h-3 w-3 text-cyan-400" />
                    {contactMain.eyebrow}
                  </div>
                  <h2 className="mt-4 text-balance text-[1.35rem] font-semibold leading-tight tracking-[-0.03em] text-frost md:text-[1.5rem]">
                    {contactMain.heading}
                  </h2>
                  <p className="mt-2 text-[0.81rem] leading-relaxed text-white/50">
                    {contactMain.sub}
                  </p>
                </div>

                {/* Direct channels */}
                <div>
                  <div className="mb-3 font-mono text-[8.5px] uppercase tracking-[0.20em] text-white/22">
                    {contactMain.channelsTitle}
                  </div>
                  <div className="space-y-2.5">
                    {contactMain.channels.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="group flex items-center gap-3.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3.5 transition-all hover:border-white/[0.11] hover:bg-white/[0.06]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/[0.12] text-brand-400 ring-1 ring-brand-400/20">
                          <Icon name={item.icon} className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="font-mono text-[0.60rem] uppercase tracking-[0.14em] text-white/28">
                            {item.label}
                          </div>
                          <div className="mt-0.5 truncate text-[0.90rem] font-medium tracking-[-0.01em] text-frost">
                            {item.value}
                          </div>
                        </div>
                        <Icon
                          name="arrow-right"
                          className="h-3.5 w-3.5 shrink-0 text-white/18 transition-all group-hover:translate-x-0.5 group-hover:text-white/40"
                        />
                      </a>
                    ))}
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="overflow-hidden rounded-xl border border-[#16A34A]/20 bg-[#16A34A]/[0.07] p-4">
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px"
                    style={{
                      background:
                        "linear-gradient(to right,transparent,rgba(74,222,128,0.30),transparent)",
                    }}
                  />
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#16A34A]/20 text-[#4ADE80]">
                      <Icon name="message-circle" className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[#4ADE80]/70">
                        {contactMain.whatsapp.title}
                      </div>
                      <p className="mt-0.5 text-[0.77rem] leading-relaxed text-white/55">
                        {contactMain.whatsapp.body}
                      </p>
                    </div>
                  </div>
                  <a
                    href={CONTACT_WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3.5 flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-[#16A34A]/75 text-[0.82rem] font-semibold text-white transition-all hover:bg-[#16A34A]"
                  >
                    {contactMain.whatsapp.ctaLabel}
                  </a>
                </div>

                {/* Process steps — compact 2×2 */}
                <div>
                  <div className="mb-3 font-mono text-[8.5px] uppercase tracking-[0.20em] text-white/22">
                    {contactNextSteps.eyebrow}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {contactNextSteps.steps.map((step, i) => (
                      <div
                        key={step.step}
                        className="flex flex-col gap-1.5 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3"
                      >
                        <span
                          className="font-mono text-[0.60rem] font-bold"
                          style={{ color: STEP_COLORS[i % 4] }}
                        >
                          {step.step}
                        </span>
                        <span className="text-[0.74rem] font-medium leading-snug text-white/60">
                          {step.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Address */}
                <div className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-cyan-400">
                      <Icon name="map-pin" className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-mono text-[0.60rem] uppercase tracking-[0.14em] text-white/28">
                        {contactMain.address.eyebrow}
                      </div>
                      <div className="mt-0.5 text-[0.84rem] font-semibold text-frost">
                        {contactMain.address.company}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-[0.74rem] leading-relaxed text-white/45">
                    {contactMain.address.body}
                  </p>
                </div>
              </div>

              {/* ══ Right: Form ══ */}
              <div className="p-7 lg:p-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 text-[0.67rem] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">
                  <Icon name="spark" className="h-3 w-3 text-cyan-400" />
                  {contactForm.eyebrow}
                </div>

                <h2 className="mt-4 text-balance text-[1.5rem] font-semibold tracking-[-0.035em] text-frost md:text-[1.72rem]">
                  {contactForm.heading}
                </h2>
                <p className="mt-2 text-[0.82rem] text-white/50">
                  {contactForm.sub}
                </p>

                <ContactInquiryForm />
              </div>
            </div>

            {/* Footer */}
            <div className="relative border-t border-white/[0.05] px-7 py-4 text-center">
              <p className="text-[0.70rem] leading-relaxed text-white/25">
                ASTA routes all hospital, academic, and partner outreach through one contact point. Serious inquiries receive a direct reply from the founding team.
              </p>
            </div>

          </div>
        </Reveal>
      </Container>
    </section>
  );
}
