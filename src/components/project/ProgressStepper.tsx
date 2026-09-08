import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { TimelineStep } from "@/data/types";

/**
 * Horizontal on desktop, vertical on mobile. Done = green check,
 * current = brand ring, upcoming = hairline.
 */
export function ProgressStepper({ steps }: { steps: TimelineStep[] }) {
  return (
    <>
      {/* Desktop */}
      <ol className="hidden md:flex md:items-start md:justify-between">
        {steps.map((step, i) => (
          <li
            key={step.key}
            className="relative flex flex-1 flex-col items-center text-center"
          >
            {i > 0 && (
              <span
                className={cn(
                  "absolute right-1/2 top-4 h-0.5 w-full -translate-y-1/2",
                  step.state === "upcoming" ? "bg-border" : "bg-verified",
                )}
                aria-hidden="true"
              />
            )}
            <Dot state={step.state} />
            <p
              className={cn(
                "mt-2 text-sm font-medium",
                step.state === "current" ? "text-brand-700" : "text-ink",
              )}
            >
              {step.label}
            </p>
            {step.date && (
              <p className="text-num text-xs text-ink-muted">{step.date}</p>
            )}
            <p className="mt-1 max-w-[16ch] text-xs text-ink-muted">
              {step.description}
            </p>
          </li>
        ))}
      </ol>

      {/* Mobile */}
      <ol className="flex flex-col gap-0 md:hidden">
        {steps.map((step, i) => (
          <li key={step.key} className="flex gap-3">
            <div className="flex flex-col items-center">
              <Dot state={step.state} />
              {i < steps.length - 1 && (
                <span
                  className={cn(
                    "w-0.5 flex-1",
                    step.state === "upcoming" ? "bg-border" : "bg-verified",
                  )}
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="pb-5 pt-0.5">
              <p
                className={cn(
                  "text-sm font-medium",
                  step.state === "current" ? "text-brand-700" : "text-ink",
                )}
              >
                {step.label}
                {step.date && (
                  <span className="ml-2 text-num text-xs font-normal text-ink-muted">
                    {step.date}
                  </span>
                )}
              </p>
              <p className="text-xs text-ink-muted">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

function Dot({ state }: { state: TimelineStep["state"] }) {
  return (
    <span
      className={cn(
        "relative z-[1] flex h-8 w-8 items-center justify-center rounded-full border-2 bg-surface",
        state === "done" && "border-verified bg-verified text-white",
        state === "current" && "border-brand-600 text-brand-700",
        state === "upcoming" && "border-border text-ink-muted",
      )}
    >
      {state === "done" ? (
        <Check className="h-4 w-4" aria-hidden="true" />
      ) : (
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            state === "current" ? "bg-brand-600" : "bg-border",
          )}
          aria-hidden="true"
        />
      )}
      <span className="sr-only">{state}</span>
    </span>
  );
}
