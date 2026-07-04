// src/components/ui/SectionHead.tsx
"use client";

import { KineticText } from "@/components/effects/KineticText";

interface SectionHeadProps {
  tag: string;
  title: string;
  description?: string;
}

export function SectionHead({ tag, title, description }: SectionHeadProps) {
  return (
    <div className="mb-11 max-w-[660px]">
      <span className="font-mono text-[0.75rem] tracking-[0.08em] uppercase text-amber mb-3 block">
        {tag}
      </span>
      <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.7rem)] font-bold mb-[14px] tracking-[-0.012em] leading-[1.2]">
        <KineticText text={title} />
      </h2>
      {description && (
        <p className="text-paper-dim text-base max-w-[58ch]">{description}</p>
      )}
    </div>
  );
}