import { cn } from "@/lib/cn";
import type { Creator } from "@/data/types";
import { SmartImage } from "@/components/media/SmartImage";

export function DeliveryNote({
  creator,
  note,
  className,
}: {
  creator: Creator;
  note: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "flex gap-3 rounded-lg border border-border bg-paper-warm p-4",
        className,
      )}
    >
      <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-surface-sunken">
        <SmartImage src={creator.avatar} alt="" decorative seed={`avatar-${creator.slug}`} />
      </span>
      <div>
        <figcaption className="text-sm font-medium text-ink">
          Note from {creator.name.split(" ")[0]}
        </figcaption>
        <blockquote className="mt-1 text-sm leading-relaxed text-ink">
          {note}
        </blockquote>
      </div>
    </figure>
  );
}
