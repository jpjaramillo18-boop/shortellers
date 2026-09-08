"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Crossfades between values when `value` changes (used for price updates).
 * No count-up. Respects reduced motion (instant swap).
 */
export function CrossfadeValue({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [display, setDisplay] = useState(value);
  const [fading, setFading] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (value === display) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setDisplay(value);
      return;
    }

    setFading(true);
    const t = window.setTimeout(() => {
      setDisplay(value);
      setFading(false);
    }, 130);
    return () => window.clearTimeout(t);
  }, [value, display]);

  return (
    <span
      className={cn(
        "inline-block transition-opacity duration-[var(--dur-hover)] ease-editorial",
        fading ? "opacity-0" : "opacity-100",
        className,
      )}
    >
      {display}
    </span>
  );
}
