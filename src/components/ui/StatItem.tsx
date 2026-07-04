// src/components/ui/StatItem.tsx
interface StatItemProps {
  value: string;
  label: string;
}

export function StatItem({ value, label }: StatItemProps) {
  return (
    <div>
      <b className="block font-display text-[1.7rem] font-bold text-paper">
        {value}
      </b>
      <span className="font-mono text-[0.72rem] text-paper-dim uppercase tracking-[0.04em]">
        {label}
      </span>
    </div>
  );
}