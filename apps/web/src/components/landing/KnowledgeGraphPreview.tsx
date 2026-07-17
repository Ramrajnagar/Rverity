"use client";

import { motion } from "framer-motion";

const nodes = [
    { id: 0, x: 50, y: 48, size: 22, color: "#00A3FF", label: "Rverity", icon: null, isCenter: true },
    { id: 1, x: 18, y: 22, size: 14, color: "#007ACC", label: "VS Code", icon: "VS" },
    { id: 2, x: 82, y: 18, size: 14, color: "#4285F4", label: "Chrome", icon: "Cr" },
    { id: 3, x: 12, y: 72, size: 14, color: "#FFFFFF", label: "GitHub", icon: "GH" },
    { id: 4, x: 88, y: 72, size: 14, color: "#FFFFFF", label: "Notion", icon: "N" },
    { id: 5, x: 50, y: 10, size: 12, color: "#E01E5A", label: "Slack", icon: "S" },
    { id: 6, x: 50, y: 88, size: 12, color: "#A259FF", label: "Figma", icon: "Fi" },
    { id: 7, x: 30, y: 36, size: 6, color: "#1a1a2e", label: "", icon: null },
    { id: 8, x: 70, y: 33, size: 6, color: "#1a1a2e", label: "", icon: null },
    { id: 9, x: 28, y: 58, size: 6, color: "#1a1a2e", label: "", icon: null },
    { id: 10, x: 72, y: 60, size: 6, color: "#1a1a2e", label: "", icon: null },
    { id: 11, x: 35, y: 6, size: 5, color: "#111118", label: "", icon: null },
    { id: 12, x: 65, y: 6, size: 5, color: "#111118", label: "", icon: null },
    { id: 13, x: 15, y: 48, size: 5, color: "#111118", label: "", icon: null },
    { id: 14, x: 85, y: 48, size: 5, color: "#111118", label: "", icon: null },
];

const edges: [number, number][] = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [0, 7], [0, 8], [0, 9], [0, 10],
    [1, 7], [2, 8], [3, 9], [4, 10],
    [5, 11], [5, 12], [3, 13], [4, 14],
    [7, 13], [8, 14], [9, 11], [10, 12],
];

const floatingTexts = [
    { x: 8, y: 34, text: "auth.ts", delay: 0 },
    { x: 88, y: 42, text: "design.v2", delay: 0.5 },
    { x: 36, y: 80, text: "fix #42", delay: 1 },
    { x: 62, y: 80, text: "api/docs", delay: 1.5 },
];

export default function KnowledgeGraphPreview() {
    return (
        <div className="relative w-full aspect-square max-w-[520px] mx-auto">
            <div className="absolute inset-0 bg-[#00A3FF]/[0.03] rounded-full blur-[60px] pointer-events-none" />

            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <radialGradient id="cg" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.25" />
                        <stop offset="60%" stopColor="#00A3FF" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#00A3FF" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="ng" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.12" />
                        <stop offset="100%" stopColor="#00A3FF" stopOpacity="0" />
                    </radialGradient>
                </defs>

                <circle cx="50" cy="48" r="25" fill="url(#cg)" />

                {/* Edges */}
                {edges.map(([from, to], i) => (
                    <motion.line
                        key={`e-${i}`}
                        x1={nodes[from].x} y1={nodes[from].y}
                        x2={nodes[to].x} y2={nodes[to].y}
                        stroke="rgba(0,163,255,0.08)"
                        strokeWidth="0.3"
                        strokeDasharray="2 3"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: i * 0.04 }}
                    />
                ))}

                {/* Particles forward */}
                {edges.slice(0, 12).map(([from, to], i) => (
                    <motion.circle
                        key={`pa-${i}`}
                        r="0.5"
                        fill="#00A3FF"
                        initial={{ opacity: 0 }}
                        animate={{
                            cx: [nodes[from].x, nodes[to].x],
                            cy: [nodes[from].y, nodes[to].y],
                            opacity: [0, 0.8, 0.8, 0],
                        }}
                        transition={{
                            duration: 2.5 + (i % 3) * 0.8,
                            repeat: Infinity,
                            delay: i * 0.4,
                            ease: "linear",
                        }}
                    />
                ))}

                {/* Particles reverse */}
                {edges.slice(0, 8).map(([from, to], i) => (
                    <motion.circle
                        key={`pb-${i}`}
                        r="0.35"
                        fill="#00A3FF"
                        fillOpacity="0.5"
                        initial={{ opacity: 0 }}
                        animate={{
                            cx: [nodes[to].x, nodes[from].x],
                            cy: [nodes[to].y, nodes[from].y],
                            opacity: [0, 0.5, 0.5, 0],
                        }}
                        transition={{
                            duration: 3 + (i % 3),
                            repeat: Infinity,
                            delay: 1.2 + i * 0.5,
                            ease: "linear",
                        }}
                    />
                ))}

                {/* Floating text */}
                {floatingTexts.map((ft, i) => (
                    <motion.text
                        key={`ft-${i}`}
                        x={ft.x} y={ft.y}
                        fill="rgba(255,255,255,0.18)"
                        fontSize="2.2"
                        fontFamily="monospace"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.3, 0.3, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: ft.delay + 2,
                            ease: "easeInOut",
                        }}
                    >
                        {ft.text}
                    </motion.text>
                ))}

                {/* Center Rverity pulse rings */}
                <motion.circle
                    cx={50} cy={48} r={15}
                    fill="none" stroke="#00A3FF" strokeWidth="0.3" strokeOpacity="0.2"
                    initial={{ r: 15, opacity: 0.5 }}
                    animate={{ r: [15, 24, 15], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.circle
                    cx={50} cy={48} r={15}
                    fill="none" stroke="#00A3FF" strokeWidth="0.2" strokeOpacity="0.15"
                    initial={{ r: 15, opacity: 0.3 }}
                    animate={{ r: [15, 30, 15], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
                />

                {/* Center core */}
                <circle cx={50} cy={48} r={3.5} fill="#00A3FF" fillOpacity="0.9" />
                <circle cx={50} cy={48} r={2} fill="white" fillOpacity="0.9" />

                {/* All nodes */}
                {nodes.slice(1).map((node, i) => (
                    <g key={node.id}>
                        {/* Glow halo */}
                        {node.icon && (
                            <circle
                                cx={node.x} cy={node.y} r={node.size * 0.9}
                                fill="url(#ng)"
                            />
                        )}
                        {/* Outer ring */}
                        {node.icon && (
                            <circle
                                cx={node.x} cy={node.y} r={node.size * 0.55}
                                fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3"
                            />
                        )}
                        {/* Background */}
                        <circle
                            cx={node.x} cy={node.y} r={node.size * 0.4}
                            fill={node.icon ? "rgba(15,15,22,0.95)" : node.color}
                            fillOpacity={node.icon ? 1 : 0.15}
                            stroke={node.icon ? "rgba(255,255,255,0.12)" : "none"}
                            strokeWidth="0.3"
                        />
                        {/* Icon text */}
                        {node.icon && (
                            <text
                                x={node.x} y={node.y + 0.8}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fill={node.color}
                                fontSize={node.size * 0.32}
                                fontFamily="system-ui"
                                fontWeight="700"
                            >
                                {node.icon}
                            </text>
                        )}
                        {/* Label */}
                        {node.label && (
                            <text
                                x={node.x} y={node.y + node.size * 0.55 + 2.5}
                                textAnchor="middle"
                                fill="rgba(255,255,255,0.45)"
                                fontSize="2.2"
                                fontFamily="system-ui"
                                fontWeight="500"
                            >
                                {node.label}
                            </text>
                        )}
                    </g>
                ))}
            </svg>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
