"use client";

import { Message } from "@/types/chat";
import { cn } from "@/lib/utils";
import { RetrievalPeek } from "./RetrievalPeek";
import { TypingIndicator } from "./TypingIndicator";
import { MarkdownRenderer } from "./MarkdownRenderer";
import { CopyButton } from "./CopyButton";
import { formatMessageTime } from "@/utils/dateHelpers";

interface Props {
  message: Message;
  isLastMessage?: boolean;  // ✅ To know if it might be streaming
  isStreaming?: boolean;    // ✅ Global streaming state
}

export function MessageBubble({ message, isLastMessage, isStreaming }: Props) {
  const isUser = message.role === "user";

  // Show cursor if: assistant + last message + streaming + has content
  const showCursor =
    !isUser &&
    isLastMessage &&
    isStreaming &&
    !message.isLoading &&
    message.content.length > 0;

  return (
    <div
      className={cn(
        "flex gap-3 mb-6 group",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-mono text-[0.75rem] font-semibold",
          isUser
            ? "bg-mauve/20 text-mauve border border-mauve/30"
            : "bg-amber/20 text-amber border border-amber/30"
        )}
      >
        {isUser ? "You" : "AI"}
      </div>

      {/* Message content */}
      <div
        className={cn(
          "flex flex-col max-w-[75%] max-md:max-w-[85%]",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-3 text-[0.92rem] leading-relaxed relative", 
            "min-h-[44px] flex flex-col justify-center",
            isUser
              ? "bg-mauve/10 border border-mauve/20 text-paper rounded-tr-sm"
              : "bg-card border border-line-strong text-paper rounded-tl-sm"
          )}
        >
          {message.isLoading && !message.content ? (
            <TypingIndicator />
          ) : message.isLoading && message.content ? (
            <div className="flex items-center gap-2">
              <TypingIndicator />
              <span className="text-[0.85rem] text-paper-dim">
                {message.content}
              </span>
            </div>
          ) : isUser ? (
            <div className="whitespace-pre-wrap break-words">
              {message.content}
            </div>
          ) : (
            <div className="relative">
              <MarkdownRenderer content={message.content} />
              {/* ✅ Blinking cursor while streaming */}
              {showCursor && (
                <span className="inline-block w-1.5 h-4 bg-amber ml-0.5 animate-pulse align-middle" />
              )}
            </div>
          )}
        </div>

        {/* Actions bar */}
        {!message.isLoading && !showCursor && (
          <div
            className={cn(
              "flex items-center gap-2 mt-1.5 px-1",
              isUser ? "flex-row-reverse" : "flex-row"
            )}
          >
            <span className="font-mono text-[0.65rem] text-slate">
              {formatMessageTime(message.timestamp)}
            </span>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <CopyButton text={message.content} />
            </div>
          </div>
        )}

        {/* Retrieval peek */}
        {!isUser && message.retrieved && !message.isLoading && !showCursor && (
          <RetrievalPeek chunks={message.retrieved} />
        )}
      </div>
    </div>
  );
}