import * as vscode from 'vscode';
import { NeuroSyncClient } from '@neurosync/sdk';

let client: NeuroSyncClient;

export function activate(context: vscode.ExtensionContext) {
    console.log('NeuroSync is now active!');

    // Initialize Client
    const config = vscode.workspace.getConfiguration('neurosync');
    const apiKey = config.get<string>('apiKey') || 'dev_key';
    const endpoint = config.get<string>('apiUrl') || 'http://localhost:3001';

    client = new NeuroSyncClient({ apiKey, endpoint });

    // Status Bar Item
    const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBar.text = "$(brain) NeuroSync";
    statusBar.tooltip = "Connected to Memory Layer";
    statusBar.show();
    context.subscriptions.push(statusBar);

    // Event: On Save
    let onSave = vscode.workspace.onDidSaveTextDocument(async (document) => {
        if (document.uri.scheme !== 'file') return;

        try {
            const content = document.getText();
            const relativePath = vscode.workspace.asRelativePath(document.uri);
            const language = document.languageId;

            statusBar.text = "$(sync~spin) Syncing...";

            await client.sendContext(
                `Saved file: ${relativePath}`,
                'vscode',
                [language, 'file-save', relativePath]
            );

            statusBar.text = "$(check) Synced";
            setTimeout(() => { statusBar.text = "$(brain) NeuroSync"; }, 2000);

        } catch (error) {
            console.error('NeuroSync Error:', error);
            statusBar.text = "$(error) Sync Failed";
            setTimeout(() => { statusBar.text = "$(brain) NeuroSync"; }, 2000);
        }
    });

    context.subscriptions.push(onSave);

    // Command: Manual Sync
    let manualSync = vscode.commands.registerCommand('neurosync.manualSync', async () => {
        vscode.window.showInformationMessage('NeuroSync: Manual sync triggered');
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            await editor.document.save();
        }
    });

    context.subscriptions.push(manualSync);
}

export function deactivate() { }
