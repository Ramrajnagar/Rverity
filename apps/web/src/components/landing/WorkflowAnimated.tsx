"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { ArrowRight, Database, Globe, Laptop, Cpu, Network } from "lucide-react";

export default function WorkflowAnimated() {
    return (
        <Section className="py-24 border-t border-white/5 relative overflow-hidden" id="how-it-works">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

            <div className="mb-16 text-center relative z-10">
                <h2 className="text-3xl font-bold tracking-tight text-white mb-4 font-display">
                    HOW RVERITY WORKS
                </h2>
                <p className="text-zinc-400">Seamlessly piping data from your tools to your brain.</p>
            </div>

            <div className="max-w-6xl mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">

                {/* Source Nodes (Left) */}
                <div className="flex flex-col gap-8 w-full md:w-1/3 items-center md:items-end z-20">
                    <SourceNode icon={Laptop} label="VS Code" delay={0} color="text-blue-400" />
                    <SourceNode icon={Globe} label="Browser" delay={0.2} color="text-orange-400" />
                </div>

                {/* Connection Lines (Left to Center) */}
                <div className="hidden md:flex flex-1 relative h-32 items-center justify-center">
                    <StreamLine direction="right" delay={0} />
                    <StreamLine direction="right" delay={0.5} top={true} />
                </div>

                {/* Central Engine (Center) */}
                <div className="relative z-30 flex items-center justify-center w-full md:w-auto my-8 md:my-0">
                    <SyncEngine />
                </div>

                {/* Connection Lines (Center to Right) */}
                <div className="hidden md:flex flex-1 relative h-32 items-center justify-center">
                    <StreamLine direction="right" delay={0.2} />
                </div>

                {/* Destination Node (Right) */}
                <div className="w-full md:w-1/3 flex justify-center md:justify-start z-20">
                    <DestinationNode />
                </div>

            </div>
        </Section>
    );
}

const SourceNode = ({ icon: Icon, label, delay, color }: any) => (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay }}
        className="relative group"
    >
        <div className="absolute inset-0 bg-white/5 blur-xl rounded-full opacity-0 group-hover:opacity-50 transition-opacity" />
        <div className="relative flex items-center gap-4 bg-black/50 border border-white/10 p-4 rounded-2xl backdrop-blur-md hover:border-white/20 transition-colors w-48">
            <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
                <Icon className="h-6 w-6" />
            </div>
            <span className="font-medium text-zinc-200">{label}</span>
        </div>
        {/* Mobile Connector */}
        <div className="md:hidden absolute left-1/2 -bottom-8 w-[2px] h-8 bg-zinc-800 transform -translate-x-1/2">
            <motion.div
                animate={{ height: ["0%", "100%"], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-full bg-primary"
            />
        </div>
    </motion.div>
);

const SyncEngine = () => (
    <div className="relative h-48 w-48 flex items-center justify-center">
        {/* Outer Rotating Rings */}
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-purple-500/20 border-t-purple-500/50 border-r-transparent"
        />
        <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border border-cyan-500/20 border-b-cyan-500/50 border-l-transparent"
        />

        {/* Inner Core */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative h-24 w-24 bg-black/80 rounded-full border border-white/10 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_-10px_rgba(168,85,247,0.4)] z-10">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 animate-pulse" />
                <div className="text-center relative z-10">
                    <Cpu className="h-8 w-8 text-white mx-auto mb-1" />
                    <div className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 tracking-wider">
                        SYNC
                    </div>
                </div>
            </div>
        </div>

        {/* Orbiting Particles */}
        <div className="absolute inset-0 animate-spin-slow pointer-events-none">
            <div className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" />
            <div className="absolute bottom-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]" />
        </div>
    </div>
);

const DestinationNode = () => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative group"
    >
        <div className="relative flex flex-col items-center gap-4 bg-gradient-to-br from-black/60 to-purple-900/20 border border-purple-500/30 p-6 rounded-2xl backdrop-blur-md w-48 text-center group-hover:border-purple-500/50 transition-colors">
            <div className="relative">
                <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
                <Network className="h-10 w-10 text-purple-400 relative z-10" />
            </div>
            <div>
                <div className="font-bold text-white">Knowledge Graph</div>
                <div className="text-xs text-purple-300/60 mt-1">Structured Intelligence</div>
            </div>
        </div>
        {/* Mobile Connector (Input) */}
        <div className="md:hidden absolute left-1/2 -top-8 w-[2px] h-8 bg-zinc-800 transform -translate-x-1/2">
            <motion.div
                animate={{ height: ["0%", "100%"], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-full bg-primary"
            />
        </div>
    </motion.div>
);

const StreamLine = ({ direction = "right", delay = 0, top = false }: { direction: string; delay: number; top?: boolean }) => {
    return (
        <div className={`absolute w-full h-[1px] bg-zinc-800 ${top ? 'top-[30%] -rotate-6 origin-right' : 'top-1/2'}`}>
            <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay }}
                className="w-24 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_cyan]"
            />
        </div>
    );
};
