export function MeshGradient() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: [
          "radial-gradient(ellipse 900px 620px at 88% -8%, rgba(212,162,76,0.1), transparent 60%)",
          "radial-gradient(ellipse 760px 620px at -8% 30%, rgba(155,122,140,0.08), transparent 60%)",
          "radial-gradient(ellipse 620px 500px at 60% 95%, rgba(127,169,160,0.07), transparent 60%)",
        ].join(", "),
      }}
      aria-hidden="true"
    />
  );
}