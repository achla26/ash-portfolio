"use client";

import { useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "./useReducedMotion";
import { useIsFinePointer } from "./useIsFinePointer";

export function useTilt<T extends HTMLElement>(
  maxTilt: number = 8,
  scale: number = 1.02
) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const fine = useIsFinePointer();

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el || reduced || !fine) return;

      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      el.style.transform = `perspective(600px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale3d(${scale},${scale},${scale})`;
    },
    [maxTilt, scale, reduced, fine]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !fine) return;

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, reduced, fine]);

  return ref;
}