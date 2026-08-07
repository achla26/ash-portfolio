"use client";

import { ChatSession } from "@/types/chat";
import { SidebarHeader } from "./SidebarHeader";
import { NewConversationButton } from "./NewConversationButton";
import { SessionsList } from "./SessionsList";
import { SidebarFooter } from "./SidebarFooter";
import { cn } from "@/lib/utils";

interface Props {
  sessions: ChatSession[];
  activeSessionId: string | null;
  onNewChat: () => void;
  onSwitchSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function ChatSidebar({
  sessions,
  activeSessionId,
  onNewChat,
  onSwitchSession,
  onDeleteSession,
  isOpen,
  onClose,
}: Props) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-[300px] bg-ink-2 border-r border-line-strong z-50 flex flex-col transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <SidebarHeader />
        <NewConversationButton onClick={onNewChat} />

        {/* Divider label */}
        <div className="px-4 pb-2">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-slate">
            Chat History
          </p>
        </div>

        <SessionsList
          sessions={sessions}
          activeSessionId={activeSessionId}
          onSwitch={(id) => {
            onSwitchSession(id);
            onClose(); // Close on mobile
          }}
          onDelete={onDeleteSession}
        />

        <SidebarFooter />
      </aside>
    </>
  );
}