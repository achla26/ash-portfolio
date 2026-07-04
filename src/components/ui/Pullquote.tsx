// src/components/ui/Pullquote.tsx
interface PullquoteProps {
  children: string;
}

export function Pullquote({ children }: PullquoteProps) {
  return (
    <blockquote className="font-display italic text-[1.3rem] text-amber-soft border-l-[3px] border-amber pl-5 my-6 leading-relaxed">
      &ldquo;{children}&rdquo;
    </blockquote>
  );
}