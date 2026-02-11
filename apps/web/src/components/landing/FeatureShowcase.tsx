"use client";

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Link from "next/link";
import { Brain, Search, Shield, Zap, FileCode, CheckCircle2, Lock, Database } from "lucide-react";
import Section from "@/components/ui/Section";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";

export default function FeatureShowcase() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const items = [
        {
            title: "Omniscient Context",
            description: "Rverity indexes your entire digital existence. Code, docs, linear tickets—all unified in one queryable graph.",
            header: <ContextVisual />,
            icon: <Search className="h-4 w-4 text-cyan-400" />,
            className: "md:col-span-2 group/bento",
            href: "/features/graph"
        },
        {
            title: "Local-First Encryption",
            description: "Your external brain lives on your metal. Zero-knowledge cloud sync optional.",
            header: <EncryptionVisual />,
            icon: <Shield className="h-4 w-4 text-emerald-400" />,
            className: "md:col-span-1 group/bento",
            href: "/security"
        },
        {
            title: "Neural Resonance",
            description: "The graph learns your workflow patterns and pre-fetches context before you even ask.",
            header: <ResonanceVisual />,
            icon: <Brain className="h-4 w-4 text-purple-400" />,
            className: "md:col-span-1 group/bento",
            href: "/features/graph"
        },
        {
            title: "Instant Capture",
            description: "Save code snippets, links, and thoughts in milliseconds. No context switching required.",
            header: <CaptureVisual />,
            icon: <Zap className="h-4 w-4 text-yellow-400" />,
            className: "md:col-span-2 group/bento",
            href: "/docs"
        },
    ];

    return (
        <Section className="py-32 relative overflow-hidden" id="features">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl opacity-20 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px]" />
            </div>

            <div className="mb-20 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 font-display">
                        CORE PROTOCOLS
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Rverity isn't just a tool. It's the <span className="text-white font-semibold">operating system</span> for your digital consciousness.
                        Engineered for speed, privacy, and absolute truth.
                    </p>
                </motion.div>
            </div>

            <div className="relative group max-w-5xl mx-auto z-10" onMouseMove={handleMouseMove}>
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                            650px circle at ${mouseX}px ${mouseY}px,
                            rgba(14, 165, 233, 0.15),
                            transparent 80%
                            )
                        `,
                    }}
                />
                <BentoGrid>
                    {items.map((item, i) => (
                        <Link key={i} href={item.href} className={item.className}>
                            <BentoGridItem
                                title={item.title}
                                description={item.description}
                                header={item.header}
                                icon={item.icon}
                                className="h-full bg-zinc-900/50 border-white/5 hover:bg-zinc-900/80 transition-colors"
                            />
                        </Link>
                    ))}
                </BentoGrid>
            </div>
        </Section>
    );
}

// -----------------------------------------------------------------------------
// Visualizations
// -----------------------------------------------------------------------------

const ContextVisual = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-800 p-4 relative overflow-hidden flex-col gap-2">
        <div className="flex items-center gap-2 p-2 bg-black/50 rounded-lg border border-white/5">
            <Search className="h-3 w-3 text-zinc-400" />
            <div className="h-2 w-24 bg-zinc-700/50 rounded-full animate-pulse" />
        </div>
        <div className="flex flex-col gap-2 mt-2">
            {[1, 2, 3].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2, repeat: Infinity, repeatDelay: 2 }}
                    className="flex items-center gap-3 p-2 rounded hover:bg-white/5 transition-colors"
                >
                    <FileCode className="h-3 w-3 text-cyan-400" />
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full" />
                </motion.div>
            ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />
    </div>
);

const EncryptionVisual = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-800 relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <motion.div
            animate={{ boxShadow: ["0 0 0px #10b981", "0 0 20px #10b981", "0 0 0px #10b981"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="relative z-10 h-16 w-16 bg-neutral-900 border border-emerald-500/50 rounded-2xl flex items-center justify-center"
        >
            <Lock className="h-6 w-6 text-emerald-400" />
        </motion.div>
        <div className="absolute bottom-4 text-[10px] font-mono text-emerald-500/80">LOCALHOST :: ENCRYPTED</div>
    </div>
);

const ResonanceVisual = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-32 w-32">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="absolute top-1/2 left-1/2 h-2 w-2 bg-purple-500 rounded-full"
                        animate={{
                            x: [0, Math.cos(i * 2) * 40, 0],
                            y: [0, Math.sin(i * 2) * 40, 0],
                            opacity: [1, 0.5, 1],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                    />
                ))}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 bg-white rounded-full shadow-[0_0_15px_#a855f7] z-10" />
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <circle cx="50%" cy="50%" r="40" stroke="rgba(168,85,247,0.2)" fill="none" />
                </svg>
            </div>
        </div>
    </div>
);

const CaptureVisual = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-800 p-6 flex items-center justify-center relative overflow-hidden">
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[200px] bg-black border border-zinc-800 rounded-lg p-3 shadow-xl transform rotate-[-2deg]"
        >
            <div className="flex items-center gap-2 mb-2 border-b border-zinc-900 pb-2">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
            </div>
            <div className="space-y-1.5">
                <div className="h-2 w-3/4 bg-zinc-800 rounded animate-pulse" />
                <div className="h-2 w-1/2 bg-zinc-800 rounded animate-pulse delay-75" />
            </div>
            <div className="absolute -right-2 -bottom-2">
                <Zap className="h-8 w-8 text-yellow-500/20 rotate-12" />
            </div>
        </motion.div>
    </div>
);
