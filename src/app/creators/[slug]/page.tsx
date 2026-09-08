import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { creators, creatorBySlug } from "@/data/creators";
import { CreatorProfileClient } from "@/components/creator/CreatorProfileClient";

export function generateStaticParams() {
  return creators.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const creator = creatorBySlug(params.slug);
  if (!creator) return { title: "Creator not found" };
  return {
    title: `${creator.name} — ${creator.headline}`,
    description: creator.bio,
  };
}

export default function CreatorPage({ params }: { params: { slug: string } }) {
  const creator = creatorBySlug(params.slug);
  if (!creator) notFound();
  return <CreatorProfileClient creator={creator} />;
}
