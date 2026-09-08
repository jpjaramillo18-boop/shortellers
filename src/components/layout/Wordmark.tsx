import Link from "next/link";
import { cn } from "@/lib/cn";

/** Shortellers wordmark — Calistoga, with a small terracotta dot. */
export function Wordmark({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        "inline-flex items-baseline gap-0.5 font-display text-xl text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]",
        className,
      )}
      aria-label="Shortellers — home"
    >
      Shortellers
      <span className="text-brand-600" aria-hidden="true">
        .
      </span>
    </Link>
  );
}
