import { cn } from "@/lib/cn";

type AboutPersonCardProps = {
  name: string;
  initials: string;
  title: string;
  badge: string;
  headline: string;
  body: string;
  footerLabel: string;
  footerBody: string;
  accent: string;
  accentTo: string;
  variant?: "feature" | "support" | "expert";
  className?: string;
};

export function AboutPersonCard({
  name,
  initials,
  title,
  badge,
  headline,
  body,
  footerLabel,
  footerBody,
  accent,
  accentTo,
  variant = "support",
  className,
}: AboutPersonCardProps) {
  const isFeature = variant === "feature";
  const isExpert = variant === "expert";

  if (isExpert) {
    return (
      <article
        className={cn(
          "group relative h-full overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#040810]",
          className,
        )}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute -left-10 top-0 h-28 w-28 rounded-full blur-[70px]"
            style={{ background: accent + "18" }}
          />
          <div
            className="absolute bottom-0 right-0 h-24 w-24 rounded-full blur-[64px]"
            style={{ background: accentTo + "14" }}
          />
        </div>

        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(to right,transparent,${accent}80,${accentTo}55,transparent)`,
          }}
        />

        <div className="relative flex h-full flex-col gap-4 p-5">
          <div className="flex items-start gap-4">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-mono text-[0.78rem] font-bold uppercase tracking-[0.14em] text-white"
              style={{
                background: `linear-gradient(135deg,${accent},${accentTo})`,
                boxShadow: `0 8px 20px ${accent}22`,
              }}
            >
              {initials}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[0.96rem] font-semibold leading-tight tracking-[-0.025em] text-frost">
                  {name}
                </h3>
                <span
                  className="inline-flex rounded-full px-2 py-0.5 font-mono text-[0.56rem] font-bold uppercase tracking-[0.14em]"
                  style={{ background: accent + "14", color: accent }}
                >
                  {badge}
                </span>
              </div>
              <p className="mt-1 text-[0.74rem] text-white/48">{title}</p>
            </div>
          </div>

          <p className="text-[0.82rem] leading-relaxed text-white/70">{headline}</p>
          <p className="text-[0.76rem] leading-relaxed text-white/56">{body}</p>

          <div
            className="rounded-2xl border px-4 py-3"
            style={{
              borderColor: accent + "22",
              background: `linear-gradient(180deg,${accent}0D,transparent)`,
            }}
          >
            <div className="font-mono text-[0.58rem] font-bold uppercase tracking-[0.16em] text-white/30">
              {footerLabel}
            </div>
            <p className="mt-1.5 text-[0.74rem] leading-relaxed text-white/62">{footerBody}</p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group relative h-full overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#040810]",
        className,
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={cn(
            "absolute -left-10 top-0 rounded-full blur-[90px]",
            isFeature ? "h-48 w-48" : "h-36 w-36",
          )}
          style={{ background: accent + "1E" }}
        />
        <div
          className={cn(
            "absolute bottom-0 right-0 rounded-full blur-[80px]",
            isFeature ? "h-40 w-40" : "h-32 w-32",
          )}
          style={{ background: accentTo + "16" }}
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: `linear-gradient(to right,transparent,${accent}80,${accentTo}55,transparent)`,
        }}
      />

      <div className={cn("relative flex h-full flex-col", isFeature ? "p-7 md:p-8" : "p-5 md:p-6")}>
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex shrink-0 items-center justify-center rounded-2xl font-mono font-bold uppercase tracking-[0.14em] text-white",
              isFeature ? "h-14 w-14 text-[0.9rem]" : "h-12 w-12 text-[0.82rem]",
            )}
            style={{
              background: `linear-gradient(135deg,${accent},${accentTo})`,
              boxShadow: `0 10px 24px ${accent}28`,
            }}
          >
            {initials}
          </div>

          <div className="min-w-0 flex-1">
            <span
              className={cn(
                "inline-flex rounded-full px-2.5 py-1 font-mono font-bold uppercase tracking-[0.14em]",
                isFeature ? "text-[0.62rem]" : "text-[0.58rem]",
              )}
              style={{ background: accent + "14", color: accent }}
            >
              {badge}
            </span>

            <div className={cn(isFeature ? "mt-5" : "mt-4")}>
              <h3
                className={cn(
                  "font-semibold leading-tight tracking-[-0.03em] text-frost",
                  isFeature ? "text-[1.2rem]" : "text-[1rem]",
                )}
              >
                {name}
              </h3>
              <p
                className={cn("mt-1.5 text-white/52", isFeature ? "text-[0.84rem]" : "text-[0.78rem]")}
              >
                {title}
              </p>
            </div>
          </div>
        </div>

        <p
          className={cn(
            "leading-relaxed text-white/72",
            isFeature ? "mt-5 text-[0.94rem]" : "mt-4 text-[0.84rem]",
          )}
        >
          {headline}
        </p>

        <p
          className={cn(
            "leading-relaxed text-white/56",
            isFeature ? "mt-3 text-[0.84rem]" : "mt-3 text-[0.78rem]",
          )}
        >
          {body}
        </p>

        <div
          className={cn("mt-auto rounded-2xl border px-4 py-3", isFeature ? "mt-5" : "mt-4")}
          style={{
            borderColor: accent + "24",
            background: `linear-gradient(180deg,${accent}10,transparent)`,
          }}
        >
          <div className="font-mono text-[0.62rem] font-bold uppercase tracking-[0.16em] text-white/30">
            {footerLabel}
          </div>
          <p className={cn("mt-1.5 leading-relaxed text-white/62", isFeature ? "text-[0.82rem]" : "text-[0.76rem]")}>
            {footerBody}
          </p>
        </div>
      </div>
    </article>
  );
}
