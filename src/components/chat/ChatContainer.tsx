"use client";

import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { ChatSidebar } from "./sidebar/ChatSidebar";
import { SidebarToggle } from "./sidebar/SidebarToggle";
import { useChatSessions } from "@/hooks/useChatSessions";
import { sendChatMessage } from "@/services/chatApi";

export function ChatContainer() {
  const {
    sessions,
    activeSession,
    activeSessionId,
    isHydrated,
    createNewSession,
    switchSession,
    deleteSession,
    addMessage,
    updateMessage,
  } = useChatSessions();

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto-create first session if none exists
  useEffect(() => {
    if (isHydrated && sessions.length === 0) {
      createNewSession();
    }
  }, [isHydrated, sessions.length, createNewSession]);

  const messages = activeSession?.messages || [];

  const handleSend = async (queryOverride?: string) => {
    const query = queryOverride || input;
    if (!query.trim() || isLoading) return;

    if (!activeSessionId) {
      createNewSession();
      return;
    }

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: "user",
      content: query,
      timestamp: new Date().toISOString(),
    };
    addMessage(userMessage);

    const loadingMessageId = `msg_${Date.now() + 1}`;
    const loadingMessage: Message = {
      id: loadingMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date().toISOString(),
      isLoading: true,
    };
    addMessage(loadingMessage);

    setInput("");
    setIsLoading(true);

    try {
      // ✅ Pass callback for slow response
      const response = await sendChatMessage(query, () => {
        // Update loading message with friendly text
        updateMessage(loadingMessageId, {
          content: "⏳ Waking up the AI backend... First response takes ~30 seconds. Subsequent responses will be instant!",
          isLoading: true,
        });
      });

      updateMessage(loadingMessageId, {
        content: response.answer,
        retrieved: response.retrieved,
        isLoading: false,
      });
    } catch (error: any) {
      let errorMessage = "Sorry, something went wrong. Please try again.";

      if (error.code === "NETWORK") {
        errorMessage =
          "⚠️ Cannot reach the AI backend. Please check your connection or try again later.";
      } else if (error.code === "TIMEOUT") {
        errorMessage =
          "⏱️ Request took too long. The backend might be waking up — please try again in a moment.";
      } else if (error.code === "SERVER") {
        errorMessage = `⚠️ Server error: ${error.message}`;
      } else if (error.message) {
        errorMessage = `⚠️ ${error.message}`;
      }

      updateMessage(loadingMessageId, {
        content: errorMessage,
        isLoading: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuestionSelect = (query: string) => {
    handleSend(query);
  };

  const handleNewChat = () => {
    createNewSession();
    setSidebarOpen(false);
  };

  // Don't render until hydrated (prevents flash)
  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center h-screen bg-ink">
        <p className="text-slate font-mono text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-ink">
      {/* Sidebar */}
      <ChatSidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onNewChat={handleNewChat}
        onSwitchSession={switchSession}
        onDeleteSession={deleteSession}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile toggle in header */}
        <div className="lg:hidden absolute top-4 left-4 z-30">
          <SidebarToggle onClick={() => setSidebarOpen(true)} />
        </div>

        <ChatHeader />
        <ChatMessages
          messages={messages}
          onQuestionSelect={handleQuestionSelect}
        />
        <ChatInput
          value={input}
          onChange={setInput}
          onSend={() => handleSend()}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}