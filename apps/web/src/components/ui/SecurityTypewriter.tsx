"use client";

import { useEffect, useState } from "react";

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
    const [index, setIndex] = useState(0);
    const colors = ["text-emerald-500", "text-red-500"];

    useEffect(() => {
        const currentText = texts[index % texts.length];

        // Typing
        if (!isDeleting && displayedText !== currentText) {
            const timeout = setTimeout(() => {
                setDisplayedText(currentText.slice(0, displayedText.length + 1));
            }, speed);
            return () => clearTimeout(timeout);
        }

        // Deleting
        if (isDeleting && displayedText !== "") {
            const timeout = setTimeout(() => {
                setDisplayedText(displayedText.slice(0, -1));
            }, speed / 2);
            return () => clearTimeout(timeout);
        }

        // Pause before deleting (Finished typing)
        if (!isDeleting && displayedText === currentText) {
            const timeout = setTimeout(() => {
                setIsDeleting(true);
            }, 1500);
            return () => clearTimeout(timeout);
        }

        // Pause before typing next (Finished deleting)
        if (isDeleting && displayedText === "") {
            const timeout = setTimeout(() => {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % texts.length);
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [displayedText, isDeleting, index, texts, speed]);

    return (
        <span className={`${className} ${colors[index % colors.length]} font-mono transition-colors duration-300`}>
            {displayedText}
            <span className="animate-pulse inline-block h-[1em] w-[2px] bg-current align-middle ml-1" />
        </span>
    );
}
