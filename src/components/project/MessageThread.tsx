"use client";

import { Send } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Creator } from "@/data/types";
import { useToast } from "@/components/ui/Toast";
import { SmartImage } from "@/components/media/SmartImage";

const THREAD = [
  { from: "creator" as const, text: "Gallery's up! Let me know if you want any tweaks on the latte shots.", time: "Oct 22, 9:04 AM" },
  { from: "business" as const, text: "Looks amazing — going through them now. Thank you!", time: "Oct 22, 10:12 AM" },
];

/** Read-only messaging stub, scoped to the project. */
export function MessageThread({ creator }: { creator: Creator }) {
  const { toast } = useToast();

  return (
    <div className="card-editorial flex flex-col">
      <div className="border-b border-border px-4 py-3">
        <p className="text-eyebrow">Messages</p>
      </div>
      <ol className="flex flex-col gap-3 p-4">
        {THREAD.map((m, i) => (
          <li
            key={i}
            className={cn(
              "flex max-w-[85%] gap-2",
              m.from === "business" ? "ml-auto flex-row-reverse" : "",
            )}
          >
            {m.from === "creator" && (
              <span className="relative mt-0.5 h-7 w-7 shrink-0 overflow-hidden rounded-full border border-border bg-surface-sunken">
                <SmartImage src={creator.avatar} alt="" decorative seed={`avatar-${creator.slug}`} />
              </span>
            )}
            <div>
              <p
                className={cn(
                  "rounded-lg px-3 py-2 text-sm",
                  m.from === "business"
                    ? "bg-brand-600 text-white"
                    : "bg-surface-sunken text-ink",
                )}
              >
                {m.text}
              </p>
              <p
                className={cn(
                  "mt-1 text-num text-[0.7rem] text-ink-muted",
                  m.from === "business" && "text-right",
                )}
              >
                {m.time}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <form
        className="flex items-center gap-2 border-t border-border p-3"
        onSubmit={(e) => {
          e.preventDefault();
          toast("Messaging is a demo stub.", "info");
        }}
      >
        <label htmlFor="msg" className="sr-only">
          Message {creator.name}
        </label>
        <input
          id="msg"
          placeholder={`Message ${creator.name.split(" ")[0]}…`}
          className="h-10 flex-1 rounded-md border border-border bg-surface px-3 text-sm outline-none placeholder:text-ink-muted focus-visible:border-brand-600 focus-visible:ring-2 focus-visible:ring-[var(--focus)]/30"
        />
        <button
          type="submit"
          aria-label="Send message"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-strong text-ink hover:bg-surface-sunken focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)]"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
