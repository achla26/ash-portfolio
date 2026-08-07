"use client";

import { useState } from "react";
import { ChatSession } from "@/types/chat";
import { getRelativeTime } from "@/utils/dateHelpers";
import { cn } from "@/lib/utils";

interface Props {
  session: ChatSession;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
}

export function SessionItem({ session, isActive, onClick, onDelete }: Props) {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onClick of parent
    if (showConfirm) {
      onDelete();
    } else {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "w-full text-left p-3 rounded-lg group transition-all duration-200 relative cursor-pointer",
        isActive
          ? "bg-amber/10 border border-amber/30"
          : "border border-transparent hover:bg-ink-3 hover:border-line"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "text-[0.85rem] font-medium truncate",
              isActive ? "text-amber" : "text-paper"
            )}
          >
            {session.title}
          </p>
          <p className="font-mono text-[0.65rem] text-slate mt-1">
            {getRelativeTime(session.updatedAt)}
          </p>
        </div>

        {/* Delete button - now valid because parent is <div> */}
        <button
          type="button"
          onClick={handleDelete}
          className={cn(
            "flex-shrink-0 p-1.5 rounded-md transition-all",
            showConfirm
              ? "opacity-100 bg-red-500/20 text-red-400"
              : "opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:text-red-400 text-slate"
          )}
          aria-label={showConfirm ? "Confirm delete" : "Delete conversation"}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6" />
          </svg>
        </button>
      </div>

      {showConfirm && (
        <p className="text-[0.65rem] text-red-400 mt-1.5">
          Click delete again to confirm
        </p>
      )}
    </div>
  );
}