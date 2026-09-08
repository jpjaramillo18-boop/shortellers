"use client";

import { Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Creator, Package, PriceBreakdown as PriceBreakdownData } from "@/data/types";
import { dateLong } from "@/lib/format";
import { CreatorMiniCard } from "@/components/marketplace/CreatorMiniCard";
import { PriceBreakdown } from "./PriceBreakdown";

interface BookingSummaryProps {
  creator: Creator;
  pkg: Package;
  selectedAddOnLabels: string[];
  date: string;
  timeLabel: string;
  address: string;
  pricing: PriceBreakdownData;
  className?: string;
}

export function BookingSummary({
  creator,
  pkg,
  selectedAddOnLabels,
  date,
  timeLabel,
  address,
  pricing,
  className,
}: BookingSummaryProps) {
  return (
    <div className={cn("card-editorial p-5", className)}>
      <p className="text-eyebrow">Booking summary</p>

      <div className="mt-3 border-b border-border pb-4">
        <CreatorMiniCard creator={creator} showLocation={false} />
      </div>

      <dl className="flex flex-col gap-3 border-b border-border py-4 text-sm">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-ink-muted">Package</dt>
          <dd className="text-right font-medium text-ink">{pkg.name}</dd>
        </div>
        {selectedAddOnLabels.length > 0 && (
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-ink-muted">Add-ons</dt>
            <dd className="text-right text-ink">{selectedAddOnLabels.join(", ")}</dd>
          </div>
        )}
        <div className="flex items-start justify-between gap-4">
          <dt className="flex items-center gap-1.5 text-ink-muted">
            <Calendar className="h-4 w-4" aria-hidden="true" /> Date
          </dt>
          <dd className="text-right text-ink">
            {dateLong(date)}
            <br />
            <span className="text-num text-xs text-ink-muted">{timeLabel}</span>
          </dd>
        </div>
        <div className="flex items-start justify-between gap-4">
          <dt className="flex items-center gap-1.5 text-ink-muted">
            <MapPin className="h-4 w-4" aria-hidden="true" /> Location
          </dt>
          <dd className="max-w-[60%] text-right text-ink">{address}</dd>
        </div>
      </dl>

      <div className="pt-4">
        <PriceBreakdown data={pricing} creatorName={creator.name.split(" ")[0]} />
      </div>
    </div>
  );
}
