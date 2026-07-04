export function GrainOverlay() {
  return (
    <svg
      className="fixed inset-0 z-[2] pointer-events-none opacity-[0.045] mix-blend-overlay w-full h-full"
      aria-hidden="true"
    >
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves={2}
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  );
}