"use client";

import Section from "@/components/ui/Section";
import { Github, Chrome, Code2, Terminal, Laptop, Globe, ArrowUpRight, MessageSquare, FileText, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function IntegrationsGrid() {
    const integrations = [
        {
            title: "VS Code",
            description: "Sync code snippets and context without leaving your editor.",
            icon: Laptop,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            border: "group-hover:border-blue-500/50",
            shadow: "group-hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
            href: "/integrations/vscode"
        },
        {
            title: "Browser",
            description: "Capture research, docs, and articles with one click.",
            icon: Globe,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            border: "group-hover:border-orange-500/50",
            shadow: "group-hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.3)]",
            href: "/integrations/browser"
        },
        {
            title: "GitHub",
            description: "Automatically index PRs, issues, and repo activity.",
            icon: Github,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            border: "group-hover:border-purple-500/50",
            shadow: "group-hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]",
            href: "/integrations/github"
        },
        {
            title: "API / SDK",
            description: "Build custom workflows with our TypeScript SDK.",
            icon: Terminal,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            border: "group-hover:border-yellow-500/50",
            shadow: "group-hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.3)]",
            href: "/docs/api"
        },
        {
            title: "Slack",
            description: "Capture critical discussions and decisions from your workspace.",
            icon: MessageSquare,
            color: "text-rose-500",
            bg: "bg-rose-500/10",
            border: "group-hover:border-rose-500/50",
            shadow: "group-hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.3)]",
            href: "/integrations/slack"
        },
        {
            title: "Notion",
            description: "Sync your knowledge base and keep docs up to date.",
            icon: FileText,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10",
            border: "group-hover:border-emerald-500/50",
            shadow: "group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]",
            href: "/integrations/notion"
        },
        {
            title: "Obsidian",
            description: "Connect your second brain. Sync markdown notes and backlinks.",
            icon: BookOpen,
            color: "text-violet-500",
            bg: "bg-violet-500/10",
            border: "group-hover:border-violet-500/50",
            shadow: "group-hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]",
            href: "/integrations/obsidian"
        },
    ];

    return (
        <Section className="py-24 relative overflow-hidden" id="integrations">
            <div className="mb-16 text-center relative z-10">
                <h2 className="text-3xl font-bold tracking-tight text-white mb-4 font-display">
                    Works where you work.
                </h2>
                <p className="text-zinc-400">Native integrations for your most critical tools.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 relative z-10">
                {integrations.map((item, i) => (
                    <Link href={item.href} key={i}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm p-8 transition-all duration-500 ${item.border} ${item.shadow} h-full`}
                        >
                            {/* Background Icon Watermark */}
                            <div className="absolute -right-4 -bottom-4 opacity-5 transition-opacity duration-500 group-hover:opacity-10 scale-[2.5]">
                                <item.icon className="h-32 w-32" />
                            </div>

                            {/* Hover Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-6 ${item.bg} ${item.color}`}>
                                    <item.icon className="h-6 w-6" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white mb-2 font-display">{item.title}</h3>
                                    <p className="text-sm text-zinc-400 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-white">
                                    <span>Connect</span>
                                    <ArrowUpRight className="h-3 w-3" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </Section>
    );
}
