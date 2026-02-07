
import { supabase } from '../config/supabase';
import { redis } from '../config/redis';

// import { MemoryItem } from '@neurosync/shared';
interface MemoryItem {
    id: string;
    content: string;
    source: string;
    tags: string[];
    timestamp: string;
    importance: number;
    vectorId?: string;
}

export class MemoryService {
    static async addMemory(userId: string, content: string, source: string, tags: string[]) {
        console.log(`[MemoryService] addMemory called. User: ${userId}, Source: ${source}, Content: ${content.substring(0, 20)}...`);
        const memory = {
            id: crypto.randomUUID(),
            content,
            source,
            tags,
            timestamp: new Date().toISOString(),
            importance: 0.5,
            vectorId: null,
        };

        // 1. Store in Redis for short-term context
        try {
            await redis.lpush(`user:${userId}:context`, JSON.stringify(memory));
            await redis.ltrim(`user:${userId}:context`, 0, 50); // Keep last 50 items
        } catch (e) {
            console.warn('Redis unavailable, skipping cache', e);
        }

        // 2. Store in Supabase for persistence
        // 2. Store in Supabase for persistence
        let persistentId: string | undefined;
        let persistentData: any = null;

        try {
            const { data, error } = await supabase.from('memories').insert({
                user_id: userId,
                content,
                source,
                tags,
            }).select().single();

            if (!error && data) {
                persistentId = data.id;
                persistentData = data;
            } else {
                console.warn('Supabase persistence failed', error);
            }
        } catch (e) {
            console.warn('Supabase unavailable, skipping persistence', e);
        }

        // 3. Broadcast to connected clients (Dashboard)
        try {
            const { WebSocketService } = await import('./websocket.service');
            WebSocketService.broadcast(userId, 'MEMORY_ADDED', {
                ...memory,
                persistentId: persistentId,
            });
        } catch (e) {
            console.error('[MemoryService] Broadcast failed', e);
        }

        return persistentData;
    }

    static async getContext(userId: string) {
        const raw = await redis.lrange(`user:${userId}:context`, 0, -1);
        return raw.map((item: any) => {
            if (typeof item === 'string') {
                try {
                    return JSON.parse(item);
                } catch (e) {
                    return null;
                }
            }
            return item;
        }).filter(Boolean);
    }

    static async getHistory(userId: string, limit = 20) {
        // Try Supabase first
        const { data, error } = await supabase
            .from('memories')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (!error && data) {
            return data.map(d => ({
                id: d.id,
                payload: {
                    content: d.content,
                    source: d.source,
                    tags: d.tags,
                    timestamp: d.created_at,
                    persistentId: d.id
                }
            }));
        }

        // Fallback to Redis if DB fails
        const context = await this.getContext(userId);
        return context.map((item: any) => ({
            id: item.id || crypto.randomUUID(),
            payload: item
        }));
    }

    static async getStats(userId: string) {
        let totalMemories = 0;

        // 1. Get real count from Supabase
        const { count, error } = await supabase
            .from('memories')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId);

        if (!error && count !== null) {
            totalMemories = count;
        }

        // Return real count + mock rate (rate is harder to calc cheaply without more redis ops)
        return {
            streak: 5, // Keep mocked for now, requires complex query
            totalMemories,
            rate: '12/min'
        };
    }
}
