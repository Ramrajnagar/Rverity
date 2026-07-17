"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Github, Chrome, Code2, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import RverityLogo from "../branding/RverityLogo";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [integrationsOpen, setIntegrationsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-150",
                scrolled
                    ? "bg-black/80 backdrop-blur-md border-b border-white/[0.08]"
                    : "bg-transparent"
            )}
        >
            <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 h-14">
                <Link href="/" className="flex items-center gap-2.5 shrink-0">
                    <RverityLogo hideText={false} />
                </Link>

                <div className="hidden md:flex items-center gap-6">
                    <NavLink href="/pricing">Pricing</NavLink>
                    <div
                        className="relative"
                        onMouseEnter={() => setIntegrationsOpen(true)}
                        onMouseLeave={() => setIntegrationsOpen(false)}
                    >
                        <button className="flex items-center gap-1 text-[13px] font-medium text-neutral-400 hover:text-white transition-colors duration-150">
                            Integrations
                            <ChevronDown className={cn("h-3 w-3 transition-transform duration-150", integrationsOpen && "rotate-180")} />
                        </button>

                        <AnimatePresence>
                            {integrationsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 4 }}
                                    transition={{ duration: 0.15 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
                                >
                                    <div className="w-56 bg-[#0a0a0a] border border-white/[0.08] rounded-xl p-1.5 shadow-2xl">
                                        <DropdownItem href="/integrations" icon={Code2} title="VS Code Extension" />
                                        <DropdownItem href="/integrations" icon={Chrome} title="Browser Extension" />
                                        <DropdownItem href="/integrations" icon={Github} title="GitHub Integration" />
                                        <DropdownItem href="/docs" icon={Terminal} title="API / SDK" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <NavLink href="/features/graph">Knowledge Graph</NavLink>
                    <NavLink href="/docs">Docs</NavLink>
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href="/login"
                        className="px-4 py-1.5 text-[13px] font-medium text-neutral-400 hover:text-white transition-colors duration-150"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/signup"
                        className="px-4 py-1.5 text-[13px] font-medium text-white bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.08] rounded-full transition-all duration-150"
                    >
                        Get started
                    </Link>
                </div>

                <button
                    className="md:hidden text-neutral-400 hover:text-white transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </nav>

            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.15 }}
                        className="md:hidden border-t border-white/[0.08] bg-black"
                    >
                        <div className="flex flex-col px-6 py-4 gap-1">
                            <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>Home</MobileNavLink>
                            <MobileNavLink href="/pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</MobileNavLink>
                            <MobileNavLink href="/integrations" onClick={() => setMobileMenuOpen(false)}>Integrations</MobileNavLink>
                            <MobileNavLink href="/features/graph" onClick={() => setMobileMenuOpen(false)}>Knowledge Graph</MobileNavLink>
                            <MobileNavLink href="/docs" onClick={() => setMobileMenuOpen(false)}>Docs</MobileNavLink>
                            <div className="h-px bg-white/[0.08] my-2" />
                            <MobileNavLink href="/login" onClick={() => setMobileMenuOpen(false)}>Log in</MobileNavLink>
                            <MobileNavLink href="/signup" onClick={() => setMobileMenuOpen(false)} className="text-white font-medium">Get started</MobileNavLink>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="text-[13px] font-medium text-neutral-400 hover:text-white transition-colors duration-150"
        >
            {children}
        </Link>
    );
}

function MobileNavLink({ href, children, onClick, className }: { href: string; children: React.ReactNode; onClick?: () => void; className?: string }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn("text-sm py-2 text-neutral-400 hover:text-white transition-colors duration-150", className)}
        >
            {children}
        </Link>
    );
}

function DropdownItem({ href, icon: Icon, title }: { href: string; icon: React.ElementType<{ className?: string }>; title: string }) {
    return (
        <Link href={href} className="flex items-center gap-2.5 px-3 py-2 hover:bg-white/[0.05] rounded-lg transition-colors duration-150 group">
            <Icon className="h-4 w-4 text-neutral-500 group-hover:text-neutral-300 transition-colors" />
            <span className="text-[13px] text-neutral-400 group-hover:text-white transition-colors">{title}</span>
        </Link>
    );
}
