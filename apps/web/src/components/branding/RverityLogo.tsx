"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RverityLogoProps {
    className?: string;
    textClassName?: string;
    hideText?: boolean;
}

export default function RverityLogo({ className, textClassName, hideText = false }: RverityLogoProps) {
    return (
        <div className={cn("flex items-center gap-3", className)}>
            <div className="relative flex items-center justify-center w-10 h-10">
                {/* Glowing Background */}
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />

                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10"
                >
                    {/* Abstract 'R' Shape - The "Hook" of Truth */}
                    <motion.path
                        d="M10 8V24C10 24 10 32 18 32C26 32 28 24 28 20C28 16 26 12 20 12H10"
                        stroke="url(#gradient-primary)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    />

                    {/* The "V" / Verdict / Checkmark Accent */}
                    <motion.path
                        d="M22 24L26 28L34 16"
                        stroke="url(#gradient-accent)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                    />

                    {/* Shimmer Effect Overlay */}
                    <motion.rect
                        x="-10"
                        y="0"
                        width="10"
                        height="40"
                        fill="white"
                        className="opacity-20 mix-blend-overlay blur-sm"
                        animate={{
                            x: [0, 60]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3,
                            repeatDelay: 2,
                            ease: "linear",
                        }}
                        style={{ skewX: -20 }}
                    />

                    <defs>
                        <linearGradient id="gradient-primary" x1="10" y1="8" x2="28" y2="32" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F8FAFC" /> {/* Zinc-50 */}
                            <stop offset="1" stopColor="#94A3B8" /> {/* Zinc-400 */}
                        </linearGradient>
                        <linearGradient id="gradient-accent" x1="22" y1="24" x2="34" y2="16" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#34D399" /> {/* Emerald-400 */}
                            <stop offset="1" stopColor="#06B6D4" /> {/* Cyan-500 */}
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {!hideText && (
                <div className={cn("flex flex-col", textClassName)}>
                    <span className="text-xl font-bold tracking-tight text-white font-display">
                        Rverity
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-primary/80 font-medium">
                        Digital Memory
                    </span>
                </div>
            )}
        </div>
    );
}
