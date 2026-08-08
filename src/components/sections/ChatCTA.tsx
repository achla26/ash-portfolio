"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

const sampleQuestions = [
  "Tell me about your projects",
  "What's your tech stack?",
  "Why should I hire you?",
  "Are you open to remote work?",
  "Tell me about your AI experience",
];

export function ChatCTA() {
  return (
    <Section id="chat">
      <Container>
        <ScrollReveal>
          <SectionHead
            tag="03 · Live chat"
            title="Talk to an AI version of me"
            description="Instead of scrolling through my resume, have a real conversation with an AI trained on my professional background. It's built with the same RAG techniques I use in production projects."
          />

          <div className="bg-card backdrop-blur-[16px] border border-line-strong rounded-[18px] overflow-hidden">
            {/* Header */}
            <div className="py-6 px-7 border-b border-line flex justify-between items-center flex-wrap gap-3 max-sm:p-[18px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber/20 border border-amber/30 flex items-center justify-center">
                  <span className="font-display text-base font-semibold text-amber">
                    AI
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-[1.1rem] font-semibold m-0 leading-tight">
                    Chat with Achla
                  </h3>
                  <p className="font-mono text-[0.7rem] text-slate mt-0.5">
                    AI-powered · Real-time responses
                  </p>
                </div>
              </div>
              <Badge variant="signal">online</Badge>
            </div>

            {/* Body */}
            <div className="p-8 pb-10 max-sm:p-5">
              {/* Description */}
              <div className="mb-8">
                <p className="text-paper-dim text-[0.95rem] leading-relaxed mb-4">
                  Ask me anything about my work, projects, skills, or
                  experience. The AI knows my full CV, projects, and even my
                  thoughts on remote work and career goals.
                </p>

                <p className="font-mono text-[0.75rem] uppercase tracking-[0.06em] text-slate mb-3">
                  💡 Try asking
                </p>

                <div className="flex gap-2 flex-wrap">
                  {sampleQuestions.map((q) => (
                    <Chip key={q}>{q}</Chip>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Link href="/chat" className="block">
                <button
                  type="button"
                  className="w-full group relative overflow-hidden bg-amber hover:bg-amber-soft text-ink font-mono text-[0.9rem] font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3"
                >
                  <span>Start conversation</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </Link>

              {/* Tech Stack Info */}
              <div className="mt-6 pt-6 border-t border-line">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.06em] text-slate mb-3">
                  Built with
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber" />
                    <span className="font-mono text-[0.78rem] text-paper-dim">
                      Next.js + Tailwind
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-mauve" />
                    <span className="font-mono text-[0.78rem] text-paper-dim">
                      Python + FastAPI
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-signal" />
                    <span className="font-mono text-[0.78rem] text-paper-dim">
                      LangChain-style RAG
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-soft" />
                    <span className="font-mono text-[0.78rem] text-paper-dim">
                      Groq (Llama 3.3)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}