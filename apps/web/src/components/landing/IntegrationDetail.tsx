"use client";

import Section from "@/components/ui/Section";
import { ArrowRight, Check, Download, ExternalLink } from "lucide-react";
import Link from "next/link";

interface IntegrationDetailProps {
    title: string;
    description: string;
    icon: any;
    features: string[];
    installCommand?: string;
    downloadLink?: string;
    docsLink?: string;
    image?: any;
}

export default function IntegrationDetail({
    title,
    description,
    icon: Icon,
    features,
    installCommand,
    downloadLink,
    docsLink,
}: IntegrationDetailProps) {
    return (
        <div className="relative min-h-screen pt-24">
            <Section className="py-20">
                <div className="flex flex-col items-center text-center">
                    <div className="h-24 w-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-8">
                        <Icon className="h-12 w-12 text-white" />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Rverity for <span className="text-emerald-400">{title}</span>
                    </h1>

                    <p className="text-xl text-zinc-400 max-w-2xl mb-12">
                        {description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-16">
                        {downloadLink && (
                            <Link href={downloadLink} className="flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors">
                                <Download className="h-5 w-5" />
                                Install Now
                            </Link>
                        )}
                        {docsLink && (
                            <Link href={docsLink} className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-colors">
                                Read Docs <ExternalLink className="h-4 w-4" />
                            </Link>
                        )}
                    </div>

                    {installCommand && (
                        <div className="bg-black border border-white/10 rounded-xl p-6 font-mono text-sm text-zinc-300 mb-16">
                            <span className="text-emerald-400">$</span> {installCommand}
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full text-left">
                        {features.map((feature, i) => (
                            <div key={i} className="flex gap-4 p-6 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-colors">
                                <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                                    <Check className="h-3 w-3 text-emerald-500" />
                                </div>
                                <span className="text-zinc-200">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </div>
    );
}
