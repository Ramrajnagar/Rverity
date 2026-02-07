"use client";

import { motion } from "framer-motion";
import { Terminal, Server, Shield, Zap } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";

export default function ApiDocsPage() {
    return (
        <main className="min-h-screen bg-[#050209] text-white selection:bg-cyan-500/30">
            {/* Navbar is in layout */}

            <div className="relative pt-32 pb-20 px-6 container mx-auto">
                <div className="absolute top-0 right-0 w-[40%] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto mb-12">
                    <div className="flex items-center gap-2 text-cyan-400 mb-4 font-mono text-sm">
                        <Link href="/docs" className="hover:underline">docs</Link>
                        <span>/</span>
                        <span>api-reference</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 font-display">
                        API <span className="text-cyan-400">REFERENCE</span>
                    </h1>
                    <p className="text-xl text-zinc-400 mb-8">
                        Direct programmatic access to the Rverity Cortex.
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
                        <Stat label="Base URL" value="api.rverity.ai/v1" />
                        <Stat label="Auth" value="Bearer Token" />
                        <Stat label="Rate Limit" value="1000 req/hr" />
                        <Stat label="Protocol" value="REST + WebSocket" />
                    </div>

                    {/* Endpoints */}
                    <div className="space-y-8">
                        <Endpoint
                            method="GET"
                            path="/memory"
                            title="Retrieve Context"
                            description="Fetch synchronized memory fragments based on vector similarity search."
                        />
                        <Endpoint
                            method="POST"
                            path="/memory"
                            title="Inject Thought"
                            description="Push a new memory fragment into the graph. Content is automatically vectorized."
                        />
                        <Endpoint
                            method="GET"
                            path="/graph/topology"
                            title="Graph Topology"
                            description="Get the full node-link structure for 3D visualization."
                        />
                        <Endpoint
                            method="WS"
                            path="/stream"
                            title="Neural Stream"
                            description="Real-time WebSocket connection for live updates and syncing."
                            color="text-yellow-400"
                            badge="bg-yellow-500/10 border-yellow-500/20"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}

function Stat({ label, value }: any) {
    return (
        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="text-xs text-zinc-500 uppercase font-bold mb-1">{label}</div>
            <div className="text-white font-mono text-sm">{value}</div>
        </div>
    )
}

function Endpoint({ method, path, title, description, color = "text-cyan-400", badge = "bg-cyan-500/10 border-cyan-500/20" }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group p-6 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-all"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded bg-white/5 border border-white/10 font-mono text-sm font-bold ${method === 'POST' ? 'text-purple-400' : 'text-emerald-400'}`}>
                        {method}
                    </span>
                    <h3 className="text-xl font-mono text-white">{path}</h3>
                </div>
                <div className={`px-3 py-1 rounded-full border text-xs font-bold ${badge} ${color}`}>
                    CORE_ENDPOINT
                </div>
            </div>
            <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
            <p className="text-zinc-400 leading-relaxed text-sm max-w-2xl">{description}</p>
        </motion.div>
    )
}
