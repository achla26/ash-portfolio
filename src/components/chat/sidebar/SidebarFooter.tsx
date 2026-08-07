export function SidebarFooter() {
  return (
    <div className="border-t border-line p-4 space-y-3">
      {/* Social Links */}
      <div className="flex items-center gap-4">
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.72rem] text-paper-dim hover:text-amber transition-colors flex items-center gap-1"
        >
          LinkedIn
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
        <a
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[0.72rem] text-paper-dim hover:text-amber transition-colors flex items-center gap-1"
        >
          GitHub
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 pt-2 border-t border-line">
        <span className="w-2 h-2 rounded-full bg-signal animate-livepulse" />
        <div>
          <p className="font-mono text-[0.7rem] text-paper font-medium">
            AI representative online
          </p>
          <p className="text-[0.65rem] text-slate">
            Grounded in resume data
          </p>
        </div>
      </div>
    </div>
  );
}