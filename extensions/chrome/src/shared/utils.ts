// Configuration storage and management
export interface ExtensionConfig {
    apiKey: string;
    endpoint: string;
    autoCapture: boolean;
    captureHistory: boolean;
    captureBookmarks: boolean;
    captureSelection: boolean;
    blacklist: string[];
    whitelist: string[];
    respectIncognito: boolean;
}

const DEFAULT_CONFIG: ExtensionConfig = {
    apiKey: '',
    endpoint: 'http://localhost:3000',
    autoCapture: true,
    captureHistory: true,
    captureBookmarks: true,
    captureSelection: true,
    blacklist: [],
    whitelist: [],
    respectIncognito: true
};

export class ConfigManager {
    static async getConfig(): Promise<ExtensionConfig> {
        const result = await chrome.storage.sync.get('config');
        return { ...DEFAULT_CONFIG, ...result.config };
    }

    static async setConfig(config: Partial<ExtensionConfig>): Promise<void> {
        const current = await this.getConfig();
        const updated = { ...current, ...config };
        await chrome.storage.sync.set({ config: updated });
    }

    static async isConfigured(): Promise<boolean> {
        const config = await this.getConfig();
        return config.apiKey.length > 0;
    }

    static async shouldCapture(url: string): Promise<boolean> {
        const config = await this.getConfig();

        // Check if in incognito and should respect it
        if (config.respectIncognito) {
            // This will be checked in the background script
        }

        // Check blacklist
        if (config.blacklist.some(pattern => this.matchesPattern(url, pattern))) {
            return false;
        }

        // Check whitelist (if not empty, only whitelist URLs are captured)
        if (config.whitelist.length > 0) {
            return config.whitelist.some(pattern => this.matchesPattern(url, pattern));
        }

        return config.autoCapture;
    }

    private static matchesPattern(url: string, pattern: string): boolean {
        // Convert glob pattern to regex
        const regex = new RegExp(
            pattern
                .replace(/\./g, '\\.')
                .replace(/\*/g, '.*')
                .replace(/\?/g, '.')
        );
        return regex.test(url);
    }
}

// Simple SDK client for Chrome extension
export class NeuroSyncClient {
    constructor(
        private apiKey: string,
        private endpoint: string
    ) { }

    async sendContext(
        content: string,
        source: string,
        tags: string[] = [],
        metadata?: Record<string, any>
    ): Promise<any> {
        try {
            const response = await fetch(`${this.endpoint}/v1/memory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({ content, source, tags, metadata })
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to send context:', error);
            // Queue for later if offline
            await this.queueContext({ content, source, tags, metadata });
            throw error;
        }
    }

    async search(query: string): Promise<any[]> {
        try {
            const response = await fetch(
                `${this.endpoint}/v1/memory/search?q=${encodeURIComponent(query)}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            return data.memories || [];
        } catch (error) {
            console.error('Search failed:', error);
            return [];
        }
    }

    async getRecentMemories(limit = 20): Promise<any[]> {
        try {
            const response = await fetch(
                `${this.endpoint}/v1/memory?limit=${limit}`,
                {
                    headers: {
                        'Authorization': `Bearer ${this.apiKey}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            return data.memories || [];
        } catch (error) {
            console.error('Failed to get memories:', error);
            return [];
        }
    }

    private async queueContext(item: any): Promise<void> {
        const queue = await chrome.storage.local.get('queue');
        const items = queue.queue || [];
        items.push({ ...item, timestamp: Date.now() });

        // Limit queue size
        if (items.length > 100) {
            items.shift();
        }

        await chrome.storage.local.set({ queue: items });
    }

    async processQueue(): Promise<void> {
        const queue = await chrome.storage.local.get('queue');
        const items = queue.queue || [];

        if (items.length === 0) return;

        const successful: number[] = [];

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            try {
                await this.sendContext(
                    item.content,
                    item.source,
                    item.tags,
                    item.metadata
                );
                successful.push(i);
            } catch (error) {
                // Keep in queue
            }
        }

        // Remove successful items
        const remaining = items.filter((_: any, i: number) => !successful.includes(i));
        await chrome.storage.local.set({ queue: remaining });
    }
}
