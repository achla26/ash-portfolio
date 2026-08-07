"use client";

interface Props {
  onClick: () => void;
}

export function NewConversationButton({ onClick }: Props) {
  return (
    <div className="p-4">
      <button
        onClick={onClick}
        className="w-full flex items-center gap-3 p-3 rounded-xl border border-line-strong bg-ink-3 hover:border-amber hover:bg-amber/5 transition-all duration-200 group"
      >
        <div className="w-8 h-8 rounded-lg bg-amber/10 border border-amber/30 flex items-center justify-center group-hover:bg-amber/20 transition-colors">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-amber"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
        <span className="font-display text-[0.9rem] font-semibold text-paper">
          Start new conversation
        </span>
      </button>
    </div>
  );
}