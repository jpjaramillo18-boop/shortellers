import type { ReactNode } from "react";
import { SearchX } from "lucide-react";
import { cn } from "@/lib/cn";

export function EmptyState({
  title,
  suggestions,
  action,
  className,
}: {
  title: string;
  suggestions: string[];
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-lg border border-dashed border-border bg-surface px-6 py-12 text-center",
        className,
      )}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-sunken text-ink-muted">
        <SearchX className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="text-h3 text-ink">{title}</h3>
      <ul className="mx-auto max-w-sm space-y-1 text-sm text-ink-muted">
        {suggestions.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      {action}
    </div>
  );
}
