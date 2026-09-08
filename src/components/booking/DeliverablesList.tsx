import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { AddOn } from "@/data/types";
import { dateLong } from "@/lib/format";

/** Read-out of what's included, derived from the package + add-ons. */
export function DeliverablesList({
  includes,
  addOns,
  deliveryDate,
  className,
}: {
  includes: string[];
  addOns: AddOn[];
  deliveryDate: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <ul className="space-y-2">
        {includes.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-ink">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-verified" aria-hidden="true" />
            {item}
          </li>
        ))}
        {addOns.map((a) => (
          <li key={a.id} className="flex items-start gap-2 text-sm text-ink">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-verified" aria-hidden="true" />
            {a.label}
          </li>
        ))}
      </ul>
      <p className="rounded-md bg-surface-sunken px-3 py-2 text-sm text-ink-muted">
        Estimated delivery:{" "}
        <span className="font-medium text-ink">{dateLong(deliveryDate)}</span>
      </p>
    </div>
  );
}
