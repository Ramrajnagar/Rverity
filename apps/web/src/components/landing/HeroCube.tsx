"use client";

import { motion } from "framer-motion";

const nodeLogos: Record<string, { paths: string[]; fill: string }> = {
    vscode: {
        fill: "#007ACC",
        paths: [
            "M17.583 2.427L8.16 12l9.423 9.573L22 20V4l-4.417-1.573z",
            "M8.16 12L2 16.573V7.427L8.16 12z",
            "M17.583 2.427L8.16 12l9.423-9.573L22 4V2.427z",
            "M17.583 21.573L8.16 12l9.423 9.573L22 20v-1.573z",
        ],
    },
    chrome: {
        fill: "#4285F4",
        paths: [
            "M12 2a10 10 0 018.66 5H12z",
            "M20.66 7A10 10 0 0112 22l4.33-7.5z",
            "M12 22A10 10 0 013.34 7L7.67 14.5z",
        ],
    },
    github: {
        fill: "#f0f0f0",
        paths: [
            "M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z",
        ],
    },
    slack: {
        fill: "#E01E5A",
        paths: [
            "M5.042 15.165a2.528 2.528 0 01-2.52 2.523A2.528 2.528 0 010 15.165a2.527 2.527 0 012.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 012.521-2.52 2.527 2.527 0 012.521 2.52v6.313A2.528 2.528 0 018.834 24a2.528 2.528 0 01-2.521-2.522v-6.313z",
            "M8.834 5.042a2.528 2.528 0 01-2.521-2.52A2.528 2.528 0 018.834 0a2.528 2.528 0 012.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 012.521 2.521 2.528 2.528 0 01-2.521 2.521H2.522A2.528 2.528 0 010 8.834a2.528 2.528 0 012.522-2.521h6.312z",
            "M18.956 8.834a2.528 2.528 0 012.522-2.521A2.528 2.528 0 0124 8.834a2.528 2.528 0 01-2.522 2.521h-2.522V8.834zm-1.271 0a2.528 2.528 0 01-2.521 2.521 2.528 2.528 0 01-2.521-2.521V2.522A2.528 2.528 0 0115.164 0a2.528 2.528 0 012.521 2.522v6.312z",
            "M15.164 18.956a2.528 2.528 0 012.521 2.522A2.528 2.528 0 0115.164 24a2.528 2.528 0 01-2.521-2.522v-2.522zm0-1.271a2.528 2.528 0 01-2.521-2.521 2.528 2.528 0 012.521-2.521h6.314A2.528 2.528 0 0124 15.164a2.528 2.528 0 01-2.522 2.521h-6.314z",
        ],
    },
    notion: {
        fill: "#fff",
        paths: [
            "M4.459 4.208c-.746.606-1.026 1.441-1.026 2.898v10.948c0 2.218.57 3.38 1.942 3.38.557 0 1.042-.128 1.544-.43l4.94-3.27v-8.69L6.34 13.1c-.326.227-.515.52-.515.888 0 .36.189.655.515.88l4.613 3.047v-8.77l-5.342 3.47c-.05.124-.062.227-.062.33 0 .142.062.255.177.338l5.23 3.41v-8.73L6.15 9.126c-.05.154-.062.257-.062.36 0 .143.062.256.177.339l5.23 3.41V4.208H4.459zm9.397-.43c-.746.606-1.026 1.441-1.026 2.898v10.948c0 2.218.57 3.38 1.942 3.38.557 0 1.042-.128 1.544-.43l4.94-3.27V4.208H13.856zm6.197 1.137v10.69h1.942c.177 0 .265-.09.265-.278V5.345c0-.187-.088-.278-.265-.278h-1.942z",
        ],
    },
    figma: {
        fill: "#A259FF",
        paths: [
            "M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z",
            "M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z",
            "M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z",
            "M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z",
            "M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z",
        ],
    },
};

interface NodeDef {
    x: number; y: number; r: number; color: string; logo: string | null; label: string;
}

const nodes: NodeDef[] = [
    { x: 88, y: 12, r: 5, color: "#007ACC", logo: "vscode", label: "VS Code" },
    { x: 94, y: 50, r: 5, color: "#4285F4", logo: "chrome", label: "Chrome" },
    { x: 85, y: 88, r: 5, color: "#f0f0f0", logo: "github", label: "GitHub" },
    { x: 6, y: 50, r: 5, color: "#E01E5A", logo: "slack", label: "Slack" },
    { x: 12, y: 12, r: 5, color: "#fff", logo: "notion", label: "Notion" },
    { x: 15, y: 88, r: 5, color: "#A259FF", logo: "figma", label: "Figma" },
];

const cubeEdges: [number, number][] = [
    [62, 28, 88, 12],
    [72, 50, 94, 50],
    [62, 72, 85, 88],
    [28, 50, 6, 50],
    [38, 28, 12, 12],
    [38, 72, 15, 88],
];

export default function HeroCube() {
    return (
        <div className="relative w-full aspect-square max-w-[480px] mx-auto">
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-[#00A3FF]/[0.06] rounded-full blur-[80px] pointer-events-none" />

            {/* Orbiting rings */}
            <div className="absolute inset-[15%]">
                <motion.div
                    className="absolute inset-0 rounded-full border border-[#00A3FF]/[0.08]"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateX: 70, rotateZ: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute inset-[10%] rounded-full border border-[#00A3FF]/[0.05]"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateX: 50, rotateZ: -360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* Orbiting particles */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.div
                    key={`orbit-${i}`}
                    className="absolute"
                    style={{
                        left: "50%", top: "50%", width: "70%", height: "70%",
                        marginLeft: "-35%", marginTop: "-35%",
                        transformStyle: "preserve-3d",
                        transform: `rotateX(${60 + i * 5}deg) rotateZ(${i * 60}deg)`,
                    }}
                    animate={{ rotateZ: [i * 60, i * 60 + 360] }}
                    transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
                >
                    <motion.div
                        className="absolute rounded-full"
                        style={{
                            width: i % 3 === 0 ? 6 : 4, height: i % 3 === 0 ? 6 : 4,
                            background: i % 3 === 0 ? "#00A3FF" : i % 3 === 1 ? "#44FFA4" : "#A78BFA",
                            boxShadow: `0 0 ${i % 3 === 0 ? 12 : 8}px ${i % 3 === 0 ? "#00A3FF" : i % 3 === 1 ? "#44FFA4" : "#A78BFA"}`,
                            top: 0, left: "50%", transform: "translateX(-50%)",
                        }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                </motion.div>
            ))}

            {/* 3D Cube */}
            <div className="absolute inset-[22%]" style={{ perspective: "800px" }}>
                <motion.div
                    className="relative w-full h-full"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{ rotateX: [15, 25, 15], rotateY: [0, 360] }}
                    transition={{
                        rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                        rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                    }}
                >
                    {[
                        { transform: "translateZ(50%)", opacity: 0.9 },
                        { transform: "rotateY(180deg) translateZ(50%)", opacity: 0.6 },
                        { transform: "rotateY(90deg) translateZ(50%)", opacity: 0.7 },
                        { transform: "rotateY(-90deg) translateZ(50%)", opacity: 0.7 },
                        { transform: "rotateX(90deg) translateZ(50%)", opacity: 0.5 },
                        { transform: "rotateX(-90deg) translateZ(50%)", opacity: 0.5 },
                    ].map((face, i) => (
                        <div
                            key={i}
                            className="absolute inset-0 border border-[#00A3FF]/[0.2] rounded-lg overflow-hidden"
                            style={{
                                transform: face.transform,
                                backfaceVisibility: "visible",
                                background: `linear-gradient(135deg, rgba(0,163,255,${0.03 * face.opacity}), rgba(0,163,255,${0.01 * face.opacity}))`,
                            }}
                        >
                            <FaceContent index={i} />
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Center glow core */}
            <div className="absolute inset-[35%] flex items-center justify-center pointer-events-none">
                <motion.div
                    className="w-10 h-10 rounded-xl bg-[#00A3FF]/20 border border-[#00A3FF]/30 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 3, repeat: Infinity }}
                >
                    <div className="w-4 h-4 rounded-md bg-[#00A3FF]/60" />
                </motion.div>
            </div>

            {/* SVG layer: connection lines + logos + particles */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                {/* Connection lines from cube to nodes */}
                {cubeEdges.map(([x1, y1, x2, y2], i) => (
                    <motion.line
                        key={`line-${i}`}
                        x1={x1} y1={y1} x2={x2} y2={y2}
                        stroke={nodes[i].color}
                        strokeWidth="0.3"
                        strokeOpacity="0.15"
                        strokeDasharray="1 2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.15 }}
                    />
                ))}

                {/* Data particles along connections */}
                {cubeEdges.map(([x1, y1, x2, y2], i) => (
                    <motion.circle
                        key={`particle-${i}`}
                        r="0.7"
                        fill={nodes[i].color}
                        fillOpacity="0.8"
                        initial={{ opacity: 0 }}
                        animate={{
                            cx: [x1, x2, x1],
                            cy: [y1, y2, y1],
                            opacity: [0, 0.9, 0.9, 0],
                        }}
                        transition={{
                            duration: 3 + i * 0.4,
                            repeat: Infinity,
                            delay: 1.5 + i * 0.5,
                            ease: "linear",
                        }}
                    />
                ))}

                {/* Logo nodes */}
                {nodes.map((node, i) => {
                    const logo = node.logo ? nodeLogos[node.logo] : null;
                    return (
                        <g key={`node-${i}`}>
                            {/* Glow halo */}
                            <motion.circle
                                cx={node.x} cy={node.y} r={node.r * 2}
                                fill={node.color} fillOpacity="0.04"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.8 + i * 0.15 }}
                            />
                            {/* Outer ring */}
                            <motion.circle
                                cx={node.x} cy={node.y} r={node.r}
                                fill="rgba(10,10,15,0.9)"
                                stroke={node.color}
                                strokeWidth="0.4"
                                strokeOpacity="0.4"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.8 + i * 0.15 }}
                            />
                            {/* Logo paths */}
                            {logo && (
                                <g transform={`translate(${node.x - 4}, ${node.y - 4}) scale(0.33)`}>
                                    {logo.paths.map((d, pi) => (
                                        <path
                                            key={pi}
                                            d={d}
                                            fill={logo.fill}
                                            fillOpacity="0.7"
                                        />
                                    ))}
                                </g>
                            )}
                            {/* Label below */}
                            <motion.text
                                x={node.x} y={node.y + node.r + 3}
                                textAnchor="middle"
                                fill={node.color}
                                fillOpacity="0.4"
                                fontSize="2"
                                fontFamily="system-ui"
                                fontWeight="500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 + i * 0.1 }}
                            >
                                {node.label}
                            </motion.text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}

function FaceContent({ index }: { index: number }) {
    const contents = [
        <div key="f" className="p-3 font-mono text-[7px] leading-[10px] text-[#00A3FF]/40">
            <div>import &#123; Rverity &#125; from</div>
            <div>&apos;@rverity/sdk&apos;</div>
            <div className="mt-1.5">const rv = new Rverity()</div>
            <div>await rv.capture(&#123;</div>
            <div>&nbsp;&nbsp;content: &apos;auth fix&apos;</div>
            <div>&#125;)</div>
        </div>,
        <div key="b" className="p-3 font-mono text-[7px] leading-[10px] text-[#00A3FF]/30">
            <div>&#123; &quot;status&quot;: &quot;ok&quot;,</div>
            <div>&nbsp;&nbsp;&quot;id&quot;: &quot;a3f2...&quot;,</div>
            <div>&nbsp;&nbsp;&quot;embedding&quot;: [</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;0.023, -0.142, ...</div>
            <div>&nbsp;&nbsp;],</div>
            <div>&nbsp;&nbsp;&quot;source&quot;: &quot;vscode&quot;</div>
            <div>&#125;</div>
        </div>,
        <div key="r" className="p-3 font-mono text-[7px] leading-[10px] text-[#00A3FF]/35">
            <div className="text-[#44FFA4]/40">// search results</div>
            <div>[</div>
            <div>&nbsp;&nbsp;&#123; score: 0.94,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;content: &apos;auth...&apos; &#125;,</div>
            <div>&nbsp;&nbsp;&#123; score: 0.87,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;content: &apos;jwt...&apos; &#125;</div>
            <div>]</div>
        </div>,
        <div key="l" className="p-3 font-mono text-[7px] leading-[10px] text-[#00A3FF]/30">
            <div className="text-[#44FFA4]/40">// metrics</div>
            <div>memories: 2,847</div>
            <div>connections: 847</div>
            <div>queries_today: 342</div>
            <div>latency_p99: 12ms</div>
            <div>uptime: 99.99%</div>
        </div>,
        <div key="t" className="p-3 font-mono text-[7px] leading-[10px] text-[#00A3FF]/25">
            <div className="text-[#A78BFA]/40">table memories</div>
            <div>id: uuid</div>
            <div>content: text</div>
            <div>embedding: vec(1536)</div>
            <div>source: text</div>
            <div>tags: text[]</div>
        </div>,
        <div key="bo" className="p-3 font-mono text-[7px] leading-[10px] text-[#00A3FF]/25">
            <div className="text-[#E01E5A]/40">graph query</div>
            <div>MATCH (m:Memory)</div>
            <div>-[:RELATES_TO]-&gt;</div>
            <div>(n:Memory)</div>
            <div>WHERE m.user = $id</div>
            <div>RETURN m, n</div>
        </div>,
    ];

    return (
        <div className="w-full h-full flex items-center justify-center select-none">
            {contents[index]}
        </div>
    );
}
