import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DrawLines } from "@/components/ui/DrawLines";
import { DrawBorders } from "@/components/ui/DrawBorders";

const OEM_MONITORS = [
  "Philips IntelliVue", "GE HealthCare Carescape", "Mindray BeneVision",
  "Dräger Infinity", "Nihon Kohden Life Scope", "Edan iM Series",
];

const INTEGRATIONS = [
  { name: "Epic Systems", detail: "HL7 / FHIR R4" },
  { name: "Oracle Cerner", detail: "HL7 v2.x" },
  { name: "REST API", detail: "JSON / Webhooks" },
  { name: "Standalone", detail: "Zero IT integration" },
];

export function OemCompatibilityMatrix() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <Reveal>
          <div className="text-center">
            <h2 className="mx-auto max-w-[640px] text-[1.8rem] font-semibold tracking-[-0.03em] text-fg dark:text-frost md:text-[2.375rem]">
              Works with your <span className="text-accent">current monitors and systems</span>.
            </h2>
            <p className="mx-auto mt-3 max-w-[480px] text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost-muted">
              No hardware replacement. ASTA reads existing monitor displays via computer vision.
            </p>
          </div>
        </Reveal>

        {/* OEM list — clean grid */}
        <Reveal delay={0.08}>
          <div className="relative mx-auto mt-12 max-w-3xl rounded-xl">
            <DrawBorders />
            <div className="grid grid-cols-2 overflow-hidden rounded-xl sm:grid-cols-3">
              {OEM_MONITORS.map((name, i) => (
                <div
                  key={name}
                  className="relative flex items-center gap-2.5 bg-bg p-4 dark:bg-night"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-[0.8125rem] font-medium text-fg dark:text-frost">{name}</span>
                  {i % 3 !== 2 && <DrawLines className="right-0 hidden sm:block" delay={i * 100} />}
                  {i % 2 !== 1 && <DrawLines className="right-0 sm:hidden" delay={i * 100} />}
                  {i < OEM_MONITORS.length - 3 && <DrawLines horizontal className="bottom-0 hidden sm:block" delay={i * 100} />}
                  {i < OEM_MONITORS.length - 2 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={i * 100} />}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Integrations */}
        <Reveal delay={0.12}>
          <div className="relative mx-auto mt-6 max-w-3xl rounded-xl">
            <DrawBorders />
            <div className="grid grid-cols-2 overflow-hidden rounded-xl sm:grid-cols-4">
              {INTEGRATIONS.map((item, i) => (
                <div
                  key={item.name}
                  className="relative bg-bg p-4 dark:bg-night"
                >
                  <div className="text-[0.8125rem] font-semibold text-fg dark:text-frost">{item.name}</div>
                  <div className="mt-0.5 font-mono text-[0.72rem] text-fg-subtle dark:text-frost-muted">{item.detail}</div>
                  {i % 4 !== 3 && <DrawLines className="right-0 hidden sm:block" delay={i * 100} />}
                  {i % 2 !== 1 && <DrawLines className="right-0 sm:hidden" delay={i * 100} />}
                  {i < INTEGRATIONS.length - 4 && <DrawLines horizontal className="bottom-0 hidden sm:block" delay={i * 100} />}
                  {i < INTEGRATIONS.length - 2 && <DrawLines horizontal className="bottom-0 sm:hidden" delay={i * 100} />}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
