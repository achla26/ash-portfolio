import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export function ChatHeader() {
  return (
    <div className="border-b border-line-strong bg-ink-2/50 backdrop-blur-md">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-[0.78rem] text-paper-dim hover:text-amber transition-colors flex items-center gap-2"
        >
          <span>←</span>
          <span>Back to portfolio</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="text-right max-sm:hidden">
            <p className="font-display text-[0.95rem] font-semibold text-paper leading-tight">
              Chat with <span className="gradient-text">Achla</span>
            </p>
            <p className="font-mono text-[0.65rem] text-slate">
              AI-powered · Real-time
            </p>
          </div>
          <Badge variant="signal">online</Badge>
        </div>
      </div>
    </div>
  );
}