"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import { ScrollReveal } from "@/components/effects/ScrollReveal";
import { useRAGEngine } from "@/hooks/useRAGEngine";
import { demoPresets } from "@/data/demo";
import { TypewriterText } from "./TypewriterText";

export function LiveDemo() {
  const [query, setQuery] = useState("");
  const { result, isProcessing, runQuery } = useRAGEngine();

  const handleRun = () => {
    if (query.trim()) runQuery(query);
  };

  const handleChipClick = (q: string) => {
    setQuery(q);
    runQuery(q);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleRun();
  };

  return (
    <Section id="demo">
      <Container>
        <ScrollReveal>
          <SectionHead
            tag="03 · Live demo"
            title="Ask this portfolio a question"
            description="This is a real, working retrieval pipeline - the same shape as the RAG project below - running client-side over this page's own content. No backend, no API key, just retrieval and scoring you can watch happen."
          />

          <div className="bg-card backdrop-blur-[16px] border border-line-strong rounded-[18px] overflow-hidden">
            {/* Header */}
            <div className="py-6 px-7 border-b border-line flex justify-between items-center flex-wrap gap-3 max-sm:p-[18px]">
              <h3 className="font-display text-[1.3rem] font-semibold m-0">
                Retrieval console
              </h3>
              <Badge variant="signal">running locally</Badge>
            </div>

            {/* Body */}
            <div className="p-7 pb-[30px] max-sm:p-[18px]">
              {/* Input row */}
              <div className="flex gap-[10px] mb-[22px]">
                <input
                  type="text"
                  placeholder="e.g. what AI tools does Achla use?"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-ink-3 border border-line-strong rounded-lg py-[13px] px-4 text-paper font-mono text-[0.9rem] outline-none focus:border-amber transition-colors"
                  autoComplete="off"
                />
                <button
                  onClick={handleRun}
                  disabled={isProcessing}
                  className="font-mono text-[0.82rem] bg-amber text-ink font-semibold border-none rounded-lg px-[22px] cursor-pointer hover:bg-amber-soft transition-colors disabled:opacity-50"
                >
                  {isProcessing ? "Running..." : "Run query"}
                </button>
              </div>

              {/* Chips */}
              <div className="flex gap-2 flex-wrap mb-6">
                {demoPresets.map((preset) => (
                  <Chip
                    key={preset.label}
                    onClick={() => handleChipClick(preset.query)}
                  >
                    {preset.label}
                  </Chip>
                ))}
              </div>

              {/* Results columns */}
              <div className="grid grid-cols-2 gap-[26px] max-lg:grid-cols-1">
                {/* Retrieved chunks */}
                <div>
                  <h5 className="font-mono text-[0.7rem] uppercase tracking-[0.06em] text-slate m-0 mb-[14px]">
                    Retrieved chunks
                  </h5>
                  <div>
                    {!result ? (
                      <p className="text-slate font-mono text-[0.82rem]">
                        Run a query to see retrieval scores appear here.
                      </p>
                    ) : (
                      result.chunks.map((chunk) => (
                        <div
                          key={chunk.id}
                          className="border border-line rounded-[10px] p-4 mb-3 bg-ink-3"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <div className="h-[3px] bg-line rounded-sm overflow-hidden flex-1 mr-3">
                              <div
                                className="h-full bg-gradient-to-r from-mauve to-amber rounded-sm transition-all duration-600"
                                style={{
                                  width: `${Math.round(chunk.score * 100)}%`,
                                }}
                              />
                            </div>
                            <span className="font-mono text-[0.7rem] text-amber-soft">
                              {(chunk.score * 100).toFixed(0)}%
                            </span>
                          </div>
                          <p className="m-0 text-[0.86rem] text-paper-dim">
                            {chunk.text}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Synthesized answer */}
                <div>
                  <h5 className="font-mono text-[0.7rem] uppercase tracking-[0.06em] text-slate m-0 mb-[14px]">
                    Synthesized answer
                  </h5>
                  <div className="border border-line-strong rounded-[10px] p-[18px] bg-gradient-to-br from-amber/[0.06] to-transparent min-h-[120px] text-[0.92rem] text-paper">
                    {!result ? (
                      <span className="text-slate font-mono text-[0.82rem]">
                        Waiting on a query...
                      </span>
                    ) : (
                      <TypewriterText text={result.answer} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  );
}

