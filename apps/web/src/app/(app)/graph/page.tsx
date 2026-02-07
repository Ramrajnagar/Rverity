'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const KnowledgeGraph = dynamic(() => import('@/components/3d/KnowledgeGraph'), {
    ssr: false,
    loading: () => <div className="w-full h-full flex items-center justify-center text-cyan-500">Loading Neural Map...</div>
});

export default function GraphPage() {
    const [memories, setMemories] = useState([]);

    useEffect(() => {
        const fetchGraphData = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
                const res = await fetch(`${apiUrl}/v1/memory`, {
                    headers: { 'Authorization': `Bearer ${session.access_token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setMemories(data.memories || []);
                }
            } catch (e) {
                console.error('Failed to load graph data', e);
            }
        };
        fetchGraphData();
    }, []);

    return (
        <div className="h-[calc(100vh-4rem)] w-full rounded-2xl overflow-hidden border border-white/5 bg-black relative">
            <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <h1 className="text-2xl font-bold text-white">Global Knowledge Graph</h1>
                <p className="text-sm text-gray-400">Interactive visualization of your entire memory bank.</p>
            </div>

            <KnowledgeGraph memories={memories} />
        </div>
    );
}
