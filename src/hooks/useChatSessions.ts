"use client";

import { useMemo, useCallback, useRef, useEffect } from "react";
import { ChatSession, Message } from "@/types/chat";
import { useLocalStorage } from "./useLocalStorage";

const SESSIONS_KEY = "portfolio_chat_sessions";
const ACTIVE_ID_KEY = "portfolio_active_session_id";

export function useChatSessions() {
  const { value: sessions, setValue: setSessions, isHydrated } =
    useLocalStorage<ChatSession[]>(SESSIONS_KEY, []);

  const { value: activeSessionId, setValue: setActiveSessionId } =
    useLocalStorage<string | null>(ACTIVE_ID_KEY, null);

  // ✅ Ref to always get latest activeSessionId (fixes stale closure)
  const activeSessionIdRef = useRef(activeSessionId);
  useEffect(() => {
    activeSessionIdRef.current = activeSessionId;
  }, [activeSessionId]);

  // Get current active session
  const activeSession = useMemo(() => {
    if (!activeSessionId) return null;
    return sessions.find((s) => s.id === activeSessionId) || null;
  }, [sessions, activeSessionId]);

  // Create a new session
  const createNewSession = useCallback((): ChatSession => {
    const newSession: ChatSession = {
      id: `session_${Date.now()}`,
      title: "New Conversation",
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    activeSessionIdRef.current = newSession.id; // ✅ Update ref immediately
    return newSession;
  }, [setSessions, setActiveSessionId]);

  // Switch to a different session
  const switchSession = useCallback(
    (sessionId: string) => {
      setActiveSessionId(sessionId);
      activeSessionIdRef.current = sessionId; // ✅ Update ref
    },
    [setActiveSessionId]
  );

  // Delete a session
  const deleteSession = useCallback(
    (sessionId: string) => {
      setSessions((prev) => {
        const filtered = prev.filter((s) => s.id !== sessionId);

        if (sessionId === activeSessionIdRef.current) {
          const newActiveId = filtered.length > 0 ? filtered[0].id : null;
          setActiveSessionId(newActiveId);
          activeSessionIdRef.current = newActiveId;
        }

        return filtered;
      });
    },
    [setSessions, setActiveSessionId]
  );

  // ✅ Add message - uses ref for latest activeSessionId
  const addMessage = useCallback(
    (message: Message) => {
      const currentActiveId = activeSessionIdRef.current;
      
      console.log("📝 addMessage called");
      console.log("   - Active ID (ref):", currentActiveId);
      console.log("   - Message:", message);
      
      if (!currentActiveId) {
        console.warn("⚠️ No active session, message not added");
        return;
      }

      setSessions((prev) => {
        console.log("   - Previous sessions count:", prev.length);
        
        const updated = prev.map((session) => {
          if (session.id !== currentActiveId) return session;

          // Auto-generate title from first user message
          let title = session.title;
          if (session.messages.length === 0 && message.role === "user") {
            title =
              message.content.length > 40
                ? message.content.substring(0, 40) + "..."
                : message.content;
          }

          const updatedSession = {
            ...session,
            title,
            messages: [...session.messages, message],
            updatedAt: new Date().toISOString(),
          };
          
          console.log("   - Updated session messages count:", updatedSession.messages.length);
          return updatedSession;
        });
        
        return updated;
      });
    },
    [setSessions]
  );

  // Update a specific message
  const updateMessage = useCallback(
    (messageId: string, updates: Partial<Message>) => {
      const currentActiveId = activeSessionIdRef.current;
      if (!currentActiveId) return;

      setSessions((prev) =>
        prev.map((session) => {
          if (session.id !== currentActiveId) return session;

          return {
            ...session,
            messages: session.messages.map((msg) =>
              msg.id === messageId ? { ...msg, ...updates } : msg
            ),
            updatedAt: new Date().toISOString(),
          };
        })
      );
    },
    [setSessions]
  );

  // Clear all sessions
  const clearAllSessions = useCallback(() => {
    setSessions([]);
    setActiveSessionId(null);
    activeSessionIdRef.current = null;
  }, [setSessions, setActiveSessionId]);

  return {
    sessions,
    activeSession,
    activeSessionId,
    isHydrated,
    createNewSession,
    switchSession,
    deleteSession,
    addMessage,
    updateMessage,
    clearAllSessions,
  };
}