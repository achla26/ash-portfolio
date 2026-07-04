"use client";

import { useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIsFinePointer } from "@/hooks/useIsFinePointer";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const fine = useIsFinePointer();
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    const ring = ringRef.current;
    if (!ring) return;

    ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
    ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

    ring.style.left = ringPos.current.x + "px";
    ring.style.top = ringPos.current.y + "px";

    requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (!fine || reduced) return;

    const dot = dotRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (dot) {
        dot.style.left = e.clientX + "px";
        dot.style.top = e.clientY + "px";
      }
    };

    // Set initial position
    mousePos.current.x = window.innerWidth / 2;
    mousePos.current.y = window.innerHeight / 2;
    ringPos.current.x = mousePos.current.x;
    ringPos.current.y = mousePos.current.y;

    window.addEventListener("mousemove", handleMouseMove);
    const raf = requestAnimationFrame(animate);

    // Hover states
    const interactives = document.querySelectorAll(
      "a, button, input, [data-tilt], .demo-chip"
    );
    const ring = ringRef.current;

    const addHover = () => ring?.classList.add("hover");
    const removeHover = () => ring?.classList.remove("hover");

    interactives.forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
      document.body.style.cursor = "";
    };
  }, [fine, reduced, animate]);

  if (!fine || reduced) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] bg-amber"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full -translate-x-1/2 -translate-y-1/2 w-[34px] h-[34px] border border-paper/50 transition-all duration-200 ease-out [&.hover]:w-14 [&.hover]:h-14 [&.hover]:border-amber [&.hover]:bg-amber/[0.08]"
        aria-hidden="true"
      />
    </>
  );
}