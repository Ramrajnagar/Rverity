"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
    Code2,
    Github,
    Database,
    Server,
    Cloud,
    Layers,
    Cpu,
} from 'lucide-react';
import { cn } from '@/lib/utils'; // Assuming this utility exists, otherwise I'll replace it

// Fallback for cn if it doesn't exist in the user's codebase, I'll assume standard tailwind-merge usage if it fails, 
// but for robust code I will include a local version just in case or use template literals.
// For now, I will assume standard Next.js + Tailwind project structure implies a utils file. 
// If specific path is wrong, I will correct it.

const TechNode = ({
    icon: Icon,
    label,
    x,
    y,
    delay,
    color = "bg-blue-500",
    glowColor = "shadow-blue-500/50"
}: {
    icon: any,
    label: string,
    x: number,
    y: number,
    delay: number,
    color?: string,
    glowColor?: string
}) => {
    return (
        <motion.div
            className="absolute left-1/2 top-1/2"
            initial={{ x, y, opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: 1,
                x: x - 28, // Center the node (w-14 = 56px / 2 = 28px)
                y: y - 28, // Center the node
            }}
            transition={{ delay, duration: 0.5 }}
        >
            {/* Floating Animation Wrapper */}
            <motion.div
                whileHover={{ scale: 1.1 }}
                animate={{
                    y: [0, -10, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 3 + Math.random() * 2,
                    ease: "easeInOut",
                    delay: Math.random() * 2 // Randomize float phase
                }}
                className={cn(
                    "relative flex flex-col items-center justify-center group cursor-pointer",
                )}
            >
                {/* Glow Background */}
                <div className={cn(
                    "absolute inset-0 rounded-xl opacity-20 blur-xl transition-opacity duration-300 group-hover:opacity-40",
                    color
                )} />

                {/* Icon Container */}
                <div className={cn(
                    "relative z-10 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/10",
                    glowColor
                )}>
                    <Icon className="h-7 w-7 text-white/90" />
                </div>

                {/* Label */}
                <div className="absolute top-full mt-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="whitespace-nowrap rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                        {label}
                    </span>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ConnectionLine = ({ angle, distance }: { angle: number, distance: number }) => {
    return (
        <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                width: '2px',
                height: `${distance}px`,
                transformOrigin: 'bottom center',
                marginTop: `-${distance / 2}px` // Offset to start from center
            }}
        >
            {/* Gradient Line */}
            <div className="h-full w-full bg-gradient-to-t from-transparent via-white/50 to-transparent opacity-80" />

            {/* Animated Particle Outward */}
            <motion.div
                className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-transparent to-blue-400"
                style={{ height: '20%' }}
                animate={{
                    bottom: ['0%', '100%'],
                    opacity: [0, 1, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 2
                }}
            />

            {/* Animated Particle Inward */}
            <motion.div
                className="absolute top-0 left-0 w-full bg-gradient-to-t from-transparent to-purple-400 rotate-180"
                style={{ height: '20%' }}
                animate={{
                    top: ['0%', '100%'],
                    opacity: [0, 1, 0]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: Math.random() * 2
                }}
            />
        </div>
    );
};

export default function TechEcosystemDiagram() {
    // Config for satellite nodes
    const nodes = [
        { icon: Code2, label: "VS Code", angle: 0, distance: 260, color: "bg-blue-500" },
        { icon: Github, label: "GitHub", angle: 60, distance: 260, color: "bg-gray-500" },
        { icon: Cloud, label: "Cloud", angle: 120, distance: 260, color: "bg-sky-500" },
        { icon: Database, label: "Database", angle: 180, distance: 260, color: "bg-emerald-500" },
        { icon: Server, label: "Server", angle: 240, distance: 260, color: "bg-orange-500" },
        { icon: Layers, label: "Integration", angle: 300, distance: 260, color: "bg-purple-500" },
    ];

    return (
        <div className="relative flex h-full w-full items-center justify-center overflow-visible bg-transparent scale-[0.6] md:scale-100 transition-transform duration-500">
            {/* Ambient Background Glow */}
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[100px]" />

            {/* Central Hub */}
            <motion.div
                className="relative z-20 flex h-24 w-24 items-center justify-center rounded-2xl border border-white/20 bg-black/40 backdrop-blur-xl shadow-2xl shadow-blue-500/20"
                initial={{ scale: 0.8, opacity: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Inner Pulsing Rings */}
                <div className="absolute inset-0 -z-10 animate-pulse rounded-2xl bg-blue-500/20 blur-lg" />
                <motion.div
                    className="absolute inset-0 rounded-2xl border border-blue-500/30"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Core Icon/Logo Placeholder - Rverity Brain */}
                <Cpu className="h-10 w-10 text-blue-400" />
            </motion.div>

            {/* Connecting Lines & Particles */}
            {nodes.map((node, index) => (
                <ConnectionLine
                    key={`line-${index}`}
                    angle={node.angle}
                    distance={node.distance}
                />
            ))}

            {/* Orbiting Nodes */}
            {nodes.map((node, index) => {
                // Calculate X/Y coordinates for absolute positioning
                // angle 0 is typically right in math, but we want it top or matching the CSS rotate.
                // CSS rotate(0) is standard.
                // We used `transform: rotate(angle) translate(-distance) rotate(-angle)`
                // This corresponds to:
                // x = distance * sin(angle)
                // y = -distance * cos(angle)
                // (assuming 0 is top)

                const rad = (node.angle * Math.PI) / 180;
                // Adjusting for 0 = top
                const x = node.distance * Math.sin(rad);
                const y = -node.distance * Math.cos(rad);

                return (
                    <TechNode
                        key={index}
                        icon={node.icon}
                        label={node.label}
                        x={x}
                        y={y}
                        delay={index * 0.1}
                        color={node.color}
                    />
                );
            })}
        </div>
    );
}
