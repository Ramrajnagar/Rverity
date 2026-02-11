import * as vscode from 'vscode';
import { SyncManager } from '../sync/syncManager';

interface MemoryItem {
    id: string;
    content: string;
    source: string;
    tags: string[];
    timestamp: string;
}

export class MemoriesTreeProvider implements vscode.TreeDataProvider<MemoryTreeItem> {
    private _onDidChangeTreeData = new vscode.EventEmitter<MemoryTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

    constructor(private syncManager: SyncManager) { }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: MemoryTreeItem): vscode.TreeItem {
        return element;
    }

    async getChildren(element?: MemoryTreeItem): Promise<MemoryTreeItem[]> {
        if (!this.syncManager.isReady()) {
            return [new MemoryTreeItem('Not connected', '', vscode.TreeItemCollapsibleState.None)];
        }

        if (element) {
            return [];
        }

        try {
            const memories = await this.syncManager.getRecentMemories(20);

            if (memories.length === 0) {
                return [new MemoryTreeItem('No memories yet', '', vscode.TreeItemCollapsibleState.None)];
            }

            return memories.map((memory: any) => {
                const item = new MemoryTreeItem(
                    memory.payload?.content || memory.content || 'Unknown',
                    memory.id,
                    vscode.TreeItemCollapsibleState.None
                );

                // Set description (timestamp)
                const timestamp = memory.payload?.timestamp || memory.timestamp;
                if (timestamp) {
                    const date = new Date(timestamp);
                    item.description = this.formatTimestamp(date);
                }

                // Set icon based on source
                const source = memory.payload?.source || memory.source || 'unknown';
                item.iconPath = this.getIconForSource(source);

                // Set tooltip
                const tags = memory.payload?.tags || memory.tags || [];
                item.tooltip = `${item.label}\n\nSource: ${source}\nTags: ${tags.join(', ')}\nTime: ${item.description}`;

                // Set context value for commands
                item.contextValue = 'memory';

                return item;
            });

        } catch (error) {
            console.error('Failed to load memories:', error);
            return [new MemoryTreeItem('Failed to load memories', '', vscode.TreeItemCollapsibleState.None)];
        }
    }

    private formatTimestamp(date: Date): string {
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (seconds < 60) return 'just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;

        return date.toLocaleDateString();
    }

    private getIconForSource(source: string): vscode.ThemeIcon {
        const iconMap: Record<string, string> = {
            'vscode': 'code',
            'git': 'git-commit',
            'github': 'github',
            'chrome': 'browser',
            'terminal': 'terminal',
            'api': 'cloud'
        };

        return new vscode.ThemeIcon(iconMap[source] || 'file');
    }
}

export class MemoryTreeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly id: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
    }
}

export class StatsTreeProvider implements vscode.TreeDataProvider<StatsTreeItem> {
    private _onDidChangeTreeData = new vscode.EventEmitter<StatsTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

    constructor(private syncManager: SyncManager) { }

    refresh(): void {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element: StatsTreeItem): vscode.TreeItem {
        return element;
    }

    async getChildren(element?: StatsTreeItem): Promise<StatsTreeItem[]> {
        if (!this.syncManager.isReady()) {
            return [new StatsTreeItem('Not connected', '')];
        }

        if (element) {
            return [];
        }

        try {
            const stats = await this.syncManager.getStats();

            if (!stats) {
                return [new StatsTreeItem('No stats available', '')];
            }

            return [
                new StatsTreeItem('Today', `${stats.today || 0} memories`, '$(calendar)'),
                new StatsTreeItem('This Week', `${stats.thisWeek || 0} memories`, '$(graph)'),
                new StatsTreeItem('This Month', `${stats.thisMonth || 0} memories`, '$(archive)'),
                new StatsTreeItem('Total', `${stats.total || 0} memories`, '$(database)'),
                new StatsTreeItem('Streak', `${stats.streak || 0} days`, '$(flame)')
            ];

        } catch (error) {
            console.error('Failed to load stats:', error);
            return [new StatsTreeItem('Failed to load stats', '')];
        }
    }
}

export class StatsTreeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly description: string,
        public readonly icon?: string
    ) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.description = description;
        if (icon) {
            this.iconPath = new vscode.ThemeIcon(icon.replace('$(', '').replace(')', ''));
        }
    }
}
