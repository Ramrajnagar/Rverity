"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SecurityTypewriter({
    texts,
    speed = 50,
    className,
    delay = 0,
}: {
    texts: string[];
    speed?: number;
    className?: string;
    delay?: number;
}) {
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0); // Tracks which text/color to show
    const colors = ["text-emerald-500", "text-red-500"];
    const [typingSpeed, setTypingSpeed] = useState(speed);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const handleTyping = () => {
            const currentText = texts[index % texts.length];
            const isFullText = displayedText === currentText;
            const isNoText = displayedText === "";

            if (isDeleting) {
                setDisplayedText(currentText.substring(0, displayedText.length - 1));
                setTypingSpeed(speed / 2);
            } else {
                setDisplayedText(currentText.substring(0, displayedText.length + 1));
                setTypingSpeed(speed);
            }

            if (!isDeleting && isFullText) {
                // Finished typing, wait before deleting
                timer = setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && isNoText) {
                // Finished deleting, switch text/color and start typing
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % texts.length);
                timer = setTimeout(handleTyping, 500);
            } else {
                timer = setTimeout(handleTyping, typingSpeed);
            }
        };

        timer = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, index, typingSpeed, texts, speed]);

    return (
        <span className={`${className} ${colors[index % colors.length]} font-mono transition-colors duration-300`}>
            {displayedText}
            <span className="animate-pulse inline-block h-[1em] w-[2px] bg-current align-middle ml-1" />
        </span>
    );
}
