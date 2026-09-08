"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import type { Deliverable } from "@/data/types";
import { MediaTile } from "@/components/marketplace/MediaTile";
import { Lightbox, type LightboxItem } from "@/components/marketplace/Lightbox";

/**
 * Delivered content grid. Before approval: PREVIEW watermark + downloads
 * locked. After approval: clean media + downloads enabled.
 */
export function DeliverablesBento({
  deliverables,
  locked,
  className,
}: {
  deliverables: Deliverable[];
  locked: boolean;
  className?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const lightboxItems: LightboxItem[] = useMemo(
    () =>
      deliverables.map((d) => ({
        id: d.id,
        image: d.image,
        alt: d.alt,
        title: d.type === "video" ? "Vertical clip" : "Delivered photo",
        context: locked ? "Preview — unlocks on approval" : "Autumn Menu Shoot",
        type: d.type,
        duration: d.duration,
      })),
    [deliverables, locked],
  );

  return (
    <>
      <ul
        className={cn(
          "grid grid-flow-row-dense auto-rows-[44vw] grid-cols-2 gap-3 sm:auto-rows-[210px] md:auto-rows-[168px] md:grid-cols-4",
          className,
        )}
      >
        {deliverables.map((d, i) => (
          <li key={d.id} className={cn(i === 0 && "col-span-2 row-span-2")}>
            <MediaTile
              media={{
                id: d.id,
                image: d.image,
                alt: d.alt,
                type: d.type,
                duration: d.duration,
              }}
              aspect="1x1"
              className="!aspect-auto h-full"
              watermark={locked}
              showDownload
              locked={locked}
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
