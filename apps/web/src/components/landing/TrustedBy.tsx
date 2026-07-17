"use client";

import { motion } from "framer-motion";
import { Cpu, Globe, Zap, Shield, Activity, Box, Terminal, Command } from "lucide-react";

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
        <div className="flex flex-col gap-3 w-full overflow-hidden">
            <p className="text-[11px] font-medium uppercase tracking-widest text-neutral-600 text-center">
                Trusted by developers at
            </p>

            <div className="relative flex w-full overflow-hidden">
                <div className="absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-black to-transparent" />
                <div className="absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-black to-transparent" />

                <motion.div
                    className="flex min-w-full gap-10 items-center"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                >
                    {[...companies, ...companies].map((company, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 text-neutral-600 whitespace-nowrap"
                        >
                            <company.icon className="h-4 w-4" />
                            <span className="text-xs font-medium tracking-wide">
                                {company.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
