'use client';

import { Github, Twitter, MessageSquare, Database } from 'lucide-react';
import { useState } from 'react';

export function IntegrationsSection() {
    return (
        <div className="space-y-4">
            <IntegrationItem
                icon={Github}
                name="GitHub"
                description="Sync code commits, PRs, and issues."
                connected={true}
            />
            <IntegrationItem
                icon={Twitter}
                name="Twitter / X"
                description="Capture bookmarks and liked tweets."
                connected={false}
            />
            <IntegrationItem
                icon={MessageSquare}
                name="Notion"
                description="Import pages and databases."
                connected={false}
            />
            <IntegrationItem
                icon={Database}
                name="Obsidian"
                description="Sync your local knowledge base."
                connected={true}
            />
        </div>
    );
}

function IntegrationItem({ icon: Icon, name, description, connected }: any) {
    const [isConnected, setIsConnected] = useState(connected);

    return (
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between group hover:border-white/10 transition-colors">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isConnected ? 'bg-cyan-500/10 text-cyan-400' : 'bg-white/5 text-gray-500'}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <h4 className={`font-bold transition-colors ${isConnected ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>{name}</h4>
                    <p className="text-xs text-gray-500">{description}</p>
                </div>
            </div>

            <button
                onClick={() => setIsConnected(!isConnected)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${isConnected
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
                        : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20'
                    }`}
            >
                {isConnected ? 'Disconnect' : 'Connect'}
            </button>
        </div>
    );
}
