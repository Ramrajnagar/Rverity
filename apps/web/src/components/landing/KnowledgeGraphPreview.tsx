"use client";

import { motion } from "framer-motion";

const logos: Record<string, (size: number) => JSX.Element> = {
    vscode: (s) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
            <path d="M17.583 2.427L8.16 12l9.423 9.573L22 20V4l-4.417-1.573z" fill="#007ACC"/>
            <path d="M8.16 12L2 16.573V7.427L8.16 12z" fill="#1F9CF0"/>
            <path d="M8.16 12l9.423-9.573L8.16 12l9.423 9.573L8.16 12z" fill="#007ACC"/>
            <path d="M2 7.427L8.16 12 2 16.573V7.427z" fill="#1F9CF0"/>
            <path d="M17.583 2.427L8.16 12l9.423-9.573L22 4V2.427z" fill="#3CB4E7"/>
            <path d="M17.583 21.573L8.16 12l9.423 9.573L22 20v-1.573z" fill="#3CB4E7"/>
        </svg>
    ),
    chrome: (s) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#4285F4"/>
            <circle cx="12" cy="12" r="4" fill="white"/>
            <path d="M12 2a10 10 0 018.66 5H12v0z" fill="#EA4335"/>
            <path d="M20.66 7A10 10 0 0112 22l4.33-7.5z" fill="#34A853"/>
            <path d="M12 22A10 10 0 013.34 7L7.67 14.5z" fill="#FBBC05"/>
            <circle cx="12" cy="12" r="4" fill="white"/>
        </svg>
    ),
    github: (s) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="white">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
    ),
    slack: (s) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
            <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313z" fill="#E01E5A"/>
            <path d="M8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312z" fill="#36C5F0"/>
            <path d="M18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.271 0a2.528 2.528 0 01-2.521 2.521 2.528 2.528 0 01-2.521-2.521V2.522A2.528 2.528 0 0115.164 0a2.528 2.528 0 012.521 2.522v6.312z" fill="#2EB67D"/>
            <path d="M15.164 18.956a2.528 2.528 0 012.521 2.522A2.528 2.528 0 0115.164 24a2.528 2.528 0 01-2.521-2.522v-2.522zm0-1.271a2.528 2.528 0 01-2.521-2.521 2.528 2.528 0 012.521-2.521h6.314A2.528 2.528 0 0124 15.164a2.528 2.528 0 01-2.522 2.521h-6.314z" fill="#ECB22E"/>
        </svg>
    ),
    notion: (s) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="white">
            <path d="M4.459 4.208c-.746.606-1.026 1.441-1.026 2.898v10.948c0 2.218.57 3.38 1.942 3.38.557 0 1.042-.128 1.544-.43l4.94-3.27v-8.69L6.34 13.1c-.326.227-.515.52-.515.888 0 .36.189.655.515.88l4.613 3.047v-8.77l-5.342 3.47c-.05.124-.062.227-.062.33 0 .142.062.255.177.338l5.23 3.41v-8.73L6.15 9.126c-.05.154-.062.257-.062.36 0 .143.062.256.177.339l5.23 3.41V4.208H4.459zm9.397-.43c-.746.606-1.026 1.441-1.026 2.898v10.948c0 2.218.57 3.38 1.942 3.38.557 0 1.042-.128 1.544-.43l4.94-3.27V4.208H13.856zm6.197 1.137v10.69h1.942c.177 0 .265-.09.265-.278V5.345c0-.187-.088-.278-.265-.278h-1.942z"/>
        </svg>
    ),
    figma: (s) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
            <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83"/>
            <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF"/>
            <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E"/>
            <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262"/>
            <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE"/>
        </svg>
    ),
    slack2: (s) => (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
            <path d="M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313z" fill="#E01E5A"/>
            <path d="M8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312z" fill="#36C5F0"/>
            <path d="M18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.271 0a2.528 2.528 0 01-2.521 2.521 2.528 2.528 0 01-2.521-2.521V2.522A2.528 2.528 0 0115.164 0a2.528 2.528 0 012.521 2.522v6.312z" fill="#2EB67D"/>
            <path d="M15.164 18.956a2.528 2.528 0 012.521 2.522A2.528 2.528 0 0115.164 24a2.528 2.528 0 01-2.521-2.522v-2.522zm0-1.271a2.528 2.528 0 01-2.521-2.521 2.528 2.528 0 012.521-2.521h6.314A2.528 2.528 0 0124 15.164a2.528 2.528 0 01-2.522 2.521h-6.314z" fill="#ECB22E"/>
        </svg>
    ),
};

const nodes = [
    { id: 0, x: 50, y: 48, size: 22, color: "#00A3FF", label: "Rverity", logo: null, isCenter: true },
    { id: 1, x: 18, y: 22, size: 14, color: "#007ACC", label: "VS Code", logo: "vscode" },
    { id: 2, x: 82, y: 18, size: 14, color: "#4285F4", label: "Chrome", logo: "chrome" },
    { id: 3, x: 12, y: 72, size: 14, color: "#FFFFFF", label: "GitHub", logo: "github" },
    { id: 4, x: 88, y: 72, size: 14, color: "#FFFFFF", label: "Notion", logo: "notion" },
    { id: 5, x: 50, y: 10, size: 12, color: "#E01E5A", label: "Slack", logo: "slack" },
    { id: 6, x: 50, y: 88, size: 12, color: "#A259FF", label: "Figma", logo: "figma" },
    { id: 7, x: 30, y: 38, size: 6, color: "#6B7280", label: "", logo: null },
    { id: 8, x: 70, y: 35, size: 6, color: "#6B7280", label: "", logo: null },
    { id: 9, x: 28, y: 58, size: 6, color: "#6B7280", label: "", logo: null },
    { id: 10, x: 72, y: 58, size: 6, color: "#6B7280", label: "", logo: null },
    { id: 11, x: 35, y: 8, size: 5, color: "#4B5563", label: "", logo: null },
    { id: 12, x: 65, y: 8, size: 5, color: "#4B5563", label: "", logo: null },
    { id: 13, x: 15, y: 48, size: 5, color: "#4B5563", label: "", logo: null },
    { id: 14, x: 85, y: 48, size: 5, color: "#4B5563", label: "", logo: null },
];

const edges = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [0, 7], [0, 8], [0, 9], [0, 10],
    [1, 7], [2, 8], [3, 9], [4, 10],
    [5, 11], [5, 12], [3, 13], [4, 14],
    [7, 13], [8, 14], [9, 11], [10, 12],
];

const floatingTexts = [
    { x: 8, y: 34, text: "auth.ts", delay: 0 },
    { x: 88, y: 40, text: "design.v2", delay: 0.5 },
    { x: 38, y: 78, text: "fix #42", delay: 1 },
    { x: 62, y: 78, text: "api/docs", delay: 1.5 },
    { x: 22, y: 14, text: "commit", delay: 0.3 },
    { x: 78, y: 14, text: "pageview", delay: 0.8 },
];

export default function KnowledgeGraphPreview() {
    return (
        <div className="relative w-full aspect-square max-w-[520px] mx-auto">
            {/* Outer glow */}
            <div className="absolute inset-0 bg-[#00A3FF]/[0.03] rounded-full blur-[60px] pointer-events-none" />

            <svg viewBox="0 0 100 100" className="w-full h-full" style={{ filter: "drop-shadow(0 0 40px rgba(0,163,255,0.05))" }}>
                <defs>
                    <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.25" />
                        <stop offset="60%" stopColor="#00A3FF" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#00A3FF" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="node-glow-sm" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#00A3FF" stopOpacity="0" />
                    </radialGradient>
                    <filter id="blur-sm">
                        <feGaussianBlur stdDeviation="0.8" />
                    </filter>
                    <linearGradient id="edge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00A3FF" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#00A3FF" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#00A3FF" stopOpacity="0.3" />
                    </linearGradient>
                </defs>

                {/* Center glow */}
                <circle cx="50" cy="48" r="25" fill="url(#center-glow)" />

                {/* Edges — blurred background layer */}
                {edges.map(([from, to], i) => (
                    <line
                        key={`edge-bg-${i}`}
                        x1={nodes[from].x} y1={nodes[from].y}
                        x2={nodes[to].x} y2={nodes[to].y}
                        stroke="rgba(0,163,255,0.04)"
                        strokeWidth="1.5"
                        filter="url(#blur-sm)"
                    />
                ))}

                {/* Edges — crisp layer with animation */}
                {edges.map(([from, to], i) => (
                    <motion.line
                        key={`edge-${i}`}
                        x1={nodes[from].x} y1={nodes[from].y}
                        x2={nodes[to].x} y2={nodes[to].y}
                        stroke="rgba(0,163,255,0.1)"
                        strokeWidth="0.3"
                        strokeDasharray="2 3"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: i * 0.04 }}
                    />
                ))}

                {/* Data flow particles */}
                {edges.slice(0, 12).map(([from, to], i) => (
                    <motion.circle
                        key={`particle-a-${i}`}
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

                {/* Second layer of particles — reverse direction */}
                {edges.slice(0, 8).map(([from, to], i) => (
                    <motion.circle
                        key={`particle-b-${i}`}
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

                {/* Floating micro-texts */}
                {floatingTexts.map((ft, i) => (
                    <motion.text
                        key={`ftext-${i}`}
                        x={ft.x}
                        y={ft.y}
                        fill="rgba(255,255,255,0.18)"
                        fontSize="2.2"
                        fontFamily="monospace"
                        initial={{ opacity: 0, y: ft.y + 1 }}
                        animate={{ opacity: [0, 0.3, 0.3, 0], y: [ft.y + 1, ft.y - 1] }}
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

                {/* Node: center Rverity with pulse rings */}
                <motion.circle
                    cx={nodes[0].x} cy={nodes[0].y} r={nodes[0].size * 0.7}
                    fill="none" stroke="#00A3FF" strokeWidth="0.3" strokeOpacity="0.2"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.circle
                    cx={nodes[0].x} cy={nodes[0].y} r={nodes[0].size * 0.7}
                    fill="none" stroke="#00A3FF" strokeWidth="0.2" strokeOpacity="0.15"
                    initial={{ scale: 1, opacity: 0.3 }}
                    animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
                />
                {/* Core dot */}
                <motion.circle
                    cx={nodes[0].x} cy={nodes[0].y} r={3.5}
                    fill="#00A3FF" fillOpacity="0.9"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                />
                <motion.circle
                    cx={nodes[0].x} cy={nodes[0].y} r={2}
                    fill="white" fillOpacity="0.9"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                />

                {/* All nodes */}
                {nodes.slice(1).map((node, i) => {
                    const logoFn = node.logo ? logos[node.logo] : null;
                    return (
                        <g key={node.id}>
                            {/* Glow behind logo nodes */}
                            {logoFn && (
                                <motion.circle
                                    cx={node.x} cy={node.y} r={node.size * 0.9}
                                    fill={node.color} fillOpacity="0.06"
                                    filter="url(#blur-sm)"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                                />
                            )}
                            {/* Outer ring for logo nodes */}
                            {logoFn && (
                                <motion.circle
                                    cx={node.x} cy={node.y} r={node.size * 0.55}
                                    fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.3"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                                />
                            )}
                            {/* Background circle */}
                            <motion.circle
                                cx={node.x} cy={node.y} r={node.size * 0.4}
                                fill={logoFn ? "rgba(20,20,25,0.9)" : node.color}
                                fillOpacity={logoFn ? 1 : 0.2}
                                stroke={logoFn ? "rgba(255,255,255,0.1)" : "none"}
                                strokeWidth="0.3"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.4, delay: 0.3 + i * 0.06 }}
                            />
                            {/* Logo SVG inside node */}
                            {logoFn && (
                                <motion.g
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}
                                    style={{ transformOrigin: `${node.x}px ${node.y}px` }}
                                >
                                    <foreignObject
                                        x={node.x - node.size * 0.25}
                                        y={node.y - node.size * 0.25}
                                        width={node.size * 0.5}
                                        height={node.size * 0.5}
                                    >
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {logoFn(node.size * 0.4)}
                                        </div>
                                    </foreignObject>
                                </motion.g>
                            )}
                            {/* Label */}
                            {node.label && (
                                <motion.text
                                    x={node.x}
                                    y={node.y + node.size * 0.55 + 2.5}
                                    textAnchor="middle"
                                    fill="rgba(255,255,255,0.45)"
                                    fontSize="2.2"
                                    fontFamily="system-ui"
                                    fontWeight="500"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 + i * 0.04 }}
                                >
                                    {node.label}
                                </motion.text>
                            )}
                        </g>
                    );
                })}
            </svg>

            {/* Bottom fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
        </div>
    );
}
