"use client";

import Link from "next/link";
import { Clock } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Creator } from "@/data/types";
import { categoryBySlug } from "@/data/categories";
import { responseTime } from "@/lib/format";
import { SmartImage } from "@/components/media/SmartImage";
import { RatingStat } from "./RatingStat";
import { VerificationBadge } from "./VerificationBadge";
import { LocationPill } from "./LocationPill";
import { CategoryChip } from "./CategoryChip";
import { PriceDisplay } from "./PriceDisplay";

interface CreatorCardProps {
  creator: Creator;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  active?: boolean;
}

/**
 * Marketplace listing unit. Whole card navigates; a real nested link is the
 * primary action. Essential text wraps — never clamped for uniformity.
 */
export function CreatorCard({
  creator,
  className,
  onMouseEnter,
  onMouseLeave,
  active = false,
}: CreatorCardProps) {
  const href = `/creators/${creator.slug}`;
  const cats = creator.categories
    .slice(0, 2)
    .map((c) => categoryBySlug(c))
    .filter(Boolean);

  return (
    <article
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-surface transition-shadow duration-[var(--dur-hover)] ease-editorial hover:shadow-elev-2",
        active ? "border-brand-600 shadow-elev-2" : "border-border",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-sunken">
        <SmartImage
          src={creator.cover}
          alt={`Work by ${creator.name} — ${creator.headline}`}
          seed={`cover-${creator.slug}`}
          className="transition-transform duration-[var(--dur-hover)] ease-editorial group-hover:scale-[1.02] motion-reduce:transform-none"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start gap-3">
          <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border bg-surface-sunken">
            <SmartImage
              src={creator.avatar}
              alt=""
              decorative
              seed={`avatar-${creator.slug}`}
            />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="text-[0.9375rem] font-semibold leading-tight text-ink">
                <Link
                  href={href}
                  className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                >
                  {creator.name}
                </Link>
              </h3>
              {creator.verified && <VerificationBadge />}
            </div>
            <p className="mt-0.5 text-sm text-ink-muted">{creator.headline}</p>
          </div>
        </div>

        <LocationPill location={creator.location} />

        {cats.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {cats.map((c) => (
              <CategoryChip key={c!.slug} label={c!.label} />
            ))}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-2 pt-1">
          <div className="flex flex-col gap-1">
            <RatingStat average={creator.ratingAvg} count={creator.ratingCount} />
            <span className="inline-flex items-center gap-1 text-xs text-ink-muted">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Replies in {responseTime(creator.responseTimeHours)}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <PriceDisplay amount={creator.startingPrice} prefix whole size="md" />
            <span className="relative z-[1] text-xs font-medium text-brand-700 underline-offset-2 group-hover:underline">
              View portfolio
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
