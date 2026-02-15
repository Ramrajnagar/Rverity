'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Monitor, Github, Chrome } from 'lucide-react';
import { toast } from 'sonner';

export function ConnectExtension() {
    const [loading, setLoading] = useState(false);

    const handleConnectVSCode = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/user/token');
            const data = await res.json();

            if (data.token) {
                // Redirect to VS Code
                window.location.href = `vscode://neurosync.neurosync-vscode/auth?token=${data.token}`;
                toast.success('Opening VS Code...');
            } else {
                toast.error('Failed to generate connection token');
            }
        } catch (error) {
            console.error('Connection error:', error);
            toast.error('Failed to connect to VS Code');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {/* VS Code Card */}
            <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                        <Monitor className="w-6 h-6" />
                    </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">VS Code Extension</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Sync your code editor context directly to your Rverity memory layer.
                </p>
                <Button
                    onClick={handleConnectVSCode}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Connecting...
                        </>
                    ) : (
                        'Connect VS Code'
                    )}
                </Button>
            </div>

            {/* GitHub Card - Placeholder for now, redirects to GitHub App */}
            <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-zinc-500/10 rounded-lg text-zinc-100">
                        <Github className="w-6 h-6" />
                    </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">GitHub Integration</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Index your repositories, PRs, and issues automatically.
                </p>
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(process.env.NEXT_PUBLIC_GITHUB_APP_URL || 'https://github.com/apps/neurosync-ai', '_blank')}
                >
                    Configure GitHub
                </Button>
            </div>

            {/* Browser Extension - Placeholder */}
            <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors group">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                        <Chrome className="w-6 h-6" />
                    </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Browser Extension</h3>
                <p className="text-sm text-muted-foreground mb-4">
                    Capture research and documentation from any webpage.
                </p>
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => toast.info('Coming soon to Chrome Web Store')}
                >
                    Get Extension
                </Button>
            </div>
        </div>
    );
}
