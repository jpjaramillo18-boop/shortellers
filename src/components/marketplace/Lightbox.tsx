"use client";

import { useCallback, useEffect } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SmartImage } from "@/components/media/SmartImage";

export interface LightboxItem {
  id: string;
  image: string;
  alt: string;
  title?: string;
  context?: string;
  type?: "photo" | "video";
  duration?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  index: number | null;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/**
 * Full-screen viewer. Radix Dialog handles focus trap + restore + Esc.
 * Arrow keys move between items; a visible counter shows position.
 */
export function Lightbox({ items, index, onIndexChange, onClose }: LightboxProps) {
  const open = index !== null;
  const current = open ? items[index] : null;

  const go = useCallback(
    (dir: -1 | 1) => {
      if (index === null) return;
      const next = (index + dir + items.length) % items.length;
      onIndexChange(next);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-[rgba(28,25,23,0.82)] data-[state=open]:animate-fade-in" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex flex-col focus:outline-none"
          aria-label="Portfolio image viewer"
        >
          {current && (
            <>
              <div className="flex items-center justify-between px-4 py-3 text-white sm:px-6">
                <span className="text-num text-sm text-white/80">
                  {(index ?? 0) + 1} / {items.length}
                </span>
                <DialogPrimitive.Close
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white/90 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label="Close viewer"
                >
                  <X className="h-6 w-6" aria-hidden="true" />
                </DialogPrimitive.Close>
              </div>

              <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 sm:px-16">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous image"
                  className="absolute left-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-4"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>

                <div className="flex max-h-full max-w-4xl flex-col items-center">
                  <div className="max-h-[70vh] w-full overflow-hidden rounded-lg">
                    <SmartImage
                      src={current.image}
                      alt={current.alt}
                      seed={`lightbox-${current.id}`}
                      priority
                      className="max-h-[70vh] w-full object-contain"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next image"
                  className="absolute right-2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-4"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="px-4 pb-6 pt-3 text-center text-white sm:px-6">
                {current.title && (
                  <p className="font-display text-lg">{current.title}</p>
                )}
                {current.context && (
                  <p className="mt-1 text-sm text-white/70">
                    {current.context}
                    {current.type === "video" && current.duration
                      ? ` · Video preview (${current.duration})`
                      : ""}
                  </p>
                )}
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
