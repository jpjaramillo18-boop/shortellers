import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { PageShell } from "./PageShell";

/** Honest placeholder for destinations kept out of the demo's scope. */
export function StubPage({
  icon: Icon,
  title,
  body,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <PageShell>
      <div className="container-editorial">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-xl border border-dashed border-border bg-surface px-6 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-sunken text-ink-muted">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="text-h2 text-ink">{title}</h1>
          <p className="text-sm text-ink-muted">{body}</p>
          <div className="mt-2 flex gap-4 text-sm font-medium text-brand-700">
            <Link href="/discover" className="hover:underline">
              Discover creators
            </Link>
            <Link href="/projects/rosewood-bakehouse" className="hover:underline">
              My project
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
