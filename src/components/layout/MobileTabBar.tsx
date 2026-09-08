"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, FolderOpen, MessageSquare, UserRound } from "lucide-react";
import { cn } from "@/lib/cn";

const TABS = [
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/projects/rosewood-bakehouse", label: "Projects", icon: FolderOpen },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/account", label: "Account", icon: UserRound },
];

/** Bottom nav — mobile only, top-level destinations only. Hidden on Home. */
export function MobileTabBar() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-4">
        {TABS.map(({ href, label, icon: Icon }) => {
          const base = href.split("?")[0];
          const active = pathname === base || pathname.startsWith(`${base}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-[56px] flex-col items-center justify-center gap-1 py-2 text-[0.7rem] font-medium",
                  active ? "text-brand-700" : "text-ink-muted",
                )}
              >
                <Icon
                  className="h-5 w-5"
                  aria-hidden="true"
                  strokeWidth={active ? 2.4 : 2}
                />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
