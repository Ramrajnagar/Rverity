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
                        <Stat label="Base URL" value="http://localhost:3000/api" />
                        <Stat label="Auth" value="Bearer Token" />
                        <Stat label="Endpoints" value="14 Available" />
                        <Stat label="Protocol" value="REST + JSON" />
                    </div>

                    {/* Endpoints */}
                    <div className="space-y-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Memory Management</h2>

                        <Endpoint
                            method="POST"
                            path="/v1/memory"
                            title="Create Memory"
                            description="Create a single memory with content, source, tags, and metadata."
                        />
                        <Endpoint
                            method="POST"
                            path="/v1/memory/batch"
                            title="Batch Create Memories"
                            description="Create up to 100 memories in a single request for efficient bulk operations."
                        />
                        <Endpoint
                            method="GET"
                            path="/v1/memory"
                            title="List Memories"
                            description="Retrieve all memories for the authenticated user with pagination support."
                        />
                        <Endpoint
                            method="GET"
                            path="/v1/memory/:id"
                            title="Get Single Memory"
                            description="Fetch a specific memory by its unique identifier."
                        />
                        <Endpoint
                            method="PUT"
                            path="/v1/memory/:id"
                            title="Update Memory"
                            description="Update content, tags, or metadata of an existing memory."
                        />
                        <Endpoint
                            method="DELETE"
                            path="/v1/memory/:id"
                            title="Delete Memory"
                            description="Permanently delete a memory from your collection."
                        />

                        <h2 className="text-2xl font-bold text-white mb-6 mt-12">Search & Discovery</h2>

                        <Endpoint
                            method="GET"
                            path="/v1/memory/search"
                            title="Advanced Search"
                            description="Search memories with filters for text, sources, tags, and date ranges."
                        />
                        <Endpoint
                            method="GET"
                            path="/v1/memory/:id/related"
                            title="Related Memories"
                            description="Find similar memories based on tags, content overlap, source, and temporal proximity."
                        />

                        <h2 className="text-2xl font-bold text-white mb-6 mt-12">Analytics</h2>

                        <Endpoint
                            method="GET"
                            path="/v1/insights"
                            title="Memory Insights"
                            description="Get analytics on memory patterns, sources, tags, and activity distribution."
                        />
                        <Endpoint
                            method="GET"
                            path="/v1/stats"
                            title="Activity Statistics"
                            description="Retrieve daily, weekly, monthly counts, and activity streak information."
                        />

                        <h2 className="text-2xl font-bold text-white mb-6 mt-12">System</h2>

                        <Endpoint
                            method="GET"
                            path="/v1/health"
                            title="Health Check"
                            description="Check API status and availability."
                            color="text-green-400"
                            badge="bg-green-500/10 border-green-500/20"
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
