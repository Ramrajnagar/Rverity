"use client";

import { motion } from "framer-motion";

const memories = [
    {
        source: "vscode",
        color: "#007ACC",
        content: "Refactored auth middleware to use JWT validation",
        tags: ["auth", "refactor"],
        time: "2 min ago",
    },
    {
        source: "github",
        color: "#f0f0f0",
        content: "PR #142: Added rate limiting to /api/v1/memory endpoint",
        tags: ["api", "performance"],
        time: "8 min ago",
    },
    {
        source: "chrome",
        color: "#4285F4",
        content: "Read Supabase vector search docs — pgvector cosine similarity",
        tags: ["docs", "vector"],
        time: "14 min ago",
    },
    {
        source: "notion",
        color: "#fff",
        content: "Sprint planning: prioritize real-time sync for v2.1",
        tags: ["planning", "v2.1"],
        time: "1 hr ago",
    },
];

export default function ProductMockup() {
    return (
        <div className="relative w-full rounded-xl border border-white/[0.08] bg-[#0a0a0c] overflow-hidden shadow-2xl shadow-black/80">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] text-neutral-500 font-mono">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        rverityai.vercel.app/dashboard
                    </div>
                </div>
                <div className="w-12" />
            </div>

            {/* Dashboard layout */}
            <div className="flex min-h-[380px]">
                {/* Sidebar */}
                <div className="w-48 border-r border-white/[0.06] p-3 hidden md:block">
                    <div className="flex items-center gap-2 mb-5 px-2">
                        <div className="w-6 h-6 rounded-md bg-[#00A3FF] flex items-center justify-center">
                            <span className="text-[9px] font-bold text-white">R</span>
                        </div>
                        <span className="text-xs font-semibold text-white">Rverity</span>
                    </div>

                    <div className="space-y-0.5">
                        {[
                            { label: "Dashboard", active: true, icon: "◆" },
                            { label: "Memory Stream", active: false, icon: "◇" },
                            { label: "Knowledge Graph", active: false, icon: "◎" },
                            { label: "Search", active: false, icon: "⌕" },
                            { label: "Integrations", active: false, icon: "⊕" },
                            { label: "Settings", active: false, icon: "⚙" },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-[11px] transition-colors ${
                                    item.active
                                        ? "bg-[#00A3FF]/10 text-[#00A3FF]"
                                        : "text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.03]"
                                }`}
                            >
                                <span className="text-[10px]">{item.icon}</span>
                                {item.label}
                            </div>
                        ))}
                    </div>

                    {/* Integrations in sidebar */}
                    <div className="mt-5 pt-4 border-t border-white/[0.06]">
                        <p className="text-[10px] text-neutral-600 uppercase tracking-wider px-2 mb-2">Connected</p>
                        <div className="space-y-1.5">
                            {[
                                { name: "VS Code", color: "#007ACC", connected: true },
                                { name: "Chrome", color: "#4285F4", connected: true },
                                { name: "GitHub", color: "#f0f0f0", connected: true },
                                { name: "Notion", color: "#fff", connected: false },
                            ].map((int) => (
                                <div key={int.name} className="flex items-center gap-2 px-2 py-1">
                                    <div
                                        className="w-4 h-4 rounded-sm flex items-center justify-center"
                                        style={{ backgroundColor: `${int.color}15` }}
                                    >
                                        <div
                                            className="w-2 h-2 rounded-full"
                                            style={{ backgroundColor: int.color }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-neutral-400">{int.name}</span>
                                    {int.connected && (
                                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-1 p-4">
                    {/* Header row */}
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-sm font-semibold text-white">Dashboard</h3>
                            <p className="text-[10px] text-neutral-500 mt-0.5">Your knowledge graph at a glance</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[10px] text-neutral-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                3 connected
                            </div>
                        </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        {[
                            { label: "Total Memories", value: "2,847", change: "+127 today" },
                            { label: "Sources Active", value: "3", change: "VS Code, Chrome, GitHub" },
                            { label: "Search Queries", value: "1,204", change: "this week" },
                        ].map((stat) => (
                            <motion.div
                                key={stat.label}
                                className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                            >
                                <p className="text-[10px] text-neutral-500 mb-1">{stat.label}</p>
                                <p className="text-lg font-bold text-white tracking-tight">{stat.value}</p>
                                <p className="text-[9px] text-neutral-600 mt-0.5">{stat.change}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Search bar */}
                    <div className="relative mb-4">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                            <span className="text-neutral-500 text-[11px]">⌕</span>
                            <span className="text-[11px] text-neutral-500">Search your knowledge graph...</span>
                            <span className="ml-auto text-[9px] text-neutral-600 bg-white/[0.05] px-1.5 py-0.5 rounded font-mono">⌘K</span>
                        </div>
                    </div>

                    {/* Memory stream */}
                    <div>
                        <div className="flex items-center justify-between mb-2.5">
                            <p className="text-[11px] font-medium text-neutral-300">Recent Memories</p>
                            <p className="text-[10px] text-neutral-600">View all →</p>
                        </div>
                        <div className="space-y-2">
                            {memories.map((mem, i) => (
                                <motion.div
                                    key={i}
                                    className="flex items-start gap-3 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-colors cursor-default"
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                                >
                                    <div
                                        className="w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                                        style={{ backgroundColor: `${mem.color}15` }}
                                    >
                                        <div
                                            className="w-2.5 h-2.5 rounded-full"
                                            style={{ backgroundColor: mem.color }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[11px] text-neutral-200 leading-snug truncate">{mem.content}</p>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            <span className="text-[9px] text-neutral-600 uppercase font-medium">{mem.source}</span>
                                            <span className="text-[9px] text-neutral-700">·</span>
                                            <span className="text-[9px] text-neutral-600">{mem.time}</span>
                                            {mem.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[8px] px-1.5 py-0.5 rounded-full bg-[#00A3FF]/10 text-[#00A3FF]/70 border border-[#00A3FF]/10"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right panel — mini graph */}
                <div className="w-56 border-l border-white/[0.06] p-3 hidden lg:block">
                    <p className="text-[10px] text-neutral-500 mb-3">Knowledge Graph</p>
                    <div className="relative w-full aspect-square rounded-lg bg-white/[0.02] border border-white/[0.04] overflow-hidden">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                            {/* Edges */}
                            {[[50,50,30,30],[50,50,70,25],[50,50,25,70],[50,50,75,65],[30,30,20,15],[70,25,80,12],[25,70,15,82],[75,65,85,78]].map(([x1,y1,x2,y2], i) => (
                                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,163,255,0.12)" strokeWidth="0.5" />
                            ))}
                            {/* Particles */}
                            {[[50,50,30,30],[50,50,70,25],[25,70,50,50],[75,65,50,50]].map(([x1,y1,x2,y2], i) => (
                                <motion.circle
                                    key={`p-${i}`}
                                    r="1"
                                    fill="#00A3FF"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        cx: [x1, x2],
                                        cy: [y1, y2],
                                        opacity: [0, 0.6, 0.6, 0],
                                    }}
                                    transition={{
                                        duration: 2 + i * 0.5,
                                        repeat: Infinity,
                                        delay: i * 0.3,
                                        ease: "linear",
                                    }}
                                />
                            ))}
                            {/* Nodes */}
                            {[
                                { x: 50, y: 50, r: 5, fill: "#00A3FF" },
                                { x: 30, y: 30, r: 3.5, fill: "#007ACC" },
                                { x: 70, y: 25, r: 3.5, fill: "#4285F4" },
                                { x: 25, y: 70, r: 3.5, fill: "#f0f0f0" },
                                { x: 75, y: 65, r: 3.5, fill: "#fff" },
                                { x: 20, y: 15, r: 2, fill: "#1a1a2e" },
                                { x: 80, y: 12, r: 2, fill: "#1a1a2e" },
                                { x: 15, y: 82, r: 2, fill: "#1a1a2e" },
                                { x: 85, y: 78, r: 2, fill: "#1a1a2e" },
                            ].map((n, i) => (
                                <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={n.fill} fillOpacity={i === 0 ? 0.9 : 0.6} />
                            ))}
                        </svg>
                    </div>

                    {/* Graph stats */}
                    <div className="mt-3 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] text-neutral-600">Nodes</span>
                            <span className="text-[9px] text-neutral-400 font-mono">847</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] text-neutral-600">Connections</span>
                            <span className="text-[9px] text-neutral-400 font-mono">2,341</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] text-neutral-600">Last sync</span>
                            <span className="text-[9px] text-green-500 font-mono">live</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
