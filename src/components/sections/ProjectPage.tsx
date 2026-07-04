// src/components/sections/ProjectsPage.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { KineticText } from "@/components/effects/KineticText";
import {
  allProjects,
  getCategories,
  getProjectsByCategory,
  projectMetrics,
  projectInsights,
} from "@/data/projects";
import { ArrowLeft, Layers, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/types";

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = getCategories();
  const filteredProjects = getProjectsByCategory(activeCategory);

  // Count per category
  const getCategoryCount = (cat: string) => {
    if (cat === "All") return allProjects.length;
    return allProjects.filter((p) => p.category === cat).length;
  };

  return (
    <Section className="pt-12">
      <Container>
        {/* Back link */}
        <ScrollReveal>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[0.78rem] text-paper-dim no-underline hover:text-amber transition-colors mb-10 group"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to home
          </Link>
        </ScrollReveal>

        {/* Page header */}
        <ScrollReveal>
          <div className="mb-12">
            <span className="font-mono text-[0.75rem] tracking-[0.08em] uppercase text-amber mb-3 block">
              All projects
            </span>
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold mb-4 tracking-[-0.015em] leading-[1.15]">
              <KineticText text="Everything I've built." />
            </h1>
            <p className="text-paper-dim text-[1.05rem] max-w-[56ch] leading-[1.7]">
              From data analysis and AI systems to full-stack web applications -
              a complete collection of personal and client projects.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats bar */}
        <ScrollReveal>
          <div className="flex items-center gap-6 mb-10 pb-6 border-b border-line flex-wrap">
            <div className="flex items-center gap-2">
              <FolderOpen size={16} className="text-amber" />
              <span className="font-mono text-[0.8rem] text-paper">
                {allProjects.length} projects
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-mauve" />
              <span className="font-mono text-[0.8rem] text-paper">
                {categories.length - 1} categories
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-[6px] h-[6px] rounded-full bg-signal" />
              <span className="font-mono text-[0.8rem] text-paper">
                {allProjects.filter((p) => p.featured).length} featured
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Category filters */}
        <ScrollReveal>
          <div className="flex gap-2 flex-wrap mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "font-mono text-[0.75rem] px-4 py-[8px] rounded-lg border transition-all duration-200",
                  activeCategory === cat
                    ? "bg-amber text-ink border-amber font-semibold"
                    : "bg-transparent text-paper-dim border-line-strong hover:border-amber/50 hover:text-paper"
                )}
              >
                {cat}
                <span
                  className={cn(
                    "ml-2 text-[0.65rem]",
                    activeCategory === cat ? "text-ink/60" : "text-slate"
                  )}
                >
                  {getCategoryCount(cat)}
                </span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-3 gap-[22px] max-lg:grid-cols-2 max-sm:grid-cols-1"
          >
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
              >
                <ProjectCard
                  project={project}
                  index={i}
                  showDetails
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="font-mono text-slate text-[0.9rem]">
              No projects in this category yet.
            </p>
          </div>
        )}

        {/* Featured project details (expandable) */}
        {activeCategory !== "Web Development" && (
          <ScrollReveal>
            <div className="mt-16">
              <h3 className="font-mono text-[0.75rem] tracking-[0.08em] uppercase text-amber mb-6">
                Featured project details
              </h3>
              <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
                {filteredProjects
                  .filter((p) => p.featured && projectInsights[p.id])
                  .map((project) => (
                    <InsightCard
                      key={project.id}
                      project={project}
                    />
                  ))}
              </div>
            </div>
          </ScrollReveal>
        )}
      </Container>
    </Section>
  );
}

// --- Insight Card ---
function InsightCard({ project }: { project: Project }) {
  const insights = projectInsights[project.id];
  const metrics = projectMetrics[project.id];

  if (!insights) return null;

  return (
    <div className="bg-card backdrop-blur-[14px] border border-line-strong rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h4 className="font-display text-[1.05rem] font-semibold m-0">
          {project.title}
        </h4>
        <span className="font-mono text-[0.65rem] text-amber bg-amber/10 border border-amber/20 px-2 py-[2px] rounded-full">
          {project.category}
        </span>
      </div>

      {/* Metrics row */}
      {metrics && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bg-ink-3 rounded-lg p-3 text-center"
            >
              <b className="block font-display text-[1.1rem] font-bold text-amber-soft">
                {m.value}
              </b>
              <span className="font-mono text-[0.65rem] text-paper-dim">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Insights */}
      <h5 className="font-mono text-[0.68rem] uppercase tracking-[0.06em] text-signal m-0 mb-3">
        {insights.title}
      </h5>
      <ul className="list-none m-0 p-0 flex flex-col gap-[6px]">
        {insights.items.map((item, i) => (
          <li
            key={i}
            className="text-[0.8rem] text-paper-dim flex gap-2 leading-[1.5] before:content-['→'] before:text-amber before:flex-shrink-0 before:text-[0.75rem]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}