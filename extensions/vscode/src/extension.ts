import * as vscode from 'vscode';
import { ConfigManager } from './config';
import { SyncManager } from './sync/syncManager';
import { FileWatcher } from './capture/fileWatcher';
import { GitWatcher } from './capture/gitWatcher';
import { MemoriesTreeProvider, StatsTreeProvider } from './ui/sidebar';
import { CommandHandler } from './ui/commands';

let syncManager: SyncManager;
let fileWatcher: FileWatcher;
let gitWatcher: GitWatcher;
let memoriesProvider: MemoriesTreeProvider;
let statsProvider: StatsTreeProvider;

export async function activate(context: vscode.ExtensionContext) {
    console.log('NeuroSync extension is now active');

    // Initialize config manager
    const configManager = ConfigManager.getInstance();

    // Initialize sync manager
    syncManager = new SyncManager(context, configManager);

    // Check if configured
    if (!configManager.isConfigured()) {
        const action = await vscode.window.showInformationMessage(
            'NeuroSync: Please configure your API key to get started',
            'Open Settings'
        );

        if (action === 'Open Settings') {
            vscode.commands.executeCommand('workbench.action.openSettings', 'neurosync.apiKey');
        }
    } else {
        // Initialize if configured
        await syncManager.initialize();
    }

    // Initialize file watcher
    fileWatcher = new FileWatcher(syncManager, configManager);
    fileWatcher.activate();

    // Initialize git watcher
    gitWatcher = new GitWatcher(syncManager, configManager);
    await gitWatcher.activate();

    // Initialize sidebar providers
    memoriesProvider = new MemoriesTreeProvider(syncManager);
    statsProvider = new StatsTreeProvider(syncManager);

    // Register tree views
    const memoriesTreeView = vscode.window.createTreeView('neurosync.recentMemories', {
        treeDataProvider: memoriesProvider
    });

    const statsTreeView = vscode.window.createTreeView('neurosync.stats', {
        treeDataProvider: statsProvider
    });

    context.subscriptions.push(memoriesTreeView, statsTreeView);

    // Register refresh commands for tree views
    context.subscriptions.push(
        vscode.commands.registerCommand('neurosync.recentMemories.refresh', () => {
            memoriesProvider.refresh();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('neurosync.stats.refresh', () => {
            statsProvider.refresh();
        })
    );

    // Initialize command handler
    const commandHandler = new CommandHandler(context, syncManager, configManager);
    commandHandler.registerCommands();

    // Watch for configuration changes
    context.subscriptions.push(
        vscode.workspace.onDidChangeConfiguration(async (event) => {
            if (event.affectsConfiguration('neurosync')) {
                configManager.refresh();

                // Reinitialize if API key changed
                if (event.affectsConfiguration('neurosync.apiKey')) {
                    await syncManager.initialize();
                }

                // Restart file watcher if auto capture changed
                if (event.affectsConfiguration('neurosync.autoCapture')) {
                    fileWatcher.dispose();
                    fileWatcher = new FileWatcher(syncManager, configManager);
                    fileWatcher.activate();
                }

                // Restart git watcher if git capture changed
                if (event.affectsConfiguration('neurosync.captureGitCommits')) {
                    gitWatcher.dispose();
                    gitWatcher = new GitWatcher(syncManager, configManager);
                    await gitWatcher.activate();
                }

                // Refresh sidebar
                memoriesProvider.refresh();
                statsProvider.refresh();
            }
        })
    );

    // Auto-refresh sidebar every 30 seconds
    const refreshInterval = setInterval(() => {
        if (syncManager.isReady()) {
            memoriesProvider.refresh();
            statsProvider.refresh();
        }
    }, 30000);

    context.subscriptions.push({
        dispose: () => clearInterval(refreshInterval)
    });

    // Show welcome message on first install
    const hasShownWelcome = context.globalState.get('hasShownWelcome', false);
    if (!hasShownWelcome) {
        const action = await vscode.window.showInformationMessage(
            'Welcome to NeuroSync! Your AI-powered second brain for VS Code.',
            'Get Started',
            'Learn More'
        );

        if (action === 'Get Started') {
            vscode.commands.executeCommand('workbench.action.openSettings', 'neurosync');
        } else if (action === 'Learn More') {
            vscode.env.openExternal(vscode.Uri.parse('https://rverity.ai/docs'));
        }

        await context.globalState.update('hasShownWelcome', true);
    }

    console.log('NeuroSync extension activated successfully');
}

export function deactivate() {
    console.log('NeuroSync extension is being deactivated');

    // Cleanup
    if (syncManager) {
        syncManager.dispose();
    }

    if (fileWatcher) {
        fileWatcher.dispose();
    }

    if (gitWatcher) {
        gitWatcher.dispose();
    }

    console.log('NeuroSync extension deactivated');
}
