"use client";

import { suggestedQuestions } from "@/data/mockChat";

interface Props {
  onSelect: (query: string) => void;
}

export function SuggestedChips({ onSelect }: Props) {
  return (
    <div className="mb-6">
      <p className="font-mono text-[0.7rem] uppercase tracking-[0.06em] text-slate mb-3">
        💡 Try asking
      </p>
      <div className="flex gap-2 flex-wrap">
        {suggestedQuestions.map((q) => (
          <button
            type="button"
            key={q.query}
            onClick={() => onSelect(q.query)}
            className="font-mono text-[0.75rem] text-paper-dim border border-line-strong rounded-full py-2 px-3.5 hover:border-amber hover:text-amber transition-all duration-200 flex items-center gap-1.5"
          >
            {q.icon && <span>{q.icon}</span>}
            <span>{q.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}