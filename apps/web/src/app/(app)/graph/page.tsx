'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const KnowledgeGraph = dynamic(() => import('@/components/3d/KnowledgeGraph'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-emerald-400 font-medium">Loading graph visualization...</div>
});

export default function GraphPage() {
    const [memories, setMemories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGraphData = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch('/v1/memory', {
                    headers: { 'Authorization': `Bearer ${session.access_token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setMemories(data.data?.memories || data.memories || []);
                }
            } catch (e) {
                console.error('Failed to load graph data', e);
            } finally {
                setLoading(false);
            }
        };
        fetchGraphData();
    }, []);

    return (
        <div className="h-[calc(100vh-4rem)] w-full rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-black via-emerald-950/5 to-black relative shadow-2xl">
            {/* Header */}
            <motion.div
                className="absolute top-6 left-6 z-10 pointer-events-none"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className="text-3xl font-bold text-white font-outfit mb-2">Knowledge Graph</h1>
                <p className="text-sm text-zinc-400 font-light">Interactive visualization of your memory network</p>
            </motion.div>

            {/* Stats Badge */}
            {!loading && memories.length > 0 && (
                <motion.div
                    className="absolute top-6 right-6 z-10 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-sm font-medium text-emerald-400">{memories.length} nodes</span>
                    </div>
                </motion.div>
            )}

            {/* Graph Component */}
            <KnowledgeGraph memories={memories} />
        </div>
    );
}
