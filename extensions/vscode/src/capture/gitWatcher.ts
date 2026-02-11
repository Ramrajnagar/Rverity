import * as vscode from 'vscode';
import { SyncManager } from '../sync/syncManager';
import { ConfigManager } from '../config';

export class GitWatcher {
    private disposables: vscode.Disposable[] = [];
    private gitExtension: any;

    constructor(
        private syncManager: SyncManager,
        private configManager: ConfigManager
    ) { }

    async activate(): Promise<void> {
        const config = this.configManager.getConfig();

        if (!config.captureGitCommits) {
            return;
        }

        // Get Git extension
        const gitExt = vscode.extensions.getExtension('vscode.git');
        if (!gitExt) {
            console.log('Git extension not found');
            return;
        }

        this.gitExtension = gitExt.isActive ? gitExt.exports : await gitExt.activate();

        if (!this.gitExtension) {
            return;
        }

        // Watch for Git repository changes
        const api = this.gitExtension.getAPI(1);

        api.repositories.forEach((repo: any) => {
            this.watchRepository(repo);
        });

        // Watch for new repositories
        api.onDidOpenRepository((repo: any) => {
            this.watchRepository(repo);
        });
    }

    private watchRepository(repo: any): void {
        // Watch for commits
        const disposable = repo.state.onDidChange(() => {
            this.handleRepositoryChange(repo);
        });

        this.disposables.push(disposable);
    }

    private async handleRepositoryChange(repo: any): Promise<void> {
        try {
            const head = repo.state.HEAD;

            if (!head || !head.commit) {
                return;
            }

            // Get the latest commit
            const commit = await repo.getCommit(head.commit);

            if (!commit) {
                return;
            }

            // Check if this is a new commit (not just a branch change)
            const message = commit.message;
            const author = commit.authorName || 'Unknown';
            const hash = commit.hash.substring(0, 7);

            await this.syncManager.sendContext(
                `Git commit: ${message}`,
                'vscode',
                ['git', 'commit'],
                {
                    message,
                    author,
                    hash,
                    repository: repo.rootUri.fsPath
                }
            );

        } catch (error) {
            console.error('Error handling git change:', error);
        }
    }

    dispose(): void {
        this.disposables.forEach(d => d.dispose());
        this.disposables = [];
    }
}
