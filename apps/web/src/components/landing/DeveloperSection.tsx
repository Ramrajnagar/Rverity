"use client";

import Section from "@/components/ui/Section";
import { Check } from "lucide-react";

export default function DeveloperSection() {
    return (
        <Section className="py-24 border-t border-white/5 bg-zinc-900/50" id="developers">
            <div className="grid gap-12 lg:grid-cols-2 items-center max-w-6xl mx-auto">
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Built for developers,<br />
                        by developers.
                    </h2>
                    <p className="text-lg text-zinc-400">
                        We don't believe in black boxes. Rverity is designed to be extending, scriptable, and transparent.
                    </p>
                    <ul className="space-y-4">
                        {[
                            "Typescript SDK for custom integrations",
                            "Webhooks for real-time events",
                            "Open API specification",
                            "Local-first vector storage"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-zinc-300">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="relative rounded-xl bg-black border border-white/10 shadow-2xl p-6 font-mono text-sm">
                    <div className="flex gap-2 mb-4">
                        <div className="h-3 w-3 rounded-full bg-red-500/50" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                        <div className="h-3 w-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="space-y-2 text-zinc-300">
                        <div className="flex">
                            <span className="text-purple-400 mr-2">$</span>
                            <span>npm install @rverity/sdk</span>
                        </div>
                        <div className="h-4" />
                        <div>
                            <span className="text-pink-400">import</span>
                            <span className="text-white"> {"{ Rverity }"} </span>
                            <span className="text-pink-400">from</span>
                            <span className="text-emerald-300"> '@rverity/sdk'</span>;
                        </div>
                        <div className="h-2" />
                        <div>
                            <span className="text-blue-400">const</span>
                            <span className="text-white"> client </span>
                            <span className="text-pink-400">=</span>
                            <span className="text-blue-400"> new</span>
                            <span className="text-yellow-300"> Rverity</span>({"{ "}
                            <span className="text-zinc-500">/* config */</span>
                            {" }"});
                        </div>
                        <div className="h-2" />
                        <div>
                            <span className="text-blue-400">const</span>
                            <span className="text-white"> graph </span>
                            <span className="text-pink-400">=</span>
                            <span className="text-blue-400"> await</span>
                            <span className="text-white"> client.graph.</span>
                            <span className="text-yellow-300">query</span>({"{ "}
                        </div>
                        <div className="pl-4">
                            <span className="text-emerald-300">context</span>: <span className="text-orange-300">"cursor_position"</span>,
                        </div>
                        <div className="pl-4">
                            <span className="text-emerald-300">limit</span>: <span className="text-blue-400">10</span>
                        </div>
                        <div>{"});"}</div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
