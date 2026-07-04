// src/components/ui/PipelineIcon.tsx
interface PipelineIconProps {
  type: string;
}

export function PipelineIcon({ type }: PipelineIconProps) {
  const icons: Record<string, React.ReactNode> = {
    upload: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3v12M7 8l5-5 5 5M5 21h14" />
      </svg>
    ),
    chunk: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="7" height="7" />
        <rect x="14" y="4" width="7" height="7" />
        <rect x="3" y="15" width="7" height="7" />
        <rect x="14" y="15" width="7" height="7" />
      </svg>
    ),
    embed: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="6" cy="6" r="2.4" />
        <circle cx="18" cy="8" r="2.4" />
        <circle cx="9" cy="18" r="2.4" />
        <path d="M8 7l8 1M8 8l1 8" />
      </svg>
    ),
    search: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    chat: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 4h16v12H8l-4 4z" />
      </svg>
    ),
  };

  return <>{icons[type] || null}</>;
}