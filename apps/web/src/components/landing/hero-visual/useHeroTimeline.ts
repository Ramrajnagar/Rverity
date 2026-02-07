import { useState, useRef, useCallback } from 'react';

export interface HeroTimelineState {
    isPlaying: boolean;
    isHovered: boolean;
}

export const useHeroTimeline = () => {
    // Shared State
    const [state, setState] = useState<HeroTimelineState>({
        isPlaying: false, // Wait for Spline load
        isHovered: false
    });

    // Refs for control
    const splineRef = useRef<any>(null); // Spline application instance

    // Spline Load Handler
    const onSplineLoad = useCallback((splineApp: any) => {
        splineRef.current = splineApp;
        setState(prev => ({ ...prev, isPlaying: true }));
    }, []);

    // Interaction Handlers
    const handleMouseEnter = useCallback(() => {
        setState(prev => ({ ...prev, isHovered: true }));
    }, []);

    const handleMouseLeave = useCallback(() => {
        // Keep state.isHovered = true effectively for logic, or just don't reset visual state
    }, []);

    return {
        onSplineLoad,
        handleMouseEnter,
        handleMouseLeave,
        isHovered: state.isHovered,
        isPlaying: state.isPlaying
    };
};
