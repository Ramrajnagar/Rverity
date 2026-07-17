"use client";

import { motion } from "framer-motion";
import { Download, Plug, BarChart3 } from "lucide-react";

const steps = [
    {
        number: "01",
        icon: Download,
        title: "Install the extension",
        description: "Add the Chrome or VS Code extension in one click. Takes 10 seconds.",
        detail: "Chrome Web Store / VS Code Marketplace",
    },
    {
        number: "02",
        icon: Plug,
        title: "Connect your accounts",
        description: "Link GitHub, and we'll start indexing commits, issues, and PRs automatically.",
        detail: "OAuth — no passwords stored",
    },
    {
        number: "03",
        icon: BarChart3,
        title: "See your knowledge graph",
        description: "Watch your digital footprint transform into a navigable, searchable graph.",
        detail: "Real-time sync as you work",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 md:py-32 border-t border-white/[0.06]" id="how-it-works">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-white font-display">
                            How it works
                        </h2>
                        <p className="mt-3 text-neutral-400 max-w-lg text-base">
                            Three steps from zero to a living knowledge graph.
                        </p>
                    </motion.div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className="relative p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] group"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00A3FF]/10 border border-[#00A3FF]/20">
                                    <step.icon className="h-4 w-4 text-[#00A3FF]" />
                                </div>
                                <span className="text-xs font-mono text-neutral-600">
                                    Step {step.number}
                                </span>
                            </div>
                            <h3 className="text-base font-semibold text-white mb-2">
                                {step.title}
                            </h3>
                            <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                                {step.description}
                            </p>
                            <span className="text-xs text-neutral-600 font-mono">
                                {step.detail}
                            </span>

                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                                    <div className="h-6 w-6 rounded-full bg-[#0a0a0a] border border-white/[0.08] flex items-center justify-center">
                                        <span className="text-[10px] text-neutral-600">→</span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
