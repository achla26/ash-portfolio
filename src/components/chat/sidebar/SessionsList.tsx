"use client";

import { ChatSession } from "@/types/chat";
import { groupSessionsByDate } from "@/utils/dateHelpers";
import { SessionItem } from "./SessionItem";

interface Props {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onSwitch: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SessionsList({
  sessions,
  activeSessionId,
  onSwitch,
  onDelete,
}: Props) {
  const grouped = groupSessionsByDate(sessions);

  const groups = [
    { label: "Today", items: grouped.today },
    { label: "Yesterday", items: grouped.yesterday },
    { label: "Last 7 days", items: grouped.lastWeek },
    { label: "Older", items: grouped.older },
  ];

  if (sessions.length === 0) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="text-[0.8rem] text-slate">No conversations yet</p>
        <p className="text-[0.7rem] text-slate mt-1">
          Start a new conversation above
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-3 pb-4 subtle-scrollbar">
      {groups.map(
        (group) =>
          group.items.length > 0 && (
            <div key={group.label} className="mb-4">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-slate px-3 mb-2">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((session) => (
                  <SessionItem
                    key={session.id}
                    session={session}
                    isActive={session.id === activeSessionId}
                    onClick={() => onSwitch(session.id)}
                    onDelete={() => onDelete(session.id)}
                  />
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
}