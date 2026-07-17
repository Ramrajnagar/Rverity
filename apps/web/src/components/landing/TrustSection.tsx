"use client";

import Link from "next/link";
import { Lock, ShieldCheck, Server } from "lucide-react";
import { motion } from "framer-motion";

const trustItems = [
    {
        icon: Lock,
        title: "End-to-end encryption",
        description: "Your knowledge graph is encrypted at rest and in transit. Only you hold the keys.",
    },
    {
        icon: ShieldCheck,
        title: "SOC2 compliant",
        description: "Built on enterprise-grade infrastructure with strict access controls.",
    },
    {
        icon: Server,
        title: "Self-hostable",
        description: "Don't trust our cloud? Run Rverity via Docker on your own infrastructure.",
    },
];

export default function TrustSection() {
    return (
        <section className="py-24 md:py-32 border-t border-white/[0.06]" id="trust">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-white font-display">
                            Security & privacy
                        </h2>
                        <p className="mt-3 text-neutral-400 max-w-lg text-base">
                            We don't train on your code. We don't sell your data. We just sync it.
                        </p>
                    </motion.div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {trustItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                        >
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] border border-white/[0.06] mb-4">
                                <item.icon className="h-4 w-4 text-neutral-400" />
                            </div>
                            <h3 className="text-sm font-semibold text-white mb-2">
                                {item.title}
                            </h3>
                            <p className="text-sm text-neutral-500 leading-relaxed">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="p-12 md:p-16 rounded-2xl bg-white/[0.02] border border-white/[0.06]"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-white font-display mb-4">
                            Ready to unify your digital life?
                        </h2>
                        <p className="text-neutral-400 max-w-lg mx-auto text-base mb-8">
                            Join developers who are reclaiming their cognitive sovereignty.
                            Your second brain is waiting.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/signup"
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#00A3FF] hover:bg-[#008FE0] rounded-full transition-colors duration-150"
                            >
                                Get started for free
                            </Link>
                            <Link
                                href="/docs"
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-neutral-400 hover:text-white border border-white/[0.08] hover:border-white/[0.15] rounded-full transition-all duration-150"
                            >
                                Read the docs
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
