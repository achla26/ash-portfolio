"use client";

import { useState } from "react";
import { RetrievedChunk } from "@/types/chat"; 

interface Props {
  chunks: RetrievedChunk[];
}

export function RetrievalPeek({ chunks }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  if (!chunks || chunks.length === 0) return null;

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="font-mono text-[0.7rem] text-slate hover:text-amber transition-colors flex items-center gap-1.5"
      >
        <span>{isOpen ? "▼" : "▶"}</span>
        <span>Sources ({chunks.length})</span>
      </button>

      {isOpen && (
        <div className="mt-3 space-y-2">
          {chunks.map((chunk, i) => (
            <div
              key={i}
              className="border border-line rounded-lg p-3 bg-ink-3/50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[0.68rem] text-amber-soft">
                  {chunk.source}
                </span>
                <div className="flex items-center gap-2">
                  <div className="h-[3px] w-16 bg-line rounded-sm overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-mauve to-amber rounded-sm transition-all duration-500"
                      style={{ width: `${Math.round(chunk.score * 100)}%` }}
                    />
                  </div>
                  <span className="font-mono text-[0.65rem] text-slate">
                    {(chunk.score * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <p className="text-[0.78rem] text-paper-dim m-0 leading-relaxed">
                {chunk.preview}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}