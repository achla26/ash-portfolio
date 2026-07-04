import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "max-w-content mx-auto px-8 relative z-[2]",
        "max-md:px-5",
        className
      )}
    >
      {children}
    </div>
  );
}