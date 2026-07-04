"use client";

import { useEffect, useState, useRef } from "react";

export function useScrollFade(minOpacity: number = 0.15) {
  const [opacity, setOpacity] = useState(1);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;

      const height = el.clientHeight;
      const fade = 1 - Math.min(1, window.scrollY / (height * 0.9));
      setOpacity(Math.max(minOpacity, fade));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [minOpacity]);

  return { ref, opacity };
}