"use client";

import Link from "next/link";
import { useToast } from "@/components/ui/Toast";
import { useDemo } from "@/lib/demo-store";
import { Wordmark } from "./Wordmark";

const COLS: { title: string; links: string[] }[] = [
  { title: "For businesses", links: ["Browse creators", "How it works", "Pricing", "Trust & safety"] },
  { title: "For creators", links: ["Become a creator", "Creator handbook", "Payouts", "Community"] },
  { title: "Company", links: ["About", "Careers", "Press", "Contact"] },
];

export function Footer() {
  const { toast } = useToast();
  const { resetDemo } = useDemo();

  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="container-editorial grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-xs">
          <Wordmark />
          <p className="mt-3 text-sm text-ink-muted">
            A marketplace for local content. Find the right local creator for the
            work you actually need.
          </p>
        </div>

        {COLS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-eyebrow">{col.title}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l}>
                  <button
                    type="button"
                    onClick={() => toast("Marketing pages are out of scope for this demo.", "info")}
                    className="text-ink-muted hover:text-ink hover:underline"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-editorial flex flex-col items-start justify-between gap-3 py-5 text-xs text-ink-muted sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Shortellers · Demo build · Portland, OR</p>
          <div className="flex items-center gap-4">
            <Link href="/discover" className="hover:text-ink hover:underline">
              Start the demo
            </Link>
            <button
              type="button"
              onClick={() => {
                resetDemo();
                toast("Demo reset to the start of the story.");
              }}
              className="hover:text-ink hover:underline"
            >
              Reset demo
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
