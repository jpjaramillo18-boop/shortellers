"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { PortfolioItem } from "@/data/types";
import { MediaTile } from "./MediaTile";
import { Lightbox, type LightboxItem } from "./Lightbox";

/**
 * Bento spans — a few large accents, the rest uniform, so dense packing
 * leaves no holes. Mobile stays a tidy 2-col grid.
 */
function spanClass(item: PortfolioItem): string {
  if (item.feature) return "col-span-2 row-span-2";
  if (item.aspect === "3x2" || item.aspect === "16x9")
    return "col-span-2 row-span-1";
  return "col-span-1 row-span-1";
}

export function PortfolioGrid({
  items,
  filterKey = "all",
  className,
}: {
  items: PortfolioItem[];
  filterKey?: string;
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      items.map((it) => ({
        id: it.id,
        image: it.image,
        alt: it.alt,
        title: it.title,
        context: it.context,
      })),
    [items],
  );

  return (
    <>
      <ul
        key={filterKey}
        className={cn(
          "grid grid-flow-row-dense auto-rows-[42vw] grid-cols-2 gap-3 sm:auto-rows-[220px] md:auto-rows-[180px] md:grid-cols-4",
          className,
        )}
      >
        {items.map((item, i) => (
          <li
            key={item.id}
            className={cn(spanClass(item), "animate-reveal-up")}
            style={{ animationDelay: `${Math.min(i, 12) * 45}ms` }}
          >
            <MediaTile
              media={{ id: item.id, image: item.image, alt: item.alt, title: item.title }}
              aspect="1x1"
              className="!aspect-auto h-full"
              index={i}
              onOpen={() => setOpenIndex(i)}
            />
          </li>
        ))}
      </ul>

      <Lightbox
        items={lightboxItems}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </>
  );
}
