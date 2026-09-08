"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { AddOn } from "@/data/types";
import { usdWhole } from "@/lib/format";

export function AddOnCheckbox({
  addOn,
  checked,
  onToggle,
}: {
  addOn: AddOn;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-md border px-3 py-3 text-sm transition-colors",
        checked ? "border-brand-600 bg-brand-100" : "border-border bg-surface hover:bg-surface-sunken",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded border",
          checked ? "border-brand-600 bg-brand-600 text-white" : "border-border bg-surface",
        )}
      >
        {checked && <Check className="h-3.5 w-3.5" />}
      </span>
      <span className="flex-1 text-ink">{addOn.label}</span>
      <span className="text-num text-ink-muted">+{usdWhole(addOn.priceUSD)}</span>
    </label>
  );
}
