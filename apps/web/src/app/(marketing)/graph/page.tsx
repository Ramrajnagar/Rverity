"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { Brain, Network, Share2, Database, Zap, Search } from "lucide-react";
import NeuralBackground from "@/components/ui/3d/NeuralBackground";

export default function GraphPage() {
    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden">
            <NeuralBackground />

            <Section className="pt-32 pb-20 relative z-10">
                <div className="text-center max-w-4xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-8"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        GRAPH_NODE_STATUS :: ONLINE
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 tracking-tight">
                        THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">KNOWLEDGE GRAPH</span>
                    </h1>

                    <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-12">
                        Rverity doesn't just store files. It maps the *relationships* between your code, documentation, and ideas.
                        A living, breathing cortex that evolves with you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 mt-12">
                    <FeatureCard
                        icon={Network}
                        title="Semantic Linking"
                        description="Automatically connects related concepts across different file types. A Python script is linked to its documentation and the Jira ticket that spawned it."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={Brain}
                        title="Neural Search"
                        description="Don't search for keywords. Search for *concepts*. 'Show me the auth flow' retrieves code, diagrams, and slack discussions."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={Database}
                        title="Vector Memories"
                        description="Every interaction is embedded into a high-dimensional vector space, allowing for instant context retrieval for agents."
                        delay={0.3}
                    />
                    <FeatureCard
                        icon={Share2}
                        title="Context Propagation"
                        description="Updates to a core entity (e.g. 'User Model') ripple through the graph, flagging outdated documentation automatically."
                        delay={0.4}
                    />
                    <FeatureCard
                        icon={Zap}
                        title="Real-time Ingestion"
                        description="Watch as the graph updates in real-time as you type. No re-indexing pauses. No stale data."
                        delay={0.5}
                    />
                    <FeatureCard
                        icon={Search}
                        title="Visual Explorer"
                        description="Navigate your second brain in 3D. Zoom into clusters of knowledge and discover hidden connections."
                        delay={0.6}
                    />
                </div>
            </Section>
        </main>
    )
}

function FeatureCard({ icon: Icon, title, description, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 hover:bg-white/10 transition-all group"
        >
            <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-display">{title}</h3>
            <p className="text-zinc-400 leading-relaxed">
                {description}
            </p>
        </motion.div>
    )
}
