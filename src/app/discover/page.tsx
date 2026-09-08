import { Suspense } from "react";
import type { Metadata } from "next";
import { DiscoverClient } from "@/components/discover/DiscoverClient";

export const metadata: Metadata = {
  title: "Discover creators",
  description:
    "Browse local photographers and videographers. Filter by category, neighborhood, price, rating and availability.",
};

export default function DiscoverPage() {
  return (
    <Suspense fallback={<div className="container-editorial py-16 text-ink-muted">Loading creators…</div>}>
      <DiscoverClient />
    </Suspense>
  );
}
