import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { project } from "@/data/projects";
import { ProjectClient } from "@/components/project/ProjectClient";

export function generateStaticParams() {
  return [{ slug: project.slug }];
}

export const metadata: Metadata = {
  title: "Autumn Menu Shoot",
  description: "Track your project, review delivered content, and approve.",
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
  if (params.slug !== project.slug) notFound();
  return <ProjectClient />;
}
