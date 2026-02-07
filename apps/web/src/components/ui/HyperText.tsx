"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export default function HyperText({
    text,
    duration = 800,
    className,
    delay = 0,
    animateOnLoad = true,
    repeat = false,
    repeatInterval = 3000,
}: {
    text: string;
    duration?: number;
    className?: string;
    delay?: number;
    animateOnLoad?: boolean;
    repeat?: boolean;
    repeatInterval?: number;
}) {
    const [displayText, setDisplayText] = useState(" ".repeat(text.length));
    const [isScrambling, setIsScrambling] = useState(false);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (animateOnLoad && isInView) {
            const timeout = setTimeout(() => {
                startScramble();
            }, delay);
            return () => clearTimeout(timeout);
        }
    }, [isInView, animateOnLoad, delay]);

    useEffect(() => {
        if (repeat && isInView) {
            const intervalId = setInterval(() => {
                if (!isScrambling) {
                    startScramble();
                }
            }, repeatInterval);
            return () => clearInterval(intervalId);
        }
    }, [repeat, repeatInterval, isInView, isScrambling]);

    const startScramble = () => {
        setIsScrambling(true);
        let step = 0;
        const totalSteps = 20; // Number of scramble frames
        const intervalDuration = duration / totalSteps;

        const interval = setInterval(() => {
            const scrambled = text
                .split("")
                .map((char, index) => {
                    if (char === " " || char === "\n") return char;
                    if (index < (step / totalSteps) * text.length) {
                        return text[index];
                    }
                    return characters[Math.floor(Math.random() * characters.length)];
                })
                .join("");

            setDisplayText(scrambled);
            step++;

            if (step > totalSteps) {
                clearInterval(interval);
                setDisplayText(text);
                setIsScrambling(false);
            }
        }, intervalDuration);
    };

    return (
        <span
            ref={ref}
            className={className}
            onMouseEnter={!isScrambling ? startScramble : undefined}
        >
            {displayText}
        </span>
    );
}
