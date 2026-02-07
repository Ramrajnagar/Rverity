'use client';

import dynamic from 'next/dynamic';
import { Maximize2 } from 'lucide-react';
import Link from 'next/link';

const KnowledgeGraph = dynamic(() => import('@/components/3d/KnowledgeGraph'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-cyan-500/20">Loading Map...</div>
});

export function GraphWidget({ memories }: { memories: any[] }) {
    return (
        <div className="relative w-full h-full rounded-xl overflow-hidden bg-black/40 border border-white/5 group">
            <KnowledgeGraph memories={memories} />

            <Link
                href="/graph"
                className="absolute top-2 right-2 p-2 bg-black/60 backdrop-blur rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100"
            >
                <Maximize2 className="w-4 h-4" />
            </Link>

            <div className="absolute bottom-4 left-4 pointer-events-none">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Local Topology</h4>
            </div>
        </div>
    );
}
