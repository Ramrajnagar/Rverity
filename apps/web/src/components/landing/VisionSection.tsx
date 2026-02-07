"use client";

import React, { useRef, ReactNode } from "react";
import Section from "@/components/ui/Section";
import Link from "next/link";
import SpotlightButton from "@/components/ui/SpotlightButton";
import { motion, useScroll, useTransform } from "framer-motion";
import { Brain, Network, Zap, Infinity as InfinityIcon, User, Layers } from "lucide-react";

export default function VisionSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const timeline = [
        {
            phase: "PHASE 01",
            title: "THE SECOND BRAIN",
            description: (
                <>
                    We don't just bookmark. We <Highlight>remember</Highlight>. Typical 'read-it-later' apps are dead. The core <Highlight color="text-blue-400" glow="blue">Knowledge Graph</Highlight> is live, syncing your digital life into a <Highlight>unified, queryable cortex</Highlight>.
                </>
            ),
            icon: Brain,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
        },
        {
            phase: "PHASE 02",
            title: "PREDICTIVE NEXUS",
            description: (
                <>
                    <Highlight color="text-amber-400" glow="amber">Context</Highlight> before you ask. Rverity <Highlight>anticipates</Highlight> your needs, pre-loading documentation and history before you even type the query. Launching in Q3.
                </>
            ),
            icon: Zap,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
        },
        {
            phase: "PHASE 03",
            title: "AGENTIC OPERATIONS",
            description: (
                <>
                    <Highlight color="text-purple-400" glow="purple">Autonomous workflows</Highlight>. Rverity agents will <Highlight>execute code refactors</Highlight>, draft documentation, and sync PRs while you sleep.
                </>
            ),
            icon: Layers,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
        },
        {
            phase: "PHASE 04",
            title: "NEURAL INTEGRATION",
            description: (
                <>
                    <Highlight color="text-emerald-400" glow="emerald">Thinking in code</Highlight>. Direct IDE injection via BCI interfaces. We aren't building a tool; we are building the <Highlight>next stage of human evolution</Highlight>.
                </>
            ),
            icon: InfinityIcon,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
        },
    ];

    return (
        <Section className="py-32 relative overflow-hidden" id="roadmap">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/80 to-black pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

            <div className="relative z-10 max-w-6xl mx-auto px-4" ref={containerRef}>
                <div className="mb-24 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-display">
                            EVOLUTION <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">PROTOCOL</span>
                        </h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                            We aren't just looking at the future. We are building it, one phase at a time.
                        </p>
                    </motion.div>
                </div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent transform -translate-x-1/2 hidden md:block" />

                    <div className="space-y-24">
                        {timeline.map((item, i) => (
                            <TimelineItem key={i} item={item} index={i} />
                        ))}
                    </div>
                </div>

                <div className="mt-24 text-center">
                    <SpotlightButton
                        text="EXPLORE THE MANIFESTO"
                        href="/manifesto"
                        className="bg-white/5 border-white/10 hover:bg-white/10 hover:text-white px-8 py-4 font-bold tracking-widest text-sm"
                    />
                </div>
            </div>
        </Section>
    );
}

const Highlight = ({ children, color = "text-white", glow = "white" }: { children: ReactNode; color?: string; glow?: string }) => {
    return (
        <span className={`relative inline-block px-1 mx-0.5 font-bold ${color}`}>
            <motion.span
                initial={{ opacity: 0, width: "0%" }}
                whileInView={{ opacity: 1, width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className={`absolute bottom-0 left-0 h-[2px] w-full bg-current opacity-50`}
            />
            <span className="relative z-10">{children}</span>
            <motion.span
                animate={{ opacity: [0.2, 0.6, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className={`absolute inset-0 bg-current opacity-10 blur-md rounded-md -z-10`}
            />
        </span>
    );
}

const TimelineItem = ({ item, index }: { item: any; index: number }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? "" : "md:flex-row-reverse"}`}
        >
            {/* Timeline Node */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-12 w-12 items-center justify-center rounded-full bg-black border border-white/20 z-10">
                <div className={`h-3 w-3 rounded-full ${item.color.replace("text-", "bg-")} animate-pulse`} />
            </div>

            {/* Content Card */}
            <div className="flex-1 w-full md:w-1/2 p-4">
                <div className={`relative p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 group hover:-translate-y-2 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)] ${item.bg} ${item.border}`}>

                    {/* Holographic Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <span className={`text-2xl font-bold font-display tracking-widest ${item.color}`}>
                                {item.phase}
                            </span>
                            <div className={`p-3 rounded-xl bg-white/5 ${item.color}`}>
                                <item.icon className="h-6 w-6" />
                            </div>
                        </div>

                        <h3 className="text-3xl font-bold text-white mb-4 font-display">
                            {item.title}
                        </h3>
                        <div className="text-zinc-400 leading-relaxed text-lg">
                            {item.description}
                        </div>
                    </div>
                </div>
            </div>

            {/* Spacer for alternate side */}
            <div className="hidden md:block flex-1 w-1/2" />
        </motion.div>
    );
};
