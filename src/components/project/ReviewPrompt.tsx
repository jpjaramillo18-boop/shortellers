"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useDemo } from "@/lib/demo-store";
import { ReviewCard } from "@/components/marketplace/ReviewCard";
import { business } from "@/data/business";
import { AVATARS } from "@/data/images";

/** Appears after approval. Once submitted, shows the review as it would look. */
export function ReviewPrompt({ creatorName }: { creatorName: string }) {
  const { review, submitReview } = useDemo();
  const { toast } = useToast();
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");

  if (review) {
    return (
      <div className="card-editorial p-5">
        <p className="text-eyebrow mb-3">Your review</p>
        <ReviewCard
          avatarSrc={AVATARS.marisol}
          review={{
            id: "demo-review",
            reviewerName: business.contactName,
            reviewerBusiness: business.name,
            date: new Date().toISOString().slice(0, 10),
            rating: review.rating,
            text: review.text,
            projectType: "Signature Menu Shoot",
          }}
        />
      </div>
    );
  }

  return (
    <div className="card-editorial animate-reveal-up p-5">
      <h2 className="text-h3 text-ink">How was working with {creatorName}?</h2>
      <p className="mt-1 text-sm text-ink-muted">
        Your review helps other local businesses book with confidence.
      </p>

      <div className="mt-4 flex items-center gap-1" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={rating === n}
            aria-label={`${n} star${n > 1 ? "s" : ""}`}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(n)}
            className="rounded p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
          >
            <Star
              className={cn(
                "h-7 w-7",
                n <= (hover || rating)
                  ? "fill-rating-star text-rating-star"
                  : "fill-surface-sunken text-border",
              )}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>

      <label htmlFor="review-text" className="mt-4 block text-sm font-medium text-ink">
        Your review
      </label>
      <textarea
        id="review-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        placeholder="What stood out about the shoot and the delivery?"
        className="mt-1.5 w-full rounded-md border border-border bg-surface px-3 py-2.5 text-sm text-ink outline-none placeholder:text-ink-muted focus-visible:border-brand-600 focus-visible:ring-2 focus-visible:ring-[var(--focus)]/30"
      />

      <div className="mt-4">
        <Button
          disabled={text.trim().length === 0}
          onClick={() => {
            submitReview({ rating, text: text.trim() });
            toast("Review posted. Thanks for supporting local creators.");
          }}
        >
          Post review
        </Button>
      </div>
    </div>
  );
}
