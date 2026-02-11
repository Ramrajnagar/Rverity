import { EventEmitter, retry } from './utils';
import { WebSocketManager } from './websocket';
import { OfflineQueue } from './queue';
import type {
    NeuroSyncConfig,
    ContextItem,
    Memory,
    SearchFilters,
    Insights,
    Stats,
    ApiResponse
} from './types';

export class NeuroSyncClient extends EventEmitter {
    private apiKey: string;
    private endpoint: string;
    private debug: boolean;
    private wsManager: WebSocketManager | null = null;
    private offlineQueue: OfflineQueue | null = null;
    private isOnline = true;

    constructor(config: NeuroSyncConfig) {
        super();

        this.apiKey = config.apiKey;
        this.endpoint = config.endpoint || 'http://localhost:3001';
        this.debug = config.debug || false;

        // Initialize WebSocket if enabled
        if (config.enableWebSocket) {
            this.initializeWebSocket();
        }

        // Initialize offline queue if enabled
        if (config.enableOfflineQueue) {
            this.initializeOfflineQueue();
        }

        // Monitor online/offline status
        if (typeof window !== 'undefined') {
            window.addEventListener('online', () => this.handleOnline());
            window.addEventListener('offline', () => this.handleOffline());
        }
    }

    // ==================== Core API Methods ====================

    private async request<T = unknown>(
        path: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${this.endpoint}${path}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
            ...options.headers,
        };

        try {
            const response = await retry(
                async () => {
                    const res = await fetch(url, { ...options, headers });
                    if (!res.ok) {
                        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
                    }
                    return res;
                },
                { maxAttempts: 3, delayMs: 1000, backoff: true }
            );

            const data = await response.json();
            return { status: 'success', data };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            this.log('Request failed:', message);
            return { status: 'error', error: message };
        }
    }

    async health(): Promise<ApiResponse> {
        return this.request('/v1/health');
    }

    async validateApiKey(): Promise<boolean> {
        const response = await this.health();
        return response.status === 'success';
    }

    // ==================== Memory Operations ====================

    async sendContext(
        content: string,
        source: string,
        tags: string[] = [],
        metadata?: Record<string, unknown>
    ): Promise<ApiResponse<Memory>> {
        const item: ContextItem = { content, source, tags, metadata };

        // If offline, queue the item
        if (!this.isOnline && this.offlineQueue) {
            this.offlineQueue.add(item);
            this.log('Added to offline queue');
            return { status: 'queued', data: undefined };
        }

        return this.request<Memory>('/v1/memory', {
            method: 'POST',
            body: JSON.stringify(item),
        });
    }

    async batchSendContext(items: ContextItem[]): Promise<ApiResponse<Memory[]>> {
        return this.request<Memory[]>('/v1/memory/batch', {
            method: 'POST',
            body: JSON.stringify({ items }),
        });
    }

    async getMemories(limit = 20): Promise<ApiResponse<{ memories: Memory[] }>> {
        return this.request<{ memories: Memory[] }>(`/v1/memory?limit=${limit}`);
    }

    async getMemory(id: string): Promise<ApiResponse<Memory>> {
        return this.request<Memory>(`/v1/memory/${id}`);
    }

    async updateMemory(
        id: string,
        updates: Partial<ContextItem>
    ): Promise<ApiResponse<Memory>> {
        return this.request<Memory>(`/v1/memory/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    }

    async deleteMemory(id: string): Promise<ApiResponse> {
        return this.request(`/v1/memory/${id}`, {
            method: 'DELETE',
        });
    }

    // ==================== Search Operations ====================

    async searchMemory(query: string): Promise<ApiResponse<{ memories: Memory[] }>> {
        return this.request<{ memories: Memory[] }>(
            `/v1/memory/search?q=${encodeURIComponent(query)}`
        );
    }

    async searchWithFilters(
        query: string,
        filters: SearchFilters
    ): Promise<ApiResponse<{ memories: Memory[] }>> {
        const params = new URLSearchParams({ q: query });

        if (filters.sources?.length) {
            params.append('sources', filters.sources.join(','));
        }
        if (filters.tags?.length) {
            params.append('tags', filters.tags.join(','));
        }
        if (filters.dateFrom) {
            params.append('from', filters.dateFrom);
        }
        if (filters.dateTo) {
            params.append('to', filters.dateTo);
        }
        if (filters.limit) {
            params.append('limit', filters.limit.toString());
        }

        return this.request<{ memories: Memory[] }>(
            `/v1/memory/search?${params.toString()}`
        );
    }

    async getRelatedMemories(memoryId: string): Promise<ApiResponse<{ memories: Memory[] }>> {
        return this.request<{ memories: Memory[] }>(`/v1/memory/${memoryId}/related`);
    }

    // ==================== Analytics ====================

    async getInsights(timeRange?: string): Promise<ApiResponse<Insights>> {
        const params = timeRange ? `?range=${timeRange}` : '';
        return this.request<Insights>(`/v1/insights${params}`);
    }

    async getActivityStats(): Promise<ApiResponse<Stats>> {
        return this.request<Stats>('/v1/stats');
    }

    // ==================== Real-time Connection ====================

    connectRealtime(): void {
        if (!this.wsManager) {
            this.initializeWebSocket();
        }
        this.wsManager?.connect();
    }

    disconnectRealtime(): void {
        this.wsManager?.disconnect();
    }

    isRealtimeConnected(): boolean {
        return this.wsManager?.isConnected() || false;
    }

    // ==================== Offline Queue ====================

    getQueueSize(): number {
        return this.offlineQueue?.getSize() || 0;
    }

    async processQueue(): Promise<void> {
        if (!this.offlineQueue) return;

        await this.offlineQueue.process(async (item) => {
            const response = await this.sendContext(
                item.content,
                item.source,
                item.tags,
                item.metadata
            );

            if (response.status === 'error') {
                throw new Error(response.error);
            }
        });
    }

    clearQueue(): void {
        this.offlineQueue?.clear();
    }

    // ==================== Private Methods ====================

    private initializeWebSocket(): void {
        this.wsManager = new WebSocketManager(
            this.endpoint,
            this.apiKey,
            this.debug
        );

        // Forward WebSocket events
        this.wsManager.on('connected', () => this.emit('connected'));
        this.wsManager.on('disconnected', () => this.emit('disconnected'));
        this.wsManager.on('error', (error) => this.emit('error', error));
        this.wsManager.on('memory', (memory) => this.emit('memory', memory));
        this.wsManager.on('sync', (data) => this.emit('sync', data));
    }

    private initializeOfflineQueue(): void {
        this.offlineQueue = new OfflineQueue(this.debug);
    }

    private handleOnline(): void {
        this.isOnline = true;
        this.log('Network online');

        // Reconnect WebSocket
        if (this.wsManager && !this.wsManager.isConnected()) {
            this.wsManager.connect();
        }

        // Process offline queue
        if (this.offlineQueue && this.offlineQueue.getSize() > 0) {
            this.log('Processing offline queue');
            this.processQueue().catch(error => {
                this.log('Failed to process queue:', error);
            });
        }
    }

    private handleOffline(): void {
        this.isOnline = false;
        this.log('Network offline');
    }

    private log(...args: unknown[]): void {
        if (this.debug) {
            console.log('[NeuroSyncClient]', ...args);
        }
    }

    // ==================== Cleanup ====================

    destroy(): void {
        this.wsManager?.disconnect();
        this.removeAllListeners();

        if (typeof window !== 'undefined') {
            window.removeEventListener('online', () => this.handleOnline());
            window.removeEventListener('offline', () => this.handleOffline());
        }
    }
}
