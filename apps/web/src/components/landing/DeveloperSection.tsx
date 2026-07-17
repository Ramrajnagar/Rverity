"use client";

import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function DeveloperSection() {
    return (
        <section className="py-24 md:py-32 border-t border-white/[0.06]" id="developers">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-white font-display">
                            Built for developers,<br />
                            by developers.
                        </h2>
                        <p className="text-base text-neutral-400 leading-relaxed">
                            Rverity is designed to be extensible, scriptable, and transparent.
                            No black boxes — just clean APIs and open standards.
                        </p>
                        <ul className="space-y-3">
                            {[
                                "TypeScript SDK for custom integrations",
                                "Webhooks for real-time events",
                                "Open API specification",
                                "Local-first vector storage",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm text-neutral-300">
                                    <Check className="h-4 w-4 text-[#00A3FF] shrink-0" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="rounded-xl bg-white/[0.02] border border-white/[0.06] p-6 font-mono text-[13px] leading-relaxed"
                    >
                        <div className="space-y-1.5 text-neutral-300">
                            <div>
                                <span className="text-neutral-500">$</span> npm install @rverity/sdk
                            </div>
                            <div className="h-3" />
                            <div>
                                <span className="text-[#00A3FF]">import</span>{" "}
                                <span className="text-white">{"{ RverityClient }"}</span>{" "}
                                <span className="text-[#00A3FF]">from</span>{" "}
                                <span className="text-[#44FFA4]">'@rverity/sdk'</span>;
                            </div>
                            <div className="h-1" />
                            <div>
                                <span className="text-[#00A3FF]">const</span>{" "}
                                <span className="text-white">client</span>{" "}
                                <span className="text-neutral-500">=</span>{" "}
                                <span className="text-[#00A3FF]">new</span>{" "}
                                <span className="text-[#FFCA16]">RverityClient</span>({"{"}
                            </div>
                            <div className="pl-4">
                                apiKey: <span className="text-[#44FFA4]">'your-api-key'</span>,
                            </div>
                            <div className="pl-4">
                                endpoint: <span className="text-[#44FFA4]">'https://api.rverity.ai'</span>
                            </div>
                            <div>{"});"}</div>
                            <div className="h-1" />
                            <div>
                                <span className="text-neutral-600">// Capture context</span>
                            </div>
                            <div>
                                <span className="text-[#00A3FF]">await</span>{" "}
                                <span className="text-white">client.</span>
                                <span className="text-[#FFCA16]">sendContext</span>({"'"}
                                <span className="text-[#44FFA4]">Working on auth feature</span>
                                {"'"});
                            </div>
                            <div className="h-1" />
                            <div>
                                <span className="text-neutral-600">// Search your knowledge graph</span>
                            </div>
                            <div>
                                <span className="text-[#00A3FF]">const</span>{" "}
                                <span className="text-white">results</span>{" "}
                                <span className="text-neutral-500">=</span>{" "}
                                <span className="text-[#00A3FF]">await</span>{" "}
                                <span className="text-white">client.</span>
                                <span className="text-[#FFCA16]">search</span>({"'"}
                                <span className="text-[#44FFA4]">auth patterns</span>
                                {"'"});
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
