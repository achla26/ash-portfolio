"use client";

import { useRef } from "react";
import { Project } from "@/types";
import { Chip } from "@/components/ui/Chip"; 
import { getProjectType, getProjectRole } from "@/data/projects";
import { ExternalLink, GitFork } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsFinePointer } from "@/hooks/useIsFinePointer";

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
  const { type } = getProjectType(project.id);
  const role = getProjectRole(project.category);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const fine = useIsFinePointer();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!fine || reduced) return;

    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Move glow to cursor position
    glow.style.opacity = "1";
    glow.style.background = `radial-gradient(
      300px circle at ${x}px ${y}px,
      rgba(212,162,76, 0.08),
      transparent 60%
    )`;
  };

  const handleMouseLeave = () => {
    if (!glowRef.current) return;
    glowRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-card backdrop-blur-[12px] border border-line-strong rounded-[14px] p-6 transition-all duration-300 ease-out hover:border-amber/50 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] flex flex-col h-full group overflow-hidden"
    >
      {/* Cursor-following glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 z-0 opacity-0 transition-opacity duration-300 pointer-events-none rounded-[14px]"
      />

      {/* Hover border shine */}
      <div className="absolute inset-0 z-0 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
        <div
          className="absolute -inset-[1px] rounded-[14px]"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, transparent 0%, rgba(212,162,76,0.1) 25%, transparent 50%, rgba(155,122,140,0.08) 75%, transparent 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Top row */}
        <div className="flex items-center justify-between mb-4">
          <span className="font-mono text-slate text-[0.75rem]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-mono text-[0.65rem] text-amber bg-amber/10 border border-amber/20 px-2 py-[2px] rounded-full">
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-display text-[1.15rem] font-semibold m-0 mb-2 group-hover:text-amber-soft transition-colors duration-300">
          {project.title}
        </h4>

        {/* Role + Type */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[0.68rem] text-paper-dim">
            {role}
          </span>
          <span className="text-line-strong">·</span>
          <span className="font-mono text-[0.68rem] text-paper-dim">
            {type}
          </span>
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
          {project.techStack
            .slice(0, showDetails ? undefined : 4)
            .map((tech) => (
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
              className="font-mono text-[0.74rem] no-underline text-paper inline-flex items-center gap-[6px] border-b border-transparent pb-[2px] hover:text-amber hover:border-amber transition-colors group/link"
            >
              <GitFork
                size={13}
                className="transition-transform duration-200 group-hover/link:-translate-y-[1px]"
              />
              Source
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.74rem] no-underline text-paper inline-flex items-center gap-[6px] border-b border-transparent pb-[2px] hover:text-amber hover:border-amber transition-colors group/link"
            >
              <ExternalLink
                size={13}
                className="transition-transform duration-200 group-hover/link:-translate-y-[1px]"
              />
              Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}