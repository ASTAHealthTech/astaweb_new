import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  size = "default",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-6 md:px-8",
        size === "default" && "max-w-[1200px]",
        size === "narrow" && "max-w-[860px]",
        size === "wide" && "max-w-[1400px]",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
