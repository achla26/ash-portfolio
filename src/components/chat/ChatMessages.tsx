"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { EmptyState } from "./EmptyState";

interface Props {
  messages: Message[];
  onQuestionSelect: (query: string) => void;
}

export function ChatMessages({ messages, onQuestionSelect }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return <EmptyState onQuestionSelect={onQuestionSelect} />;
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 max-md:px-3">
      <div className="max-w-3xl mx-auto">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}