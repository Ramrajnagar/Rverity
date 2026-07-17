import { cn } from "@/lib/utils";

interface RverityLogoProps {
    className?: string;
    textClassName?: string;
    hideText?: boolean;
}

export default function RverityLogo({ className, textClassName, hideText = false }: RverityLogoProps) {
    return (
        <div className={cn("flex items-center gap-2.5", className)}>
            <svg
                width="28"
                height="28"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 8V24C10 24 10 32 18 32C26 32 28 24 28 20C28 16 26 12 20 12H10"
                    stroke="url(#logo-gradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M22 24L26 28L34 16"
                    stroke="#00A3FF"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <defs>
                    <linearGradient id="logo-gradient" x1="10" y1="8" x2="28" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#F8FAFC" />
                        <stop offset="1" stopColor="#A1A1AA" />
                    </linearGradient>
                </defs>
            </svg>

            {!hideText && (
                <div className={cn("flex flex-col", textClassName)}>
                    <span className="text-[15px] font-semibold tracking-tight text-white">
                        Rverity
                    </span>
                </div>
            )}
        </div>
    );
}
