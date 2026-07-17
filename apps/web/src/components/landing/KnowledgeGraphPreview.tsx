"use client";

import { motion } from "framer-motion";

const nodes = [
    { id: 0, x: 50, y: 50, size: 18, color: "#00A3FF", label: "Rverity" },
    { id: 1, x: 20, y: 25, size: 10, color: "#44FFA4", label: "VS Code" },
    { id: 2, x: 80, y: 20, size: 10, color: "#FF6B6B", label: "Chrome" },
    { id: 3, x: 15, y: 75, size: 10, color: "#A78BFA", label: "GitHub" },
    { id: 4, x: 85, y: 70, size: 10, color: "#FBBF24", label: "Docs" },
    { id: 5, x: 35, y: 15, size: 7, color: "#6B7280", label: "Commit" },
    { id: 6, x: 65, y: 12, size: 7, color: "#6B7280", label: "Page Visit" },
    { id: 7, x: 10, y: 50, size: 7, color: "#6B7280", label: "Issue" },
    { id: 8, x: 90, y: 45, size: 7, color: "#6B7280", label: "Note" },
    { id: 9, x: 40, y: 85, size: 7, color: "#6B7280", label: "PR" },
    { id: 10, x: 70, y: 85, size: 7, color: "#6B7280", label: "Bookmark" },
];

const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 5], [2, 6], [3, 7], [4, 8],
    [3, 9], [4, 10],
    [5, 7], [6, 8], [9, 10],
];

export default function KnowledgeGraphPreview() {
    return (
        <div className="relative w-full aspect-square max-w-[500px] mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#00A3FF" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {edges.map(([from, to], i) => (
                    <motion.line
                        key={`edge-${i}`}
                        x1={nodes[from].x}
                        y1={nodes[from].y}
                        x2={nodes[to].x}
                        y2={nodes[to].y}
                        stroke="rgba(255,255,255,0.06)"
                        strokeWidth="0.3"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: i * 0.08 }}
                    />
                ))}

                {edges.map(([from, to], i) => (
                    <motion.circle
                        key={`particle-${i}`}
                        r="0.6"
                        fill="#00A3FF"
                        initial={{ opacity: 0 }}
                        animate={{
                            cx: [nodes[from].x, nodes[to].x, nodes[from].x],
                            cy: [nodes[from].y, nodes[to].y, nodes[from].y],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                            ease: "linear",
                        }}
                    />
                ))}

                {nodes.map((node, i) => (
                    <g key={node.id}>
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r={node.size * 0.6}
                            fill={node.color}
                            fillOpacity={0.15}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.06 }}
                        />
                        <motion.circle
                            cx={node.x}
                            cy={node.y}
                            r={node.size * 0.3}
                            fill={node.color}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.06 }}
                        />
                        {node.size >= 10 && (
                            <motion.text
                                x={node.x}
                                y={node.y + node.size * 0.5 + 3}
                                textAnchor="middle"
                                fill="rgba(255,255,255,0.5)"
                                fontSize="2.5"
                                fontFamily="system-ui"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 + i * 0.05 }}
                            >
                                {node.label}
                            </motion.text>
                        )}
                    </g>
                ))}
            </svg>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
