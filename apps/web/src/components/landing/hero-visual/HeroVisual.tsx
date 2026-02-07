"use client";

import SplineCharacter from "./SplineCharacter";
import { useHeroTimeline } from "./useHeroTimeline";

export default function HeroVisual() {
    const {
        onSplineLoad,
        handleMouseEnter,
        handleMouseLeave
    } = useHeroTimeline();

    return (
        <div
            id="hero-visual"
            className="w-full h-full relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* New Tech Ecosystem Diagram */}
            <div className="absolute inset-0 z-10 pointer-events-auto">
                <SplineCharacter onLoad={onSplineLoad} />
            </div>
        </div>
    );
}
