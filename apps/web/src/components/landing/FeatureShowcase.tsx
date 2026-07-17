"use client";

import Link from "next/link";
import { Search, Shield, Brain, Zap } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: Search,
        title: "Unified context",
        description: "Index your entire digital existence. Code, docs, tickets — all unified in one queryable knowledge graph.",
        href: "/features/graph",
        span: "md:col-span-2",
    },
    {
        icon: Shield,
        title: "Local-first encryption",
        description: "Your knowledge graph lives on your machine. Zero-knowledge cloud sync optional.",
        href: "/security",
        span: "md:col-span-1",
    },
    {
        icon: Brain,
        title: "Predictive context engine",
        description: "The graph learns your workflow patterns and pre-fetches context before you even ask.",
        href: "/features/graph",
        span: "md:col-span-1",
    },
    {
        icon: Zap,
        title: "Instant capture",
        description: "Save code snippets, links, and thoughts in milliseconds. No context switching required.",
        href: "/docs",
        span: "md:col-span-2",
    },
];

export default function FeatureShowcase() {
    return (
        <section className="py-24 md:py-32 border-t border-white/[0.06]" id="features">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-white font-display">
                            Core features
                        </h2>
                        <p className="mt-3 text-neutral-400 max-w-lg text-base leading-relaxed">
                            Everything you need to unify your digital footprint into a single, queryable system.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {features.map((feature, i) => (
                        <Link
                            key={i}
                            href={feature.href}
                            className={`group relative p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-150 ${feature.span}`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.06]">
                                    <feature.icon className="h-4 w-4 text-neutral-400 group-hover:text-[#00A3FF] transition-colors duration-150" />
                                </div>
                                <h3 className="text-sm font-semibold text-white">
                                    {feature.title}
                                </h3>
                            </div>
                            <p className="text-sm text-neutral-500 leading-relaxed">
                                {feature.description}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
