'use client';

import { Flame, Zap, Database } from 'lucide-react';
import { useEffect, useState } from 'react';

export function StatsWidget({ memories, connected }: { memories: any[], connected: boolean }) {
    // Calculate stats from memories
    const totalMemories = memories.length;

    // Calculate rate (memories in last 60 seconds)
    const now = Date.now();
    const recentMemories = memories.filter(m => {
        const time = new Date(m.payload.timestamp).getTime();
        return (now - time) < 60000;
    }).length;

    // Calculate streak (unique days in memories)
    const uniqueDays = new Set(memories.map(m => {
        const date = new Date(m.payload.timestamp);
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    }));
    const streak = uniqueDays.size;

    return (
        <div className="grid grid-cols-2 gap-4 h-full">
            <StatBox
                icon={Flame}
                label="Neural Streak"
                value={`${streak} Days`}
                color="purple"
                sub={streak > 0 ? "Keep it up!" : "Start today"}
            />
            <StatBox
                icon={Zap}
                label="Signal Rate"
                value={`${recentMemories}/min`}
                color="emerald"
                sub={recentMemories > 5 ? "High Traffic" : "Normal"}
            />
            <StatBox
                icon={Database}
                label="Total Memories"
                value={totalMemories.toLocaleString()}
                color="cyan"
                sub="Lifetime"
            />
            <div className={`rounded-xl border border-white/10 p-4 flex flex-col justify-center items-center text-center transition-colors ${connected ? 'bg-emerald-950/20' : 'bg-red-950/20'}`}>
                <span className="text-xs text-gray-400 uppercase tracking-wider mb-1">System Status</span>
                <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${connected ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <span className={`font-bold text-sm ${connected ? 'text-emerald-400' : 'text-red-400'}`}>
                        {connected ? 'Operational' : 'Disconnected'}
                    </span>
                </div>
            </div>
        </div>
    );
}

function StatBox({ icon: Icon, label, value, color, sub }: any) {
    const colors = {
        purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
        emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
        // Fallbacks
        orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
        yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
    };

    // @ts-ignore
    const theme = colors[color] || colors.cyan;

    return (
        <div className={`rounded-xl border p-4 flex flex-col justify-between ${theme}`}>
            <div className="flex justify-between items-start">
                <Icon className="w-5 h-5 opacity-80" />
                <span className="text-[10px] uppercase font-bold opacity-60">{label}</span>
            </div>
            <div>
                <div className="text-xl font-bold">{value}</div>
                <div className="text-[10px] opacity-60">{sub}</div>
            </div>
        </div>
    );
}
