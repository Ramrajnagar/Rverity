"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import ProductMockup from "./ProductMockup";
import LiveCodeTerminal from "./LiveCodeTerminal";

export default function HeroSection() {
    return (
        <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 px-6 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                {/* Centered text */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-center max-w-3xl mx-auto"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium text-neutral-500 bg-white/[0.03] border border-white/[0.06] rounded-full">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00A3FF] opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00A3FF]" />
                        </span>
                        v2.0 — now with real-time sync
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] font-bold tracking-[-0.035em] text-white leading-[1.06] font-display">
                        The API for your
                        <br />
                        <span className="text-neutral-500">digital memory.</span>
                    </h1>

                    <p className="mt-5 text-[15px] text-neutral-500 max-w-lg mx-auto leading-relaxed">
                        Capture, search, and connect context from every tool you use.
                        One API. One graph. Built for developers.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
                        <Link
                            href="/signup"
                            className="group inline-flex items-center gap-2.5 px-6 py-3 text-sm font-semibold text-white bg-[#00A3FF] hover:bg-[#008FE0] rounded-full transition-all duration-150 shadow-[0_0_20px_rgba(0,163,255,0.25)] hover:shadow-[0_0_30px_rgba(0,163,255,0.35)]"
                        >
                            <Zap className="h-4 w-4" />
                            Get your API key
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                            href="/docs"
                            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-neutral-400 hover:text-white border border-white/[0.08] hover:border-white/[0.15] rounded-full transition-all duration-150"
                        >
                            Read the docs
                        </Link>
                    </div>

                    {/* Metrics bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="flex items-center justify-center gap-6 mt-10"
                    >
                        {[
                            { value: "2.8M+", label: "memories captured" },
                            { value: "12,400+", label: "developers" },
                            { value: "99.9%", label: "uptime" },
                        ].map((m, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white tracking-tight">{m.value}</span>
                                <span className="text-[11px] text-neutral-600">{m.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Product mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-14 md:mt-18 max-w-5xl mx-auto"
                >
                    <div className="relative">
                        <div className="absolute -inset-8 bg-[#00A3FF]/[0.04] blur-[60px] rounded-full pointer-events-none" />
                        <ProductMockup />
                    </div>
                </motion.div>

                {/* Code terminal */}
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
