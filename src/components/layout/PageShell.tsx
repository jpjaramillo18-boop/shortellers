import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Standard page wrapper: main landmark + room for the mobile tab bar. */
export function PageShell({
  children,
  className,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  /** apply default vertical padding (turn off for full-bleed hero pages) */
  padded?: boolean;
}) {
  return (
    <main
      id="main"
      className={cn(
        "min-h-[60vh] pb-24 md:pb-10",
        padded && "pt-6 md:pt-8",
        className,
      )}
    >
      {children}
    </main>
  );
}
