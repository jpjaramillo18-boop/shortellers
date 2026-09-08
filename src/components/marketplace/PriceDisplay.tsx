import { cn } from "@/lib/cn";
import { usd, usdWhole } from "@/lib/format";

interface PriceDisplayProps {
  amount: number;
  /** "from" prefix for card starting prices */
  prefix?: boolean;
  /** whole dollars (no cents) — cards & package headers */
  whole?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClass: Record<NonNullable<PriceDisplayProps["size"]>, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
  xl: "text-[1.75rem] leading-none",
};

/** JetBrains Mono, tabular figures. The reserved treatment for money. */
export function PriceDisplay({
  amount,
  prefix = false,
  whole = false,
  size = "md",
  className,
}: PriceDisplayProps) {
  return (
    <span className={cn("text-num text-ink", sizeClass[size], className)}>
      {prefix && (
        <span className="mr-1 font-sans text-xs font-normal uppercase tracking-wide text-ink-muted">
          from
        </span>
      )}
      {whole ? usdWhole(amount) : usd(amount)}
    </span>
  );
}
