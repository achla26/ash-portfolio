"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { StatItem } from "@/components/ui/StatItem";
import { GridWarpField } from "../effects/GridWrapField";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { heroEyebrow, heroLede, heroStats } from "@/data/hero";

// --- Status indicator ---
function StatusBadge() {
  return (
    <motion.div
      className="inline-flex items-center gap-2 px-4 py-[7px] rounded-full border border-signal/30 bg-signal/[0.05] mb-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <span className="relative flex h-[7px] w-[7px]">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-60" />
        <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-signal" />
      </span>
      <span className="font-mono text-[0.72rem] text-signal tracking-wide">
        Available for work
      </span>
    </motion.div>
  );
}

// --- Word by word reveal for headline --- 

function HeadlineReveal() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <h1 className="font-display text-[clamp(2.8rem,5.6vw,4.6rem)] font-bold leading-[1.15] m-0 mb-7 tracking-[-0.02em]">
        I build software
        <br />
        that <span className="gradient-text italic font-medium">thinks</span> -
        and ships.
      </h1>
    );
  }

  const lines: { word: string; isGradient?: boolean }[][] = [
    [
      { word: "I" },
      { word: "build" },
      { word: "software" },
    ],
    [
      { word: "that" },
      { word: "thinks", isGradient: true },
      { word: "-" },
      { word: "and" },
      { word: "ships." },
    ],
  ];

  let globalIndex = 0;

  return (
    <h1 className="font-display text-[clamp(2.8rem,5.6vw,4.6rem)] font-bold leading-[1.15] m-0 mb-7 tracking-[-0.02em]">
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className="block">
          {line.map((item, wordIndex) => {
            const currentGlobal = globalIndex;
            globalIndex++;

            return (
              <motion.span
                key={wordIndex}
                className={`inline-block mr-[0.3em] ${
                  item.isGradient
                    ? "gradient-text italic font-medium"
                    : ""
                }`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.4 + currentGlobal * 0.06,
                }}
              >
                {item.word}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}


// --- Main Hero ---
export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden py-16 md:py-20">
      {/* Particle background */}
      <GridWarpField />

      {/* Gradient overlays on top of particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse 800px 600px at 70% 20%, rgba(212,162,76,0.06), transparent 60%)",
              "radial-gradient(ellipse 600px 500px at 20% 80%, rgba(155,122,140,0.04), transparent 60%)",
            ].join(", "),
          }}
        />
        {/* Bottom fade to ink */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <Container className="relative z-[2] w-full">
        {/* Two column layout */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto] gap-12 xl:gap-16 items-center">
          {/* Left — content */}
          <div className="max-w-[720px]">
            <StatusBadge />

            <motion.span
              className="font-mono text-[0.78rem] tracking-[0.08em] uppercase text-paper-dim/70 flex items-center gap-[10px] mb-6"
              initial={reduced ? {} : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="w-8 h-px bg-amber" />
              {heroEyebrow}
            </motion.span>

            <HeadlineReveal />

            <motion.p
              className="text-[1.1rem] leading-[1.7] text-paper-dim max-w-[54ch] m-0 mb-10"
              initial={reduced ? {} : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              {heroLede}
            </motion.p>

            <motion.div
              className="flex gap-[14px] mb-14 flex-wrap"
              initial={reduced ? {} : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6 }}
            >
              <Button href="#demo" variant="primary">
                Try the live demo →
              </Button>
              <Button href="#work" variant="ghost">
                See the work
              </Button>
            </motion.div>

            <motion.div
              className="flex gap-10 flex-wrap pt-6 border-t border-line max-sm:gap-6"
              initial={reduced ? {} : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              {heroStats.map((stat) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </motion.div>
          </div>

          {/* Right — terminal */}
          <motion.div
            className="hidden xl:flex items-center justify-center"
            initial={reduced ? {} : { opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
          >
            <TerminalCard />
          </motion.div>
        </div>
      </Container>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-[2] font-mono text-[0.7rem] text-slate flex flex-col items-center gap-2"
        initial={reduced ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span>scroll</span>
        <span className="w-px h-[34px] bg-gradient-to-b from-amber to-transparent animate-scrollpulse" />
      </motion.div>
    </section>
  );
}
// --- Terminal Card ---
function TerminalCard() {
  const [typedLines, setTypedLines] = useState<string[]>([]);


const lines: string[] = [
  "$ whoami",
  "Achla - full-stack & ai developer",
  " ",
  "$ cat stack.txt",
  "laravel · react · nextjs · node.js",
  "python · langchain · qdrant · fastapi · chromadb",
  " ",
  "$ cat experience.txt",
  "5+ years · 15+ projects · 3 companies",
  " ",
  "$ echo $STATUS",
  "freelancing + open to roles ✓",
];

  useEffect(() => {
    let currentLine = 0;
    const totalLines = lines.length;

    const interval = setInterval(() => {
      if (currentLine < totalLines) {
        const lineToAdd = lines[currentLine] ?? " ";
        setTypedLines((prev) => [...prev, lineToAdd]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 400);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-[340px] bg-ink-2 border border-line-strong rounded-xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-ink-3/50">
        <span className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]/70" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#febc2e]/70" />
        <span className="w-[10px] h-[10px] rounded-full bg-[#28c840]/70" />
        <span className="ml-3 font-mono text-[0.65rem] text-slate">
          terminal - Achla
        </span>
      </div>

      {/* Terminal body */}
      <div className="p-4 min-h-[220px]">
        {typedLines.map((line, i) => {
          if (!line || line.trim() === "") {
            return <br key={i} />;
          }

          if (line.startsWith("$")) {
            return (
              <div key={i} className="font-mono text-[0.75rem] leading-relaxed">
                <span className="text-amber">{line}</span>
              </div>
            );
          }

          if (line.includes("✓")) {
            return (
              <div key={i} className="font-mono text-[0.75rem] leading-relaxed">
                <span className="text-signal">{line}</span>
              </div>
            );
          }

          return (
            <div key={i} className="font-mono text-[0.75rem] leading-relaxed">
              <span className="text-paper-dim">{line}</span>
            </div>
          );
        })}

        {/* Blinking cursor */}
        <motion.span
          className="inline-block w-[7px] h-[14px] bg-amber mt-1"
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.8, repeat: Infinity, ease: "linear",
            repeatDelay: 0.4
          }}
        />
      </div>
    </div>
  );
}
