"use client";

import { motion } from "framer-motion";
import { Book, Code, Zap, Shield, Database, GitBranch, MessageSquare, FileText, BookOpen } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-purple-500/30 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-pink-900/10"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_90%)]"></div>

            <div className="relative pt-32 pb-20 px-6 container mx-auto max-w-6xl">
                {/* Floating gradient orb */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

                {/* Header */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 font-outfit bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                        Documentation
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl font-light leading-relaxed">
                        Everything you need to integrate Rverity into your workflow. From quick starts to advanced configurations.
                    </p>
                </motion.div>

                {/* Quick Links Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    <DocCard
                        icon={Zap}
                        title="Quick Start"
                        description="Get up and running with Rverity in under 5 minutes"
                        href="/docs"
                        delay={0.1}
                    />
                    <DocCard
                        icon={Code}
                        title="API Reference"
                        description="Complete API documentation with examples and response schemas"
                        href="/docs/api"
                        delay={0.2}
                    />
                    <DocCard
                        icon={Database}
                        title="SDK Documentation"
                        description="TypeScript SDK guide with installation and usage examples"
                        href="https://github.com/Ramrajnagar/Rverity/tree/main/packages/sdk"
                        delay={0.3}
                        external
                    />
                    <DocCard
                        icon={GitBranch}
                        title="VS Code Extension"
                        description="Setup and configure the VS Code extension for automatic capture"
                        href="/integrations/vscode"
                        delay={0.4}
                    />
                    <DocCard
                        icon={Shield}
                        title="Chrome Extension"
                        description="Install and customize the Chrome extension for browsing capture"
                        href="/integrations/browser"
                        delay={0.5}
                    />
                    <DocCard
                        icon={Book}
                        title="GitHub Integration"
                        description="Connect your GitHub repositories for automatic activity tracking"
                        href="/integrations/github"
                        delay={0.6}
                    />
                    <DocCard
                        icon={MessageSquare}
                        title="Slack Integration"
                        description="Capture discussions and decisions from your workspace"
                        href="/integrations/slack"
                        delay={0.7}
                    />
                    <DocCard
                        icon={FileText}
                        title="Notion Integration"
                        description="Sync your knowledge base and documentation"
                        href="/integrations/notion"
                        delay={0.8}
                    />
                    <DocCard
                        icon={BookOpen}
                        title="Obsidian Integration"
                        description="Connect your second brain and sync markdown notes"
                        href="/integrations/obsidian"
                        delay={0.9}
                    />
                </div>

                {/* Getting Started Section */}
                <motion.div
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    <h2 className="text-3xl font-bold mb-6">Getting Started</h2>
                    <div className="space-y-6">
                        <Step
                            number={1}
                            title="Create an Account"
                            description="Sign up for a Rverity account to get your API key and access the dashboard."
                        />
                        <Step
                            number={2}
                            title="Install SDK or Extension"
                            description="Choose your preferred integration method: SDK for custom apps, VS Code for coding, or Chrome for browsing."
                        />
                        <Step
                            number={3}
                            title="Configure API Key"
                            description="Add your API key to the SDK or extension settings to enable synchronization."
                        />
                        <Step
                            number={4}
                            title="Start Capturing"
                            description="Begin capturing context automatically or manually. View all memories in your dashboard."
                        />
                    </div>
                </motion.div>

                {/* Resources Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <h2 className="text-3xl font-bold mb-6">Additional Resources</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <ResourceLink
                            title="GitHub Repository"
                            description="View source code and contribute"
                            href="https://github.com/Ramrajnagar/Rverity"
                        />
                        <ResourceLink
                            title="API Status"
                            description="Check system status and uptime"
                            href="/v1/health"
                        />
                        <ResourceLink
                            title="Community Discord"
                            description="Join our community for support"
                            href="#"
                        />
                        <ResourceLink
                            title="Report an Issue"
                            description="Found a bug? Let us know"
                            href="https://github.com/Ramrajnagar/Rverity/issues"
                        />
                    </div>
                </motion.div>
            </div>
        </main>
    );
}

function DocCard({ icon: Icon, title, description, href, delay, external = false }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -6, scale: 1.02 }}
        >
            <Link
                href={href}
                target={external ? "_blank" : undefined}
                className="block h-full p-6 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/[0.08] hover:border-purple-500/30 hover:from-white/[0.12] hover:to-white/[0.05] transition-all group backdrop-blur-sm shadow-lg shadow-black/10"
            >
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all shadow-lg shadow-purple-500/10">
                        <Icon className="h-6 w-6 text-purple-300" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors font-outfit">
                            {title}
                        </h3>
                        <p className="text-sm text-zinc-400 leading-relaxed font-light">
                            {description}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

function Step({ number, title, description }: any) {
    return (
        <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
                {number}
            </div>
            <div>
                <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
                <p className="text-zinc-400 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}

function ResourceLink({ title, description, href }: any) {
    return (
        <Link
            href={href}
            className="block p-4 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all group"
        >
            <h3 className="text-white font-semibold mb-1 group-hover:text-purple-400 transition-colors">
                {title}
            </h3>
            <p className="text-sm text-zinc-400">{description}</p>
        </Link>
    );
}
