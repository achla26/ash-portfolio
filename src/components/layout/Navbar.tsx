"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for subtle header enhancement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  // Close menu on route change (hash click)
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 backdrop-blur-[14px] border-b transition-all duration-300",
          scrolled
            ? "bg-ink/80 border-line-strong shadow-[0_1px_20px_rgba(0,0,0,0.3)]"
            : "bg-ink/[0.68] border-line"
        )}
      >
        <nav className="flex items-center justify-between py-[18px] px-8 max-w-content mx-auto max-md:px-5 max-md:py-4">
          {/* Logo */}
          <a
            href="#top"
            className="font-display text-[1.35rem] font-semibold relative z-[60]"
          >
            Achla<span className="text-amber">.</span>dev
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex gap-[30px] list-none m-0 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "font-mono text-[0.78rem] tracking-[0.06em] uppercase no-underline",
                    "text-paper-dim relative pb-[3px]",
                    "after:content-[''] after:absolute after:left-0 after:right-full after:bottom-0",
                    "after:h-px after:bg-amber after:transition-[right] after:duration-300 after:ease-out",
                    "hover:text-paper hover:after:right-0"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#contact"
            className={cn(
              "hidden lg:inline-flex font-mono text-[0.78rem] no-underline text-ink bg-amber",
              "py-[9px] px-[18px] rounded-[5px] font-semibold",
              "transition-colors duration-200 ease-out",
              "hover:bg-amber-soft"
            )}
          >
            Get in touch
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-[60] w-10 h-10 flex items-center justify-center rounded-lg border border-line-strong hover:border-amber transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className={cn(
                  "block h-[1.5px] w-full bg-paper rounded-full transition-all duration-300 origin-center",
                  isOpen && "rotate-45 translate-y-[7.25px]"
                )}
              />
              <span
                className={cn(
                  "block h-[1.5px] w-full bg-paper rounded-full transition-all duration-300",
                  isOpen && "opacity-0 scale-x-0"
                )}
              />
              <span
                className={cn(
                  "block h-[1.5px] w-full bg-paper rounded-full transition-all duration-300 origin-center",
                  isOpen && "-rotate-45 -translate-y-[7.25px]"
                )}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[55] bg-ink/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[56] w-full max-w-[380px] bg-ink-2 border-l border-line-strong lg:hidden overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="pt-24 px-8 pb-12 flex flex-col h-full">
                {/* Nav Links */}
                <nav className="flex-1">
                  <ul className="list-none m-0 p-0 flex flex-col gap-1">
                    {navLinks.map((link, i) => (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        <a
                          href={link.href}
                          onClick={handleLinkClick}
                          className={cn(
                            "block py-4 px-4 rounded-lg font-mono text-[0.9rem] tracking-[0.04em] uppercase",
                            "text-paper-dim no-underline",
                            "hover:text-paper hover:bg-paper/[0.04]",
                            "transition-all duration-200",
                            "border-b border-line"
                          )}
                        >
                          <span className="text-amber mr-3 text-[0.75rem]">
                            0{i + 1}
                          </span>
                          {link.label}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>

                {/* Mobile CTA */}
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <a
                    href="#contact"
                    onClick={handleLinkClick}
                    className={cn(
                      "block text-center font-mono text-[0.85rem] no-underline text-ink bg-amber",
                      "py-[14px] px-6 rounded-lg font-semibold",
                      "hover:bg-amber-soft transition-colors duration-200"
                    )}
                  >
                    Get in touch
                  </a>
                </motion.div>

                {/* Footer info */}
                <motion.div
                  className="mt-8 pt-6 border-t border-line"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="font-mono text-[0.72rem] text-slate m-0 mb-2">
                    Based in Christchurch, NZ
                  </p>
                  <p className="font-mono text-[0.72rem] text-slate m-0">
                    Open to remote - US/EU timezones
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}