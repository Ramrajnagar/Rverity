"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, Zap, Layers, Infinity as InfinityIcon } from "lucide-react";

const phases = [
    {
        phase: "01",
        title: "The second brain",
        description: "The core Knowledge Graph is live. Sync your digital life into a unified, queryable cortex.",
        icon: Brain,
    },
    {
        phase: "02",
        title: "Predictive context",
        description: "Context before you ask. Rverity anticipates your needs, pre-loading documentation and history.",
        icon: Zap,
    },
    {
        phase: "03",
        title: "Agentic operations",
        description: "Autonomous workflows. Rverity agents execute code refactors, draft docs, and sync PRs.",
        icon: Layers,
    },
    {
        phase: "04",
        title: "Neural integration",
        description: "Direct IDE injection. Thinking in code. The next stage of human-computer interaction.",
        icon: InfinityIcon,
    },
];

export default function VisionSection() {
    return (
        <section className="py-24 md:py-32 border-t border-white/[0.06]" id="roadmap">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-white font-display">
                            Roadmap
                        </h2>
                        <p className="mt-3 text-neutral-400 max-w-lg text-base">
                            We aren't just looking at the future. We're building it.
                        </p>
                    </motion.div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {phases.map((item, i) => (
                        <motion.div
                            key={item.phase}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="group p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-150"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.06]">
                                    <item.icon className="h-4 w-4 text-neutral-400 group-hover:text-[#00A3FF] transition-colors duration-150" />
                                </div>
                                <span className="text-xs font-mono text-neutral-600">
                                    Phase {item.phase}
                                </span>
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-neutral-500 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Link
                        href="/manifesto"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-neutral-400 hover:text-white border border-white/[0.08] hover:border-white/[0.15] rounded-full transition-all duration-150"
                    >
                        Read the manifesto
                    </Link>
                </div>
            </div>
        </section>
    );
}
