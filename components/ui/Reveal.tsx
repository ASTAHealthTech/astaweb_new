"use client";

import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  delay?: number;
  y?: number;
};

export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  style,
  ...rest
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "-10px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        inView ? "opacity-100" : "opacity-0",
        className
      )}
      style={{
        ...style,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transitionDelay: inView ? `${delay}s` : "0s",
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
