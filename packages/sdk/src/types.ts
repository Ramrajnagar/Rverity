export interface NeuroSyncConfig {
    apiKey: string;
    endpoint?: string;
    enableWebSocket?: boolean;
    enableOfflineQueue?: boolean;
    debug?: boolean;
}

export interface ContextItem {
    content: string;
    source: string;
    tags?: string[];
    metadata?: Record<string, unknown>;
}

export interface Memory {
    id: string;
    content: string;
    source: string;
    tags: string[];
    timestamp: string;
    persistentId?: string;
    metadata?: Record<string, unknown>;
}

export interface SearchFilters {
    sources?: string[];
    tags?: string[];
    dateFrom?: string;
    dateTo?: string;
    limit?: number;
}

export interface Insights {
    totalMemories: number;
    memoriesBySource: Record<string, number>;
    topTags: Array<{ tag: string; count: number }>;
    activityByHour: number[];
    activityByDay: number[];
}

export interface Stats {
    today: number;
    thisWeek: number;
    thisMonth: number;
    total: number;
    streak: number;
}

export interface ApiResponse<T = unknown> {
    status: string;
    data?: T;
    error?: string;
    message?: string;
}

export type EventType = 'connected' | 'disconnected' | 'error' | 'memory' | 'sync';
export type EventHandler = (data?: unknown) => void;
