import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHead } from "@/components/ui/SectionHead";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { FeaturedProject } from "./FeaturedProject";
import { ProjectGrid } from "./ProjectGrid";

export function Work() {
  return (
    <Section id="work">
      <Container>
        <ScrollReveal>
          <SectionHead
            tag="04 · Work"
            title="Selected projects"
            description="A mix of applied AI builds and full-stack client delivery."
          />
        </ScrollReveal>
      </Container>
      <FeaturedProject />
      <ProjectGrid />
    </Section>
  );
}