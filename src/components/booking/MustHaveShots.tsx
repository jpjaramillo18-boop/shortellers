"use client";

import { Plus, X } from "lucide-react";
import { cn } from "@/lib/cn";

/** Repeatable single-line inputs for must-have shots. */
export function MustHaveShots({
  shots,
  onChange,
}: {
  shots: string[];
  onChange: (shots: string[]) => void;
}) {
  const setAt = (i: number, val: string) => {
    const next = [...shots];
    next[i] = val;
    onChange(next);
  };
  const removeAt = (i: number) => onChange(shots.filter((_, idx) => idx !== i));
  const add = () => onChange([...shots, ""]);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-ink">Must-have shots</span>
      <ul className="flex flex-col gap-2">
        {shots.map((shot, i) => (
          <li key={i} className="flex items-center gap-2">
            <input
              value={shot}
              onChange={(e) => setAt(i, e.target.value)}
              placeholder={`Shot ${i + 1}`}
              aria-label={`Must-have shot ${i + 1}`}
              className="h-10 w-full rounded-md border border-border bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-muted focus-visible:border-brand-600 focus-visible:ring-2 focus-visible:ring-[var(--focus)]/30"
            />
            <button
              type="button"
              onClick={() => removeAt(i)}
              disabled={shots.length <= 1}
              aria-label={`Remove must-have shot ${i + 1}`}
              className={cn(
                "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border text-ink-muted hover:bg-surface-sunken disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]",
              )}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={add}
        className="inline-flex w-fit items-center gap-1.5 rounded-md px-2 py-1.5 text-sm font-medium text-brand-700 hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        Add another shot
      </button>
    </div>
  );
}
