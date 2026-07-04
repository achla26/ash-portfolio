export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-9 pb-12 text-center font-mono text-[0.75rem] text-slate relative z-[1]">
      <div className="max-w-content mx-auto px-8 flex flex-col items-center gap-3">
        <p>© {year} Achla.dev</p>
        <p className="text-[0.6rem] text-slate/40 flex items-center gap-2">
          <span>Built with</span>
          <span className="text-amber">Next.js</span>
          <span className="text-slate/30">·</span>
          <span className="text-signal">React</span>
          <span className="text-slate/30">·</span>
          <span className="text-amber-soft">TypeScript</span>
          <span className="text-slate/30">·</span>
          <span className="text-mauve">Tailwind</span>
        </p>
      </div>
    </footer>
  );
}