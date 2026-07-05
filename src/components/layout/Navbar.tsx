// src/components/layout/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Track scroll for header style
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section on scroll (homepage only)
  useEffect(() => {
    if (!isHome) return;

    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const handleLinkClick = () => setIsOpen(false);

  const resolveHref = (href: string) => {
    if (isHome) return href;
    return `/${href}`;
  };

  const isLinkActive = (href: string) => {
    if (href === "/projects") return pathname === "/projects";
    if (isHome) return activeSection === href;
    return false;
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-all duration-500",
          scrolled
            ? "bg-ink/85 backdrop-blur-xl border-line-strong shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "bg-ink/50 backdrop-blur-md border-transparent"
        )}
      >
        <nav className="flex items-center justify-between py-4 px-8 max-w-content mx-auto max-md:px-5">
          <div className="relative z-[60]">
            <Logo href="/" size="md" />
          </div>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            {/* Nav pill container */}
            <div className="flex items-center bg-ink-2/60 border border-line rounded-full px-1 py-1 gap-[2px]">
              {navLinks.map((link) => {
                const active = isLinkActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={resolveHref(link.href)}
                    className={cn(
                      "relative font-mono text-[0.72rem] tracking-[0.05em] uppercase no-underline",
                      "px-4 py-[7px] rounded-full transition-colors duration-200",
                      active
                        ? "text-ink"
                        : "text-paper-dim hover:text-paper"
                    )}
                  >
                    {/* Active pill background */}
                    {active && (
                      <motion.span
                        layoutId="navPill"
                        className="absolute inset-0 bg-amber rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}

              {/* Projects link */}
              <Link
                href="/projects"
                className={cn(
                  "relative font-mono text-[0.72rem] tracking-[0.05em] uppercase no-underline",
                  "px-4 py-[7px] rounded-full transition-colors duration-200",
                  pathname === "/projects"
                    ? "text-ink"
                    : "text-paper-dim hover:text-paper"
                )}
              >
                {pathname === "/projects" && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-0 bg-amber rounded-full"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">Projects</span>
              </Link>
            </div>

            {/* CTA Button */}
            <Link
              href={isHome ? "#contact" : "/#contact"}
              className={cn(
                "ml-5 font-mono text-[0.72rem] tracking-[0.04em] no-underline",
                "text-ink bg-amber px-5 py-[8px] rounded-full font-semibold",
                "transition-all duration-300 ease-out",
                "hover:bg-amber-soft hover:shadow-[0_4px_20px_rgba(212,162,76,0.3)]"
              )}
            >
              Get in touch
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden relative z-[60] w-10 h-10 flex items-center justify-center rounded-full border border-line-strong hover:border-amber hover:bg-amber/[0.05] transition-all duration-200"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <div className="w-[18px] h-[14px] relative flex flex-col justify-between">
              <span
                className={cn(
                  "block h-[1.5px] w-full bg-paper rounded-full transition-all duration-300 origin-center",
                  isOpen && "rotate-45 translate-y-[6.25px]"
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
                  isOpen && "-rotate-45 -translate-y-[6.25px]"
                )}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[55] bg-ink/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[56] w-full max-w-[380px] bg-ink-2 border-l border-line-strong lg:hidden overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="pt-24 px-8 pb-12 flex flex-col h-full">
                <nav className="flex-1">
                  <ul className="list-none m-0 p-0 flex flex-col gap-1">
                    {[
                      ...navLinks,
                      { label: "Projects", href: "/projects" },
                    ].map((link, i) => {
                      const active = isLinkActive(link.href);
                      return (
                        <motion.li
                          key={link.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05 }}
                        >
                          <Link
                            href={
                              link.href.startsWith("/")
                                ? link.href
                                : resolveHref(link.href)
                            }
                            onClick={handleLinkClick}
                            className={cn(
                              "block py-4 px-4 rounded-xl font-mono text-[0.88rem] tracking-[0.04em] uppercase no-underline transition-all duration-200 border-b border-line",
                              active
                                ? "text-amber bg-amber/[0.06]"
                                : "text-paper-dim hover:text-paper hover:bg-paper/[0.03]"
                            )}
                          >
                            <span
                              className={cn(
                                "mr-3 text-[0.72rem]",
                                active ? "text-amber" : "text-slate"
                              )}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {link.label}
                            {active && (
                              <span className="float-right text-amber text-[0.7rem]">
                                ●
                              </span>
                            )}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                {/* CTA */}
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href={isHome ? "#contact" : "/#contact"}
                    onClick={handleLinkClick}
                    className="block text-center font-mono text-[0.85rem] no-underline text-ink bg-amber py-[14px] px-6 rounded-xl font-semibold hover:bg-amber-soft transition-colors duration-200"
                  >
                    Get in touch
                  </Link>
                </motion.div>

                {/* Footer */}
                <motion.div
                  className="mt-8 pt-6 border-t border-line"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="mb-4">
                    <Logo size="sm" />
                  </div>
                  <p className="font-mono text-[0.72rem] text-slate m-0 mb-2">
                    Based in Christchurch, NZ
                  </p>
                  <p className="font-mono text-[0.72rem] text-slate m-0">
                    Open to remote
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