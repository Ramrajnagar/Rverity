"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Typewriter({
    text,
    speed = 50,
    className,
    cursorClassName = "bg-emerald-500",
    delay = 0,
}: {
    text: string;
    speed?: number;
    className?: string;
    cursorClassName?: string;
    delay?: number;
}) {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const startTimeout = setTimeout(() => {
            setStarted(true);
        }, delay);
        return () => clearTimeout(startTimeout);
    }, [delay]);

    useEffect(() => {
        if (!started) return;

        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, started]);

    return (
        <span className={className}>
            {displayedText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className={`inline-block h-[1em] w-[4px] ml-1 align-middle ${cursorClassName}`}
            />
        </span>
    );
}
