"use client";

import { motion } from "framer-motion";

export function Divider() {
  return (
    <motion.hr
      className="border-none h-px mx-8 max-w-content lg:mx-auto relative z-[1]"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(236,228,214,0.12) 20%, rgba(236,228,214,0.12) 80%, transparent)",
      }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
}