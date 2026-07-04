// app/projects/page.tsx
import type { Metadata } from "next";
import ProjectsClient from "./projects-client";

export const metadata: Metadata = {
  title: "Projects - Achla",
  description:
    "All projects by Achla - data analysis, AI/ML, data engineering, and full-stack web development.",
};

export default function ProjectsRoute() {
  return <ProjectsClient />;
}