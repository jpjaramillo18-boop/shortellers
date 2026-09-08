"use client";

import { cn } from "@/lib/cn";

interface CategoryChipProps {
  label: string;
  selected?: boolean;
  as?: "button" | "span";
  onClick?: () => void;
  className?: string;
}

/** Small pill. Used as a filter (button) and as a static tag (span). */
export function CategoryChip({
  label,
  selected = false,
  as = "span",
  onClick,
  className,
}: CategoryChipProps) {
  const base =
    "inline-flex items-center rounded-xs border px-2.5 py-1 text-xs font-medium transition-colors";
  const look = selected
    ? "border-brand-600 bg-brand-100 text-brand-700"
    : "border-border bg-surface-sunken text-ink";

  if (as === "button") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={selected}
        className={cn(
          base,
          look,
          "hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]",
          className,
        )}
      >
        {label}
      </button>
    );
  }

  return <span className={cn(base, look, className)}>{label}</span>;
}
