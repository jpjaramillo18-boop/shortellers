"use client";

import { cn } from "@/lib/cn";
import { business } from "@/data/business";
import { MapPreview } from "@/components/marketplace/MapPreview";

export function LocationField({
  mode,
  address,
  onModeChange,
  studioAddress,
}: {
  mode: "business" | "studio";
  address: string;
  onModeChange: (mode: "business" | "studio") => void;
  studioAddress: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <fieldset className="flex flex-col gap-2">
        <legend className="sr-only">Shoot location</legend>
        <Choice
          checked={mode === "business"}
          onChange={() => onModeChange("business")}
          title="At my business address"
          detail={business.address}
        />
        <Choice
          checked={mode === "studio"}
          onChange={() => onModeChange("studio")}
          title="At Lena's studio"
          detail={studioAddress}
        />
      </fieldset>

      <MapPreview
        pin={mode === "business" ? business.location.pin : { x: 0.5, y: 0.28 }}
        label={mode === "business" ? business.name : "Lena Ortiz — studio"}
        address={address}
      />
    </div>
  );
}

function Choice({
  checked,
  onChange,
  title,
  detail,
}: {
  checked: boolean;
  onChange: () => void;
  title: string;
  detail: string;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-md border px-3 py-3 text-sm transition-colors",
        checked ? "border-brand-600 bg-brand-100" : "border-border bg-surface hover:bg-surface-sunken",
      )}
    >
      <input
        type="radio"
        name="shoot-location"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-4 w-4 accent-[var(--brand-600)]"
      />
      <span>
        <span className="block font-medium text-ink">{title}</span>
        <span className="block text-xs text-ink-muted">{detail}</span>
      </span>
    </label>
  );
}
