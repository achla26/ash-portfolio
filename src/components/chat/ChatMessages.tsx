"use client";

import { useEffect, useRef, useState } from "react";
import { Message } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { EmptyState } from "./EmptyState";
import { cn } from "@/lib/utils";

interface Props {
  messages: Message[];
  onQuestionSelect: (query: string) => void;
  isStreaming?: boolean;
}

export function ChatMessages({ messages, onQuestionSelect, isStreaming }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Detect if user is at bottom
  const checkIfAtBottom = () => {
    const container = containerRef.current;
    if (!container) return;

    const threshold = 100; // pixels from bottom
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;

    const atBottom = distanceFromBottom < threshold;
    setIsAtBottom(atBottom);
    setShowScrollButton(!atBottom && messages.length > 0);
  };

  // ✅ Listen to scroll events
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", checkIfAtBottom);
    return () => container.removeEventListener("scroll", checkIfAtBottom);
  }, [messages.length]);

  // ✅ Scroll only on new message (not on every token)
  useEffect(() => {
    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]); // Only length dependency

  // ✅ Gentle scroll during streaming (throttled by RAF)
  useEffect(() => {
    if (!isStreaming || !isAtBottom) return;

    let rafId: number;
    const scroll = () => {
      bottomRef.current?.scrollIntoView({ behavior: "auto" });
    };

    const interval = setInterval(scroll, 500); // Every 500ms during streaming

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(rafId);
    };
  }, [isStreaming, isAtBottom]);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (messages.length === 0) {
    return <EmptyState onQuestionSelect={onQuestionSelect} />;
  }

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Messages container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto px-4 py-6 max-md:px-3 subtle-scrollbar"
      >
        <div className="max-w-3xl mx-auto">
          {messages.map((msg, index) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isLastMessage={index === messages.length - 1}
              isStreaming={isStreaming}
            />
          ))}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* ✅ Scroll to bottom button */}
      {showScrollButton && (
        <button
          type="button"
          onClick={scrollToBottom}
          className={cn(
            "absolute bottom-4 left-1/2 -translate-x-1/2 z-10",
            "flex items-center gap-2 px-3 py-2 rounded-full",
            "bg-amber text-ink font-mono text-[0.72rem] font-semibold",
            "shadow-lg hover:bg-amber-soft transition-all duration-200"
          )}
          aria-label="Scroll to bottom"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
          <span>Scroll to bottom</span>
        </button>
      )}
    </div>
  );
}