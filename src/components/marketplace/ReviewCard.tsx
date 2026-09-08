import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Review } from "@/data/types";
import { dateShort } from "@/lib/format";
import { SmartImage } from "@/components/media/SmartImage";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={cn(
            "h-3.5 w-3.5",
            n <= rating
              ? "fill-rating-star text-rating-star"
              : "fill-surface-sunken text-border",
          )}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export function ReviewCard({
  review,
  avatarSrc,
  className,
}: {
  review: Review;
  avatarSrc?: string;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "flex flex-col gap-3 rounded-lg border border-border bg-surface p-4",
        className,
      )}
    >
      <header className="flex items-start gap-3">
        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-surface-sunken">
          <SmartImage
            src={avatarSrc ?? ""}
            alt=""
            decorative
            seed={`reviewer-${review.id}`}
          />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-ink">{review.reviewerName}</p>
          <p className="text-sm text-ink-muted">{review.reviewerBusiness}</p>
        </div>
        <time className="shrink-0 text-num text-xs text-ink-muted" dateTime={review.date}>
          {dateShort(review.date)}
        </time>
      </header>

      <div className="flex items-center gap-2">
        <Stars rating={review.rating} />
        <span className="text-xs text-ink-muted">{review.projectType}</span>
      </div>

      <p className="text-sm leading-relaxed text-ink">{review.text}</p>

      {review.photo && (
        <div className="mt-1 overflow-hidden rounded-md border border-border">
          <div className="aspect-[3/2]">
            <SmartImage
              src={review.photo}
              alt={`Photo shared by ${review.reviewerName} from their project`}
              seed={`review-photo-${review.id}`}
            />
          </div>
        </div>
      )}
    </article>
  );
}
