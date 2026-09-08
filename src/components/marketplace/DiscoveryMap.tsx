"use client";

import { cn } from "@/lib/cn";
import type { Creator } from "@/data/types";
import { MapCanvas, MapPinGlyph } from "./MapCanvas";
import { usdWhole } from "@/lib/format";

/**
 * Stylised results map. Pins sync with the card list via `activeSlug`.
 * The list is the accessible equivalent — every pin is also a labelled button.
 */
export function DiscoveryMap({
  creators,
  activeSlug,
  onHover,
  onSelect,
  className,
}: {
  creators: Creator[];
  activeSlug: string | null;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-surface-sunken",
        className,
      )}
    >
      <MapCanvas />

      {creators.map((c) => {
        const active = c.slug === activeSlug;
        return (
          <button
            key={c.slug}
            type="button"
            onMouseEnter={() => onHover(c.slug)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(c.slug)}
            onBlur={() => onHover(null)}
            onClick={() => onSelect(c.slug)}
            className="absolute -translate-x-1/2 -translate-y-full rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
            style={{ left: `${c.location.pin.x * 100}%`, top: `${c.location.pin.y * 100}%` }}
            aria-label={`${c.name}, ${c.location.neighborhood} — from ${usdWhole(
              c.startingPrice,
            )}`}
          >
            <span
              className={cn(
                "block transition-transform duration-150 ease-editorial",
                active ? "scale-125" : "scale-100",
              )}
            >
              <MapPinGlyph tone={active ? "brand" : "info"} />
            </span>
          </button>
        );
      })}

      {activeSlug && (
        <ActivePinCard
          creator={creators.find((c) => c.slug === activeSlug)!}
        />
      )}

      <p className="pointer-events-none absolute left-3 top-3 rounded-md bg-surface/90 px-2 py-1 text-eyebrow">
        Portland, OR
      </p>
    </div>
  );
}

function ActivePinCard({ creator }: { creator: Creator }) {
  return (
    <div className="pointer-events-none absolute bottom-3 left-3 right-3 rounded-md border border-border bg-surface px-3 py-2 shadow-elev-2">
      <p className="text-sm font-semibold text-ink">{creator.name}</p>
      <p className="text-xs text-ink-muted">
        {creator.location.neighborhood} · from {usdWhole(creator.startingPrice)}
      </p>
    </div>
  );
}
