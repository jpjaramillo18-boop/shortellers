"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/cn";

interface SmartImageProps {
  src: string;
  alt: string;
  /** Seed for the deterministic photo fallback. Defaults to `alt`. */
  seed?: string;
  className?: string;
  /** Decorative images render empty alt and are hidden from assistive tech. */
  decorative?: boolean;
  sizes?: string;
  priority?: boolean;
}

/**
 * Resilient <img>:
 *   1. primary src (Unsplash CDN)
 *   2. deterministic Lorem Picsum photo at a sane size
 *   3. on-brand warm placeholder block — never a broken image icon
 *
 * Aspect ratio / cropping is the responsibility of the wrapping element
 * (use `aspect-[4/5]` etc. + `object-cover`).
 */
export function SmartImage({
  src,
  alt,
  seed,
  className,
  decorative = false,
  sizes,
  priority = false,
}: SmartImageProps) {
  const [stage, setStage] = useState<0 | 1 | 2>(0);

  const picsumSeed = encodeURIComponent(
    (seed ?? alt ?? "shortellers").toLowerCase().replace(/\s+/g, "-").slice(0, 40),
  );
  const fallbackSrc = `https://picsum.photos/seed/${picsumSeed}/900/900`;
  const currentSrc = stage === 0 ? src : fallbackSrc;

  if (stage === 2) {
    return (
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-2 bg-surface-sunken px-4 text-center text-ink-muted",
          className,
        )}
        aria-hidden={decorative || undefined}
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : alt}
      >
        <ImageOff className="h-5 w-5 opacity-50" aria-hidden="true" />
        {!decorative && (
          <span className="text-eyebrow leading-snug">{alt}</span>
        )}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={decorative ? "" : alt}
      aria-hidden={decorative || undefined}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      sizes={sizes}
      className={cn("h-full w-full object-cover", className)}
      onError={() => setStage((s) => (s < 2 ? ((s + 1) as 0 | 1 | 2) : 2))}
    />
  );
}
