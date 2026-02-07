"use client";

import Section from "@/components/ui/Section";
import { Lock, Server, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import SpotlightButton from "@/components/ui/SpotlightButton";

export default function TrustSection() {
    return (
        <Section className="py-32 relative overflow-hidden" id="trust">
            {/* Background Tech Mesh */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

            <div className="mb-24 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 font-display">
                        YOUR DATA INVOLVES <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">0% MAGIC.</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        We don't train on your code. We don't sell your data. We just sync it.
                        <br />
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 text-sm mt-4 block font-mono font-bold tracking-wider"
                        >
                            // VERIFIABLE_TRUTH_PROTOCOL_INITIATED
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="inline-block w-2 h-4 ml-1 bg-emerald-400 align-middle"
                            />
                        </motion.span>
                    </p>
                </motion.div>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto relative z-10 px-4">
                <TrustCard
                    icon={Lock}
                    title="End-to-End Encryption"
                    description="Your knowledge graph is encrypted at rest and in transit. Only you hold the keys."
                    color="text-emerald-400"
                    glow="shadow-[0_0_30px_-5px_rgba(52,211,153,0.3)]"
                    delay={0.1}
                />
                <TrustCard
                    icon={ShieldCheck}
                    title="SOC2 Compliant"
                    description="Built on enterprise-grade infrastructure with strict access controls."
                    color="text-blue-400"
                    glow="shadow-[0_0_30px_-5px_rgba(96,165,250,0.3)]"
                    delay={0.2}
                />
                <TrustCard
                    icon={Server}
                    title="Self-Hostable"
                    description="Don't trust our cloud? Run Rverity via Docker on your own metal."
                    color="text-purple-400"
                    glow="shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]"
                    delay={0.3}
                />
            </div>

            {/* Premium CTA Portal */}
            <div className="mt-40 relative max-w-5xl mx-auto px-4">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-purple-500/20 to-emerald-500/20 blur-3xl opacity-20 pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative rounded-[2.5rem] border border-white/10 bg-black/60 backdrop-blur-2xl overflow-hidden p-12 md:p-24 text-center group"
                >
                    {/* Animated Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                    {/* Glowing Orbs */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-3xl pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-emerald-400 mb-8 backdrop-blur-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            SYSTEM READY
                        </div>

                        <h2 className="text-5xl md:text-7xl font-bold text-white font-display mb-6 tracking-tight leading-none">
                            READY TO <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/50">SYNC?</span>
                        </h2>

                        <p className="text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">
                            Join <span className="text-white font-bold">10,000+ developers</span> reclaiming their cognitive sovereignty.
                            Your second brain is waiting to be initialized.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 items-center">
                            <SpotlightButton
                                text="Start Building Your Graph"
                                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-400 hover:to-cyan-400 px-10 py-5 text-lg font-bold min-w-[240px] shadow-[0_0_40px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.6)] transition-all duration-500 border border-white/20"
                            />
                            <p className="text-sm text-emerald-400 font-mono mt-4 sm:mt-0 flex items-center gap-2 font-bold tracking-wider">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                // FREE_TIER_OPERATIONAL
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}

const TrustCard = ({ icon: Icon, title, description, color, glow, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:-translate-y-2"
    >
        <div className={`mb-6 p-4 rounded-full bg-white/5 border border-white/5 ${color} ${glow} transition-transform duration-500 group-hover:scale-110`}>
            <Icon className="h-10 w-10" />
        </div>
        <h3 className="text-xl font-bold text-white font-display mb-3">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">
            {description}
        </p>

        {/* Hover Highlight */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
    </motion.div>
);
