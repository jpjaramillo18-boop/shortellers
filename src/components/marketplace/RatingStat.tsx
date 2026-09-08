import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import type { RatingBreakdown } from "@/data/types";

interface RatingStatProps {
  average: number;
  count: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Gold star glyph (non-text, decorative) + the numeral and count as text.
 * Rating is never communicated by colour alone.
 */
export function RatingStat({
  average,
  count,
  size = "sm",
  className,
}: RatingStatProps) {
  const starSize = size === "lg" ? "h-5 w-5" : size === "md" ? "h-4 w-4" : "h-4 w-4";
  const textSize = size === "lg" ? "text-base" : "text-sm";

  return (
    <span className={cn("inline-flex items-baseline gap-1.5", className)}>
      <Star
        className={cn("shrink-0 translate-y-0.5 fill-rating-star text-rating-star", starSize)}
        aria-hidden="true"
      />
      <span className={cn("text-num font-medium text-ink", textSize)}>
        {average.toFixed(1)}
      </span>
      <span className={cn("text-ink-muted", textSize)}>
        ({count}
        <span className="sr-only"> reviews</span>)
      </span>
    </span>
  );
}

export function RatingBreakdownBars({
  breakdown,
  total,
}: {
  breakdown: RatingBreakdown;
  total: number;
}) {
  const rows = [5, 4, 3, 2, 1] as const;
  return (
    <dl className="space-y-1.5">
      {rows.map((star) => {
        const n = breakdown[star];
        const pct = total > 0 ? Math.round((n / total) * 100) : 0;
        return (
          <div key={star} className="flex items-center gap-3 text-sm">
            <dt className="flex w-12 shrink-0 items-center gap-1 text-ink-muted">
              <span className="text-num">{star}</span>
              <Star className="h-3 w-3 fill-rating-star text-rating-star" aria-hidden="true" />
            </dt>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-sunken">
              <div
                className="h-full rounded-full bg-rating-star/80"
                style={{ width: `${pct}%` }}
              />
            </div>
            <dd className="w-10 shrink-0 text-right text-num text-ink-muted">{n}</dd>
          </div>
        );
      })}
    </dl>
  );
}
