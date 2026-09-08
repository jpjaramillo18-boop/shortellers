import { BadgeCheck } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Green + icon + the word "Verified". Trust signal — colour is never the
 * only carrier of meaning.
 */
export function VerificationBadge({
  size = "sm",
  withLabel = true,
  className,
}: {
  size?: "sm" | "md";
  withLabel?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-verified-100 font-medium text-verified",
        size === "md" ? "px-2.5 py-1 text-sm" : "px-2 py-0.5 text-xs",
        className,
      )}
      title="ID and portfolio checked by Shortellers"
    >
      <BadgeCheck
        className={size === "md" ? "h-4 w-4" : "h-3.5 w-3.5"}
        aria-hidden="true"
      />
      {withLabel ? "Verified" : <span className="sr-only">Verified creator</span>}
    </span>
  );
}
