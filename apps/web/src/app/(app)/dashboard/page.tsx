'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Hash, Brain, Activity } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { StatsWidget } from '@/components/dashboard/StatsWidget';
import { QuickCapture } from '@/components/dashboard/QuickCapture';
import { GraphWidget } from '@/components/dashboard/GraphWidget';
import { EmptyState } from '@/components/ui/EmptyState';

interface MemoryItem {
    id: string;
    payload: {
        content: string;
        source: string;
        tags: string[];
        timestamp: string;
        persistentId?: string;
    }
}

export default function DashboardPage() {
    const [memories, setMemories] = useState<MemoryItem[]>([]);
    const [connected, setConnected] = useState(false);
    const [user, setUser] = useState<any>(null);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        let subscription: any;

        const init = async () => {
            // 1. Get Session
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                console.log('No active session found');
                return;
            }

            setUser(session.user);
            const userId = session.user.id;
            const token = session.access_token;

            setConnected(true); // Connected to "App" (Supabase)

            // 2. Fetch History
            try {
                // Use relative URL for Vercel/Next.js API routes
                const res = await fetch('/v1/memory', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setMemories(data.memories || []);
                }
            } catch (e) {
                console.error('Failed to load history', e);
            }

            // 3. Subscribe to Realtime (Postgres Changes)
            const channel = supabase
                .channel('realtime:memories:' + userId)
                .on(
                    'postgres_changes',
                    {
                        event: 'INSERT',
                        schema: 'public',
                        table: 'memories',
                        filter: `user_id=eq.${userId}`
                    },
                    (payload) => {
                        console.log('Realtime Update:', payload);
                        const newMemory = payload.new;

                        // Optimistically update UI
                        setMemories((prev) => [
                            {
                                id: newMemory.id,
                                payload: {
                                    content: newMemory.content,
                                    source: newMemory.source,
                                    tags: newMemory.tags,
                                    timestamp: newMemory.created_at,
                                    persistentId: newMemory.id
                                }
                            },
                            ...prev.slice(0, 19)
                        ]);
                    }
                )
                .subscribe((status) => {
                    if (status === 'SUBSCRIBED') {
                        console.log('Subscribed to realtime updates');
                    }
                });

            subscription = channel;
        };

        init();

        return () => {
            if (subscription) {
                supabase.removeChannel(subscription);
            }
        };
    }, []);

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white">Neural Command Center</h1>
                    <p className="text-gray-400">Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}. Your neural link is active.</p>
                </div>
            </header>

            <BentoGrid className="max-w-full">
                {/* 1. Quick Capture (Large Input) */}
                <BentoGridItem
                    className="md:col-span-1 md:row-span-1"
                    title="Quick Capture"
                    description="Inject thought directly to stream"
                    header={<QuickCapture />}
                    icon={<Hash className="h-4 w-4 text-purple-500" />}
                />

                {/* 2. Stats & Status */}
                <BentoGridItem
                    className="md:col-span-1 md:row-span-1"
                    title="System Status"
                    description="Real-time neural metrics"
                    header={<StatsWidget memories={memories} connected={connected} />}
                    icon={<Activity className="h-4 w-4 text-emerald-500" />}
                />

                {/* 3. Knowledge Graph (Mini) */}
                <BentoGridItem
                    className="md:col-span-1 md:row-span-2 min-h-[300px]"
                    title="Topology"
                    description="Live knowledge map"
                    header={<GraphWidget memories={memories} />}
                    icon={<Brain className="h-4 w-4 text-cyan-500" />}
                />

                {/* 4. Memory Stream (Wide) */}
                <BentoGridItem
                    className="md:col-span-2 md:row-span-2"
                    title="Neural Stream"
                    description="Incoming signals from all sources"
                    header={
                        <div className="h-[400px] overflow-y-auto pr-2 space-y-3 mask-gradient">
                            <AnimatePresence mode='popLayout'>
                                {memories.map((mem) => (
                                    <MemoryCard key={mem.id} mem={mem} />
                                ))}
                                {memories.length === 0 && (
                                    <div className="h-full flex items-center justify-center">
                                        <EmptyState
                                            icon={Clock}
                                            title="No Signals Detected"
                                            description="Connect a tool to start streaming your context into Rverity."
                                            actionLabel="Connect Tool"
                                            actionLink="/onboarding"
                                        />
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    }
                    icon={<Clock className="h-4 w-4 text-amber-500" />}
                />
            </BentoGrid>
        </div>
    );
}

function MemoryCard({ mem }: { mem: MemoryItem }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors group"
        >
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${mem.payload.source === 'vscode' ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' :
                        mem.payload.source === 'quick-capture' ? 'border-purple-500/30 text-purple-400 bg-purple-500/10' :
                            'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
                        }`}>
                        {mem.payload.source}
                    </span>
                    <span className="text-xs text-gray-500">
                        {new Date(mem.payload.timestamp).toLocaleTimeString()}
                    </span>
                </div>
                <div className="flex gap-1">
                    {mem.payload.tags?.map(tag => (
                        <span key={tag} className="text-[10px] text-gray-500">#{tag}</span>
                    ))}
                </div>
            </div>
            <p className="text-gray-200 text-sm leading-relaxed font-mono">
                {mem.payload.content}
            </p>
        </motion.div>
    );
}
