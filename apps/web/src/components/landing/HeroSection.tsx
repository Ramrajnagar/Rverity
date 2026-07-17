"use client";

import Link from "next/link";
import { ArrowRight, Code2, Chrome, Github } from "lucide-react";
import { motion } from "framer-motion";
import KnowledgeGraphPreview from "./KnowledgeGraphPreview";
import LiveCodeTerminal from "./LiveCodeTerminal";

export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6 overflow-hidden">
            <div className="mx-auto max-w-6xl">
                <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium text-neutral-500 bg-white/[0.03] border border-white/[0.06] rounded-full">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
                            </span>
                            Rverity v2.0 is live
                        </div>

                        <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-white leading-[1.1] font-display">
                            The operating system
                            <br />
                            <span className="text-neutral-400">for your digital soul.</span>
                        </h1>

                        <p className="mt-5 text-base text-neutral-400 max-w-md leading-relaxed">
                            Unify your code, docs, and fragmented existence into one living,
                            queryable knowledge graph. Built for developers.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
                            <Link
                                href="/signup"
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#00A3FF] hover:bg-[#008FE0] rounded-full transition-colors duration-150"
                            >
                                Install extension
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                            <Link
                                href="/docs"
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-neutral-400 hover:text-white border border-white/[0.08] hover:border-white/[0.15] rounded-full transition-all duration-150"
                            >
                                Read the docs
                            </Link>
                        </div>

                        <div className="flex items-center gap-4 mt-8">
                            <div className="flex items-center gap-2 text-xs text-neutral-500">
                                <Code2 className="h-3.5 w-3.5 text-[#00A3FF]" />
                                <span>VS Code</span>
                            </div>
                            <div className="w-px h-3 bg-white/[0.08]" />
                            <div className="flex items-center gap-2 text-xs text-neutral-500">
                                <Chrome className="h-3.5 w-3.5 text-[#44FFA4]" />
                                <span>Chrome</span>
                            </div>
                            <div className="w-px h-3 bg-white/[0.08]" />
                            <div className="flex items-center gap-2 text-xs text-neutral-500">
                                <Github className="h-3.5 w-3.5 text-[#A78BFA]" />
                                <span>GitHub</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Creative Visual */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-[#00A3FF]/5 blur-[80px] rounded-full pointer-events-none" />
                        <KnowledgeGraphPreview />
                    </motion.div>
                </div>

                {/* Code Terminal Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-16 md:mt-24 max-w-2xl mx-auto"
                >
                    <LiveCodeTerminal />
                </motion.div>
            </div>
        </section>
    );
}
