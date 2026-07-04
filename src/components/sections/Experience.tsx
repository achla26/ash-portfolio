"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { experiences, toolbox } from "@/data/experience";

export function Experience() {
  return (
    <Section id="experience">
      <Container>
        <ScrollReveal>
          <SectionHead tag="05 · Experience" title="Where I've worked" />

          {/* Two column: timeline left, toolbox right */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-16 items-start">
            {/* Left - Timeline */}
            <div className="border-l border-line-strong pl-9 flex flex-col gap-[38px]">
              {experiences.map((item, i) => (
                <div key={i} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-[41.5px] top-1 w-[11px] h-[11px] rounded-full bg-ink border-2 border-amber shadow-[0_0_0_4px_rgba(212,162,76,0.1)]" />

                  <span className="font-mono text-[0.75rem] text-paper-dim mb-[6px] block">
                    {item.date}
                  </span>
                  <h4 className="font-display text-[1.18rem] font-semibold m-0 mb-[6px]">
                    {item.title}
                  </h4>
                  <p className="text-paper-dim m-0 text-[0.92rem] max-w-[58ch] leading-[1.6]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Right - Toolbox sidebar */}
            <div className="flex flex-col gap-5">
              {/* Toolbox card */}
              <div className="bg-card backdrop-blur-[14px] border border-line-strong rounded-xl p-6 sticky top-28">
                <h4 className="font-mono text-[0.72rem] uppercase tracking-[0.07em] text-amber m-0 mb-5 flex items-center gap-2">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a4 4 0 0 0-8 0v2" />
                  </svg>
                  Toolbox
                </h4>

                <div className="flex flex-col gap-5">
                  {toolbox.map((group) => (
                    <div key={group.category}>
                      <span className="font-mono text-[0.68rem] text-slate uppercase tracking-[0.06em] block mb-2">
                        {group.category}
                      </span>
                      <div className="flex flex-wrap gap-[6px]">
                        {group.items.map((item) => (
                          <span
                            key={item}
                            className="font-mono text-[0.7rem] text-paper-dim border border-line-strong rounded-full px-[10px] py-[4px] hover:border-amber/50 hover:text-paper transition-colors duration-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Certification note */}
                <div className="mt-6 pt-5 border-t border-line">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber/10 border border-amber/20 flex items-center justify-center flex-shrink-0 mt-[2px]">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-amber"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[0.85rem] text-paper font-medium block mb-[2px]">
                        AWS Certification
                      </span>
                      <span className="font-mono text-[0.7rem] text-paper-dim">
                        Currently studying
                      </span>
                    </div>
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