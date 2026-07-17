"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import TrustedBy from "./TrustedBy";

export default function HeroSection() {
    return (
        <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 px-6">
            <div className="mx-auto max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-xs font-medium text-neutral-500 bg-white/[0.03] border border-white/[0.06] rounded-full">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
                        </span>
                        Rverity v2.0 is live
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[-0.03em] text-white leading-[1.08] font-display">
                        The operating system
                        <br />
                        <span className="text-neutral-400">for your digital soul.</span>
                    </h1>

                    <p className="mt-6 text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed">
                        Unify your code, docs, and fragmented existence into one living,
                        queryable knowledge graph. Built for developers who think in systems.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-3 mt-10">
                        <Link
                            href="/signup"
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#00A3FF] hover:bg-[#008FE0] rounded-full transition-colors duration-150"
                        >
                            Get started
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/docs"
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-neutral-400 hover:text-white border border-white/[0.08] hover:border-white/[0.15] rounded-full transition-all duration-150"
                        >
                            Read the docs
                        </Link>
                    </div>

                    <div className="mt-16 w-full max-w-2xl">
                        <TrustedBy />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
