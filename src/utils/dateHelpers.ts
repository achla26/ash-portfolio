/**
 * Convert ISO date string to relative time
 * Example: "5 minutes ago", "2 hours ago", "Yesterday"
 */
export function getRelativeTime(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay === 1) return "Yesterday";
  if (diffDay < 7) return `${diffDay}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/**
 * Group sessions by date category
 * Returns: { today: [], yesterday: [], lastWeek: [], older: [] }
 */
export function groupSessionsByDate<T extends { updatedAt: string }>(
  sessions: T[]
): {
  today: T[];
  yesterday: T[];
  lastWeek: T[];
  older: T[];
} {
  const today: T[] = [];
  const yesterday: T[] = [];
  const lastWeek: T[] = [];
  const older: T[] = [];

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  const weekStart = new Date(todayStart);
  weekStart.setDate(weekStart.getDate() - 7);

  sessions.forEach((session) => {
    const date = new Date(session.updatedAt);

    if (date >= todayStart) {
      today.push(session);
    } else if (date >= yesterdayStart) {
      yesterday.push(session);
    } else if (date >= weekStart) {
      lastWeek.push(session);
    } else {
      older.push(session);
    }
  });

  return { today, yesterday, lastWeek, older };
}

/**
 * Format timestamp for chat messages
 */
export function formatMessageTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}