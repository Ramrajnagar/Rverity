"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { Lock, Smartphone, Shield, AlertTriangle, Fingerprint, FileText, QrCode } from "lucide-react";

export default function ManifestoPage() {
    const currentDate = new Date().toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '.');

    return (
        <main className="min-h-screen bg-black text-zinc-300 relative overflow-hidden font-mono selection:bg-emerald-500/30">
            {/* Ambient Background - The "Void" */}
            <div className="fixed inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />
            <div className="fixed inset-0 bg-gradient-to-b from-black via-zinc-950/90 to-black pointer-events-none" />

            <Section className="pt-32 pb-20 relative z-10 min-h-screen flex flex-col items-center justify-center">

                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-full max-w-3xl bg-black border border-white/10 shadow-[0_0_50px_-10px_rgba(255,255,255,0.05)] p-0 overflow-hidden"
                >
                    {/* Top Status Bar */}
                    <div className="h-2 w-full bg-gradient-to-r from-emerald-500 via-transparent to-purple-500 opacity-50" />

                    {/* Header Metadata */}
                    <div className="flex justify-between items-start p-8 border-b border-white/5 bg-white/[0.02]">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-xs text-emerald-500 font-bold tracking-widest uppercase">
                                <Lock className="w-3 h-3" />
                                Restricted Access
                            </div>
                            <div className="text-[10px] text-zinc-600 tracking-[0.2em] uppercase">
                                Doc_ID: RF-2030-ALPHA
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-zinc-500 font-mono">
                                {currentDate}
                            </div>
                            <div className="text-[10px] text-zinc-600 uppercase mt-1">
                                Clearance: L5
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="p-8 md:p-16 relative">
                        {/* Watermark */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
                            <Fingerprint className="w-96 h-96 text-white" />
                        </div>

                        {/* Title Section */}
                        <div className="mb-16 text-center relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter uppercase">
                                    The Rverity Protocol
                                </h1>
                                <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-4" />
                                <p className="text-sm text-zinc-500 uppercase tracking-widest">
                                    Manifesto for the Post-Application Era
                                </p>
                            </motion.div>
                        </div>

                        {/* Content Blocks */}
                        <div className="space-y-12 relative z-10 text-sm md:text-base leading-relaxed text-zinc-400 text-justify">
                            <SectionBlock number="01" title="The Fragmentation Crisis">
                                We are drowning in context switching. Code in VS Code, docs in Notion, tasks in Linear, communication in Slack.
                                Our digital cognition is shattered across a dozen browser tabs. The modern developer spends 30% of their time
                                simply <em>remembering where things are</em>. This is not a tooling problem; it is an architecture problem.
                            </SectionBlock>

                            <SectionBlock number="02" title="The Unified Cortex">
                                Rverity proposes a radical unification. Not another "all-in-one" tool, but a <strong>meta-layer</strong> that sits above them all.
                                By indexing every interaction into a local-first Knowledge Graph, we create a second brain that actually <em>thinks</em> with you.
                                It creates connections between your code commits and your design docs automatically.
                            </SectionBlock>

                            <SectionBlock number="03" title="Sovereignty by Design">
                                You cannot outsource your mind to a cloud you don't control. That's why Rverity is local-first.
                                Your graph lives on your metal. Your thoughts are encrypted. We build for the paranoid, because in the age of
                                surveillance capitalism, the paranoid are the only ones who are free.
                            </SectionBlock>

                            <SectionBlock number="04" title="The Fluid Interface">
                                We are moving towards an age where "apps" dissolve into "workflows". Rverity is the protocol for this transition.
                                A way to weave disparate tools into a single, fluid stream of consciousness. It is not just about productivity;
                                it is about <strong>cognitive continuity</strong>.
                            </SectionBlock>
                        </div>

                        {/* Footer / Signature */}
                        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="flex items-center gap-4">
                                <div className="h-16 w-16 bg-white rounded-sm p-1">
                                    <div className="h-full w-full border-[2px] border-black flex items-center justify-center">
                                        <QrCode className="w-10 h-10 text-black" />
                                    </div>
                                </div>
                                <div className="flex flex-col text-[10px] uppercase text-zinc-600 gap-1">
                                    <span>Cryptographic Signature</span>
                                    <span className="font-mono text-emerald-500/50">0x7F...3A9C</span>
                                    <span>Verified</span>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="inline-block border-2 border-emerald-500/30 text-emerald-500 px-4 py-2 text-xs font-bold uppercase tracking-widest transform -rotate-2 opacity-80 hover:opacity-100 transition-opacity select-none cursor-default">
                                    APPROVED FOR DEPLOYMENT
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Decorative Sideline */}
                    <div className="absolute left-0 top-24 bottom-24 w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                </motion.div>

                {/* Footer Metadata */}
                <div className="mt-8 text-[10px] text-zinc-700 font-mono tracking-widest uppercase">
                    One Memory // System v.2.0.4
                </div>

            </Section>
        </main>
    );
}

function SectionBlock({ number, title, children }: { number: string, title: string, children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-baseline gap-4 mb-3">
                <span className="text-xs font-bold text-emerald-500/50 font-mono">
                    [{number}]
                </span>
                <h3 className="text-lg font-bold text-zinc-200 uppercase tracking-wide">
                    {title}
                </h3>
            </div>
            <p className="pl-8 md:pl-10">
                {children}
            </p>
        </motion.div>
    );
}
