
'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Key, Plus, Trash2, Copy, Check, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ApiKey {
    id: string;
    name: string;
    last_active: string | null;
    created_at: string;
}

export function ApiKeyManager() {
    const [keys, setKeys] = useState<ApiKey[]>([]);
    const [loading, setLoading] = useState(true);
    const [newKeyName, setNewKeyName] = useState('');
    const [createdKey, setCreatedKey] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchKeys();
    }, []);

    const fetchKeys = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api-keys`, {
                headers: { Authorization: `Bearer ${session.access_token}` }
            });

            if (res.ok) {
                const data = await res.json();
                setKeys(data.keys);
            }
        } catch (e) {
            console.error('Failed to fetch keys', e);
        } finally {
            setLoading(false);
        }
    };

    const createKey = async () => {
        if (!newKeyName.trim()) return;
        setError(null);

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api-keys`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.access_token}`
                },
                body: JSON.stringify({ name: newKeyName })
            });

            if (res.ok) {
                const data = await res.json();
                setCreatedKey(data.key);
                setNewKeyName(''); // Reset input
                fetchKeys(); // Refresh list
            } else {
                setError('Failed to create key');
            }
        } catch (e) {
            setError('Error creating key');
        }
    };

    const revokeKey = async (id: string) => {
        if (!confirm('Are you sure? This action cannot be undone.')) return;

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api-keys/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${session.access_token}` }
            });

            setKeys(keys.filter(k => k.id !== id));
        } catch (e) {
            console.error('Failed to revoke key', e);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Create New Key */}
            <div className="flex gap-4">
                <input
                    type="text"
                    placeholder="Key Name (e.g. VS Code Work)"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500/50"
                />
                <button
                    onClick={createKey}
                    disabled={!newKeyName.trim()}
                    className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold rounded-lg transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Generate
                </button>
            </div>

            {/* Success Message (One-time view) */}
            <AnimatePresence>
                {createdKey && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 overflow-hidden"
                    >
                        <div className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-emerald-400 mt-0.5" />
                            <div className="flex-1">
                                <h4 className="text-emerald-400 font-bold text-sm mb-1">API Key Generated</h4>
                                <p className="text-gray-400 text-xs mb-3">Copy this key now. You won't be able to see it again.</p>
                                <div className="flex items-center gap-2 bg-black/40 rounded-lg p-2 border border-emerald-500/20">
                                    <code className="text-emerald-300 font-mono text-sm flex-1 break-all">{createdKey}</code>
                                    <button onClick={() => copyToClipboard(createdKey)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                        {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
                                    </button>
                                </div>
                            </div>
                            <button onClick={() => setCreatedKey(null)} className="text-gray-500 hover:text-white">
                                &times;
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Key List */}
            <div className="space-y-3">
                {keys.length === 0 && !loading && (
                    <div className="text-center py-8 text-gray-500 text-sm">No active API keys</div>
                )}

                {keys.map((key) => (
                    <div key={key.id} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 group hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                                <Key className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <h4 className="text-white font-medium text-sm">{key.name}</h4>
                                <p className="text-gray-500 text-xs">Created {new Date(key.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-gray-600 font-mono">
                                {key.last_active ? `Last active ${new Date(key.last_active).toLocaleDateString()}` : 'Never used'}
                            </span>
                            <button onClick={() => revokeKey(key.id)} className="p-2 text-gray-600 hover:text-red-400 transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
