import * as vscode from 'vscode';

export interface ExtensionConfig {
    apiKey: string;
    endpoint: string;
    autoCapture: boolean;
    captureGitCommits: boolean;
    captureTerminal: boolean;
    debounceMs: number;
    enableRealtime: boolean;
    enableOfflineQueue: boolean;
    excludePatterns: string[];
}

export class ConfigManager {
    private static instance: ConfigManager;
    private config: vscode.WorkspaceConfiguration;

    private constructor() {
        this.config = vscode.workspace.getConfiguration('neurosync');
    }

    static getInstance(): ConfigManager {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new ConfigManager();
        }
        return ConfigManager.instance;
    }

    refresh(): void {
        this.config = vscode.workspace.getConfiguration('neurosync');
    }

    getConfig(): ExtensionConfig {
        return {
            apiKey: this.config.get<string>('apiKey', ''),
            endpoint: this.config.get<string>('endpoint', 'http://localhost:3000'),
            autoCapture: this.config.get<boolean>('autoCapture', true),
            captureGitCommits: this.config.get<boolean>('captureGitCommits', true),
            captureTerminal: this.config.get<boolean>('captureTerminal', false),
            debounceMs: this.config.get<number>('debounceMs', 3000),
            enableRealtime: this.config.get<boolean>('enableRealtime', true),
            enableOfflineQueue: this.config.get<boolean>('enableOfflineQueue', true),
            excludePatterns: this.config.get<string[]>('excludePatterns', [
                '**/node_modules/**',
                '**/.git/**',
                '**/dist/**',
                '**/build/**',
                '**/.next/**'
            ])
        };
    }

    async setApiKey(apiKey: string): Promise<void> {
        await this.config.update('apiKey', apiKey, vscode.ConfigurationTarget.Global);
        this.refresh();
    }

    async toggleAutoCapture(): Promise<void> {
        const current = this.config.get<boolean>('autoCapture', true);
        await this.config.update('autoCapture', !current, vscode.ConfigurationTarget.Global);
        this.refresh();
    }

    isConfigured(): boolean {
        const config = this.getConfig();
        return config.apiKey.length > 0;
    }

    shouldExclude(filePath: string): boolean {
        const config = this.getConfig();
        return config.excludePatterns.some(pattern => {
            const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));
            return regex.test(filePath);
        });
    }
}
