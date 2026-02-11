"use client";

import Section from "@/components/ui/Section";
import { ArrowRight, Check, Download, ExternalLink, Code } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SetupStep {
    title: string;
    description: string;
    code: string;
}

interface IntegrationDetailProps {
    title: string;
    description: string;
    icon: any;
    features: string[];
    installCommand?: string;
    downloadLink?: string;
    docsLink?: string;
    setupSteps?: SetupStep[];
    codeExample?: string;
}

export default function IntegrationDetail({
    title,
    description,
    icon: Icon,
    features,
    installCommand,
    downloadLink,
    docsLink,
    setupSteps,
    codeExample,
}: IntegrationDetailProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

    return (
        <div ref={containerRef} className="relative min-h-screen pt-24 bg-black overflow-hidden">
            {/* Animated background gradient */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"
                style={{ opacity }}
            />

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)]"></div>

            <Section className="py-20 relative z-10">
                <motion.div
                    className="flex flex-col items-center text-center"
                    style={{ scale }}
                >
                    {/* Icon with animation */}
                    <motion.div
                        className="h-24 w-24 rounded-3xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-sm shadow-2xl shadow-purple-500/10"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.1
                        }}
                    >
                        <Icon className="h-12 w-12 text-white" />
                    </motion.div>

                    {/* Title with premium typography */}
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight font-outfit"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        NeuroSync for <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">{title}</span>
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-zinc-400 max-w-3xl mb-12 leading-relaxed font-light"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {description}
                    </motion.p>

                    {/* CTA Buttons with hover effects */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {downloadLink && (
                            <Link
                                href={downloadLink}
                                className="group relative flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full overflow-hidden transition-all hover:shadow-2xl hover:shadow-purple-500/50"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    <Download className="h-5 w-5" />
                                    {title === "GitHub Integration" ? "Connect App" : "Get Started"}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        )}
                        {docsLink && (
                            <Link
                                href={docsLink}
                                className="flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-medium rounded-full hover:bg-white/20 transition-all border border-white/10 hover:border-white/20"
                            >
                                Read Docs <ExternalLink className="h-4 w-4" />
                            </Link>
                        )}
                    </motion.div>

                    {/* Install command with copy animation */}
                    {installCommand && (
                        <motion.div
                            className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 font-mono text-sm text-zinc-300 mb-16 max-w-3xl w-full hover:border-purple-500/30 transition-colors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <span className="text-purple-400">$</span> {installCommand}
                        </motion.div>
                    )}

                    {/* Features Grid with stagger */}
                    <div className="w-full max-w-6xl mb-20">
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-white mb-4 font-outfit tracking-tight"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Features
                        </motion.h2>
                        <motion.p
                            className="text-lg text-zinc-500 mb-12 font-light"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Everything you need to capture and organize your digital context
                        </motion.p>
                        <div className="grid md:grid-cols-2 gap-4 text-left">
                            {features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    className="group flex gap-4 p-5 rounded-2xl bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/[0.08] hover:border-purple-500/30 hover:from-white/[0.12] hover:to-white/[0.05] transition-all cursor-default backdrop-blur-sm"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    whileHover={{ x: 4, scale: 1.01 }}
                                >
                                    <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:from-purple-500/40 group-hover:to-pink-500/40 transition-all border border-purple-500/20">
                                        <Check className="h-3.5 w-3.5 text-purple-300" />
                                    </div>
                                    <span className="text-zinc-200 leading-relaxed font-light text-[15px]">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Setup Steps with scroll reveal */}
                    {setupSteps && setupSteps.length > 0 && (
                        <div className="w-full max-w-4xl mb-20">
                            <motion.h2
                                className="text-4xl md:text-5xl font-bold text-white mb-4 font-outfit tracking-tight"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                Setup Guide
                            </motion.h2>
                            <motion.p
                                className="text-lg text-zinc-500 mb-12 font-light"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                Get started in minutes with our step-by-step guide
                            </motion.p>
                            <div className="space-y-6">
                                {setupSteps.map((step, i) => (
                                    <motion.div
                                        key={i}
                                        className="bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/[0.08] rounded-2xl p-6 text-left hover:border-purple-500/30 hover:from-white/[0.12] hover:to-white/[0.05] transition-all backdrop-blur-sm"
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <div className="flex items-start gap-4 mb-4">
                                            <motion.div
                                                className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center shrink-0 text-white font-bold border border-purple-500/30 font-space-grotesk text-lg shadow-lg shadow-purple-500/10"
                                                whileHover={{ scale: 1.1, rotate: 360 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {i + 1}
                                            </motion.div>
                                            <div className="flex-1">
                                                <h3 className="text-xl md:text-2xl font-bold text-white mb-2 font-outfit">{step.title}</h3>
                                                <p className="text-zinc-400 mb-4 leading-relaxed font-light">{step.description}</p>
                                                <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 font-mono text-sm text-zinc-300 whitespace-pre-wrap hover:border-purple-500/30 transition-colors shadow-inner">
                                                    {step.code}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Code Example with syntax highlighting effect */}
                    {codeExample && (
                        <motion.div
                            className="w-full max-w-4xl"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-8">Example</h2>
                            <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-left hover:border-purple-500/30 transition-all">
                                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                                    <Code className="h-5 w-5 text-purple-400" />
                                    <span className="text-white font-semibold">Code Example</span>
                                </div>
                                <pre className="font-mono text-sm text-zinc-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                                    {codeExample}
                                </pre>
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </Section>
        </div>
    );
}
