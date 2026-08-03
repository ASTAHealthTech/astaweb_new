import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "glow" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  trailingIcon?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  trailingIcon,
  className,
  onClick,
  type = "button",
  disabled,
}: Props) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const sizes: Record<Size, string> = {
    sm: "h-9 px-4 text-[0.8125rem] rounded-[10px] gap-1.5",
    md: "h-10 px-5 text-[0.875rem] rounded-[10px] gap-2",
    lg: "h-11 px-6 text-[0.9375rem] rounded-[10px] gap-2",
  };

  const variants: Record<Variant, string> = {
    primary: "bg-fg text-white hover:bg-fg/85 dark:bg-frost dark:text-night dark:hover:bg-frost/90",
    glow: "bg-accent text-white hover:bg-accent/90 shadow-sm",
    outline: "border border-border bg-transparent text-fg hover:bg-white dark:border-night-edge dark:text-frost dark:hover:bg-night-panel",
    ghost: "text-fg-muted hover:text-fg hover:bg-white/60 dark:text-frost-muted dark:hover:text-frost",
  };

  const cls = cn(base, sizes[size], variants[variant], className);

  const arrow = trailingIcon ? (
    <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M2.5 7h9m-3.5-3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : null;

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}{arrow}</a>;
    }
    return <Link href={href} className={cls}>{children}{arrow}</Link>;
  }

  return <button type={type} onClick={onClick} disabled={disabled} className={cls}>{children}{arrow}</button>;
}
