"use client";

import { useRef, useEffect, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

export function ChatInput({ value, onChange, onSend, disabled }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ✅ Auto-focus on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // ✅ Re-focus when disabled changes (after sending)
  useEffect(() => {
    if (!disabled) {
      textareaRef.current?.focus();
    }
  }, [disabled]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !disabled) onSend();
    }
  };

  return (
    <div className="border-t border-line-strong bg-ink-2/50 backdrop-blur-md">
      <div className="p-4 max-md:p-3">
        <div className="flex gap-2 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              disabled={disabled}
              rows={1}
              className={cn(
                "w-full bg-ink-3 border border-line-strong rounded-xl py-3 px-4",
                "text-paper text-[0.92rem] resize-none outline-none",
                "focus:border-amber transition-colors",
                "placeholder:text-slate disabled:opacity-50",
                "font-body"
              )}
              style={{ maxHeight: "150px" }}
            />
          </div>
          <button
            type="button"
            onClick={onSend}
            disabled={!value.trim() || disabled}
            className={cn(
              "font-mono text-[0.82rem] font-semibold rounded-xl px-5 py-3",
              "bg-amber text-ink transition-all duration-200",
              "hover:bg-amber-soft disabled:opacity-40 disabled:cursor-not-allowed",
              "flex items-center gap-2"
            )}
          >
            <span>Send</span>
            <span>→</span>
          </button>
        </div>
        <p className="font-mono text-[0.65rem] text-slate mt-2 px-1">
          Press <kbd className="text-paper-dim">Enter</kbd> to send,{" "}
          <kbd className="text-paper-dim">Shift + Enter</kbd> for new line
        </p>
      </div>
    </div>
  );
}