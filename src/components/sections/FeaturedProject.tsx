// src/components/sections/FeaturedProject.tsx
"use client";

import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { GitFork } from "lucide-react";

// Pipeline step icons
function PipelineIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    upload: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3v12M7 8l5-5 5 5M5 21h14" />
      </svg>
    ),
    chunk: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="7" height="7" />
        <rect x="14" y="4" width="7" height="7" />
        <rect x="3" y="15" width="7" height="7" />
        <rect x="14" y="15" width="7" height="7" />
      </svg>
    ),
    embed: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="6" cy="6" r="2.4" />
        <circle cx="18" cy="8" r="2.4" />
        <circle cx="9" cy="18" r="2.4" />
        <path d="M8 7l8 1M8 8l1 8" />
      </svg>
    ),
    search: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    chat: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16v12H8l-4 4z" />
      </svg>
    ),
  };

  return <>{icons[type] || null}</>;
}

const pipeline = [
  { label: "Upload doc", icon: "upload" },
  { label: "Chunk text", icon: "chunk" },
  { label: "Embed vectors", icon: "embed" },
  { label: "Retrieve top-k", icon: "search" },
  { label: "Generate answer", icon: "chat" },
];

const metrics = [
  { value: "100%", label: "Test accuracy" },
  { value: "1.01s", label: "Avg latency" },
  { value: "3 Active", label: "Guardrails" },
];

const techStack = ["Python", "LangChain", "Qdrant", "FastAPI", "Streamlit", "Groq"];

export function FeaturedProject() {
  return (
    <Container>
      <ScrollReveal>
        <div className="bg-gradient-to-br from-amber/[0.06] to-card/40 border border-line-strong rounded-[18px] p-11 max-sm:p-7">
          {/* Top */}
          <div className="flex justify-between items-start gap-6 mb-7 flex-wrap">
            <div>
              <h3 className="font-display text-[1.9rem] font-bold m-0 mb-[10px]">
                AI Handbook Q&A System
              </h3>
              <p className="text-paper-dim max-w-[52ch] m-0 leading-[1.6]">
                Production-ready Q&A system using Retrieval-Augmented Generation
                (RAG). Achieved 100% accuracy on test queries with 1.01s average
                latency. Implements three guardrails: citation validation,
                hallucination detection, and confidence scoring. The live console
                above runs on the same idea.
              </p>
            </div>
            <Badge variant="amber">Featured build</Badge>
          </div>

          {/* Pipeline */}
          <div className="flex items-center gap-0 overflow-x-auto py-2 pb-[26px] mb-5">
            {pipeline.map((step, i) => (
              <div key={step.label} className="contents">
                <div className="flex-1 min-w-[118px] text-center relative px-[6px]">
                  <div className="w-12 h-12 rounded-xl bg-ink-3 border border-line-strong flex items-center justify-center mx-auto mb-[10px] text-amber">
                    <PipelineIcon type={step.icon} />
                  </div>
                  <span className="font-mono text-[0.72rem] text-paper-dim block">
                    {step.label}
                  </span>
                </div>
                {i < pipeline.length - 1 && (
                  <div className="text-slate flex-shrink-0 px-[2px] pb-[26px]">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-5 mt-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="border-t border-line pt-[14px]"
              >
                <b className="block font-display text-[1.4rem] font-bold text-amber-soft">
                  {metric.value}
                </b>
                <span className="font-mono text-[0.75rem] text-paper-dim">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>

          {/* Tech + Link row */}
          <div className="flex items-center justify-between flex-wrap gap-4 mt-8 pt-6 border-t border-line">
            <div className="flex flex-wrap gap-[6px]">
              {techStack.map((tech) => (
                <Chip key={tech} variant="tag">
                  {tech}
                </Chip>
              ))}
            </div>
            <a
              href="https://github.com/achla26/handbook-rag"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[0.78rem] no-underline text-paper inline-flex items-center gap-2 border border-line-strong rounded-lg px-4 py-2 hover:border-amber hover:text-amber transition-colors"
            >
              <GitFork size={14} />
              View source
            </a>
          </div>
        </div>
      </ScrollReveal>
    </Container>
  );
}