'use client';

import { useState } from 'react';
import { Send, Hash, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export function QuickCapture() {
    const [content, setContent] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    // ... (rest of component, no import here)

    // ... (inside component)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setSending(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                console.error('No active session');
                return;
            }

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            const res = await fetch(`${apiUrl}/v1/memory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    content,
                    source: 'quick-capture',
                    tags: ['manual']
                })
            });

            if (res.ok) {
                setSent(true);
                setContent('');
                setTimeout(() => setSent(false), 2000);
            }
        } catch (error) {
            console.error('Failed to capture', error);
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="relative h-full flex flex-col justify-between">
            <h3 className="text-lg font-bold text-gray-200 flex items-center gap-2 mb-2">
                <Hash className="w-4 h-4 text-purple-500" />
                Quick Capture
            </h3>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-2">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Inject a thought directly into the neural stream..."
                    className="w-full flex-1 bg-black/40 border border-white/10 rounded-xl p-3 text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none focus:border-purple-500/50 resize-none transition-colors"
                />

                <div className="flex justify-end">
                    <button
                        disabled={sending || !content}
                        className={`
                            flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all
                            ${sent
                                ? 'bg-green-500/20 text-green-400 border border-green-500/20'
                                : 'bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20'
                            }
                            ${(sending || !content) ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                    >
                        {sending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                        {sending ? 'Injecting...' : sent ? 'Captured' : 'Inject'}
                    </button>
                </div>
            </form>

            <AnimatePresence>
                {sent && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl"
                    >
                        <div className="text-center">
                            <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Send className="w-6 h-6 text-green-400" />
                            </div>
                            <p className="text-green-400 font-bold text-sm">Neural Link Established</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
