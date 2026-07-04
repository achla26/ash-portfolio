// app/projects/projects-client.tsx
"use client";

import dynamic from "next/dynamic";

const ProjectsPageClient = dynamic(
  () =>
    import("@/components/sections/ProjectPage").then(
      (mod) => mod.ProjectsPage
    ),
  { ssr: false }
);

export default function ProjectsClient() {
  return <ProjectsPageClient />;
}