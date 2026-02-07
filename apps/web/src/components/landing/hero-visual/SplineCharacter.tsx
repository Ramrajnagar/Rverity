import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the new ecosystem diagram
const TechHeroVisual = dynamic(() => import('./TechEcosystemDiagram'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-transparent animate-pulse" />
});

interface SplineCharacterProps {
    onLoad?: (spline: any) => void;
}

export default function SplineCharacter({ onLoad }: SplineCharacterProps) {
    // Legacy support: Trigger onLoad immediately as we are not loading a heavy external Spline scene anymore
    useEffect(() => {
        if (onLoad) {
            onLoad({ name: 'TechEcosystemDiagram' });
        }
    }, [onLoad]);

    return (
        <div className="w-full h-full absolute inset-0 z-0 flex items-center justify-center bg-transparent">
            {/* Gradient Overlay for better text contrast if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none z-10" />
            <TechHeroVisual />
        </div>
    );
}
