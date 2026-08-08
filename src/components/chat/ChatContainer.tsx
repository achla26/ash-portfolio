"use client";

import { useState, useEffect } from "react";
import { Message } from "@/types/chat";
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { ChatSidebar } from "./sidebar/ChatSidebar";
import { SidebarToggle } from "./sidebar/SidebarToggle";
import { useChatSessions } from "@/hooks/useChatSessions";
import { sendChatMessageStream } from "@/services/chatApi";

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

    const assistantMessageId = `msg_${Date.now() + 1}`;
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date().toISOString(),
      isLoading: true,
    };
    addMessage(assistantMessage);

    setInput("");
    setIsLoading(true);

    let accumulatedContent = "";

    // ✅ Throttle: batch updates every 50ms instead of every token
    let updateScheduled = false;
    const scheduleUpdate = () => {
      if (updateScheduled) return;
      updateScheduled = true;

      requestAnimationFrame(() => {
        updateMessage(assistantMessageId, {
          content: accumulatedContent,
          isLoading: false,
        });
        updateScheduled = false;
      });
    };

    try {
      await sendChatMessageStream(query, {
        onSlowResponse: () => {
          updateMessage(assistantMessageId, {
            content: "⏳ Waking up the AI backend... First response takes few seconds.",
            isLoading: true,
          });
        },

        onSources: (sources) => {
          updateMessage(assistantMessageId, {
            retrieved: sources,
            isLoading: true,
          });
        },

        onToken: (token) => {
          accumulatedContent += token;
          scheduleUpdate(); // ✅ Use throttled update
        },

        onDone: (fullResponse, sources) => {
          // Final update (no throttling)
          updateMessage(assistantMessageId, {
            content: fullResponse,
            retrieved: sources,
            isLoading: false,
          });
        },

        onError: (error) => {
          let errorMessage = "Sorry, something went wrong. Please try again.";

          // ✅ Rate limit errors (friendly messages)
          if (error.code === "RATE_LIMIT") {
            if (error.limitType === "per_minute") {
              errorMessage = `⏱️ **Slow down!** ${error.message}\n\nThis helps me stay within free tier limits. Thanks for understanding!`;
            } else if (error.limitType === "per_day") {
              errorMessage = `📅 **Daily limit reached!** ${error.message}\n\nYou can continue our conversation tomorrow. Meanwhile, check out my [GitHub](https://github.com/achla) or [LinkedIn](https://linkedin.com/in/achla)!`;
            } else {
              errorMessage = `🚫 **Service busy!** ${error.message}\n\nThe AI is handling lots of conversations right now. Please try again later.`;
            }
          } else if (error.code === "NETWORK") {
            errorMessage = "⚠️ Cannot reach the AI backend. Please check your connection.";
          } else if (error.code === "TIMEOUT") {
            errorMessage = "⏱️ Request took too long. Please try again.";
          } else if (error.code === "SERVER") {
            errorMessage = `⚠️ Server error: ${error.message}`;
          } else if (error.message) {
            errorMessage = `⚠️ ${error.message}`;
          }

          updateMessage(assistantMessageId, {
            content: errorMessage,
            isLoading: false,
          });
        },
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

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center h-screen bg-ink">
        <p className="text-slate font-mono text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-ink">
      <ChatSidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onNewChat={handleNewChat}
        onSwitchSession={switchSession}
        onDeleteSession={deleteSession}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="lg:hidden absolute top-4 left-4 z-30">
          <SidebarToggle onClick={() => setSidebarOpen(true)} />
        </div>

        <ChatHeader />
        <ChatMessages
          messages={messages}
          onQuestionSelect={handleQuestionSelect}
          isStreaming={isLoading}
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