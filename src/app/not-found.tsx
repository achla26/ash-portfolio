// src/app/not-found.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import { MeshGradient } from "@/components/effects/MeshGradient";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ArrowLeft, Home, FolderOpen, Terminal } from "lucide-react";

export default function NotFound() {
    const reduced = useReducedMotion();

    return (
        <>
            <MeshGradient />
            <GrainOverlay />
            <Navbar />

            <main className="min-h-[80vh] flex items-center justify-center relative z-[1]">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                    <div
                        className="absolute inset-0"
                        style={{
                            background: [
                                "radial-gradient(ellipse 600px 400px at 50% 40%, rgba(212,162,76,0.06), transparent 60%)",
                                "radial-gradient(ellipse 400px 300px at 30% 70%, rgba(155,122,140,0.04), transparent 60%)",
                            ].join(", "),
                        }}
                    />
                    {/* Grid lines */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `
                linear-gradient(rgba(236,228,214,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(236,228,214,0.3) 1px, transparent 1px)
              `,
                            backgroundSize: "80px 80px",
                        }}
                    />
                </div>

                <div className="max-w-content mx-auto px-8 max-md:px-5 w-full relative z-[2]">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
                        {/* Left - content */}
                        <div>
                            {/* Glitch-style 404 */}
                            <motion.div
                                className="mb-8"
                                initial={reduced ? {} : { opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <span className="font-mono text-[0.75rem] tracking-[0.08em] uppercase text-amber mb-4 block">
                                    Error 404
                                </span>
                                <h1 className="font-display text-[clamp(4rem,10vw,8rem)] font-bold leading-none m-0 mb-2 tracking-[-0.03em] text-paper/10 select-none">
                                    404
                                </h1>
                            </motion.div>

                            {/* Message */}
                            <motion.div
                                initial={reduced ? {} : { opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <h2 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-bold mb-4 tracking-[-0.01em]">
                                    This page doesn&apos;t exist.
                                </h2>
                                <p className="text-paper-dim text-[1.05rem] max-w-[48ch] leading-[1.7] mb-8">
                                    Looks like this route returned an empty result set. The page
                                    you&apos;re looking for may have been moved, deleted, or never
                                    existed in the first place.
                                </p>
                            </motion.div>

                            {/* Action links */}
                            <motion.div
                                className="flex flex-col gap-3 max-w-[360px]"
                                initial={reduced ? {} : { opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                            >
                                <Link
                                    href="/"
                                    className="group flex items-center gap-4 p-4 rounded-xl border border-line-strong no-underline text-paper hover:border-amber hover:bg-amber/[0.04] transition-all duration-200"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-amber/10 border border-amber/20 flex items-center justify-center flex-shrink-0">
                                        <Home size={18} className="text-amber" />
                                    </div>
                                    <div>
                                        <span className="block text-[0.9rem] font-medium">
                                            Back to home
                                        </span>
                                        <span className="block font-mono text-[0.7rem] text-paper-dim">
                                            Return to the main page
                                        </span>
                                    </div>
                                    <ArrowLeft
                                        size={16}
                                        className="ml-auto text-slate group-hover:text-amber transition-colors rotate-180"
                                    />
                                </Link>

                                <Link
                                    href="/projects"
                                    className="group flex items-center gap-4 p-4 rounded-xl border border-line-strong no-underline text-paper hover:border-amber hover:bg-amber/[0.04] transition-all duration-200"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-mauve/10 border border-mauve/20 flex items-center justify-center flex-shrink-0">
                                        <FolderOpen size={18} className="text-mauve" />
                                    </div>
                                    <div>
                                        <span className="block text-[0.9rem] font-medium">
                                            View projects
                                        </span>
                                        <span className="block font-mono text-[0.7rem] text-paper-dim">
                                            Browse all my work
                                        </span>
                                    </div>
                                    <ArrowLeft
                                        size={16}
                                        className="ml-auto text-slate group-hover:text-amber transition-colors rotate-180"
                                    />
                                </Link>

                                <Link
                                    href="/#contact"
                                    className="group flex items-center gap-4 p-4 rounded-xl border border-line-strong no-underline text-paper hover:border-amber hover:bg-amber/[0.04] transition-all duration-200"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-signal/10 border border-signal/20 flex items-center justify-center flex-shrink-0">
                                        <Terminal size={18} className="text-signal" />
                                    </div>
                                    <div>
                                        <span className="block text-[0.9rem] font-medium">
                                            Get in touch
                                        </span>
                                        <span className="block font-mono text-[0.7rem] text-paper-dim">
                                            Reach out directly
                                        </span>
                                    </div>
                                    <ArrowLeft
                                        size={16}
                                        className="ml-auto text-slate group-hover:text-amber transition-colors rotate-180"
                                    />
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right - Terminal card */}
                        <motion.div
                            className="hidden lg:block"
                            initial={reduced ? {} : { opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <NotFoundTerminal />
                        </motion.div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}

// --- Terminal showing 404 error ---
function NotFoundTerminal() {
    return (
        <div className="w-[340px] bg-ink-2 border border-line-strong rounded-xl overflow-hidden shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-ink-3/50">
                <span className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]/70" />
                <span className="w-[10px] h-[10px] rounded-full bg-[#febc2e]/70" />
                <span className="w-[10px] h-[10px] rounded-full bg-[#28c840]/70" />
                <span className="ml-3 font-mono text-[0.65rem] text-slate">
                    terminal - Achla
                </span>
            </div>

            {/* Terminal body */}
            <div className="p-4">
                <TerminalLine type="command" text="$ curl -I /this-page" />
                <TerminalLine type="error" text="HTTP/1.1 404 Not Found" />
                <TerminalLine type="dim" text="Content-Type: text/html" />
                <TerminalLine type="dim" text="X-Powered-By: Next.js" />
                <div className="my-3" />
                <TerminalLine type="command" text="$ echo $?" />
                <TerminalLine type="error" text="1 (page not found)" />
                <div className="my-3" />
                <TerminalLine type="command" text="$ suggest --fix" />
                <TerminalLine type="signal" text="→ try / (home)" />
                <TerminalLine type="signal" text="→ try /projects" />
                <TerminalLine type="signal" text="→ try /#contact" />
                <div className="my-3" />
                <TerminalLine type="command" text="$ _" blink />
            </div>
        </div>
    );
}

function TerminalLine({
    type,
    text,
    blink,
}: {
    type: "command" | "error" | "dim" | "signal";
    text: string;
    blink?: boolean;
}) {
    const colorMap = {
        command: "text-amber",
        error: "text-[#ff6b6b]",
        dim: "text-slate",
        signal: "text-signal",
    };

    return (
        <div className="font-mono text-[0.75rem] leading-relaxed flex items-center">
            <span className={colorMap[type]}>{text}</span>
            {blink && (
                <motion.span
                    className="inline-block w-[7px] h-[14px] bg-amber ml-[2px]"
                    animate={{ opacity: [1, 0] }}
                    transition={{
                        duration: 0.8, repeat: Infinity, ease: "linear",
                        repeatDelay: 0.4
                    }}
                />
            )}
        </div>
    );
}