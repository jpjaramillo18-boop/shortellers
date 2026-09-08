"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronDown, MessageSquare, Search } from "lucide-react";
import { cn } from "@/lib/cn";
import { useToast } from "@/components/ui/Toast";
import { useDemo } from "@/lib/demo-store";
import { business } from "@/data/business";
import { SmartImage } from "@/components/media/SmartImage";
import { Wordmark } from "./Wordmark";

const NAV = [
  { href: "/discover", label: "Browse creators" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/projects/rosewood-bakehouse", label: "Projects" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const isHome = pathname === "/";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface">
      <div className="container-editorial flex h-16 items-center gap-3">
        <Wordmark />

        {/* Desktop centre search — hidden on Home where the hero owns search */}
        {!isHome && (
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              const q = new FormData(e.currentTarget).get("q");
              router.push(q ? `/discover?q=${encodeURIComponent(String(q))}` : "/discover");
            }}
            className="mx-auto hidden max-w-md flex-1 items-center gap-2 rounded-md border border-border bg-surface-sunken px-3 lg:flex"
          >
            <Search className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
            <label htmlFor="header-search" className="sr-only">
              Search creators, categories, neighborhoods
            </label>
            <input
              id="header-search"
              name="q"
              type="search"
              placeholder="Search creators, categories, neighborhoods"
              className="h-10 w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
            />
          </form>
        )}

        <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active =
              item.href.startsWith("/") &&
              !item.href.includes("#") &&
              pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-surface-sunken",
                  active ? "text-brand-700" : "text-ink",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => toast("Messaging is a demo stub.", "info")}
            className="relative ml-1 inline-flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-surface-sunken focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
            aria-label="Messages (1 unread)"
          >
            <MessageSquare className="h-5 w-5" aria-hidden="true" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand-600" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => toast("Notifications are a demo stub.", "info")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-surface-sunken focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
          </button>

          <AccountMenu />
        </nav>

        {/* Mobile: search + avatar */}
        <div className="ml-auto flex items-center gap-1 md:hidden">
          <Link
            href="/discover"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink hover:bg-surface-sunken focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
            aria-label="Search creators"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </Link>
          <AccountMenu compact />
        </div>
      </div>
    </header>
  );
}

function AccountMenu({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const { resetDemo } = useDemo();
  const { toast } = useToast();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-md p-1 hover:bg-surface-sunken focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
      >
        <span className="relative h-8 w-8 overflow-hidden rounded-full border border-border bg-surface-sunken">
          <SmartImage src={business.avatar} alt="" decorative seed="rosewood" />
        </span>
        {!compact && (
          <>
            <span className="hidden text-sm font-medium text-ink lg:inline">
              {business.name}
            </span>
            <ChevronDown className="h-4 w-4 text-ink-muted" aria-hidden="true" />
          </>
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-md border border-border bg-surface py-1 shadow-elev-3"
        >
          <p className="px-3 py-2 text-xs text-ink-muted">
            Signed in as
            <br />
            <span className="font-medium text-ink">{business.name}</span>
          </p>
          <div className="my-1 border-t border-border" />
          <Link
            href="/projects/rosewood-bakehouse"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-3 py-2 text-sm text-ink hover:bg-surface-sunken"
          >
            My project
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              resetDemo();
              setOpen(false);
              toast("Demo reset to the start of the story.");
            }}
            className="block w-full px-3 py-2 text-left text-sm text-ink hover:bg-surface-sunken"
          >
            Reset demo
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              toast("Sign out is a demo stub.", "info");
            }}
            className="block w-full px-3 py-2 text-left text-sm text-ink-muted hover:bg-surface-sunken"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
