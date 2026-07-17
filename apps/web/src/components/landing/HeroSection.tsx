"use client";

import Link from "next/link";
import { ArrowRight, Code2, Chrome, Github, Zap } from "lucide-react";
import { motion } from "framer-motion";
import KnowledgeGraphPreview from "./KnowledgeGraphPreview";
import LiveCodeTerminal from "./LiveCodeTerminal";

const floatingSnippets = [
    { text: "auth.ts", icon: "⚡", x: "-8%", y: "15%", delay: 0.5 },
    { text: "design.v2", icon: "🎨", x: "95%", y: "25%", delay: 0.8 },
    { text: "fix #42", icon: "🔧", x: "-5%", y: "70%", delay: 1.1 },
    { text: "README.md", icon: "📄", x: "92%", y: "65%", delay: 1.4 },
];

export default function HeroSection() {
    return (
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 px-6 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                <div className="grid md:grid-cols-[1fr_1.1fr] gap-8 md:gap-4 items-center">
                    {/* Left: Text + CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium text-neutral-500 bg-white/[0.03] border border-white/[0.06] rounded-full">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A3FF] opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00A3FF]" />
                            </span>
                            Rverity v2.0 is live
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-[3.4rem] lg:text-[3.8rem] font-bold tracking-[-0.035em] text-white leading-[1.08] font-display">
                            The operating system
                            <br />
                            <span className="text-neutral-500">for your digital soul.</span>
                        </h1>

                        <p className="mt-5 text-[15px] text-neutral-500 max-w-md leading-relaxed">
                            Unify your code, docs, and fragmented existence into one living,
                            queryable knowledge graph. Built for developers who ship.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
                            <Link
                                href="/signup"
                                className="group inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-[#00A3FF] hover:bg-[#008FE0] rounded-full transition-all duration-150 shadow-[0_0_20px_rgba(0,163,255,0.25)] hover:shadow-[0_0_30px_rgba(0,163,255,0.35)]"
                            >
                                <Zap className="h-4 w-4" />
                                Install extension
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                            <Link
                                href="/docs"
                                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-neutral-400 hover:text-white border border-white/[0.08] hover:border-white/[0.15] rounded-full transition-all duration-150"
                            >
                                Read the docs
                            </Link>
                        </div>

                        {/* Platform icons */}
                        <div className="flex items-center gap-4 mt-8">
                            <div className="flex items-center gap-2 text-xs text-neutral-600">
                                <Code2 className="h-3.5 w-3.5 text-[#007ACC]" />
                                <span>VS Code</span>
                            </div>
                            <div className="w-px h-3 bg-white/[0.06]" />
                            <div className="flex items-center gap-2 text-xs text-neutral-600">
                                <Chrome className="h-3.5 w-3.5 text-[#4285F4]" />
                                <span>Chrome</span>
                            </div>
                            <div className="w-px h-3 bg-white/[0.06]" />
                            <div className="flex items-center gap-2 text-xs text-neutral-600">
                                <Github className="h-3.5 w-3.5" />
                                <span>GitHub</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Graph with premium frame */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        {/* Ambient glow */}
                        <div className="absolute -inset-10 bg-[#00A3FF]/[0.04] blur-[80px] rounded-full pointer-events-none" />

                        {/* Glass frame */}
                        <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.015] backdrop-blur-sm overflow-hidden p-2 md:p-3">
                            {/* Frame top bar */}
                            <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.04] mb-1">
                                <div className="flex gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-white/10" />
                                    <div className="w-2 h-2 rounded-full bg-white/10" />
                                    <div className="w-2 h-2 rounded-full bg-white/10" />
                                </div>
                                <span className="text-[10px] text-neutral-600 font-mono ml-2">knowledge-graph</span>
                            </div>

                            <KnowledgeGraphPreview />

                            {/* Floating data snippets */}
                            {floatingSnippets.map((s, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm text-[10px] text-neutral-400 font-mono pointer-events-none"
                                    style={{ left: s.x, top: s.y }}
                                    initial={{ opacity: 0, x: i % 2 === 0 ? -8 : 8 }}
                                    animate={{ opacity: [0, 0.7, 0.7, 0], x: [i % 2 === 0 ? -8 : 8, 0, 0, i % 2 === 0 ? 8 : -8] }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        delay: s.delay + 2,
                                        ease: "easeInOut",
                                    }}
                                >
                                    <span>{s.icon}</span>
                                    <span>{s.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Code Terminal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="mt-16 md:mt-20 max-w-2xl mx-auto"
                >
                    <LiveCodeTerminal />
                </motion.div>
            </div>
        </section>
    );
}
