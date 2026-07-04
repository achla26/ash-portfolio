import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { ScrollReveal } from "@/components/effects/ScrollReveal";

export function Contact() {
  return (
    <Section id="contact">
      <Container>
        <ScrollReveal>
          <div
            className="border border-line-strong rounded-[18px] py-16 px-12 text-center relative overflow-hidden backdrop-blur-[14px] max-sm:py-10 max-sm:px-6"
            style={{
              background: [
                "radial-gradient(ellipse 500px 300px at 50% 0%, rgba(212,162,76,0.1), transparent 70%)",
                "rgba(23,31,39,0.6)",
              ].join(", "),
            }}
          >
            <span className="font-mono text-[0.75rem] tracking-[0.08em] uppercase text-amber mb-3 block">
              07 · Contact
            </span>
            <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.7rem)] font-bold mb-4 tracking-[-0.012em]">
              Let&apos;s build something.
            </h2>
            <p className="text-paper-dim max-w-[46ch] mx-auto mb-[30px]">
              Open to mid-level full-stack and AI engineering roles in
              Christchurch and remote. Also available for
              freelance projects. Reach out directly - I read everything myself.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button href="mailto:achlar8@gmail.com" variant="primary">
                Email me
              </Button>
              <Button href="https://www.linkedin.com/in/achla-rani/" variant="ghost">
                LinkedIn
              </Button>
              <Button href="https://github.com/achla26" variant="ghost">
                GitHub
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}