import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "brand" | "success" | "live" | "piloting" | "onboarding";

const tones: Record<Tone, string> = {
  neutral: "bg-mist text-ink-muted ring-1 ring-line dark:bg-white/[0.06] dark:text-frost-muted dark:ring-white/[0.08]",
  brand: "bg-brand-50 text-brand-600 ring-1 ring-brand-100 dark:bg-brand-500/15 dark:text-brand-200 dark:ring-brand-400/20",
  success: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-500/12 dark:text-emerald-200 dark:ring-emerald-400/20",
  live: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 dark:bg-emerald-500/12 dark:text-emerald-200 dark:ring-emerald-400/20",
  piloting: "bg-brand-50 text-brand-600 ring-1 ring-brand-100 dark:bg-brand-500/15 dark:text-brand-200 dark:ring-brand-400/20",
  onboarding: "bg-amber-50 text-amber-700 ring-1 ring-amber-100 dark:bg-amber-500/12 dark:text-amber-200 dark:ring-amber-400/20",
};

const dots: Record<Tone, string> = {
  neutral: "bg-ink-subtle",
  brand: "bg-brand-500",
  success: "bg-emerald-500",
  live: "bg-emerald-500",
  piloting: "bg-brand-500",
  onboarding: "bg-amber-500",
};

export function Badge({
  tone = "neutral",
  dot,
  children,
  className,
}: {
  tone?: Tone;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
      tones[tone],
      className
    )}>
      {dot && (
        <span className={cn("h-1.5 w-1.5 rounded-full flex-none", dots[tone])} />
      )}
      {children}
    </span>
  );
}
