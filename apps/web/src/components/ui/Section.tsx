"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
    delay?: number;
}

export default function Section({ children, className, id, delay = 0 }: SectionProps) {
    return (
        <section id={id} className={cn("relative w-full px-6 py-12 md:py-24 lg:px-8", className)}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay, ease: "easeOut" }}
                className="mx-auto max-w-7xl"
            >
                {children}
            </motion.div>
        </section>
    );
}
