// src/components/effects/GridWarpField.tsx
"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsFinePointer } from "@/hooks/useIsFinePointer";

interface Orb {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  radius: number;
  color: string;
  speed: number;
  phase: number;
}

export function GridWarpField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const orbsRef = useRef<Orb[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
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

      // Create orbs
      orbsRef.current = [
        {
          x: width * 0.7,
          y: height * 0.3,
          targetX: width * 0.7,
          targetY: height * 0.3,
          radius: 300,
          color: "212,162,76", // amber
          speed: 0.0008,
          phase: 0,
        },
        {
          x: width * 0.3,
          y: height * 0.7,
          targetX: width * 0.3,
          targetY: height * 0.7,
          radius: 250,
          color: "155,122,140", // mauve
          speed: 0.0006,
          phase: Math.PI * 0.7,
        },
        {
          x: width * 0.8,
          y: height * 0.8,
          targetX: width * 0.8,
          targetY: height * 0.8,
          radius: 200,
          color: "127,169,160", // signal
          speed: 0.001,
          phase: Math.PI * 1.4,
        },
      ];
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

    // Grid settings
    const gridSpacing = 40;
    const dotBaseSize = 1;
    const warpRadius = 180;
    const warpStrength = 20;
    const glowRadius = 120;

    const animate = () => {
      timeRef.current += 1;
      const t = timeRef.current;

      ctx.clearRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const hasMouse = fine && mx > 0 && my > 0;

      // --- Update and draw orbs ---
      orbsRef.current.forEach((orb) => {
        // Gentle floating motion
        orb.x =
          orb.targetX +
          Math.sin(t * orb.speed + orb.phase) * 60;
        orb.y =
          orb.targetY +
          Math.cos(t * orb.speed * 1.3 + orb.phase) * 40;

        // Mouse influence on orbs - subtle attraction
        if (hasMouse) {
          const dx = mx - orb.x;
          const dy = my - orb.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 400) {
            const pull = (400 - dist) / 400;
            orb.x += dx * pull * 0.02;
            orb.y += dy * pull * 0.02;
          }
        }

        // Draw orb glow
        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        );
        gradient.addColorStop(0, `rgba(${orb.color}, 0.08)`);
        gradient.addColorStop(0.4, `rgba(${orb.color}, 0.04)`);
        gradient.addColorStop(1, `rgba(${orb.color}, 0)`);

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // --- Draw grid dots ---
      const cols = Math.ceil(width / gridSpacing) + 2;
      const rows = Math.ceil(height / gridSpacing) + 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          let x = col * gridSpacing;
          let y = row * gridSpacing;

          let dotSize = dotBaseSize;
          let dotAlpha = 0.15;
          let dotColor = "236,228,214"; // paper

          // --- Cursor warp effect ---
          if (hasMouse) {
            const dx = x - mx;
            const dy = y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < warpRadius) {
              const force = (warpRadius - dist) / warpRadius;
              const easedForce = force * force; // ease in quad

              // Push dots away from cursor
              const angle = Math.atan2(dy, dx);
              x += Math.cos(angle) * easedForce * warpStrength;
              y += Math.sin(angle) * easedForce * warpStrength;

              // Grow and brighten near cursor
              dotSize = dotBaseSize + easedForce * 3;
              dotAlpha = 0.15 + easedForce * 0.7;
              dotColor = "212,162,76"; // amber

              // Draw connection line to cursor from very close dots
              if (dist < glowRadius) {
                const lineAlpha = (1 - dist / glowRadius) * 0.2;
                ctx.beginPath();
                ctx.moveTo(mx, my);
                ctx.lineTo(x, y);
                ctx.strokeStyle = `rgba(212,162,76, ${lineAlpha})`;
                ctx.lineWidth = 0.5 + (1 - dist / glowRadius) * 1;
                ctx.stroke();
              }
            }
          }

          // Subtle ambient pulse
          const pulse =
            Math.sin(t * 0.015 + col * 0.3 + row * 0.3) * 0.05;
          const finalAlpha = Math.max(0.05, dotAlpha + pulse);

          // Check if dot is near an orb - tint the color
          orbsRef.current.forEach((orb) => {
            const dx = x - orb.x;
            const dy = y - orb.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < orb.radius * 0.6) {
              const proximity = 1 - dist / (orb.radius * 0.6);
              dotAlpha = Math.min(0.5, dotAlpha + proximity * 0.2);
              dotColor = orb.color;
              dotSize = Math.max(dotSize, dotBaseSize + proximity * 1.5);
            }
          });

          // Draw dot
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${dotColor}, ${finalAlpha})`;
          ctx.fill();

          // Draw glow on larger dots
          if (dotSize > 2) {
            const glowGradient = ctx.createRadialGradient(
              x,
              y,
              0,
              x,
              y,
              dotSize * 4
            );
            glowGradient.addColorStop(
              0,
              `rgba(${dotColor}, ${finalAlpha * 0.3})`
            );
            glowGradient.addColorStop(1, `rgba(${dotColor}, 0)`);
            ctx.beginPath();
            ctx.arc(x, y, dotSize * 4, 0, Math.PI * 2);
            ctx.fillStyle = glowGradient;
            ctx.fill();
          }
        }
      }

      // --- Cursor glow ---
      if (hasMouse) {
        // Outer warm glow
        const outerGlow = ctx.createRadialGradient(mx, my, 0, mx, my, warpRadius);
        outerGlow.addColorStop(0, "rgba(212,162,76, 0.1)");
        outerGlow.addColorStop(0.5, "rgba(212,162,76, 0.03)");
        outerGlow.addColorStop(1, "rgba(212,162,76, 0)");
        ctx.beginPath();
        ctx.arc(mx, my, warpRadius, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // Inner cursor point
        const innerGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 8);
        innerGlow.addColorStop(0, "rgba(212,162,76, 0.5)");
        innerGlow.addColorStop(1, "rgba(212,162,76, 0)");
        ctx.beginPath();
        ctx.arc(mx, my, 8, 0, Math.PI * 2);
        ctx.fillStyle = innerGlow;
        ctx.fill();

        // Draw grid lines that warp near cursor
        ctx.strokeStyle = "rgba(212,162,76, 0.06)";
        ctx.lineWidth = 0.5;

        // Horizontal lines
        for (let row = 0; row < rows; row++) {
          ctx.beginPath();
          let started = false;

          for (let col = 0; col < cols; col++) {
            let x = col * gridSpacing;
            let y = row * gridSpacing;

            const dx = x - mx;
            const dy = y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < warpRadius) {
              const force =
                ((warpRadius - dist) / warpRadius) ** 2;
              const angle = Math.atan2(dy, dx);
              x += Math.cos(angle) * force * warpStrength;
              y += Math.sin(angle) * force * warpStrength;

              ctx.strokeStyle = `rgba(212,162,76, ${0.04 + force * 0.1})`;
            } else {
              ctx.strokeStyle = "rgba(236,228,214, 0.03)";
            }

            if (!started) {
              ctx.moveTo(x, y);
              started = true;
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }

        // Vertical lines
        for (let col = 0; col < cols; col++) {
          ctx.beginPath();
          let started = false;

          for (let row = 0; row < rows; row++) {
            let x = col * gridSpacing;
            let y = row * gridSpacing;

            const dx = x - mx;
            const dy = y - my;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < warpRadius) {
              const force =
                ((warpRadius - dist) / warpRadius) ** 2;
              const angle = Math.atan2(dy, dx);
              x += Math.cos(angle) * force * warpStrength;
              y += Math.sin(angle) * force * warpStrength;

              ctx.strokeStyle = `rgba(212,162,76, ${0.04 + force * 0.1})`;
            } else {
              ctx.strokeStyle = "rgba(236,228,214, 0.03)";
            }

            if (!started) {
              ctx.moveTo(x, y);
              started = true;
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.stroke();
        }
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
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