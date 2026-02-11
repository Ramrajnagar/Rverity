'use client';

import { useState, useEffect } from 'react';

interface GitHubInstallation {
    id: string;
    installation_id: number;
    account_login: string;
    account_type: string;
    installed_at: string;
}

export default function GitHubIntegration() {
    const [installations, setInstallations] = useState<GitHubInstallation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadInstallations();
    }, []);

    const loadInstallations = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/github/installations');
            const data = await response.json();

            if (data.status === 'success') {
                setInstallations(data.data.installations);
            } else {
                setError(data.error || 'Failed to load installations');
            }
        } catch (err) {
            setError('Failed to load installations');
        } finally {
            setLoading(false);
        }
    };

    const handleConnect = () => {
        // Redirect to GitHub App installation page
        const appName = 'neurosync-ai'; // Replace with your GitHub App name
        window.location.href = `https://github.com/apps/${appName}/installations/new`;
    };

    const handleDisconnect = async (installationId: number) => {
        if (!confirm('Are you sure you want to disconnect this GitHub installation?')) {
            return;
        }

        try {
            const response = await fetch(
                `/api/github/installations?installation_id=${installationId}`,
                { method: 'DELETE' }
            );

            const data = await response.json();

            if (data.status === 'success') {
                await loadInstallations();
            } else {
                alert('Failed to disconnect: ' + (data.error || 'Unknown error'));
            }
        } catch (err) {
            alert('Failed to disconnect installation');
        }
    };

    if (loading) {
        return (
            <div className="p-6">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
                    <div className="h-32 bg-gray-200 rounded"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">GitHub Integration</h2>
                <p className="text-gray-600">
                    Connect your GitHub repositories to automatically capture commits, PRs, issues, and more.
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                </div>
            )}

            {installations.length === 0 ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <div className="mb-4">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No GitHub installations
                    </h3>
                    <p className="text-gray-500 mb-6">
                        Connect your GitHub account to start capturing repository activity.
                    </p>
                    <button
                        onClick={handleConnect}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        <svg
                            className="mr-2 h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Connect GitHub
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {installations.map((installation) => (
                        <div
                            key={installation.id}
                            className="border border-gray-200 rounded-lg p-6 flex items-center justify-between"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <svg
                                        className="h-10 w-10 text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {installation.account_login}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {installation.account_type} • Connected{' '}
                                        {new Date(installation.installed_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDisconnect(installation.installation_id)}
                                className="px-4 py-2 border border-red-300 rounded-md text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                                Disconnect
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={handleConnect}
                        className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        + Add another GitHub account
                    </button>
                </div>
            )}

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm font-medium text-blue-900 mb-2">
                    What gets captured?
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Commits and pushes</li>
                    <li>• Pull requests and reviews</li>
                    <li>• Issues and comments</li>
                    <li>• Releases and tags</li>
                    <li>• Branch creation and deletion</li>
                </ul>
                <p className="text-xs text-blue-600 mt-3">
                    Note: Only metadata is captured, not code content. You can disconnect at any time.
                </p>
            </div>
        </div>
    );
}
