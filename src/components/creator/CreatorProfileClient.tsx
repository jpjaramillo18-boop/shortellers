"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import type { Creator } from "@/data/types";
import { categoryBySlug } from "@/data/categories";
import { AVATARS } from "@/data/images";
import { responseTime } from "@/lib/format";
import { PageShell } from "@/components/layout/PageShell";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SmartImage } from "@/components/media/SmartImage";
import { Button } from "@/components/ui/Button";
import { RatingStat, RatingBreakdownBars } from "@/components/marketplace/RatingStat";
import { VerificationBadge } from "@/components/marketplace/VerificationBadge";
import { LocationPill } from "@/components/marketplace/LocationPill";
import { CategoryChip } from "@/components/marketplace/CategoryChip";
import { PortfolioGrid } from "@/components/marketplace/PortfolioGrid";
import { PackageCard } from "@/components/marketplace/PackageCard";
import { ReviewCard } from "@/components/marketplace/ReviewCard";
import { MapPreview } from "@/components/marketplace/MapPreview";
import { PriceDisplay } from "@/components/marketplace/PriceDisplay";
import { StubButton } from "@/components/ui/StubButton";

const REVIEWER_AVATARS: Record<string, string> = {
  r1: AVATARS.amara,
  r2: AVATARS.ben,
  r3: AVATARS.steph,
  r4: AVATARS.marisol,
};

export function CreatorProfileClient({ creator }: { creator: Creator }) {
  const portfolio = useMemo(() => creator.portfolio ?? [], [creator]);
  const packages = creator.packages ?? [];
  const reviews = creator.reviews ?? [];

  const portfolioCats = useMemo(() => {
    const set = new Set(portfolio.map((p) => p.category));
    return Array.from(set);
  }, [portfolio]);

  const [filter, setFilter] = useState<string>("all");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const filtered =
    filter === "all" ? portfolio : portfolio.filter((p) => p.category === filter);
  const shownReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <PageShell>
      <div className="container-editorial">
        <Breadcrumbs
          items={[
            { label: "Discover", href: "/discover" },
            creator.categories[0]
              ? {
                  label: categoryBySlug(creator.categories[0])!.label,
                  href: `/discover?cat=${creator.categories[0]}`,
                }
              : { label: "Creators" },
            { label: creator.name },
          ]}
        />

        <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* ---- Main column ---- */}
          <div className="min-w-0">
            {/* Header */}
            <header className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:gap-5">
              <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border bg-surface-sunken">
                <SmartImage src={creator.avatar} alt="" decorative seed={`avatar-${creator.slug}`} />
              </span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-h1 text-ink">{creator.name}</h1>
                  {creator.verified && <VerificationBadge size="md" />}
                </div>
                <p className="mt-1 text-lg text-ink-muted">{creator.headline}</p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                  <RatingStat average={creator.ratingAvg} count={creator.ratingCount} size="md" />
                  <LocationPill location={creator.location} emphasis />
                  <span className="inline-flex items-center gap-1 text-ink-muted">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    Replies in {responseTime(creator.responseTimeHours)}
                  </span>
                  {creator.availabilityLabel && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-verified-100 px-2 py-0.5 text-xs font-medium text-verified">
                      {creator.availabilityLabel}
                    </span>
                  )}
                </div>
              </div>
            </header>

            {/* Stat row */}
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
              {[
                { k: "Projects", v: `${creator.projectsCompleted}+` },
                { k: "Member since", v: String(creator.memberSince) },
                { k: "On-time", v: creator.onTimePct ? `${creator.onTimePct}%` : "—" },
                { k: "Rebook rate", v: creator.rebookPct ? `${creator.rebookPct}%` : "—" },
              ].map((s) => (
                <div key={s.k} className="bg-surface px-4 py-3">
                  <dt className="text-eyebrow">{s.k}</dt>
                  <dd className="mt-1 text-num text-lg text-ink">{s.v}</dd>
                </div>
              ))}
            </dl>

            {/* Portfolio */}
            <section className="mt-10">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <h2 className="text-h2 text-ink">Portfolio</h2>
                <div className="flex flex-wrap gap-1.5">
                  <CategoryChip
                    as="button"
                    label="All"
                    selected={filter === "all"}
                    onClick={() => setFilter("all")}
                  />
                  {portfolioCats.map((c) => (
                    <CategoryChip
                      key={c}
                      as="button"
                      label={categoryBySlug(c)?.label ?? c}
                      selected={filter === c}
                      onClick={() => setFilter(c)}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-5 rounded-xl border border-border bg-paper-warm p-3 sm:p-4">
                <PortfolioGrid items={filtered} filterKey={filter} />
              </div>
            </section>

            {/* About */}
            <section className="mt-10">
              <h2 className="text-h2 text-ink">About</h2>
              <p className="mt-3 max-w-prose text-ink">{creator.bio}</p>
            </section>

            {/* Services */}
            {creator.services && (
              <section className="mt-8">
                <h2 className="text-h3 text-ink">Services</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {creator.services.map((s) => (
                    <li key={s}>
                      <CategoryChip label={s} />
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Packages */}
            <section id="packages" className="mt-10 scroll-mt-24">
              <h2 className="text-h2 text-ink">Packages</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {packages.map((p) => (
                  <PackageCard key={p.id} pkg={p} mode="link" />
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="mt-10">
              <h2 className="text-h2 text-ink">Reviews</h2>
              <div className="mt-4 grid gap-6 sm:grid-cols-[220px_1fr]">
                <div className="rounded-lg border border-border bg-surface p-4">
                  <p className="text-num text-3xl font-semibold text-ink">
                    {creator.ratingAvg.toFixed(1)}
                  </p>
                  <p className="mt-0.5 text-sm text-ink-muted">
                    {creator.ratingCount} reviews
                  </p>
                  {creator.ratingBreakdown && (
                    <div className="mt-3">
                      <RatingBreakdownBars
                        breakdown={creator.ratingBreakdown}
                        total={creator.ratingCount}
                      />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  {shownReviews.map((r) => (
                    <ReviewCard key={r.id} review={r} avatarSrc={REVIEWER_AVATARS[r.id]} />
                  ))}
                  {reviews.length > 3 && (
                    <button
                      type="button"
                      onClick={() => setShowAllReviews((v) => !v)}
                      className="w-fit text-sm font-medium text-brand-700 hover:underline"
                    >
                      {showAllReviews
                        ? "Show fewer reviews"
                        : `Show all ${creator.ratingCount} reviews`}
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* Service area */}
            <section className="mt-10">
              <h2 className="text-h3 text-ink">Service area</h2>
              <p className="mt-1 text-sm text-ink-muted">
                Based in {creator.location.neighborhood}, travels up to{" "}
                <span className="text-num">{creator.serviceRadiusKm}</span> km
                around {creator.location.city}.
              </p>
              <MapPreview
                pin={creator.location.pin}
                label={`${creator.name} — ${creator.location.neighborhood}`}
                address={`${creator.location.neighborhood}, ${creator.location.city}, ${creator.location.state}`}
                className="mt-3"
              />
            </section>
          </div>

          {/* ---- Sticky booking card (desktop) ---- */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 card-editorial p-5">
              <div className="flex items-baseline justify-between">
                <p className="text-eyebrow">Book this creator</p>
                <PriceDisplay amount={creator.startingPrice} prefix whole size="lg" />
              </div>
              <p className="mt-2 text-sm text-ink-muted">
                {creator.availabilityLabel}. Typical reply in{" "}
                {responseTime(creator.responseTimeHours)}.
              </p>
              <Button asChild block className="mt-4">
                <Link href="/book">Check availability &amp; book</Link>
              </Button>
              <StubButton
                variant="secondary"
                block
                className="mt-2"
                message={`Messaging ${creator.name} is a demo stub.`}
              >
                Message {creator.name.split(" ")[0]}
              </StubButton>
              <ul className="mt-4 space-y-1.5 border-t border-border pt-4 text-xs text-ink-muted">
                {packages.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-2">
                    <Link href={`/book?package=${p.id}`} className="hover:text-ink hover:underline">
                      {p.name}
                    </Link>
                    <span className="text-num">from {"$"}{p.priceUSD}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <div className="h-24 lg:hidden" aria-hidden="true" />

      {/* ---- Sticky booking bar (mobile) ---- */}
      <div className="fixed inset-x-0 bottom-[calc(56px+env(safe-area-inset-bottom))] z-30 flex items-center gap-3 border-t border-border bg-surface px-4 py-3 shadow-[0_-4px_16px_rgba(28,25,23,0.06)] lg:hidden">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">Book {creator.name}</p>
          <p className="text-xs text-ink-muted">
            <span className="text-num">from ${creator.startingPrice}</span> ·{" "}
            {creator.availabilityLabel}
          </p>
        </div>
        <Button asChild className="ml-auto shrink-0">
          <Link href="/book">Book</Link>
        </Button>
      </div>
    </PageShell>
  );
}
