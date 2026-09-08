"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

const SUGGESTIONS = [
  "Food photography",
  "Interior photos",
  "Product video",
  "Menu shoot",
  "Event coverage",
  "Brand story",
];

export function HeroSearch() {
  const router = useRouter();
  const [need, setNeed] = useState("Food photography");
  const [where, setWhere] = useState("Portland, OR");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (need.trim()) params.set("q", need.trim());
    if (where.trim()) params.set("loc", where.trim());
    router.push(`/discover?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      role="search"
      className="rounded-xl border border-border bg-surface p-3 shadow-elev-2"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-surface-sunken px-3">
          <Search className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
          <label htmlFor="hero-need" className="sr-only">
            What do you need?
          </label>
          <input
            id="hero-need"
            list="hero-need-options"
            value={need}
            onChange={(e) => setNeed(e.target.value)}
            placeholder="What do you need?"
            className="h-12 w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
          />
          <datalist id="hero-need-options">
            {SUGGESTIONS.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </div>

        <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-surface-sunken px-3 sm:max-w-[38%]">
          <MapPin className="h-4 w-4 shrink-0 text-info" aria-hidden="true" />
          <label htmlFor="hero-where" className="sr-only">
            Where?
          </label>
          <input
            id="hero-where"
            value={where}
            onChange={(e) => setWhere(e.target.value)}
            placeholder="Where?"
            className="h-12 w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
          />
        </div>

        <Button type="submit" size="lg" className="sm:h-auto sm:px-8">
          Search
        </Button>
      </div>
    </form>
  );
}
