'use client';

import { Github, Chrome, Code, Database, MessageSquare, FileText, BookOpen } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export function IntegrationsSection() {
    const [githubInstallations, setGithubInstallations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadGitHubInstallations();
    }, []);

    const loadGitHubInstallations = async () => {
        try {
            const response = await fetch('/api/github/installations');
            if (response.ok) {
                const data = await response.json();
                setGithubInstallations(data.data?.installations || []);
            }
        } catch (error) {
            console.error('Failed to load GitHub installations:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGitHubConnect = () => {
        // Redirect to GitHub App installation
        window.location.href = 'https://github.com/apps/neurosync-ai/installations/new';
    };

    const handleGitHubDisconnect = async (installationId: number) => {
        if (!confirm('Disconnect this GitHub installation?')) return;

        try {
            const response = await fetch(`/api/github/installations?installation_id=${installationId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await loadGitHubInstallations();
            }
        } catch (error) {
            console.error('Failed to disconnect:', error);
        }
    };

    return (
        <div className="space-y-4">
            {/* GitHub Integration */}
            <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] group hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${githubInstallations.length > 0 ? 'bg-purple-500/10 text-purple-400' : 'bg-white/5 text-gray-500'
                            }`}>
                            <Github className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className={`font-bold transition-colors ${githubInstallations.length > 0 ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                                }`}>
                                GitHub
                            </h4>
                            <p className="text-xs text-gray-500">
                                {githubInstallations.length > 0
                                    ? `${githubInstallations.length} account(s) connected`
                                    : 'Capture commits, PRs, issues, and releases'}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {githubInstallations.length > 0 ? (
                            <>
                                <Link
                                    href="/settings#github"
                                    className="px-4 py-2 rounded-lg text-xs font-bold bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 transition-all"
                                >
                                    Manage
                                </Link>
                                <button
                                    onClick={() => handleGitHubDisconnect(githubInstallations[0].installation_id)}
                                    className="px-4 py-2 rounded-lg text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all"
                                >
                                    Disconnect
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleGitHubConnect}
                                disabled={loading}
                                className="px-4 py-2 rounded-lg text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-all disabled:opacity-50"
                            >
                                {loading ? 'Loading...' : 'Connect'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* VS Code Extension */}
            <IntegrationItem
                icon={Code}
                name="VS Code Extension"
                description="Automatic file and Git tracking in your editor"
                link="/integrations/vscode"
                linkText="View Guide"
                color="blue"
            />

            {/* Chrome Extension */}
            <IntegrationItem
                icon={Chrome}
                name="Chrome Extension"
                description="Capture browsing history and bookmarks"
                link="/integrations/browser"
                linkText="View Guide"
                color="green"
            />

            {/* SDK */}
            <IntegrationItem
                icon={Database}
                name="SDK & API"
                description="Build custom integrations with our TypeScript SDK"
                link="/docs"
                linkText="View Docs"
                color="cyan"
            />

            {/* Slack */}
            <IntegrationItem
                icon={MessageSquare}
                name="Slack"
                description="Capture discussions and decisions"
                link="/integrations/slack"
                linkText="View Guide"
                color="rose"
            />

            {/* Notion */}
            <IntegrationItem
                icon={FileText}
                name="Notion"
                description="Sync knowledge base and docs"
                link="/integrations/notion"
                linkText="View Guide"
                color="emerald"
            />

            {/* Obsidian */}
            <IntegrationItem
                icon={BookOpen}
                name="Obsidian"
                description="Sync second brain and notes"
                link="/integrations/obsidian"
                linkText="View Guide"
                color="violet"
            />
        </div>
    );
}

function IntegrationItem({ icon: Icon, name, description, link, linkText, color }: any) {
    const colorClasses = {
        blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20',
        green: 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20',
        cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20',
        purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20',
        rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20 hover:bg-rose-500/20',
        emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20',
        violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20 hover:bg-violet-500/20'
    };

    return (
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:border-white/10 transition-colors">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 text-gray-500`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <h4 className="font-bold text-gray-400 group-hover:text-gray-200 transition-colors">{name}</h4>
                    <p className="text-xs text-gray-500">{description}</p>
                </div>
            </div>

            <Link
                href={link}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${colorClasses[color as keyof typeof colorClasses]}`}
            >
                {linkText}
            </Link>
        </div>
    );
}
