"use client";

import { motion } from "framer-motion";
import { Book, Code, Terminal, Cpu, Network, Share2, Search } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
    return (
        <main className="min-h-screen bg-[#050209] text-white selection:bg-purple-500/30">
            {/* Navbar is in layout */}

            <div className="relative pt-32 pb-20 px-6 container mx-auto">
                {/* Background ambient glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[500px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400 mb-6 backdrop-blur-xl"
                    >
                        <Book className="w-3 h-3 mr-2" />
                        NEURAL_ARCHIVE // V2.0
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 font-display"
                    >
                        SYSTEM <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">DOCUMENTATION</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-zinc-400 max-w-2xl mx-auto"
                    >
                        Access the complete technical schematics for the Rverity protocol.
                        Learn how to integrate, extend, and synchronize your digital cognition.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 relative max-w-xl mx-auto"
                    >
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search the archive..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500/50 transition-all shadow-lg shadow-purple-900/10"
                        />
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <DocCard
                        icon={Terminal}
                        title="Quick Start"
                        description="Initialize your local environment and establish your first neural link in under 5 minutes."
                        href="/docs/getting-started"
                        delay={0.1}
                    />
                    <DocCard
                        icon={Code}
                        title="API Reference"
                        description="Full endpoints documentation for accessing the Rverity core via REST or WebSocket."
                        href="/docs/api"
                        delay={0.2}
                    />
                    <DocCard
                        icon={Cpu}
                        title="Architecture"
                        description="Deep dive into the vector database schema and graph topology algorithms."
                        href="/docs/architecture"
                        delay={0.3}
                    />
                    <DocCard
                        icon={Network}
                        title="Integrations"
                        description="Connect VS Code, Chrome, and GitHub to your central knowledge graph."
                        href="/integrations/vscode" // Redirect to existing integration pages
                        delay={0.4}
                    />
                    <DocCard
                        icon={Share2}
                        title="MCP Protocol"
                        description="Spec for the Memory Context Protocol used to communicate between agents."
                        href="/docs/mcp"
                        delay={0.5}
                    />
                    <DocCard
                        icon={Book}
                        title="SDKs & Libraries"
                        description="Official client libraries for TypeScript, Python, and Go."
                        href="/docs/sdks"
                        delay={0.6}
                    />
                </div>
            </div>
        </main>
    );
}

function DocCard({ icon: Icon, title, description, href, delay }: any) {
    return (
        <Link href={href}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + delay }}
                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all h-full cursor-pointer hover:-translate-y-1"
            >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-500/20 group-hover:text-purple-400 transition-colors text-zinc-400">
                    <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
            </motion.div>
        </Link>
    )
}
