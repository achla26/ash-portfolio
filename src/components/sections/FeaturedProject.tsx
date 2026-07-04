import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { PipelineIcon } from "@/components/ui/PipelineIcon";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { featuredProject } from "@/data/projects";

export function FeaturedProject() {
  return (
    <Container>
      <ScrollReveal>
        <div className="bg-gradient-to-br from-amber/[0.06] to-card/40 border border-line-strong rounded-[18px] p-11 max-sm:p-7">
          {/* Top */}
          <div className="flex justify-between items-start gap-6 mb-7 flex-wrap">
            <div>
              <h3 className="font-display text-[1.9rem] font-bold m-0 mb-[10px]">
                {featuredProject.title}
              </h3>
              <p className="text-paper-dim max-w-[52ch] m-0">
                {featuredProject.description}
              </p>
            </div>
            <Badge variant="amber">{featuredProject.badge}</Badge>
          </div>

          {/* Pipeline */}
          <div className="flex items-center gap-0 overflow-x-auto py-2 pb-[26px] mb-5">
            {featuredProject.pipeline.map((step, i) => (
              <div key={step.label} className="contents">
                <div className="flex-1 min-w-[118px] text-center relative px-[6px]">
                  <div className="w-12 h-12 rounded-xl bg-ink-3 border border-line-strong flex items-center justify-center mx-auto mb-[10px] text-amber">
                    <PipelineIcon type={step.icon} />
                  </div>
                  <span className="font-mono text-[0.72rem] text-paper-dim block">
                    {step.label}
                  </span>
                </div>
                {i < featuredProject.pipeline.length - 1 && (
                  <div className="text-slate flex-shrink-0 px-[2px] pb-[26px]">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-5 mt-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {featuredProject.metrics.map((metric) => (
              <div key={metric.label} className="border-t border-line pt-[14px]">
                <b className="block font-display text-[1.4rem] font-bold text-amber-soft">
                  {metric.value}
                </b>
                <span className="font-mono text-[0.75rem] text-paper-dim">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </Container>
  );
}