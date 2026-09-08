"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Package } from "@/data/types";
import { Button } from "@/components/ui/Button";
import { PriceDisplay } from "./PriceDisplay";

interface PackageCardProps {
  pkg: Package;
  /** "link" (profile → booking) or "select" (booking, controlled) */
  mode?: "link" | "select";
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
}

export function PackageCard({
  pkg,
  mode = "link",
  selected = false,
  onSelect,
  className,
}: PackageCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-lg border bg-surface p-5",
        selected ? "border-brand-600 shadow-elev-2" : "border-border",
        className,
      )}
    >
      {pkg.popular && (
        <span className="absolute -top-2.5 left-5 rounded-full bg-brand-600 px-2 py-0.5 text-[0.7rem] font-medium uppercase tracking-wide text-white">
          Most popular
        </span>
      )}

      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-h3 text-ink">{pkg.name}</h3>
        <PriceDisplay amount={pkg.priceUSD} whole size="xl" />
      </div>
      <p className="mt-1 text-sm text-ink-muted">{pkg.duration}</p>
      <p className="mt-2 text-sm text-ink">{pkg.summary}</p>

      <ul className="my-4 flex-1 space-y-2 border-t border-border pt-4">
        {pkg.includes.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-ink">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-verified" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>

      <p className="mb-4 text-xs text-ink-muted">
        Delivered within <span className="text-num">{pkg.deliveryDays}</span> days
      </p>

      {mode === "link" ? (
        <Button
          asChild
          variant={pkg.popular ? "primary" : "secondary"}
          block
        >
          <Link href={`/book?package=${pkg.id}`}>Select {pkg.name}</Link>
        </Button>
      ) : (
        <Button
          type="button"
          variant={selected ? "primary" : "secondary"}
          block
          onClick={onSelect}
          aria-pressed={selected}
        >
          {selected ? "Selected" : "Select"}
        </Button>
      )}
    </div>
  );
}
