// src/components/ui/Badge.tsx
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "amber" | "signal";
  className?: string;
}

export function Badge({ children, variant = "amber", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "font-mono text-[0.72rem] py-[6px] px-[14px] rounded-full font-semibold whitespace-nowrap",
        variant === "amber" && "text-ink bg-amber",
        variant === "signal" && [
          "text-signal border border-signal/40 flex items-center gap-[6px]",
          "before:content-[''] before:w-[6px] before:h-[6px] before:rounded-full",
          "before:bg-signal before:animate-livepulse",
        ],
        className
      )}
    >
      {children}
    </span>
  );
}