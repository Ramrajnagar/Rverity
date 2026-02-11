"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Section from "@/components/ui/Section";
import { Brain, Network, Share2, Database, Zap, Search } from "lucide-react";
import MemoryNodesBackground from "@/components/auth/MemoryNodesBackground";

export default function GraphPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

    return (
        <main ref={containerRef} className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Memory Nodes Animation */}
            <MemoryNodesBackground variant="emerald" />

            <Section className="pt-32 pb-20 relative z-10">
                <motion.div
                    className="text-center max-w-4xl mx-auto px-6"
                    style={{ scale }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8 backdrop-blur-sm"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        Live Knowledge Graph
                    </motion.div>

                    <motion.h1
                        className="text-6xl md:text-7xl font-bold font-outfit mb-6 tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400">Knowledge Graph</span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-zinc-400 leading-relaxed max-w-3xl mx-auto mb-12 font-light"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Rverity maps the relationships between your code, documentation, and ideas. A living system that evolves with your work.
                    </motion.p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 mt-16">
                    <FeatureCard
                        icon={Network}
                        title="Semantic Linking"
                        description="Automatically connects related concepts across different file types. Python scripts link to their documentation and related tickets."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={Brain}
                        title="Concept Search"
                        description="Search by meaning, not just keywords. Find everything related to authentication including code, diagrams, and discussions."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={Database}
                        title="Vector Embeddings"
                        description="Every interaction is embedded into a high-dimensional vector space, enabling instant context retrieval and semantic search."
                        delay={0.3}
                    />
                    <FeatureCard
                        icon={Share2}
                        title="Context Propagation"
                        description="Updates to core entities ripple through the graph, automatically flagging outdated documentation and related files."
                        delay={0.4}
                    />
                    <FeatureCard
                        icon={Zap}
                        title="Real-time Updates"
                        description="Watch the graph update as you work. No re-indexing delays, no stale data. Everything stays synchronized automatically."
                        delay={0.5}
                    />
                    <FeatureCard
                        icon={Search}
                        title="Visual Explorer"
                        description="Navigate your knowledge in 3D. Zoom into clusters and discover hidden connections between your work."
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
            whileHover={{ y: -4, scale: 1.02 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/[0.08] hover:border-emerald-500/30 hover:from-white/[0.12] hover:to-white/[0.05] transition-all group backdrop-blur-sm"
        >
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                <Icon className="h-6 w-6 text-emerald-300" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3 font-outfit">{title}</h3>
            <p className="text-zinc-400 leading-relaxed font-light text-[15px]">
                {description}
            </p>
        </motion.div>
    )
}
