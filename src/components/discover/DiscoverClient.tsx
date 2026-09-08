"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Map as MapIcon, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { creators as ALL_CREATORS } from "@/data/creators";
import { categoryBySlug } from "@/data/categories";
import type { Creator } from "@/data/types";
import { PageShell } from "@/components/layout/PageShell";
import { CreatorCard } from "@/components/marketplace/CreatorCard";
import { DiscoveryMap } from "@/components/marketplace/DiscoveryMap";
import { EmptyState } from "@/components/marketplace/EmptyState";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import {
  DEFAULT_FILTERS,
  Filters,
  activeFilterCount,
  type FilterState,
} from "./Filters";

type SortKey = "recommended" | "rating" | "price-asc" | "soonest";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "recommended", label: "Recommended" },
  { key: "rating", label: "Top rated" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "soonest", label: "Soonest available" },
];

function availabilityRank(label: string): number {
  if (/this week/i.test(label)) return 0;
  if (/this month/i.test(label)) return 1;
  if (/2 weeks/i.test(label)) return 2;
  return 3;
}

export function DiscoverClient() {
  const router = useRouter();
  const params = useSearchParams();

  const q = params.get("q") ?? "";
  const loc = params.get("loc") ?? "Portland, OR";

  const [filters, setFilters] = useState<FilterState>(() => ({
    ...DEFAULT_FILTERS,
    cat: params.get("cat") ?? "",
    hood: params.get("hood") ?? "",
    priceMax: Number(params.get("max")) || DEFAULT_FILTERS.priceMax,
    minRating: Number(params.get("min")) || 0,
    verifiedOnly: params.get("verified") === "1",
    availableOnly: params.get("avail") === "1",
  }));
  const [sort, setSort] = useState<SortKey>(
    (params.get("sort") as SortKey) || "recommended",
  );
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  // Reflect filter/sort/query state in the URL (shareable, restored on back).
  useEffect(() => {
    const next = new URLSearchParams();
    if (q) next.set("q", q);
    if (loc && loc !== "Portland, OR") next.set("loc", loc);
    if (filters.cat) next.set("cat", filters.cat);
    if (filters.hood) next.set("hood", filters.hood);
    if (filters.priceMax < DEFAULT_FILTERS.priceMax)
      next.set("max", String(filters.priceMax));
    if (filters.minRating > 0) next.set("min", String(filters.minRating));
    if (filters.verifiedOnly) next.set("verified", "1");
    if (filters.availableOnly) next.set("avail", "1");
    if (sort !== "recommended") next.set("sort", sort);
    router.replace(`/discover${next.toString() ? `?${next}` : ""}`, {
      scroll: false,
    });
  }, [filters, sort, q, loc, router]);

  const results = useMemo(() => {
    let list: Creator[] = ALL_CREATORS.filter((c) => {
      if (filters.cat && !c.categories.includes(filters.cat as Creator["categories"][number]))
        return false;
      if (filters.hood && c.location.neighborhood !== filters.hood) return false;
      if (c.startingPrice > filters.priceMax) return false;
      if (filters.minRating && c.ratingAvg < filters.minRating) return false;
      if (filters.verifiedOnly && !c.verified) return false;
      if (filters.availableOnly && !/this (month|week)/i.test(c.availabilityLabel))
        return false;
      if (q) {
        const hay = `${c.name} ${c.headline} ${c.categories.join(" ")} ${c.location.neighborhood}`.toLowerCase();
        // loose match: any query word appears
        const words = q.toLowerCase().split(/\s+/).filter(Boolean);
        if (!words.some((w) => hay.includes(w))) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "rating") return b.ratingAvg - a.ratingAvg || b.ratingCount - a.ratingCount;
      if (sort === "price-asc") return a.startingPrice - b.startingPrice;
      if (sort === "soonest")
        return availabilityRank(a.availabilityLabel) - availabilityRank(b.availabilityLabel);
      // recommended: verified first, then rating, then projects
      return (
        Number(b.verified) - Number(a.verified) ||
        b.ratingAvg - a.ratingAvg ||
        b.projectsCompleted - a.projectsCompleted
      );
    });

    return list;
  }, [filters, sort, q]);

  const clearAll = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSort("recommended");
  }, []);

  const count = activeFilterCount(filters);
  const catLabel = filters.cat ? categoryBySlug(filters.cat)?.label : null;
  const heading = q
    ? `${results.length} creator${results.length === 1 ? "" : "s"} for “${q}” in ${loc}`
    : catLabel
      ? `${results.length} ${catLabel} creator${results.length === 1 ? "" : "s"} in ${loc}`
      : `${results.length} creator${results.length === 1 ? "" : "s"} in ${loc}`;

  return (
    <PageShell>
      <div className="container-editorial">
        <header className="flex flex-col gap-3 border-b border-border pb-5">
          <h1 className="text-h1 text-ink" aria-live="polite">
            {heading}
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 md:hidden">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSheetOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
                Filters
                {count > 0 && (
                  <span className="ml-1 rounded-full bg-brand-600 px-1.5 text-xs text-white text-num">
                    {count}
                  </span>
                )}
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setMapOpen(true)}>
                <MapIcon className="h-4 w-4" aria-hidden="true" />
                Map
              </Button>
            </div>

            <label htmlFor="sort" className="ml-auto text-sm text-ink-muted">
              Sort
            </label>
            <select
              id="sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-9 rounded-md border border-border bg-surface px-2 text-sm text-ink outline-none focus-visible:border-brand-600 focus-visible:ring-2 focus-visible:ring-[var(--focus)]/30"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr] xl:grid-cols-[240px_1fr_360px]">
          {/* Desktop filter rail */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-h3 text-ink">Filters</h2>
                {count > 0 && (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="text-sm text-brand-700 hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <Filters value={filters} onChange={setFilters} />
            </div>
          </aside>

          {/* Results */}
          <div>
            {results.length === 0 ? (
              <EmptyState
                title="No creators match all of these"
                suggestions={[
                  "Try widening your price range",
                  "Remove the neighborhood filter",
                  "Lower the minimum rating",
                ]}
                action={
                  <Button variant="secondary" onClick={clearAll}>
                    Clear all filters
                  </Button>
                }
              />
            ) : (
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {results.map((c) => (
                  <li key={c.slug} id={`creator-${c.slug}`} className="scroll-mt-24">
                    <CreatorCard
                      creator={c}
                      className="h-full"
                      active={activeSlug === c.slug}
                      onMouseEnter={() => setActiveSlug(c.slug)}
                      onMouseLeave={() => setActiveSlug(null)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Desktop persistent map */}
          <aside className="hidden xl:block">
            <div className="sticky top-24">
              <DiscoveryMap
                creators={results}
                activeSlug={activeSlug}
                onHover={setActiveSlug}
                onSelect={(slug) => {
                  setActiveSlug(slug);
                  document
                    .getElementById(`creator-${slug}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="h-[calc(100vh-8rem)]"
              />
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile filter sheet */}
      <Dialog open={sheetOpen} onOpenChange={setSheetOpen}>
        <DialogContent variant="bottom">
          <DialogHeader>
            <DialogTitle>Filters</DialogTitle>
          </DialogHeader>
          <Filters value={filters} onChange={setFilters} />
          <div className="sticky bottom-0 mt-5 flex gap-2 bg-surface pt-3">
            <Button variant="secondary" block onClick={clearAll}>
              Clear all
            </Button>
            <Button block onClick={() => setSheetOpen(false)}>
              Show {results.length} result{results.length === 1 ? "" : "s"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile full-screen map */}
      <Dialog open={mapOpen} onOpenChange={setMapOpen}>
        <DialogContent variant="bottom" className="h-[80vh]" showClose={false}>
          <div className="mb-3 flex items-center justify-between">
            <DialogTitle>Creators near {loc}</DialogTitle>
            <button
              type="button"
              onClick={() => setMapOpen(false)}
              aria-label="Close map"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink-muted hover:bg-surface-sunken"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <DiscoveryMap
            creators={results}
            activeSlug={activeSlug}
            onHover={setActiveSlug}
            onSelect={(slug) => {
              setActiveSlug(slug);
              setMapOpen(false);
              document
                .getElementById(`creator-${slug}`)
                ?.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className={cn("h-[calc(80vh-4rem)]")}
          />
        </DialogContent>
      </Dialog>
    </PageShell>
  );
}
