import { MapPin as MapPinIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import type { GeoPin } from "@/data/types";
import { MapCanvas, MapPin } from "./MapCanvas";

/**
 * Location confirmation panel (Booking / Project). Supporting information,
 * not an interactive map. The address is shown as text.
 */
export function MapPreview({
  pin,
  label,
  address,
  className,
  aspect = "aspect-[16/9]",
}: {
  pin: GeoPin;
  label: string;
  address: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border",
        aspect,
        className,
      )}
      role="img"
      aria-label={`Approximate location of ${label}: ${address}`}
    >
      <MapCanvas />
      <MapPin x={pin.x} y={pin.y} label={label} pulse />
      <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 bg-surface/95 px-3 py-2 text-sm backdrop-blur-[1px]">
        <MapPinIcon className="h-4 w-4 shrink-0 text-info" aria-hidden="true" />
        <span className="min-w-0">
          <span className="block truncate font-medium text-ink">{label}</span>
          <span className="block truncate text-xs text-ink-muted">{address}</span>
        </span>
        <span className="ml-auto shrink-0 text-eyebrow">Approx.</span>
      </div>
    </div>
  );
}
