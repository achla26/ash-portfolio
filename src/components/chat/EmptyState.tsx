import { SuggestedChips } from "./SuggestedChips";

interface Props {
  onQuestionSelect: (query: string) => void;
}

export function EmptyState({ onQuestionSelect }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full bg-amber/10 border border-amber/30 flex items-center justify-center mb-4">
        <span className="text-2xl">🤖</span>
      </div>

      {/* Welcome text */}
      <h2 className="font-display text-2xl font-semibold text-paper mb-2 text-center">
        Hi! I&apos; m the AI version of{" "}
        <span className="gradient-text">Achla</span>
      </h2>
      <p className="text-paper-dim text-[0.95rem] mb-8 text-center max-w-md">
        Ask me anything about my work, projects, skills, or experience. I&apos;m here to help you get to know me better.
      </p>

      {/* Suggested chips */}
      <div className="w-full max-w-xl">
        <SuggestedChips onSelect={onQuestionSelect} />
      </div>
    </div>
  );
}