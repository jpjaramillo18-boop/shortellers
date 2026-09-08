"use client";

import type { ReactNode } from "react";
import { useReveal } from "@/lib/use-reveal";
import { cn } from "@/lib/cn";

/**
 * Subtle on-scroll reveal (fade + 12px rise). One wrapper, used sparingly.
 * Reduced motion => rendered visible with no transform.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li";
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <Tag
      // @ts-expect-error -- ref typing across the small tag union is fine here
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-[320ms] ease-editorial motion-reduce:transition-none",
        shown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
        className,
      )}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}
