// src/components/ui/Logo.tsx
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  href?: string;
  className?: string;
}

const sizes = {
  sm: {
    icon: "w-6 h-6 rounded-md",
    arrow: "text-[8px]",
    cursor: "text-[7px]",
    text: "text-[0.9rem]",
    gap: "gap-2",
  },
  md: {
    icon: "w-8 h-8 rounded-lg",
    arrow: "text-[11px]",
    cursor: "text-[10px]",
    text: "text-[1.25rem]",
    gap: "gap-[10px]",
  },
  lg: {
    icon: "w-10 h-10 rounded-xl",
    arrow: "text-[14px]",
    cursor: "text-[13px]",
    text: "text-[1.8rem]",
    gap: "gap-3",
  },
  xl: {
    icon: "w-14 h-14 rounded-xl",
    arrow: "text-[20px]",
    cursor: "text-[18px]",
    text: "text-[2.4rem]",
    gap: "gap-4",
  },
};

export function Logo({
  size = "md",
  showText = true,
  href,
  className,
}: LogoProps) {
  const s = sizes[size];

  const content = (
    <div className={cn("flex items-center group", s.gap, className)}>
      {/* Terminal icon */}
      <div
        className={cn(
          s.icon,
          "bg-ink-2 border border-line-strong flex items-center justify-center",
          "transition-all duration-300",
          "group-hover:border-amber/50 group-hover:shadow-[0_0_20px_rgba(212,162,76,0.12)]"
        )}
      >
        <div className="flex items-center font-mono font-bold leading-none">
          <span className={cn(s.arrow, "text-amber")}>{">"}</span>
          <span
            className={cn(
              s.cursor,
              "text-paper ml-[1px] animate-pulse"
            )}
          >
            _
          </span>
        </div>
      </div>

      {/* Text */}
      {showText && (
        <span className={cn("font-display font-semibold", s.text)}>
          Achla
          <span className="text-amber transition-colors duration-300 group-hover:text-amber-soft">
            .
          </span>
          dev
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="no-underline">
        {content}
      </Link>
    );
  }

  return content;
}