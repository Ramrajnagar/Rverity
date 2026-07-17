import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export default function Section({ children, className, id }: SectionProps) {
    return (
        <section id={id} className={cn("relative w-full px-6 py-12 md:py-24 lg:px-8", className)}>
            <div className="mx-auto max-w-6xl">
                {children}
            </div>
        </section>
    );
}
