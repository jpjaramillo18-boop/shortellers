"use client";

import { cn } from "@/lib/cn";
import { categories } from "@/data/categories";
import { usdWhole } from "@/lib/format";
import { CategoryChip } from "@/components/marketplace/CategoryChip";

export interface FilterState {
  cat: string; // "" = all
  hood: string; // "" = any
  priceMax: number;
  minRating: number; // 0 = any
  verifiedOnly: boolean;
  availableOnly: boolean;
}

export const DEFAULT_FILTERS: FilterState = {
  cat: "",
  hood: "",
  priceMax: 1500,
  minRating: 0,
  verifiedOnly: false,
  availableOnly: false,
};

export const NEIGHBORHOODS = [
  "Alberta Arts",
  "Hawthorne",
  "Pearl District",
  "Division/Clinton",
  "St. Johns",
  "Mississippi Ave",
];

export function activeFilterCount(f: FilterState): number {
  let n = 0;
  if (f.cat) n++;
  if (f.hood) n++;
  if (f.priceMax < DEFAULT_FILTERS.priceMax) n++;
  if (f.minRating > 0) n++;
  if (f.verifiedOnly) n++;
  if (f.availableOnly) n++;
  return n;
}

export function Filters({
  value,
  onChange,
}: {
  value: FilterState;
  onChange: (next: FilterState) => void;
}) {
  const set = <K extends keyof FilterState>(key: K, v: FilterState[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <div className="flex flex-col gap-6">
      <Group label="Category">
        <div className="flex flex-wrap gap-1.5">
          <CategoryChip
            as="button"
            label="All"
            selected={value.cat === ""}
            onClick={() => set("cat", "")}
          />
          {categories.map((c) => (
            <CategoryChip
              key={c.slug}
              as="button"
              label={c.label}
              selected={value.cat === c.slug}
              onClick={() => set("cat", value.cat === c.slug ? "" : c.slug)}
            />
          ))}
        </div>
      </Group>

      <Group label="Neighborhood">
        <label htmlFor="f-hood" className="sr-only">
          Neighborhood
        </label>
        <select
          id="f-hood"
          value={value.hood}
          onChange={(e) => set("hood", e.target.value)}
          className="h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-ink outline-none focus-visible:border-brand-600 focus-visible:ring-2 focus-visible:ring-[var(--focus)]/30"
        >
          <option value="">Any neighborhood</option>
          {NEIGHBORHOODS.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
      </Group>

      <Group label={`Starting price — up to ${usdWhole(value.priceMax)}`}>
        <input
          type="range"
          min={150}
          max={1500}
          step={10}
          value={value.priceMax}
          onChange={(e) => set("priceMax", Number(e.target.value))}
          aria-label="Maximum starting price"
          className="w-full accent-[var(--brand-600)]"
        />
        <div className="flex justify-between text-xs text-ink-muted">
          <span className="text-num">$150</span>
          <span className="text-num">$1,500</span>
        </div>
      </Group>

      <Group label="Minimum rating">
        <div className="flex flex-wrap gap-1.5">
          {[
            { v: 0, label: "Any" },
            { v: 4.0, label: "4.0+" },
            { v: 4.5, label: "4.5+" },
            { v: 4.8, label: "4.8+" },
          ].map((o) => (
            <CategoryChip
              key={o.v}
              as="button"
              label={o.label}
              selected={value.minRating === o.v}
              onClick={() => set("minRating", o.v)}
            />
          ))}
        </div>
      </Group>

      <Group label="Other">
        <Toggle
          label="Verified only"
          checked={value.verifiedOnly}
          onChange={(v) => set("verifiedOnly", v)}
        />
        <Toggle
          label="Available this month"
          checked={value.availableOnly}
          onChange={(v) => set("availableOnly", v)}
        />
      </Group>
    </div>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-eyebrow">{label}</p>
      {children}
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 py-1 text-sm text-ink">
      {label}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]",
          checked ? "border-brand-600 bg-brand-600" : "border-border bg-surface-sunken",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-0.5",
          )}
          aria-hidden="true"
        />
      </button>
    </label>
  );
}
