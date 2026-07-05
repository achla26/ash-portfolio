// src/components/effects/GridWarp.tsx
"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsFinePointer } from "@/hooks/useIsFinePointer";

export function GridWarp() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const reduced = useReducedMotion();
  const fine = useIsFinePointer();

  useEffect(() => {
    if (reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animFrame = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const spacing = 40;
    const warpRadius = 180;
    const warpStrength = 25;
    const dotBaseSize = 1;
    const dotMaxSize = 4;

    let time = 0;

    const animate = () => {
      time += 0.005;
      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hasMouse = fine && mx > 0 && my > 0;

      // Draw cursor glow
      if (hasMouse) {
        // Outer glow
        const outerGlow = ctx.createRadialGradient(
          mx, my, 0,
          mx, my, warpRadius
        );
        outerGlow.addColorStop(0, "rgba(212,162,76, 0.08)");
        outerGlow.addColorStop(0.5, "rgba(212,162,76, 0.03)");
        outerGlow.addColorStop(1, "rgba(212,162,76, 0)");
        ctx.beginPath();
        ctx.arc(mx, my, warpRadius, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // Inner core
        const innerGlow = ctx.createRadialGradient(
          mx, my, 0,
          mx, my, 50
        );
        innerGlow.addColorStop(0, "rgba(212,162,76, 0.12)");
        innerGlow.addColorStop(1, "rgba(212,162,76, 0)");
        ctx.beginPath();
        ctx.arc(mx, my, 50, 0, Math.PI * 2);
        ctx.fillStyle = innerGlow;
        ctx.fill();
      }

      // Draw grid dots
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let x = col * spacing;
          let y = row * spacing;

          // Subtle wave
          x += Math.sin(y * 0.01 + time) * 3;
          y += Math.cos(x * 0.01 + time) * 3;

          let dotSize = dotBaseSize;
          let alpha = 0.15;
          let color = "236,228,214"; // paper

          if (hasMouse) {
            const dx = x - mx;
            const dy = y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < warpRadius) {
              const force = (warpRadius - dist) / warpRadius;
              const angle = Math.atan2(dy, dx);

              // Warp position away from cursor
              x += Math.cos(angle) * force * warpStrength;
              y += Math.sin(angle) * force * warpStrength;

              // Grow dot size
              dotSize = dotBaseSize + force * (dotMaxSize - dotBaseSize);

              // Brighten
              alpha = 0.15 + force * 0.7;

              // Color shift: paper → amber near cursor
              if (force > 0.3) {
                color = "212,162,76"; // amber
              } else if (force > 0.15) {
                color = "232,201,138"; // amber-soft
              }
            }
          }

          // Draw dot
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${alpha})`;
          ctx.fill();

          // Draw glow on bright dots
          if (dotSize > 2.5) {
            const glow = ctx.createRadialGradient(
              x, y, 0,
              x, y, dotSize * 4
            );
            glow.addColorStop(0, `rgba(212,162,76, ${alpha * 0.2})`);
            glow.addColorStop(1, "rgba(212,162,76, 0)");
            ctx.beginPath();
            ctx.arc(x, y, dotSize * 4, 0, Math.PI * 2);
            ctx.fillStyle = glow;
            ctx.fill();
          }

          // Draw connection lines to nearby warped dots
          if (hasMouse && dotSize > 2) {
            // Connect to right neighbor
            if (col < cols - 1) {
              let nx = (col + 1) * spacing;
              let ny = row * spacing;
              nx += Math.sin(ny * 0.01 + time) * 3;
              ny += Math.cos(nx * 0.01 + time) * 3;

              const ndx = nx - mx;
              const ndy = ny - my;
              const ndist = Math.sqrt(ndx * ndx + ndy * ndy);

              if (ndist < warpRadius) {
                const nforce = (warpRadius - ndist) / warpRadius;
                const nangle = Math.atan2(ndy, ndx);
                nx += Math.cos(nangle) * nforce * warpStrength;
                ny += Math.sin(nangle) * nforce * warpStrength;

                const lineAlpha = Math.min(alpha, 0.15) * 0.8;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(nx, ny);
                ctx.strokeStyle = `rgba(212,162,76, ${lineAlpha})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }

            // Connect to bottom neighbor
            if (row < rows - 1) {
              let nx = col * spacing;
              let ny = (row + 1) * spacing;
              nx += Math.sin(ny * 0.01 + time) * 3;
              ny += Math.cos(nx * 0.01 + time) * 3;

              const ndx = nx - mx;
              const ndy = ny - my;
              const ndist = Math.sqrt(ndx * ndx + ndy * ndy);

              if (ndist < warpRadius) {
                const nforce = (warpRadius - ndist) / warpRadius;
                const nangle = Math.atan2(ndy, ndx);
                nx += Math.cos(nangle) * nforce * warpStrength;
                ny += Math.sin(nangle) * nforce * warpStrength;

                const lineAlpha = Math.min(alpha, 0.15) * 0.8;
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(nx, ny);
                ctx.strokeStyle = `rgba(212,162,76, ${lineAlpha})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
        }
      }

      animFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reduced, fine]);

  if (reduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "auto" }}
      aria-hidden="true"
    />
  );
}