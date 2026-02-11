import * as vscode from 'vscode';
import { SyncManager } from '../sync/syncManager';
import { ConfigManager } from '../config';

export class CommandHandler {
    constructor(
        private context: vscode.ExtensionContext,
        private syncManager: SyncManager,
        private configManager: ConfigManager
    ) { }

    registerCommands(): void {
        // Search command
        this.context.subscriptions.push(
            vscode.commands.registerCommand('neurosync.search', () => this.searchCommand())
        );

        // Capture note command
        this.context.subscriptions.push(
            vscode.commands.registerCommand('neurosync.captureNote', () => this.captureNoteCommand())
        );

        // Show timeline command
        this.context.subscriptions.push(
            vscode.commands.registerCommand('neurosync.showTimeline', () => this.showTimelineCommand())
        );

        // Toggle auto capture
        this.context.subscriptions.push(
            vscode.commands.registerCommand('neurosync.toggleAutoCapture', () => this.toggleAutoCaptureCommand())
        );

        // Refresh sidebar
        this.context.subscriptions.push(
            vscode.commands.registerCommand('neurosync.refreshSidebar', () => this.refreshSidebarCommand())
        );

        // Open settings
        this.context.subscriptions.push(
            vscode.commands.registerCommand('neurosync.openSettings', () => this.openSettingsCommand())
        );

        // View memory details
        this.context.subscriptions.push(
            vscode.commands.registerCommand('neurosync.viewMemory', (item) => this.viewMemoryCommand(item))
        );
    }

    private async searchCommand(): Promise<void> {
        const query = await vscode.window.showInputBox({
            prompt: 'Search your memories',
            placeHolder: 'Enter search query...'
        });

        if (!query) {
            return;
        }

        try {
            const results = await this.syncManager.search(query);

            if (results.length === 0) {
                vscode.window.showInformationMessage('No memories found');
                return;
            }

            // Show results in quick pick
            const items = results.map((memory: any) => ({
                label: memory.payload?.content || memory.content || 'Unknown',
                description: memory.payload?.source || memory.source || '',
                detail: this.formatTags(memory.payload?.tags || memory.tags || []),
                memory
            }));

            const selected = await vscode.window.showQuickPick(items, {
                placeHolder: `Found ${results.length} results`
            });

            if (selected) {
                this.showMemoryDetails(selected.memory);
            }

        } catch (error) {
            vscode.window.showErrorMessage(`Search failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    private async captureNoteCommand(): Promise<void> {
        const note = await vscode.window.showInputBox({
            prompt: 'Capture a quick note',
            placeHolder: 'Enter your note...'
        });

        if (!note) {
            return;
        }

        try {
            await this.syncManager.sendContext(
                note,
                'vscode',
                ['note', 'manual'],
                { manual: true }
            );

            vscode.window.showInformationMessage('Note captured!');
            vscode.commands.executeCommand('neurosync.refreshSidebar');

        } catch (error) {
            vscode.window.showErrorMessage(`Failed to capture note: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    private async showTimelineCommand(): Promise<void> {
        try {
            const memories = await this.syncManager.getRecentMemories(50);

            if (memories.length === 0) {
                vscode.window.showInformationMessage('No memories in timeline');
                return;
            }

            // Create webview panel
            const panel = vscode.window.createWebviewPanel(
                'neurosyncTimeline',
                'NeuroSync Timeline',
                vscode.ViewColumn.One,
                {
                    enableScripts: true
                }
            );

            panel.webview.html = this.getTimelineHtml(memories);

        } catch (error) {
            vscode.window.showErrorMessage(`Failed to load timeline: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    private async toggleAutoCaptureCommand(): Promise<void> {
        await this.configManager.toggleAutoCapture();
        const config = this.configManager.getConfig();

        vscode.window.showInformationMessage(
            `Auto capture ${config.autoCapture ? 'enabled' : 'disabled'}`
        );
    }

    private refreshSidebarCommand(): void {
        vscode.commands.executeCommand('neurosync.recentMemories.refresh');
        vscode.commands.executeCommand('neurosync.stats.refresh');
    }

    private openSettingsCommand(): void {
        vscode.commands.executeCommand('workbench.action.openSettings', 'neurosync');
    }

    private viewMemoryCommand(item: any): void {
        if (!item || !item.id) {
            return;
        }

        this.showMemoryDetails(item);
    }

    private showMemoryDetails(memory: any): void {
        const panel = vscode.window.createWebviewPanel(
            'neurosyncMemory',
            'Memory Details',
            vscode.ViewColumn.Two,
            {}
        );

        panel.webview.html = this.getMemoryDetailsHtml(memory);
    }

    private formatTags(tags: string[]): string {
        return tags.length > 0 ? `Tags: ${tags.join(', ')}` : 'No tags';
    }

    private getTimelineHtml(memories: any[]): string {
        const items = memories.map(m => {
            const content = m.payload?.content || m.content || 'Unknown';
            const source = m.payload?.source || m.source || 'unknown';
            const tags = m.payload?.tags || m.tags || [];
            const timestamp = m.payload?.timestamp || m.timestamp;
            const date = timestamp ? new Date(timestamp).toLocaleString() : 'Unknown time';

            return `
                <div class="memory-item">
                    <div class="memory-header">
                        <span class="source">${source}</span>
                        <span class="timestamp">${date}</span>
                    </div>
                    <div class="memory-content">${content}</div>
                    <div class="memory-tags">${tags.map((t: string) => `<span class="tag">${t}</span>`).join('')}</div>
                </div>
            `;
        }).join('');

        return `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: var(--vscode-font-family);
                        padding: 20px;
                        color: var(--vscode-foreground);
                        background: var(--vscode-editor-background);
                    }
                    .memory-item {
                        border-left: 3px solid var(--vscode-textLink-foreground);
                        padding: 15px;
                        margin-bottom: 20px;
                        background: var(--vscode-editor-inactiveSelectionBackground);
                        border-radius: 4px;
                    }
                    .memory-header {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 10px;
                        font-size: 0.9em;
                        opacity: 0.8;
                    }
                    .source {
                        font-weight: bold;
                        text-transform: uppercase;
                    }
                    .memory-content {
                        margin-bottom: 10px;
                        line-height: 1.5;
                    }
                    .memory-tags {
                        display: flex;
                        gap: 5px;
                        flex-wrap: wrap;
                    }
                    .tag {
                        background: var(--vscode-badge-background);
                        color: var(--vscode-badge-foreground);
                        padding: 2px 8px;
                        border-radius: 3px;
                        font-size: 0.85em;
                    }
                </style>
            </head>
            <body>
                <h1>Activity Timeline</h1>
                ${items}
            </body>
            </html>
        `;
    }

    private getMemoryDetailsHtml(memory: any): string {
        const content = memory.payload?.content || memory.content || 'Unknown';
        const source = memory.payload?.source || memory.source || 'unknown';
        const tags = memory.payload?.tags || memory.tags || [];
        const timestamp = memory.payload?.timestamp || memory.timestamp;
        const metadata = memory.payload?.metadata || memory.metadata || {};
        const date = timestamp ? new Date(timestamp).toLocaleString() : 'Unknown time';

        return `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: var(--vscode-font-family);
                        padding: 20px;
                        color: var(--vscode-foreground);
                        background: var(--vscode-editor-background);
                    }
                    h1 { margin-top: 0; }
                    .info-row {
                        display: flex;
                        margin-bottom: 10px;
                    }
                    .info-label {
                        font-weight: bold;
                        width: 120px;
                    }
                    .tag {
                        background: var(--vscode-badge-background);
                        color: var(--vscode-badge-foreground);
                        padding: 2px 8px;
                        border-radius: 3px;
                        font-size: 0.85em;
                        margin-right: 5px;
                    }
                    .metadata {
                        background: var(--vscode-editor-inactiveSelectionBackground);
                        padding: 10px;
                        border-radius: 4px;
                        margin-top: 20px;
                    }
                    pre {
                        background: var(--vscode-textCodeBlock-background);
                        padding: 10px;
                        border-radius: 4px;
                        overflow-x: auto;
                    }
                </style>
            </head>
            <body>
                <h1>Memory Details</h1>
                <div class="info-row">
                    <div class="info-label">Content:</div>
                    <div>${content}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Source:</div>
                    <div>${source}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Time:</div>
                    <div>${date}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Tags:</div>
                    <div>${tags.map((t: string) => `<span class="tag">${t}</span>`).join('')}</div>
                </div>
                ${Object.keys(metadata).length > 0 ? `
                    <div class="metadata">
                        <h3>Metadata</h3>
                        <pre>${JSON.stringify(metadata, null, 2)}</pre>
                    </div>
                ` : ''}
            </body>
            </html>
        `;
    }
}
