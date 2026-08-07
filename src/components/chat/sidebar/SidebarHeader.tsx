export function SidebarHeader() {
  return (
    <div className="p-5 border-b border-line">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-11 h-11 rounded-xl bg-amber/20 border border-amber/30 flex items-center justify-center">
            <span className="font-display text-lg font-semibold text-amber">
              A
            </span>
          </div>
          {/* Online dot */}
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-signal border-2 border-ink" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.08em] text-slate">
            AI Representative
          </p>
          <p className="font-display text-[1.05rem] font-semibold text-paper leading-tight mt-0.5">
            Candidate AI
          </p>
          <p className="text-[0.75rem] text-paper-dim truncate mt-0.5">
            Achla
          </p>
        </div>
      </div>
    </div>
  );
}