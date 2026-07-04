// src/components/ui/Button.tsx
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function Button({
  href,
  variant = "primary",
  children,
  className,
  onClick,
  type = "button",
}: ButtonProps) {
  const base = cn(
    "font-mono text-[0.82rem] tracking-[0.03em] no-underline",
    "py-[13px] px-6 rounded-[6px] inline-flex items-center gap-2",
    "transition-all duration-200 ease-out border border-transparent",
    variant === "primary" && [
      "bg-amber text-ink font-semibold",
      "hover:bg-amber-soft hover:shadow-[0_10px_30px_-10px_rgba(212,162,76,0.35)]",
    ],
    variant === "ghost" && [
      "border-line-strong text-paper",
      "hover:border-amber hover:text-amber",
    ],
    className
  );

  if (href) {
    return (
      <a href={href} className={base}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={base}>
      {children}
    </button>
  );
}