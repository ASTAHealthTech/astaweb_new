import { cn } from "@/lib/cn";

type Props = {
  eyebrow?: string; // Accepted for backward compatibility but strictly hidden to maintain clean Converge aesthetic
  heading?: string;
  title?: string;
  sub?: string;
  align?: "left" | "center";
  size?: "default" | "large";
  maxWidth?: string;
  className?: string;
};

export function SectionHeading({ heading, title, sub, align = "center", size = "default", maxWidth, className }: Props) {
  const displayHeading = heading || title || "";
  return (
    <div className={cn(align === "center" && "text-center", align === "center" && (maxWidth || "mx-auto max-w-[640px]"), className)}>
      <h2 className={cn(
        "font-semibold tracking-[-0.025em] text-fg dark:text-frost",
        size === "default" && "text-[1.75rem] leading-[1.18] md:text-[2.25rem]",
        size === "large" && "text-[2.25rem] leading-[1.12] md:text-[2.75rem]"
      )}>
        {displayHeading}
      </h2>
      {sub && (
        <p className={cn("mt-3 text-[0.9375rem] leading-relaxed text-fg-muted dark:text-frost-muted", align === "center" && "mx-auto max-w-[480px]")}>
          {sub}
        </p>
      )}
    </div>
  );
}
