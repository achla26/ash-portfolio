// src/components/ui/Chip.tsx
import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "tag";
  className?: string;
}

export function Chip({
  children,
  onClick,
  variant = "default",
  className,
}: ChipProps) {
  const base = cn(
    "font-mono text-[0.72rem] rounded-full bg-transparent",
    variant === "default" && [
      "text-paper-dim border border-line-strong py-[6px] px-3",
      "hover:border-amber hover:text-amber transition-colors duration-200",
    ],
    variant === "tag" && [
      "text-mauve border border-mauve/35 py-1 px-[9px] text-[0.7rem]",
    ],
    className
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={cn(base, "cursor-pointer")}>
        {children}
      </button>
    );
  }

  return <span className={base}>{children}</span>;
}