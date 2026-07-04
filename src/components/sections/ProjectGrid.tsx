"use client";

import { Container } from "@/components/layout/Container";
import { Chip } from "@/components/ui/Chip";
import {
  StaggerReveal,
  StaggerItem,
} from "@/components/effects/StaggerReveal";
import { useTilt } from "@/hooks/useTilt";
import { projects } from "@/data/projects";
import { Project } from "@/types";

function ProjectCard({ project }: { project: Project }) {
  const tiltRef = useTilt<HTMLDivElement>();

  return (
    <div
      ref={tiltRef}
      data-tilt
      className="bg-card backdrop-blur-[12px] border border-line-strong rounded-[14px] p-[26px] transition-all duration-300 ease-out hover:border-amber hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.6)] will-change-transform"
      style={{ transformStyle: "preserve3d" }}
    >
      <span className="font-mono text-slate text-[0.8rem] mb-4 block">
        {project.number}
      </span>
      <h4 className="font-display text-[1.2rem] font-semibold m-0 mb-[10px]">
        {project.title}
      </h4>
      <p className="text-paper-dim text-[0.9rem] m-0 mb-[18px]">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-[7px] mb-4">
        {project.tags.map((tag) => (
          <Chip key={tag} variant="tag">
            {tag}
          </Chip>
        ))}
      </div>
      <a
        href={project.linkHref}
        className="font-mono text-[0.76rem] no-underline text-paper border-b border-line-strong pb-[2px] hover:text-amber hover:border-amber transition-colors"
      >
        {project.linkLabel}
      </a>
    </div>
  );
}

export function ProjectGrid() {
  return (
    <Container className="mt-[26px]">
      <StaggerReveal className="grid grid-cols-3 gap-[22px] max-lg:grid-cols-2 max-sm:grid-cols-1">
        {projects.map((project) => (
          <StaggerItem key={project.number}>
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerReveal>
    </Container>
  );
}