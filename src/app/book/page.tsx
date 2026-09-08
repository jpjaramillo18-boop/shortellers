import { Suspense } from "react";
import type { Metadata } from "next";
import { BookingClient } from "@/components/booking/BookingClient";

export const metadata: Metadata = {
  title: "Book a shoot",
  description: "Choose a package, date and location, share a brief, and confirm.",
};

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="container-editorial py-16 text-ink-muted">Loading booking…</div>
      }
    >
      <BookingClient />
    </Suspense>
  );
}
