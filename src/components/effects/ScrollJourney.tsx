// src/components/effects/ScrollJourney.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  User,
  Brain,
  Terminal,
  Briefcase,
  Clock,
  Lightbulb,
  Mail,
  Code2,
} from "lucide-react";

const journeySteps = [
  { id: "top", label: "Start", icon: Code2 },
  { id: "about", label: "About", icon: User },
  { id: "skills", label: "Skills", icon: Brain },
  { id: "demo", label: "Demo", icon: Terminal },
  { id: "work", label: "Work", icon: Briefcase },
  { id: "experience", label: "Journey", icon: Clock },
  { id: "principles", label: "Values", icon: Lightbulb },
  { id: "contact", label: "Connect", icon: Mail },
];

export function ScrollJourney() {
  const reduced = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  // Track which section is active
  useEffect(() => {
    if (reduced) return;

    const sectionIds = journeySteps.map((s) => s.id);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sectionIds.indexOf(entry.target.id);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [reduced]);

  // Smooth progress for the traveler position
  const travelerY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  if (reduced) return null;

  return (
    <div
      ref={containerRef}
      className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center"
      style={{ height: "60vh" }}
    >
      {/* Track line */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px">
        {/* Background track */}
        <div className="w-full h-full bg-line-strong" />

        {/* Progress fill */}
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-amber to-amber/30 origin-top"
          style={{
            scaleY: scrollYProgress,
            height: "100%",
          }}
        />
      </div>

      {/* Journey steps */}
      <div className="relative h-full flex flex-col justify-between py-2">
        {journeySteps.map((step, i) => {
          const isActive = i <= activeIndex;
          const isCurrent = i === activeIndex;
          const Icon = step.icon;

          return (
            <a
              key={step.id}
              href={`#${step.id}`}
              className="group relative flex items-center no-underline"
              title={step.label}
            >
              {/* Dot / Icon */}
              <motion.div
                className={`
                  relative z-10 w-8 h-8 rounded-full flex items-center justify-center
                  transition-all duration-300 -ml-[14px]
                  ${
                    isCurrent
                      ? "bg-amber text-ink scale-110 shadow-[0_0_20px_rgba(212,162,76,0.4)]"
                      : isActive
                      ? "bg-ink border-2 border-amber text-amber"
                      : "bg-ink border border-line-strong text-slate"
                  }
                `}
                whileHover={{ scale: 1.2 }}
              >
                <Icon size={14} />
              </motion.div>

              {/* Label (shows on hover) */}
              <div
                className={`
                  ml-3 font-mono text-[0.68rem] uppercase tracking-[0.06em]
                  whitespace-nowrap transition-all duration-200
                  opacity-0 -translate-x-2 pointer-events-none
                  group-hover:opacity-100 group-hover:translate-x-0
                  ${isCurrent ? "text-amber" : "text-paper-dim"}
                `}
              >
                {step.label}
              </div>

              {/* Current indicator pulse */}
              {isCurrent && (
                <motion.div
                  className="absolute -ml-[14px] w-8 h-8 rounded-full border border-amber/40"
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </a>
          );
        })}
      </div>

      {/* Scroll percentage */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] text-slate"
        style={{ opacity: scrollYProgress }}
      >
        <motion.span>
          {/* We'll use a component for this */}
          <ScrollPercentage />
        </motion.span>
      </motion.div>
    </div>
  );
}

// --- Scroll percentage display ---
function ScrollPercentage() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.round((scrollTop / docHeight) * 100);
      setPercent(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <>{percent}%</>;
}