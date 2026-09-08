"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import type { PriceBreakdown as PriceBreakdownData } from "@/data/types";
import { usd } from "@/lib/format";
import { CrossfadeValue } from "@/components/marketplace/CrossfadeValue";

/**
 * Business total is the dominant figure. The platform fee is disclosed in
 * plain text inside a collapsed-by-default row — never a competing price.
 */
export function PriceBreakdown({
  data,
  creatorName,
  chargeNote = "Charged now, held securely",
  className,
}: {
  data: PriceBreakdownData;
  creatorName: string;
  chargeNote?: string;
  className?: string;
}) {
  const feePctLabel = `${Math.round(data.platformFeePct * 100)}%`;

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <dl className="flex flex-col gap-2 text-sm">
        {data.lineItems.map((li, i) => (
          <div key={`${li.label}-${i}`} className="flex items-baseline justify-between gap-4">
            <dt className="text-ink">{li.label}</dt>
            <dd className="text-num text-ink">{usd(li.amountUSD)}</dd>
          </div>
        ))}
        <div className="mt-1 flex items-baseline justify-between gap-4 border-t border-border pt-2">
          <dt className="text-ink-muted">Subtotal</dt>
          <dd className="text-num text-ink-muted">
            <CrossfadeValue value={usd(data.subtotalUSD)} />
          </dd>
        </div>
      </dl>

      <div className="flex items-baseline justify-between gap-4 rounded-md bg-surface-sunken px-3 py-3">
        <div>
          <p className="text-sm font-medium text-ink">Total due</p>
          <p className="text-xs text-ink-muted">{chargeNote}</p>
        </div>
        <p className="text-num text-[1.75rem] font-semibold leading-none text-ink">
          <CrossfadeValue value={usd(data.totalUSD)} />
        </p>
      </div>

      <details className="group rounded-md border border-border">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-3 py-2 text-xs text-ink-muted [&::-webkit-details-marker]:hidden">
          <span>Pricing &amp; platform fee</span>
          <ChevronDown
            className="h-4 w-4 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <p className="border-t border-border px-3 py-3 text-xs leading-relaxed text-ink-muted">
          Your total is <span className="text-num text-ink">{usd(data.totalUSD)}</span>, {chargeNote.toLowerCase()}.
          Shortellers&rsquo; platform fee is {feePctLabel}{" "}
          (<span className="text-num">{usd(data.platformFeeUSD)}</span>);{" "}
          {creatorName} receives{" "}
          <span className="text-num text-ink">{usd(data.creatorPayoutUSD)}</span>{" "}
          after you approve the delivery. The fee covers secure payments,
          delivery protection, and support.
        </p>
      </details>
    </div>
  );
}
