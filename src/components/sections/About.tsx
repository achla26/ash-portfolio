"use client";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Pullquote } from "@/components/ui/Pullquote";
import { NowCard } from "@/components/ui/NowCard";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { KineticText } from "@/components/effects/KineticText";
import { aboutParagraphs, aboutQuote, nowItems } from "@/data/about";

export function About() {
  return (
    <Section id="about">
      <Container>
        <ScrollReveal>
          {/* Section header - full width */}
          <div className="mb-14">
            <span className="font-mono text-[0.75rem] tracking-[0.08em] uppercase text-amber mb-3 block">
              01 · About
            </span>
            <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.7rem)] font-bold mb-4 tracking-[-0.012em] leading-[1.2]">
              <KineticText text="Grounded in shipping, curious about frontier tools." />
            </h2>
          </div>

          {/* Two column content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left - bio + quote */}
            <div>
              {aboutParagraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-paper-dim m-0 mb-5 max-w-[54ch] leading-[1.7] [&_strong]:text-paper [&_strong]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: para }}
                />
              ))}
              <Pullquote>{aboutQuote}</Pullquote>
            </div>

            {/* Right - currently card + quick facts */}
            <div className="flex flex-col gap-6">
              <NowCard items={nowItems} />

              <div className="bg-card backdrop-blur-[14px] border border-line-strong rounded-xl py-[22px] px-6">
                <h4 className="font-mono text-[0.72rem] uppercase tracking-[0.07em] text-amber m-0 mb-4">
                  Quick facts
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <FactItem label="Location" value="Christchurch, NZ" />
                  <FactItem label="Status" value="NZ Resident" />
                  <FactItem label="Experience" value="5+ years" />
                  <FactItem label="Education" value="MCA" />
                  <FactItem label="Side work" value="Freelancing" />
                  <FactItem label="Focus" value="Full-stack + AI" />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

function FactItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l-2 border-line-strong pl-3">
      <span className="font-mono text-[0.68rem] text-slate uppercase tracking-[0.05em] block mb-[2px]">
        {label}
      </span>
      <span className="text-[0.88rem] text-paper font-medium">{value}</span>
    </div>
  );
}