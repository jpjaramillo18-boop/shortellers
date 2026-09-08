import { MapPin } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Location } from "@/data/types";

export function LocationPill({
  location,
  className,
  emphasis = false,
}: {
  location: Pick<Location, "neighborhood" | "city" | "state">;
  className?: string;
  emphasis?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-sm",
        emphasis ? "text-ink" : "text-ink-muted",
        className,
      )}
    >
      <MapPin className="h-3.5 w-3.5 shrink-0 text-info" aria-hidden="true" />
      <span>
        {location.neighborhood} · {location.city}, {location.state}
      </span>
    </span>
  );
}
