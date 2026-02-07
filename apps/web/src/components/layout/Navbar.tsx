"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Menu, X, ChevronDown,
    Github, Chrome, Code2, Terminal,
    Brain, Activity, Network, Book
} from "lucide-react";
import { cn } from "@/lib/utils";
import RverityLogo from "../branding/RverityLogo";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [integrationsOpen, setIntegrationsOpen] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 transition-all duration-300 rounded-full border shadow-2xl",
                scrolled
                    ? "bg-[#050505]/90 backdrop-blur-xl border-emerald-500/20 py-3"
                    : "bg-[#0a0a0a]/80 backdrop-blur-lg border-white/10 py-4"
            )}
        >
            <div className="px-8 flex items-center justify-between h-full">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group shrink-0">
                    <RverityLogo hideText={false} className="scale-90" />
                </Link>

                {/* Desktop Nav - Centered via Flex margins or Justify */}
                <div className="hidden md:flex items-center gap-8 lg:gap-10">
                    <Link href="/" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors tracking-wide uppercase text-[11px]">Home</Link>
                    <Link href="/pricing" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors tracking-wide uppercase text-[11px]">Pricing</Link>

                    {/* Integrations Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setIntegrationsOpen(true)}
                        onMouseLeave={() => setIntegrationsOpen(false)}
                    >
                        <button className="flex items-center gap-1 text-sm font-bold text-zinc-400 hover:text-white transition-colors py-2 tracking-wide uppercase text-[11px]">
                            Integrations <ChevronDown className={cn("h-3 w-3 transition-transform", integrationsOpen ? "rotate-180" : "")} />
                        </button>

                        <AnimatePresence>
                            {integrationsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 w-64 pt-6"
                                >
                                    <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl ring-1 ring-white/5 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
                                        <DropdownItem href="/integrations/vscode" icon={Code2} title="VS Code" />
                                        <DropdownItem href="/integrations/browser" icon={Chrome} title="Browser" />
                                        <DropdownItem href="/integrations/github" icon={Github} title="GitHub" />
                                        <DropdownItem href="/docs/api" icon={Terminal} title="API / SDK" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link href="/graph" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors tracking-wide uppercase text-[11px]">Knowledge Graph</Link>
                    <Link href="/docs" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors tracking-wide uppercase text-[11px]">Docs</Link>
                </div>

                {/* CTA Buttons */}
                <div className="hidden md:flex items-center gap-4 shrink-0">
                    <Link
                        href="/login"
                        className="px-6 py-2.5 rounded-full text-xs font-bold text-white border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-wider backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        Log In
                    </Link>
                    <Link href="/signup" className="group relative px-6 py-2.5 bg-white text-black text-xs font-bold rounded-full overflow-hidden transition-transform hover:scale-105 uppercase tracking-wider shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">Get Started</span>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-zinc-900 border-b border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white">Home</Link>
                            <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-400">Pricing</Link>
                            <Link href="/graph" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-400">Knowledge Graph</Link>
                            <Link href="/docs" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-zinc-400">Docs</Link>
                            <div className="h-px bg-white/10 my-2" />
                            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-white">Log In</Link>
                            <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="text-lg font-bold text-emerald-400">Get Started</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

function DropdownItem({ href, icon: Icon, title }: any) {
    return (
        <Link href={href} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-lg transition-colors group">
            <div className="h-8 w-8 flex items-center justify-center rounded-md bg-white/5 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors text-zinc-400">
                <Icon className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-zinc-300 group-hover:text-white">{title}</span>
        </Link>
    )
}
