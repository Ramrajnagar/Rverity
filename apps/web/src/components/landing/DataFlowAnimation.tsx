"use client";

import { motion } from "framer-motion";
import { Code2, Chrome, Github, ArrowRight, Network } from "lucide-react";

const sources = [
    { icon: Code2, label: "VS Code", color: "#00A3FF", y: 15 },
    { icon: Chrome, label: "Browser", color: "#44FFA4", y: 45 },
    { icon: Github, label: "GitHub", color: "#A78BFA", y: 75 },
];

export default function DataFlowAnimation() {
    return (
        <section className="py-12 md:py-16">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="text-center mb-8"
            >
                <p className="text-xs font-medium uppercase tracking-widest text-neutral-600">
                    Context flows in from everywhere
                </p>
            </motion.div>
            <div className="relative w-full max-w-3xl mx-auto h-48 md:h-56">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 200">
                {sources.map((source, i) => (
                    <g key={i}>
                        <motion.path
                            d={`M 80 ${source.y * 2.6 + 10} C 200 ${source.y * 2.6 + 10} 350 100 520 100`}
                            stroke={source.color}
                            strokeWidth="0.5"
                            strokeOpacity="0.15"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: i * 0.2 }}
                        />
                        <motion.circle
                            r="2.5"
                            fill={source.color}
                            initial={{ opacity: 0 }}
                            animate={{
                                cx: [80, 300, 520],
                                cy: [source.y * 2.6 + 10, 100, 100],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 2.5,
                                repeat: Infinity,
                                delay: i * 0.6,
                                ease: "easeInOut",
                            }}
                        />
                    </g>
                ))}
            </svg>

            {sources.map((source, i) => (
                <motion.div
                    key={i}
                    className="absolute left-0 flex items-center gap-2.5"
                    style={{ top: `${source.y}%` }}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.15 }}
                >
                    <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg border"
                        style={{
                            borderColor: `${source.color}30`,
                            backgroundColor: `${source.color}10`,
                        }}
                    >
                        <source.icon className="h-4 w-4" style={{ color: source.color }} />
                    </div>
                    <span className="text-xs font-medium text-neutral-400 hidden sm:block">
                        {source.label}
                    </span>
                </motion.div>
            ))}

            <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2.5"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
            >
                <span className="text-xs font-medium text-neutral-400 hidden sm:block">
                    Knowledge Graph
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00A3FF]/10 border border-[#00A3FF]/20">
                    <Network className="h-5 w-5 text-[#00A3FF]" />
                </div>
            </motion.div>
        </div>
        </section>
    );
}
