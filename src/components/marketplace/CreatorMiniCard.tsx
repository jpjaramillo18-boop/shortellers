import Link from "next/link";
import { cn } from "@/lib/cn";
import type { Creator } from "@/data/types";
import { SmartImage } from "@/components/media/SmartImage";
import { RatingStat } from "./RatingStat";
import { VerificationBadge } from "./VerificationBadge";
import { LocationPill } from "./LocationPill";

/** Compact creator identity block — booking summary, project header. */
export function CreatorMiniCard({
  creator,
  href,
  className,
  showLocation = true,
}: {
  creator: Creator;
  href?: string;
  className?: string;
  showLocation?: boolean;
}) {
  const inner = (
    <>
      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border bg-surface-sunken">
        <SmartImage src={creator.avatar} alt="" decorative seed={`avatar-${creator.slug}`} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="font-semibold text-ink">{creator.name}</span>
          {creator.verified && <VerificationBadge />}
        </span>
        <span className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm text-ink-muted">
          <RatingStat average={creator.ratingAvg} count={creator.ratingCount} />
          {showLocation && <LocationPill location={creator.location} />}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-md p-1 transition-colors hover:bg-surface-sunken focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]",
          className,
        )}
      >
        {inner}
      </Link>
    );
  }

  return <div className={cn("flex items-center gap-3", className)}>{inner}</div>;
}
