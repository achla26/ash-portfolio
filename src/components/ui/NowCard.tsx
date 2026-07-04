// src/components/ui/NowCard.tsx
import { NowItem } from "@/types";

interface NowCardProps {
  items: NowItem[];
}

export function NowCard({ items }: NowCardProps) {
  return (
    <div className="bg-card backdrop-blur-[14px] border border-line-strong rounded-xl py-[22px] px-6 mt-2">
      <h4 className="font-mono text-[0.72rem] uppercase tracking-[0.07em] text-signal m-0 mb-[14px] flex items-center gap-2 before:content-[''] before:w-[6px] before:h-[6px] before:rounded-full before:bg-signal before:shadow-[0_0_0_3px_rgba(127,169,160,0.2)]">
        Currently
      </h4>
      <ul className="list-none m-0 p-0 flex flex-col gap-[10px]">
        {items.map((item, i) => (
          <li
            key={i}
            className="text-[0.92rem] text-paper-dim flex gap-[10px] before:content-['→'] before:text-amber before:flex-shrink-0"
          >
            <span>
              <b className="text-paper font-medium">{item.bold}</b> {item.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}