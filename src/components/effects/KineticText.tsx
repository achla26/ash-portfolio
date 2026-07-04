"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface KineticTextProps {
  text: string;
  className?: string;
  gradientWords?: number[];
}

export function KineticText({
  text,
  className,
  gradientWords = [],
}: KineticTextProps) {
  const reduced = useReducedMotion();
  const words = text.split(/\s+/);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  if (reduced) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={containerRef} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className={`inline-block mr-[0.3em] ${
            gradientWords.includes(i)
              ? "gradient-text italic font-medium"
              : ""
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
            delay: i * 0.045,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}