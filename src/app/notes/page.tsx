"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { notes, getNoteCategories, getNotesByCategory } from "@/data/notes";
import {
  FileText,
  FileCode,
  File,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

function getFormatIcon(format: string, size = 13) {
  switch (format) {
    case "HTML":
      return <FileCode size={size} />;
    case "PDF":
      return <FileText size={size} />;
    default:
      return <File size={size} />;
  }
}

export default function NotesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = getNoteCategories();
  const filteredNotes = getNotesByCategory(activeCategory);

  const getCategoryCount = (cat: string) => {
    if (cat === "All") return notes.length;
    return notes.filter((n) => n.category === cat).length;
  };

  return (
    <Section className="pt-12">
      <Container>
        {/* Back link */}
        <ScrollReveal>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-[0.78rem] text-paper-dim no-underline hover:text-amber transition-colors mb-10 group"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to home
          </Link>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal>
          <div className="mb-12 max-w-[720px]">
            <span className="font-mono text-[0.75rem] tracking-[0.08em] uppercase text-amber mb-3 block">
              Notes
            </span>
            <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold mb-4 tracking-[-0.015em] leading-[1.15]">
              Learning in public.
            </h1>
            <p className="text-paper-dim text-[1.05rem] leading-[1.7] max-w-[56ch]">
              Working notes on system design, databases, networking, cloud, and
              architecture. Some are interactive. All are real.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats bar */}
        <ScrollReveal>
          <div className="flex items-center gap-6 mb-8 pb-6 border-b border-line flex-wrap">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-amber" />
              <span className="font-mono text-[0.8rem] text-paper">
                {notes.length} notes
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-mauve" />
              <span className="font-mono text-[0.8rem] text-paper">
                {notes.filter((n) => n.interactive).length} interactive
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-signal" />
              <span className="font-mono text-[0.8rem] text-paper">
                {notes.filter((n) => n.status === "Complete").length} complete
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-amber" />
              <span className="font-mono text-[0.8rem] text-paper">
                {notes.filter((n) => n.status === "In Progress").length} in
                progress
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Category filters */}
        <ScrollReveal>
          <div className="flex gap-2 flex-wrap mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "font-mono text-[0.75rem] px-4 py-[8px] rounded-lg border transition-all duration-200",
                  activeCategory === cat
                    ? "bg-amber text-ink border-amber font-semibold"
                    : "bg-transparent text-paper-dim border-line-strong hover:border-amber/50 hover:text-paper"
                )}
              >
                {cat}
                <span
                  className={cn(
                    "ml-2 text-[0.65rem]",
                    activeCategory === cat ? "text-ink/60" : "text-slate"
                  )}
                >
                  {getCategoryCount(cat)}
                </span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Notes grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-3 gap-[22px] max-lg:grid-cols-2 max-sm:grid-cols-1"
          >
            {filteredNotes.map((note, i) => (
              <motion.a
                key={note.id}
                href={note.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="group relative bg-card backdrop-blur-[12px] border border-line-strong rounded-[14px] p-6 transition-all duration-300 hover:border-amber/50 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] no-underline flex flex-col h-full min-h-[240px]"
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[0.65rem] text-paper-dim uppercase tracking-[0.06em]">
                    {note.category}
                  </span>
                  <div className="flex items-center gap-[6px]">
                    {note.interactive && (
                      <span className="font-mono text-[0.6rem] text-mauve bg-mauve/10 border border-mauve/20 px-[6px] py-[2px] rounded-full flex items-center gap-[3px]">
                        <Sparkles size={9} />
                        Interactive
                      </span>
                    )}
                    <span className="font-mono text-[0.65rem] text-amber bg-amber/10 border border-amber/20 px-2 py-[3px] rounded-full flex items-center gap-[5px]">
                      {getFormatIcon(note.format, 11)}
                      {note.format}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-[1.15rem] font-semibold m-0 mb-3 text-paper group-hover:text-amber-soft transition-colors duration-300 leading-snug">
                  {note.title}
                </h3>

                {/* Description */}
                <p className="text-paper-dim text-[0.88rem] leading-[1.6] m-0 mb-5 flex-1">
                  {note.description}
                </p>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-3 border-t border-line">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.7rem] text-slate">
                      {note.date}
                    </span>
                    <span
                      className={`font-mono text-[0.7rem] flex items-center gap-[5px] ${
                        note.status === "Complete"
                          ? "text-signal"
                          : "text-amber"
                      }`}
                    >
                      <span
                        className={`w-[6px] h-[6px] rounded-full ${
                          note.status === "Complete"
                            ? "bg-signal"
                            : "bg-amber animate-pulse"
                        }`}
                      />
                      {note.status}
                    </span>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="text-paper-dim group-hover:text-amber transition-all duration-300 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                  />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Disclaimer */}
        <ScrollReveal>
          <div className="mt-16 p-5 rounded-xl border border-line bg-card/40 text-center">
            <p className="font-mono text-[0.75rem] text-paper-dim m-0">
              <span className="text-amber">⚠</span> These are personal learning
              notes. Expect raw thinking, evolving ideas, and occasional typos.
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}