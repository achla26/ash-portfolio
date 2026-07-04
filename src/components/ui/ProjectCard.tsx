// src/components/ui/ProjectCard.tsx
"use client";

import { Project } from "@/types";
import { Chip } from "@/components/ui/Chip";
import { useTilt } from "@/hooks/useTilt";
import { getProjectType, getProjectRole } from "@/data/projects";
import { ExternalLink, GitFork } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
  showDetails?: boolean;
}

export function ProjectCard({
  project,
  index,
  showDetails = false,
}: ProjectCardProps) {
  const tiltRef = useTilt<HTMLDivElement>();
  const { type } = getProjectType(project.id);
  const role = getProjectRole(project.category);

  return (
    <div
      ref={tiltRef}
      data-tilt
      className="bg-card backdrop-blur-[12px] border border-line-strong rounded-[14px] p-6 transition-all duration-300 ease-out hover:border-amber hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.6)] will-change-transform flex flex-col h-full"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Top row: number + category */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-mono text-slate text-[0.75rem]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono text-[0.65rem] text-amber bg-amber/10 border border-amber/20 px-2 py-[2px] rounded-full">
          {project.category}
        </span>
      </div>

      {/* Title */}
      <h4 className="font-display text-[1.15rem] font-semibold m-0 mb-2">
        {project.title}
      </h4>

      {/* Role + Type */}
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[0.68rem] text-paper-dim">{role}</span>
        <span className="text-line-strong">·</span>
        <span className="font-mono text-[0.68rem] text-paper-dim">{type}</span>
        <span className="text-line-strong">·</span>
        <span className="font-mono text-[0.68rem] text-paper-dim">
          {project.year}
        </span>
      </div>

      {/* Description */}
      <p className="text-paper-dim text-[0.88rem] m-0 mb-4 leading-[1.6] flex-1">
        {showDetails
          ? project.description
          : project.description.length > 120
          ? project.description.slice(0, 120) + "..."
          : project.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-[6px] mb-4">
        {project.techStack.slice(0, showDetails ? undefined : 4).map((tech) => (
          <Chip key={tech} variant="tag">
            {tech}
          </Chip>
        ))}
        {!showDetails && project.techStack.length > 4 && (
          <span className="font-mono text-[0.68rem] text-slate self-center">
            +{project.techStack.length - 4}
          </span>
        )}
      </div>

      {/* Links */}
      <div className="flex gap-3 mt-auto pt-2">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.74rem] no-underline text-paper inline-flex items-center gap-[6px] border-b border-line-strong pb-[2px] hover:text-amber hover:border-amber transition-colors"
          >
            <GitFork size={13} />
            Source
          </a>
        )}
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.74rem] no-underline text-paper inline-flex items-center gap-[6px] border-b border-line-strong pb-[2px] hover:text-amber hover:border-amber transition-colors"
          >
            <ExternalLink size={13} />
            Live
          </a>
        )}
      </div>
    </div>
  );
}