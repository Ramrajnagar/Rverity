"use client";

import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { motion } from "framer-motion";
import HeroRightVisual from "./hero-visual/HeroVisual";
import TrustedBy from "./TrustedBy";
import HyperText from "@/components/ui/HyperText";
import SpotlightButton from "@/components/ui/SpotlightButton";
import Typewriter from "@/components/ui/Typewriter";
import SecurityTypewriter from "@/components/ui/SecurityTypewriter";

export default function HeroSection() {
    return (
        <div className="relative flex min-h-screen w-full flex-col md:flex-row items-center justify-between overflow-hidden px-6 pt-24 md:pt-0 text-center md:text-left md:px-20 lg:px-32">

            {/* Ambient Background Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

            {/* Left Column: Text Content */}
            <div className="w-full md:w-1/2 z-10 flex flex-col items-center md:items-start relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "circOut" }}
                    className="flex flex-col items-center md:items-start max-w-2xl space-y-10"
                >
                    {/* System Status Badge */}
                    <div className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 backdrop-blur-md shadow-[0_0_20px_-5px_rgba(168,85,247,0.3)] hover:border-emerald-500/50 transition-colors">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-400 tracking-widest uppercase">
                            Rverity System Online v2.0
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-200%] group-hover:animate-shine" />
                    </div>

                    {/* Headline with Typewriter & Scramble */}
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <h1 className="text-6xl font-bold tracking-tighter text-white sm:text-7xl md:text-8xl font-display leading-[0.85]">
                            <span className="block text-zinc-300">
                                <Typewriter text="SYNC YOUR" delay={200} speed={100} cursorClassName="bg-primary" />
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-fuchsia-400 to-cyan-400 animate-gradient-fast drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]">
                                <HyperText text="DIGITAL MIND" duration={1000} delay={1500} repeat={true} repeatInterval={5000} />
                            </span>
                        </h1>
                    </div>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="max-w-xl text-lg text-zinc-400 sm:text-xl font-medium leading-relaxed"
                    >
                        <SecurityTypewriter texts={["[ROOT_ACCESS_GRANTED]", "[ROOT_ACCESS_DENIED]"]} className="text-sm mr-2" speed={50} />
                        The missing neural link between your code, docs, and fragmented existence.
                        <span className="text-white font-bold glow-text"> Rverity </span>
                        unifies your digital footprint into one living, queryable graph.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                        className="flex flex-col items-center md:items-start gap-6 sm:flex-row w-full sm:w-auto"
                    >
                        {/* Primary Button */}
                        <Link href="/login" className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-200"></div>
                            <button className="relative px-8 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-zinc-600">
                                <span className="flex items-center space-x-5">
                                    <span className="pr-6 text-gray-100 font-bold tracking-wider uppercase group-hover:text-white transition-colors">Initialize Link</span>
                                </span>
                                <span className="pl-6 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </Link>

                        {/* Secondary Button */}
                        <SpotlightButton
                            text="ACCESS LOGS"
                            href="/docs"
                            className="h-14 bg-black/50 border-white/10 hover:border-emerald-500/50 text-emerald-400 font-mono tracking-widest"
                        />
                    </motion.div>

                    <div className="pt-12 w-full">
                        <TrustedBy />
                    </div>
                </motion.div>
            </div>

            {/* Right Column: Visual Animation */}
            <div className="hidden md:flex w-full md:w-1/2 h-full min-h-[700px] items-center justify-center relative z-10 pointer-events-auto perspective-1000">
                <HeroRightVisual />
            </div>
        </div>
    );
}
