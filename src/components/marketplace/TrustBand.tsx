import { BadgeCheck, MapPin, ShieldCheck, Star } from "lucide-react";
import { cn } from "@/lib/cn";

const ITEMS = [
  {
    icon: BadgeCheck,
    label: "Every creator ID-verified",
  },
  {
    icon: ShieldCheck,
    label: "Payments held until you approve",
  },
  {
    icon: Star,
    label: "Reviews from real local businesses",
  },
  {
    icon: MapPin,
    label: "Creators in your neighborhood",
  },
];

export function TrustBand({ className }: { className?: string }) {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {ITEMS.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="flex items-center gap-3 bg-surface px-4 py-4 text-sm"
        >
          <Icon className="h-5 w-5 shrink-0 text-brand-700" aria-hidden="true" />
          <span className="text-ink">{label}</span>
        </li>
      ))}
    </ul>
  );
}
