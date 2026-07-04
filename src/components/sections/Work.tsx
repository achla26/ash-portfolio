// src/components/sections/Work.tsx
"use client";

import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import {
  StaggerReveal,
  StaggerItem,
} from "@/components/effects/StaggerReveal";
import { FeaturedProject } from "./FeaturedProject";
import { allProjects } from "@/data/projects";
import { ArrowRight } from "lucide-react";

export function Work() {
  // Show 3 cards below featured (exclude rag-handbook since it's featured)
  const homeCards = allProjects
    .filter((p) => p.id !== "rag-handbook")
    .slice(0, 3);

  return (
    <Section id="work">
      {/* Section header */}
      <Container>
        <ScrollReveal>
          <SectionHead
            tag="04 · Work"
            title="Selected projects"
            description="A mix of data analysis, AI builds, and full-stack client delivery."
          />
        </ScrollReveal>
      </Container>

      {/* Featured project — RAG pipeline style */}
      <FeaturedProject />

      {/* Project cards grid */}
      <Container className="mt-7">
        <StaggerReveal className="grid grid-cols-3 gap-[22px] max-lg:grid-cols-2 max-sm:grid-cols-1">
          {homeCards.map((project, i) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} index={i + 1} />
            </StaggerItem>
          ))}
        </StaggerReveal>

        {/* View All button */}
        <ScrollReveal>
          <div className="mt-12 flex justify-center">
            <Link
              href="/projects"
              className="group font-mono text-[0.85rem] no-underline text-paper border border-line-strong rounded-xl px-8 py-4 inline-flex items-center gap-3 hover:border-amber hover:text-amber transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(212,162,76,0.15)]"
            >
              View all {allProjects.length} projects
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}