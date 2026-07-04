export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-9 pb-12 text-center font-mono text-[0.75rem] text-slate relative z-[1]">
      <div className="max-w-content mx-auto px-8">
        © {year} Achla.
      </div>
    </footer>
  );
}