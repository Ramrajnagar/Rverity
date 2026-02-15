'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, TrendingUp, Zap, Filter, Search, Calendar, Tag, ExternalLink } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { StatsWidget } from '@/components/dashboard/StatsWidget';
import { QuickCapture } from '@/components/dashboard/QuickCapture';
import { ConnectExtension } from '@/components/dashboard/ConnectExtension';
import { GraphWidget } from '@/components/dashboard/GraphWidget';
import { EmptyState } from '@/components/ui/EmptyState';

interface Memory {
    id: string;
    content: string;
    source: string;
    tags: string[];
    created_at: string;
    metadata?: any;
}

export default function DashboardPage() {
    const router = useRouter();
    const [memories, setMemories] = useState<Memory[]>([]);
    const [filteredMemories, setFilteredMemories] = useState<Memory[]>([]);
    const [connected, setConnected] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSource, setSelectedSource] = useState<string>('all');
    const [selectedTag, setSelectedTag] = useState<string>('all');

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            router.replace('/login');
            return;
        }

        setUser(session.user);
        setConnected(true);
        await loadMemories(session.access_token);
        subscribeToUpdates(session.user.id);
        setLoading(false);
    };

    const loadMemories = async (token: string) => {
        try {
            const res = await fetch('/v1/memory', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                const data = await res.json();
                const memoryList = data.data?.memories || data.memories || [];
                setMemories(memoryList);
                setFilteredMemories(memoryList);
            }
        } catch (error) {
            console.error('Failed to load memories:', error);
        }
    };

    const subscribeToUpdates = (userId: string) => {
        const channel = supabase
            .channel(`memories:${userId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'memories',
                    filter: `user_id=eq.${userId}`
                },
                (payload) => {
                    const newMemory = payload.new as Memory;
                    setMemories(prev => [newMemory, ...prev]);
                    setFilteredMemories(prev => [newMemory, ...prev]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    };

    // Filter memories based on search, source, and tags
    useEffect(() => {
        let filtered = memories;

        if (searchQuery) {
            filtered = filtered.filter(m =>
                m.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                m.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        if (selectedSource !== 'all') {
            filtered = filtered.filter(m => m.source === selectedSource);
        }

        if (selectedTag !== 'all') {
            filtered = filtered.filter(m => m.tags?.includes(selectedTag));
        }

        setFilteredMemories(filtered);
    }, [searchQuery, selectedSource, selectedTag, memories]);

    const sources = ['all', ...Array.from(new Set(memories.map(m => m.source)))];
    const allTags = Array.from(new Set(memories.flatMap(m => m.tags || [])));

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <motion.header
                className="flex flex-col md:flex-row md:items-end md:justify-between gap-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'there'}
                    </h1>
                    <p className="text-gray-400">
                        Track your digital context across all platforms in real-time
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${connected ? 'bg-green-500/10 border border-green-500/20' : 'bg-red-500/10 border border-red-500/20'}`}>
                        <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
                        <span className={`text-sm font-medium ${connected ? 'text-green-400' : 'text-red-400'}`}>
                            {connected ? 'Connected' : 'Disconnected'}
                        </span>
                    </div>
                </div>
            </motion.header>

            {/* Integration Quick Connect */}
            {!connected && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <ConnectExtension />
                </motion.div>
            )}

            {/* Stats and Quick Capture Grid */}
            <BentoGrid className="max-w-full">
                {/* Quick Capture */}
                <BentoGridItem
                    className="md:col-span-2 md:row-span-1"
                    title="Quick Capture"
                    description="Manually capture important thoughts and context"
                    header={<QuickCapture onCapture={(memory) => setMemories(prev => [memory, ...prev])} />}
                    icon={<Zap className="h-4 w-4 text-purple-500" />}
                />

                {/* Stats */}
                <BentoGridItem
                    className="md:col-span-1 md:row-span-1"
                    title="Activity Overview"
                    description="Your capture statistics"
                    header={<StatsWidget memories={memories} connected={connected} />}
                    icon={<TrendingUp className="h-4 w-4 text-emerald-500" />}
                />

                {/* Knowledge Graph */}
                <BentoGridItem
                    className="md:col-span-1 md:row-span-2 min-h-[300px]"
                    title="Knowledge Graph"
                    description="Visual representation of your memories"
                    header={<GraphWidget memories={memories} />}
                    icon={<Calendar className="h-4 w-4 text-cyan-500" />}
                />

                {/* Memory Stream */}
                <BentoGridItem
                    className="md:col-span-2 md:row-span-2"
                    title="Memory Stream"
                    description={`${filteredMemories.length} memories captured`}
                    header={
                        <div className="space-y-4">
                            {/* Filters */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                {/* Search */}
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="Search memories..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                                    />
                                </div>

                                {/* Source Filter */}
                                <select
                                    value={selectedSource}
                                    onChange={(e) => setSelectedSource(e.target.value)}
                                    className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                                >
                                    {sources.map(source => (
                                        <option key={source} value={source} className="bg-black">
                                            {source === 'all' ? 'All Sources' : source}
                                        </option>
                                    ))}
                                </select>

                                {/* Tag Filter */}
                                {allTags.length > 0 && (
                                    <select
                                        value={selectedTag}
                                        onChange={(e) => setSelectedTag(e.target.value)}
                                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-colors"
                                    >
                                        <option value="all" className="bg-black">All Tags</option>
                                        {allTags.map(tag => (
                                            <option key={tag} value={tag} className="bg-black">
                                                {tag}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {/* Memory List */}
                            <div className="h-[400px] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                                <AnimatePresence mode='popLayout'>
                                    {filteredMemories.map((memory) => (
                                        <MemoryCard key={memory.id} memory={memory} />
                                    ))}
                                    {filteredMemories.length === 0 && (
                                        <div className="h-full flex items-center justify-center">
                                            <EmptyState
                                                icon={Clock}
                                                title={searchQuery || selectedSource !== 'all' || selectedTag !== 'all' ? 'No matches found' : 'No memories yet'}
                                                description={searchQuery || selectedSource !== 'all' || selectedTag !== 'all' ? 'Try adjusting your filters' : 'Start capturing by connecting an integration or using quick capture'}
                                                actionLabel="View Integrations"
                                                actionLink="/settings#integrations"
                                            />
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    }
                    icon={<Clock className="h-4 w-4 text-amber-500" />}
                />
            </BentoGrid>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(168, 85, 247, 0.4);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(168, 85, 247, 0.6);
                }
            `}</style>
        </div>
    );
}

function MemoryCard({ memory }: { memory: Memory }) {
    const sourceColors: Record<string, string> = {
        'vscode': 'border-blue-500/30 text-blue-400 bg-blue-500/10',
        'chrome': 'border-green-500/30 text-green-400 bg-green-500/10',
        'github': 'border-purple-500/30 text-purple-400 bg-purple-500/10',
        'quick-capture': 'border-pink-500/30 text-pink-400 bg-pink-500/10',
        'default': 'border-gray-500/30 text-gray-400 bg-gray-500/10'
    };

    const colorClass = sourceColors[memory.source] || sourceColors.default;

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-white/10 transition-all group cursor-default"
        >
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-md border ${colorClass}`}>
                        {memory.source}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(memory.created_at).toLocaleString()}
                    </span>
                </div>
                {memory.tags && memory.tags.length > 0 && (
                    <div className="flex gap-1.5 flex-wrap">
                        {memory.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                                {tag}
                            </span>
                        ))}
                        {memory.tags.length > 3 && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-500/10 text-gray-400">
                                +{memory.tags.length - 3}
                            </span>
                        )}
                    </div>
                )}
            </div>
            <p className="text-gray-200 text-sm leading-relaxed">
                {memory.content}
            </p>
            {memory.metadata && Object.keys(memory.metadata).length > 0 && (
                <div className="mt-3 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <ExternalLink className="w-3 h-3" />
                        <span>Additional context available</span>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
