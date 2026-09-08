"use client";

import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { parseISODate, toISODate } from "@/lib/format";

/**
 * Small month calendar (demo scope: Oct–Nov 2025). Unavailable days are
 * greyed and non-selectable; arrow keys move focus within the grid.
 * Dates are illustrative for the demo narrative.
 */

const MONTHS = [
  { year: 2025, month: 9, label: "October 2025" }, // month is 0-indexed
  { year: 2025, month: 10, label: "November 2025" },
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// A few blocked days per month for realism.
const BLOCKED = new Set(["2025-10-10", "2025-10-20", "2025-10-24", "2025-11-11"]);

function isAvailable(iso: string): boolean {
  const d = parseISODate(iso);
  const day = d.getDay(); // 0 Sun .. 6 Sat
  if (day === 0) return false; // no Sundays
  if (BLOCKED.has(iso)) return false;
  // October: available from the 6th; November: whole month
  if (d.getMonth() === 9 && d.getDate() < 6) return false;
  return true;
}

export function DatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (iso: string) => void;
}) {
  const selected = parseISODate(value);
  const initialMonthIdx = MONTHS.findIndex(
    (m) => m.year === selected.getFullYear() && m.month === selected.getMonth(),
  );
  const [monthIdx, setMonthIdx] = useState(initialMonthIdx >= 0 ? initialMonthIdx : 0);
  const gridRef = useRef<HTMLDivElement>(null);

  const view = MONTHS[monthIdx];

  const cells = useMemo(() => {
    const first = new Date(view.year, view.month, 1);
    const startPad = first.getDay();
    const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
    const out: (string | null)[] = [];
    for (let i = 0; i < startPad; i++) out.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      out.push(toISODate(new Date(view.year, view.month, d)));
    }
    return out;
  }, [view]);

  // The single tab-stop in the grid: the selected day if visible, else the
  // first available day of the shown month.
  const rovingIso = useMemo(() => {
    if (cells.includes(value)) return value;
    return cells.find((c) => c && isAvailable(c)) ?? null;
  }, [cells, value]);

  const focusDay = (iso: string) => {
    const el = gridRef.current?.querySelector<HTMLButtonElement>(
      `button[data-iso="${iso}"]`,
    );
    el?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, iso: string) => {
    const d = parseISODate(iso);
    let delta = 0;
    if (e.key === "ArrowRight") delta = 1;
    else if (e.key === "ArrowLeft") delta = -1;
    else if (e.key === "ArrowDown") delta = 7;
    else if (e.key === "ArrowUp") delta = -7;
    else return;
    e.preventDefault();
    const next = new Date(d);
    next.setDate(d.getDate() + delta);
    if (next.getMonth() === view.month && next.getFullYear() === view.year) {
      focusDay(toISODate(next));
    }
  };

  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMonthIdx((i) => Math.max(0, i - 1))}
          disabled={monthIdx === 0}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink hover:bg-surface-sunken disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <p className="text-sm font-medium text-ink" aria-live="polite">
          {view.label}
        </p>
        <button
          type="button"
          onClick={() => setMonthIdx((i) => Math.min(MONTHS.length - 1, i + 1))}
          disabled={monthIdx === MONTHS.length - 1}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-ink hover:bg-surface-sunken disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-1 text-eyebrow">
            {w}
          </div>
        ))}
      </div>

      <div ref={gridRef} role="grid" aria-label={view.label} className="grid grid-cols-7 gap-1">
        {cells.map((iso, i) => {
          if (!iso) return <div key={`pad-${i}`} role="presentation" />;
          const d = parseISODate(iso);
          const available = isAvailable(iso);
          const isSelected = iso === value;
          return (
            <button
              key={iso}
              type="button"
              role="gridcell"
              data-iso={iso}
              aria-selected={isSelected}
              aria-disabled={!available || undefined}
              aria-label={new Intl.DateTimeFormat("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              }).format(d)}
              tabIndex={iso === rovingIso ? 0 : -1}
              onKeyDown={(e) => {
                onKeyDown(e, iso);
                if ((e.key === "Enter" || e.key === " ") && available) {
                  e.preventDefault();
                  onChange(iso);
                }
              }}
              onClick={() => available && onChange(iso)}
              className={cn(
                "flex h-10 items-center justify-center rounded-md text-sm text-num transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]",
                isSelected && "bg-brand-600 font-semibold text-white",
                !isSelected && available && "text-ink hover:bg-surface-sunken",
                !available && "cursor-not-allowed text-ink-muted/40 line-through",
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>

      <p className="mt-2 text-xs text-ink-muted">
        Greyed dates are unavailable. Lena confirms within {""}
        <span className="text-num">~2h</span>.
      </p>
    </div>
  );
}
