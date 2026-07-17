"use client";

import { motion } from "framer-motion";

export default function HeroCube() {
    return (
        <div className="relative w-full aspect-square max-w-[480px] mx-auto perspective-[1200px]">
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
                        left: "50%",
                        top: "50%",
                        width: "70%",
                        height: "70%",
                        marginLeft: "-35%",
                        marginTop: "-35%",
                        transformStyle: "preserve-3d",
                        transform: `rotateX(${60 + i * 5}deg) rotateZ(${i * 60}deg)`,
                    }}
                    animate={{ rotateZ: [i * 60, i * 60 + 360] }}
                    transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear" }}
                >
                    <motion.div
                        className="absolute rounded-full"
                        style={{
                            width: i % 3 === 0 ? 6 : 4,
                            height: i % 3 === 0 ? 6 : 4,
                            background: i % 3 === 0 ? "#00A3FF" : i % 3 === 1 ? "#44FFA4" : "#A78BFA",
                            boxShadow: `0 0 ${i % 3 === 0 ? 12 : 8}px ${i % 3 === 0 ? "#00A3FF" : i % 3 === 1 ? "#44FFA4" : "#A78BFA"}`,
                            top: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                        }}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                </motion.div>
            ))}

            {/* 3D Cube */}
            <div
                className="absolute inset-[22%]"
                style={{ perspective: "800px" }}
            >
                <motion.div
                    className="relative w-full h-full"
                    style={{ transformStyle: "preserve-3d" }}
                    animate={{
                        rotateX: [15, 25, 15],
                        rotateY: [0, 360],
                    }}
                    transition={{
                        rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                        rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
                    }}
                >
                    {/* Cube faces */}
                    {[
                        { transform: "translateZ(50%)", opacity: 0.9 },   // front
                        { transform: "rotateY(180deg) translateZ(50%)", opacity: 0.6 },  // back
                        { transform: "rotateY(90deg) translateZ(50%)", opacity: 0.7 },   // right
                        { transform: "rotateY(-90deg) translateZ(50%)", opacity: 0.7 },  // left
                        { transform: "rotateX(90deg) translateZ(50%)", opacity: 0.5 },   // top
                        { transform: "rotateX(-90deg) translateZ(50%)", opacity: 0.5 },  // bottom
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
                            {/* Face content — data flowing */}
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

            {/* Connection lines to external nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                {/* Top-right node */}
                <motion.line x1="62" y1="28" x2="88" y2="12" stroke="#00A3FF" strokeWidth="0.3" strokeOpacity="0.2"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
                <motion.circle cx="88" cy="12" r="3" fill="rgba(0,163,255,0.08)" stroke="#00A3FF" strokeWidth="0.3" strokeOpacity="0.3"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} />
                <text x="88" y="12.8" textAnchor="middle" fill="#00A3FF" fillOpacity="0.6" fontSize="2.2" fontFamily="monospace">VS</text>

                {/* Right node */}
                <motion.line x1="72" y1="50" x2="94" y2="50" stroke="#4285F4" strokeWidth="0.3" strokeOpacity="0.2"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.7 }} />
                <motion.circle cx="94" cy="50" r="3" fill="rgba(66,133,244,0.08)" stroke="#4285F4" strokeWidth="0.3" strokeOpacity="0.3"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} />
                <text x="94" y="50.8" textAnchor="middle" fill="#4285F4" fillOpacity="0.6" fontSize="2.2" fontFamily="monospace">Cr</text>

                {/* Bottom-right node */}
                <motion.line x1="62" y1="72" x2="85" y2="88" stroke="#f0f0f0" strokeWidth="0.3" strokeOpacity="0.2"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.9 }} />
                <motion.circle cx="85" cy="88" r="3" fill="rgba(240,240,240,0.08)" stroke="#f0f0f0" strokeWidth="0.3" strokeOpacity="0.3"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }} />
                <text x="85" y="88.8" textAnchor="middle" fill="#f0f0f0" fillOpacity="0.6" fontSize="2.2" fontFamily="monospace">GH</text>

                {/* Left node */}
                <motion.line x1="28" y1="50" x2="6" y2="50" stroke="#E01E5A" strokeWidth="0.3" strokeOpacity="0.2"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.1 }} />
                <motion.circle cx="6" cy="50" r="3" fill="rgba(224,30,90,0.08)" stroke="#E01E5A" strokeWidth="0.3" strokeOpacity="0.3"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4 }} />
                <text x="6" y="50.8" textAnchor="middle" fill="#E01E5A" fillOpacity="0.6" fontSize="2.2" fontFamily="monospace">Sl</text>

                {/* Top-left node */}
                <motion.line x1="38" y1="28" x2="12" y2="12" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.2"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.3 }} />
                <motion.circle cx="12" cy="12" r="3" fill="rgba(255,255,255,0.08)" stroke="#fff" strokeWidth="0.3" strokeOpacity="0.3"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.6 }} />
                <text x="12" y="12.8" textAnchor="middle" fill="#fff" fillOpacity="0.6" fontSize="2.2" fontFamily="monospace">N</text>

                {/* Bottom-left node */}
                <motion.line x1="38" y1="72" x2="15" y2="88" stroke="#A259FF" strokeWidth="0.3" strokeOpacity="0.2"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1.5 }} />
                <motion.circle cx="15" cy="88" r="3" fill="rgba(162,89,255,0.08)" stroke="#A259FF" strokeWidth="0.3" strokeOpacity="0.3"
                    initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8 }} />
                <text x="15" y="88.8" textAnchor="middle" fill="#A259FF" fillOpacity="0.6" fontSize="2.2" fontFamily="monospace">Fi</text>

                {/* Data particles along connections */}
                {[
                    { x1: 62, y1: 28, x2: 88, y2: 12, color: "#00A3FF" },
                    { x1: 72, y1: 50, x2: 94, y2: 50, color: "#4285F4" },
                    { x1: 62, y1: 72, x2: 85, y2: 88, color: "#f0f0f0" },
                    { x1: 28, y1: 50, x2: 6, y2: 50, color: "#E01E5A" },
                    { x1: 38, y1: 28, x2: 12, y2: 12, color: "#fff" },
                    { x1: 38, y1: 72, x2: 15, y2: 88, color: "#A259FF" },
                ].map((p, i) => (
                    <motion.circle
                        key={`dp-${i}`}
                        r="0.8"
                        fill={p.color}
                        fillOpacity="0.8"
                        initial={{ opacity: 0 }}
                        animate={{
                            cx: [p.x1, p.x2, p.x1],
                            cy: [p.y1, p.y2, p.y1],
                            opacity: [0, 0.8, 0.8, 0],
                        }}
                        transition={{
                            duration: 3 + i * 0.4,
                            repeat: Infinity,
                            delay: 2 + i * 0.5,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

function FaceContent({ index }: { index: number }) {
    const contents = [
        // Front face — code
        <div key="f" className="p-3 font-mono text-[7px] leading-[10px] text-[#00A3FF]/40">
            <div>import &#123; Rverity &#125; from</div>
            <div>&apos;@rverity/sdk&apos;</div>
            <div className="mt-1.5">const rv = new Rverity()</div>
            <div>await rv.capture(&#123;</div>
            <div>&nbsp;&nbsp;content: &apos;auth fix&apos;</div>
            <div>&#125;)</div>
        </div>,
        // Back face — JSON
        <div key="b" className="p-3 font-mono text-[7px] leading-[10px] text-[#00A3FF]/30">
            <div>&#123; &quot;status&quot;: &quot;ok&quot;,</div>
            <div>&nbsp;&nbsp;&quot;id&quot;: &quot;a3f2...&quot;,</div>
            <div>&nbsp;&nbsp;&quot;embedding&quot;: [</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;0.023, -0.142, ...</div>
            <div>&nbsp;&nbsp;],</div>
            <div>&nbsp;&nbsp;&quot;source&quot;: &quot;vscode&quot;</div>
            <div>&#125;</div>
        </div>,
        // Right face — search results
        <div key="r" className="p-3 font-mono text-[7px] leading-[10px] text-[#00A3FF]/35">
            <div className="text-[#44FFA4]/40">// search results</div>
            <div>[</div>
            <div>&nbsp;&nbsp;&#123; score: 0.94,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;content: &apos;auth...&apos; &#125;,</div>
            <div>&nbsp;&nbsp;&#123; score: 0.87,</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;content: &apos;jwt...&apos; &#125;</div>
            <div>]</div>
        </div>,
        // Left face — metrics
        <div key="l" className="p-3 font-mono text-[7px] leading-[10px] text-[#00A3FF]/30">
            <div className="text-[#44FFA4]/40">// metrics</div>
            <div>memories: 2,847</div>
            <div>connections: 847</div>
            <div>queries_today: 342</div>
            <div>latency_p99: 12ms</div>
            <div>uptime: 99.99%</div>
        </div>,
        // Top face — schema
        <div key="t" className="p-3 font-mono text-[7px] leading-[10px] text-[#00A3FF]/25">
            <div className="text-[#A78BFA]/40">table memories</div>
            <div>id: uuid</div>
            <div>content: text</div>
            <div>embedding: vec(1536)</div>
            <div>source: text</div>
            <div>tags: text[]</div>
        </div>,
        // Bottom face — graph
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
