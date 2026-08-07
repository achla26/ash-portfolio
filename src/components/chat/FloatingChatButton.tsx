"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function FloatingChatButton() {
  const pathname = usePathname();

  // Don't show on /chat page itself
  if (pathname === "/chat") return null;

  return (
    <Link
      href="/chat"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label="Chat with AI"
    >
      <div className="relative">
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-amber/40 animate-ping" />
        
        {/* Button */}
        <div className="relative w-14 h-14 rounded-full bg-amber text-ink flex items-center justify-center shadow-lg shadow-amber/30 hover:bg-amber-soft transition-all duration-200 group-hover:scale-110">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </div>

        {/* Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-card border border-line-strong rounded-lg px-3 py-2 whitespace-nowrap">
            <p className="font-mono text-[0.72rem] text-paper">
              💬 Chat with my AI
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}