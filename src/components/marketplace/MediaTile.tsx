"use client";

import { Download, Lock, Play } from "lucide-react";
import { cn } from "@/lib/cn";
import { SmartImage } from "@/components/media/SmartImage";

export interface MediaTileData {
  id: string;
  image: string;
  alt: string;
  type?: "photo" | "video";
  duration?: string;
  title?: string;
}

interface MediaTileProps {
  media: MediaTileData;
  aspect?: "1x1" | "4x5" | "3x2" | "16x9";
  className?: string;
  /** show PREVIEW watermark (project, pre-approval) */
  watermark?: boolean;
  /** download affordance shown; disabled when `locked` */
  showDownload?: boolean;
  locked?: boolean;
  onOpen?: () => void;
  index?: number;
}

const aspectClass: Record<NonNullable<MediaTileProps["aspect"]>, string> = {
  "1x1": "aspect-square",
  "4x5": "aspect-[4/5]",
  "3x2": "aspect-[3/2]",
  "16x9": "aspect-video",
};

export function MediaTile({
  media,
  aspect = "1x1",
  className,
  watermark = false,
  showDownload = false,
  locked = false,
  onOpen,
  index,
}: MediaTileProps) {
  const isVideo = media.type === "video";

  return (
    <figure
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-surface-sunken",
        aspectClass[aspect],
        className,
      )}
    >
      <button
        type="button"
        onClick={onOpen}
        className="absolute inset-0 h-full w-full focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--focus)]"
        aria-label={`Open ${media.alt}`}
      >
        <SmartImage
          src={media.image}
          alt={media.alt}
          seed={`${media.id}-${index ?? 0}`}
          className="transition-transform duration-[var(--dur-hover)] ease-editorial group-hover:scale-[1.02] motion-reduce:transform-none"
        />
      </button>

      {watermark && <span className="watermark-tile" aria-hidden="true" />}

      {isVideo && (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(28,25,23,0.55)] text-white">
            <Play className="h-5 w-5 translate-x-0.5 fill-white" aria-hidden="true" />
          </span>
        </span>
      )}

      {isVideo && media.duration && (
        <span className="pointer-events-none absolute bottom-2 right-2 rounded bg-[rgba(28,25,23,0.7)] px-1.5 py-0.5 text-[0.7rem] text-num text-white">
          {media.duration}
        </span>
      )}

      {showDownload && (
        <span className="pointer-events-none absolute bottom-2 left-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium",
              locked
                ? "bg-[rgba(28,25,23,0.6)] text-white/85"
                : "bg-surface text-ink shadow-elev-1",
            )}
          >
            {locked ? (
              <>
                <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Locked
              </>
            ) : (
              <>
                <Download className="h-3.5 w-3.5" aria-hidden="true" /> Download
              </>
            )}
          </span>
        </span>
      )}
    </figure>
  );
}
