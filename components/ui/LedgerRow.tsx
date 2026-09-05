import { cn } from "@/lib/cn";
import { LedgerTick } from "./LedgerTick";

/**
 * The recurring key–value unit: label … dotted leader … tabular value.
 * Replaces every stat chip on the site. `size="lg"` stacks the big number
 * under the label (hero proof rows / metric bands).
 */
export function LedgerRow({
  label,
  value,
  unit,
  dark = false,
  size = "md",
  tick = true,
  className,
}: {
  label: string;
  value?: string;
  unit?: string;
  dark?: boolean;
  size?: "md" | "lg";
  tick?: boolean;
  className?: string;
}) {
  const labelCls = dark ? "text-panel-ink-2" : "text-ink-2";
  const valueCls = dark ? "text-panel-ink" : "text-ink";
  const leaderCls = dark
    ? "border-panel-hairline-strong"
    : "border-hairline-strong";

  if (size === "lg") {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <span className={cn("h-px w-6", dark ? "bg-panel-hairline-strong" : "bg-hairline-strong")} />
        <span className={cn("font-body text-label", labelCls)}>{label}</span>
        {value !== undefined && (
          <span className={cn("font-display text-stat-lg tnum", valueCls)}>
            {tick ? <LedgerTick value={value} /> : value}
            {unit && (
              <span className={cn("ml-1 font-body text-label", dark ? "text-panel-ink-3" : "text-ink-3")}>
                {unit}
              </span>
            )}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex items-baseline gap-3 py-3", className)}>
      <span className={cn("shrink-0 font-body text-body", labelCls)}>{label}</span>
      <span
        aria-hidden
        className={cn("-translate-y-1 min-w-6 flex-1 border-b border-dotted", leaderCls)}
      />
      {value !== undefined ? (
        <span className={cn("font-display text-stat tnum", valueCls)}>
          {tick ? <LedgerTick value={value} /> : value}
          {unit && (
            <span className={cn("ml-1.5 font-body text-label", dark ? "text-panel-ink-3" : "text-ink-3")}>
              {unit}
            </span>
          )}
        </span>
      ) : (
        <span className={cn("font-display text-stat", dark ? "text-panel-ink-3" : "text-ink-3")}>—</span>
      )}
    </div>
  );
}
