"use client";

import { motion } from "framer-motion";
import {
    Cpu,
    Globe,
    Zap,
    Shield,
    Activity,
    Box,
    Terminal,
    Command
} from "lucide-react";

const companies = [
    { name: "ACME_CORP", icon: Box },
    { name: "CYBER_DYNE", icon: Cpu },
    { name: "MASSIVE_DYNAMIC", icon: Activity },
    { name: "GLOBEX", icon: Globe },
    { name: "SOYLENT", icon: Zap },
    { name: "UMBRELLA", icon: Shield },
    { name: "INGEN", icon: Terminal },
    { name: "TYRELL", icon: Command },
];

export default function TrustedBy() {
    return (
        <div className="flex flex-col gap-4 w-full md:max-w-2xl overflow-hidden mask-linear-fade">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50 text-center md:text-left text-zinc-500">
                Operational at
            </p>

            <div className="relative flex w-full overflow-hidden mask-gradient">
                {/* Gradient Masks for smooth fade out at edges */}
                <div className="absolute left-0 top-0 z-10 h-full w-10 bg-gradient-to-r from-background to-transparent" />
                <div className="absolute right-0 top-0 z-10 h-full w-10 bg-gradient-to-l from-background to-transparent" />

                <motion.div
                    className="flex min-w-full gap-12 py-2"
                    animate={{
                        x: ["0%", "-50%"]
                    }}
                    transition={{
                        duration: 20,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {[...companies, ...companies].map((company, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 text-zinc-500 transition-all duration-300 hover:text-white hover:scale-105 cursor-default grayscale hover:grayscale-0"
                        >
                            <company.icon className="h-5 w-5" />
                            <span className="text-sm font-bold tracking-widest font-display whitespace-nowrap">
                                {company.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
