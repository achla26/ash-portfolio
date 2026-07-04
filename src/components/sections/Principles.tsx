import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { principles } from "@/data/principles";

export function Principles() {
  return (
    <Section id="principles">
      <Container>
        <ScrollReveal>
          <SectionHead
            tag="06 · How I work"
            title="A few things I hold to"
          />

          <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
            {principles.map((p) => (
              <div key={p.number} className="border-t border-line-strong pt-[18px]">
                <span className="font-mono text-[0.75rem] text-amber mb-[10px] block">
                  {p.number}
                </span>
                <h4 className="font-display text-[1.1rem] font-semibold m-0 mb-2">
                  {p.title}
                </h4>
                <p className="text-paper-dim text-[0.9rem] m-0">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}