
export interface NeuroSyncConfig {
    apiKey: string;
    endpoint?: string;
}

export class NeuroSyncClient {
    private apiKey: string;
    private endpoint: string;

    constructor(config: NeuroSyncConfig) {
        this.apiKey = config.apiKey;
        this.endpoint = config.endpoint || 'http://localhost:3001';
    }

    private async request(path: string, options: RequestInit = {}) {
        const url = `${this.endpoint}${path}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
            ...options.headers,
        };

        const response = await fetch(url, { ...options, headers });
        if (!response.ok) {
            throw new Error(`NeuroSync API Error: ${response.statusText}`);
        }
        return response.json();
    }

    async health() {
        return this.request('/v1/health');
    }

    async sendContext(content: string, source: string, tags: string[] = []) {
        return this.request('/v1/memory', {
            method: 'POST',
            body: JSON.stringify({ content, source, tags }),
        });
    }

    async searchMemory(query: string) {
        return this.request(`/v1/memory/search?q=${encodeURIComponent(query)}`);
    }
}
