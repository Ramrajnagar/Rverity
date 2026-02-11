'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface MemoryNode {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
}

interface MemoryNodesBackgroundProps {
    variant?: 'purple' | 'emerald';
}

export default function MemoryNodesBackground({ variant = 'purple' }: MemoryNodesBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<MemoryNode[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number | null>(null);

    // Color schemes
    const colors = {
        purple: {
            node: 'rgba(168, 85, 247, ',
            connection: 'rgba(168, 85, 247, ',
            mouse: 'rgba(236, 72, 153, ',
            orb1: 'bg-purple-600/20',
            orb2: 'bg-pink-600/20'
        },
        emerald: {
            node: 'rgba(52, 211, 153, ',
            connection: 'rgba(52, 211, 153, ',
            mouse: 'rgba(34, 211, 238, ',
            orb1: 'bg-emerald-600/20',
            orb2: 'bg-cyan-600/20'
        }
    };

    const colorScheme = colors[variant];

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Initialize memory nodes
        const nodeCount = 40;
        nodesRef.current = Array.from({ length: nodeCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 3 + 1,
            opacity: Math.random() * 0.5 + 0.3
        }));

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw nodes
            nodesRef.current.forEach((node, i) => {
                // Update position
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off edges
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                // Keep in bounds
                node.x = Math.max(0, Math.min(canvas.width, node.x));
                node.y = Math.max(0, Math.min(canvas.height, node.y));

                // Draw node
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
                ctx.fillStyle = `${colorScheme.node}${node.opacity})`;
                ctx.fill();

                // Draw connections
                nodesRef.current.forEach((otherNode, j) => {
                    if (i >= j) return;

                    const dx = node.x - otherNode.x;
                    const dy = node.y - otherNode.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        const opacity = (1 - distance / 150) * 0.2;
                        ctx.strokeStyle = `${colorScheme.connection}${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });

                // Mouse interaction
                const mouseDx = node.x - mouseRef.current.x;
                const mouseDy = node.y - mouseRef.current.y;
                const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

                if (mouseDistance < 200) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
                    const opacity = (1 - mouseDistance / 200) * 0.3;
                    ctx.strokeStyle = `${colorScheme.mouse}${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [colorScheme]);

    return (
        <>
            {/* Canvas for nodes */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ background: 'transparent' }}
            />

            {/* Gradient overlays */}
            <div className={`absolute inset-0 bg-gradient-to-br ${variant === 'emerald' ? 'from-emerald-900/10 via-black to-cyan-900/10' : 'from-purple-900/10 via-black to-pink-900/10'} pointer-events-none`} />

            {/* Floating orbs */}
            <motion.div
                className={`absolute top-1/4 left-1/4 w-96 h-96 ${colorScheme.orb1} rounded-full blur-[100px]`}
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${colorScheme.orb2} rounded-full blur-[100px]`}
                animate={{
                    x: [0, -50, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </>
    );
}
