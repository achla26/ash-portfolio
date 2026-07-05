"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function PageLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    if (reduced) {
      setLoading(false);
      return;
    }

    const duration = 2000;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        setTimeout(() => setLoading(false), 400);
      }
    };

    updateProgress();

    return () => {};
  }, [reduced]);

  if (reduced) return <>{children}</>;

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[9999] bg-ink flex items-center justify-center"
            exit={{ 
              opacity: 0,
              transition: { duration: 0.5, ease: "easeInOut" }
            }}
          >
            {/* Interactive background */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ pointerEvents: "auto", cursor: "none" }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center gap-10">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <h1 className="font-display text-3xl font-semibold tracking-tight">
                  <span className="text-parchment">Achla</span>
                  <motion.span
                    className="text-amber inline-block"
                    animate={{ 
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    .
                  </motion.span>
                  <span className="text-parchment">dev</span>
                </h1>
              </motion.div>

              {/* Progress bar */}
              <div className="w-64 relative">
                <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber/60 to-amber rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                
                {/* Percentage */}
                <motion.span
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-mono text-[0.6rem] text-slate/40 tracking-widest"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>

              {/* Status text with typewriter effect */}
              <motion.div
                className="flex flex-col items-center gap-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.span
                  key={Math.floor(progress / 25)}
                  className="font-mono text-[0.65rem] text-slate/50 tracking-[0.15em] uppercase"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {progress < 25 && "Connecting..."}
                  {progress >= 25 && progress < 50 && "Loading resources..."}
                  {progress >= 50 && progress < 75 && "Building interface..."}
                  {progress >= 75 && progress < 100 && "Finalizing..."}
                  {progress >= 100 && "Ready"}
                </motion.span>
              </motion.div>

              {/* Interactive hint - fades out */}
              <motion.span
                className="font-mono text-[0.5rem] text-slate/30 tracking-widest absolute bottom-8"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                move cursor to explore
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}