import * as vscode from 'vscode';
import { NeuroSyncClient } from '@neurosync/sdk';
import { ConfigManager } from './config';

export class SyncManager {
    private client: NeuroSyncClient | null = null;
    private statusBarItem: vscode.StatusBarItem;
    private isConnected = false;
    private queueSize = 0;

    constructor(
        private context: vscode.ExtensionContext,
        private configManager: ConfigManager
    ) {
        this.statusBarItem = vscode.window.createStatusBarItem(
            vscode.StatusBarAlignment.Right,
            100
        );
        this.statusBarItem.command = 'neurosync.openSettings';
        this.context.subscriptions.push(this.statusBarItem);
        this.updateStatusBar();
    }

    async initialize(): Promise<void> {
        const config = this.configManager.getConfig();

        if (!config.apiKey) {
            this.updateStatusBar('Not Configured', '$(warning)');
            return;
        }

        try {
            this.client = new NeuroSyncClient({
                apiKey: config.apiKey,
                endpoint: config.endpoint,
                enableWebSocket: config.enableRealtime,
                enableOfflineQueue: config.enableOfflineQueue,
                debug: false
            });

            // Setup event listeners
            this.setupEventListeners();

            // Validate API key
            const isValid = await this.client.validateApiKey();
            if (!isValid) {
                this.updateStatusBar('Invalid API Key', '$(error)');
                vscode.window.showErrorMessage('NeuroSync: Invalid API key. Please check your settings.');
                return;
            }

            // Connect real-time if enabled
            if (config.enableRealtime) {
                this.client.connectRealtime();
            }

            this.updateStatusBar('Connected', '$(check)');
            this.isConnected = true;

        } catch (error) {
            this.updateStatusBar('Connection Failed', '$(error)');
            vscode.window.showErrorMessage(`NeuroSync: ${error instanceof Error ? error.message : 'Connection failed'}`);
        }
    }

    private setupEventListeners(): void {
        if (!this.client) return;

        this.client.on('connected', () => {
            this.isConnected = true;
            this.updateStatusBar('Connected', '$(check)');
        });

        this.client.on('disconnected', () => {
            this.isConnected = false;
            this.updateStatusBar('Disconnected', '$(debug-disconnect)');
        });

        this.client.on('error', (error) => {
            console.error('NeuroSync error:', error);
        });

        this.client.on('memory', (memory) => {
            // Trigger refresh of sidebar
            vscode.commands.executeCommand('neurosync.refreshSidebar');
        });
    }

    async sendContext(
        content: string,
        source: string,
        tags: string[] = [],
        metadata?: Record<string, unknown>
    ): Promise<void> {
        if (!this.client) {
            await this.initialize();
            if (!this.client) return;
        }

        try {
            const response = await this.client.sendContext(content, source, tags, metadata);

            if (response.status === 'queued') {
                this.queueSize = this.client.getQueueSize();
                this.updateStatusBar(`Queued (${this.queueSize})`, '$(cloud-upload)');
            } else if (response.status === 'success') {
                // Success - maybe show a subtle notification
                this.updateStatusBar('Connected', '$(check)');
            }
        } catch (error) {
            console.error('Failed to send context:', error);
        }
    }

    async search(query: string): Promise<any[]> {
        if (!this.client) {
            await this.initialize();
            if (!this.client) return [];
        }

        try {
            const response = await this.client.searchMemory(query);
            if (response.status === 'success' && response.data) {
                return response.data.memories;
            }
        } catch (error) {
            console.error('Search failed:', error);
        }

        return [];
    }

    async getRecentMemories(limit = 20): Promise<any[]> {
        if (!this.client) {
            await this.initialize();
            if (!this.client) return [];
        }

        try {
            const response = await this.client.getMemories(limit);
            if (response.status === 'success' && response.data) {
                return response.data.memories;
            }
        } catch (error) {
            console.error('Failed to get memories:', error);
        }

        return [];
    }

    async getStats(): Promise<any> {
        if (!this.client) {
            await this.initialize();
            if (!this.client) return null;
        }

        try {
            const response = await this.client.getActivityStats();
            if (response.status === 'success' && response.data) {
                return response.data;
            }
        } catch (error) {
            console.error('Failed to get stats:', error);
        }

        return null;
    }

    private updateStatusBar(text?: string, icon?: string): void {
        if (text && icon) {
            this.statusBarItem.text = `${icon} NeuroSync: ${text}`;
        } else {
            this.statusBarItem.text = '$(brain) NeuroSync';
        }
        this.statusBarItem.show();
    }

    getClient(): NeuroSyncClient | null {
        return this.client;
    }

    isReady(): boolean {
        return this.isConnected && this.client !== null;
    }

    dispose(): void {
        if (this.client) {
            this.client.destroy();
        }
        this.statusBarItem.dispose();
    }
}
