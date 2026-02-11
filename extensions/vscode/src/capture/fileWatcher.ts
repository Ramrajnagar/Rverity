import * as vscode from 'vscode';
import { SyncManager } from '../sync/syncManager';
import { ConfigManager } from '../config';

export class FileWatcher {
    private disposables: vscode.Disposable[] = [];
    private debounceTimers: Map<string, NodeJS.Timeout> = new Map();

    constructor(
        private syncManager: SyncManager,
        private configManager: ConfigManager
    ) { }

    activate(): void {
        const config = this.configManager.getConfig();

        if (!config.autoCapture) {
            return;
        }

        // Watch for file changes
        const watcher = vscode.workspace.onDidChangeTextDocument(
            this.handleFileChange.bind(this)
        );
        this.disposables.push(watcher);

        // Watch for file saves
        const saveWatcher = vscode.workspace.onDidSaveTextDocument(
            this.handleFileSave.bind(this)
        );
        this.disposables.push(saveWatcher);

        // Watch for file creation
        const createWatcher = vscode.workspace.onDidCreateFiles(
            this.handleFileCreate.bind(this)
        );
        this.disposables.push(createWatcher);

        // Watch for file deletion
        const deleteWatcher = vscode.workspace.onDidDeleteFiles(
            this.handleFileDelete.bind(this)
        );
        this.disposables.push(deleteWatcher);
    }

    private handleFileChange(event: vscode.TextDocumentChangeEvent): void {
        const config = this.configManager.getConfig();
        const filePath = event.document.uri.fsPath;

        // Skip if file should be excluded
        if (this.configManager.shouldExclude(filePath)) {
            return;
        }

        // Skip if not a file scheme
        if (event.document.uri.scheme !== 'file') {
            return;
        }

        // Debounce file changes
        const existingTimer = this.debounceTimers.get(filePath);
        if (existingTimer) {
            clearTimeout(existingTimer);
        }

        const timer = setTimeout(() => {
            this.captureFileChange(event.document);
            this.debounceTimers.delete(filePath);
        }, config.debounceMs);

        this.debounceTimers.set(filePath, timer);
    }

    private async handleFileSave(document: vscode.TextDocument): Promise<void> {
        const filePath = document.uri.fsPath;

        if (this.configManager.shouldExclude(filePath)) {
            return;
        }

        const fileName = this.getFileName(filePath);
        const language = document.languageId;

        await this.syncManager.sendContext(
            `Saved file: ${fileName}`,
            'vscode',
            ['file-save', language],
            {
                file: fileName,
                path: filePath,
                language,
                lines: document.lineCount
            }
        );
    }

    private async handleFileCreate(event: vscode.FileCreateEvent): Promise<void> {
        for (const uri of event.files) {
            const filePath = uri.fsPath;

            if (this.configManager.shouldExclude(filePath)) {
                continue;
            }

            const fileName = this.getFileName(filePath);

            await this.syncManager.sendContext(
                `Created file: ${fileName}`,
                'vscode',
                ['file-create'],
                {
                    file: fileName,
                    path: filePath
                }
            );
        }
    }

    private async handleFileDelete(event: vscode.FileDeleteEvent): Promise<void> {
        for (const uri of event.files) {
            const filePath = uri.fsPath;
            const fileName = this.getFileName(filePath);

            await this.syncManager.sendContext(
                `Deleted file: ${fileName}`,
                'vscode',
                ['file-delete'],
                {
                    file: fileName,
                    path: filePath
                }
            );
        }
    }

    private async captureFileChange(document: vscode.TextDocument): Promise<void> {
        const filePath = document.uri.fsPath;
        const fileName = this.getFileName(filePath);
        const language = document.languageId;

        // Get current selection or active line
        const editor = vscode.window.activeTextEditor;
        let context = `Editing ${fileName}`;

        if (editor && editor.document === document) {
            const selection = editor.selection;
            if (!selection.isEmpty) {
                const selectedText = document.getText(selection);
                context = `Working on ${fileName}: ${selectedText.substring(0, 100)}...`;
            }
        }

        await this.syncManager.sendContext(
            context,
            'vscode',
            ['file-edit', language],
            {
                file: fileName,
                path: filePath,
                language,
                lines: document.lineCount
            }
        );
    }

    private getFileName(filePath: string): string {
        return filePath.split(/[\\/]/).pop() || filePath;
    }

    dispose(): void {
        // Clear all debounce timers
        this.debounceTimers.forEach(timer => clearTimeout(timer));
        this.debounceTimers.clear();

        // Dispose all watchers
        this.disposables.forEach(d => d.dispose());
        this.disposables = [];
    }
}
