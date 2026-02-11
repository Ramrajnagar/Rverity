'use client';

import { useState } from 'react';
import { Send, Tag, Loader2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

interface QuickCaptureProps {
    onCapture?: (memory: any) => void;
}

export function QuickCapture({ onCapture }: QuickCaptureProps) {
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setSending(true);
        setError('');

        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                setError('Please log in to capture memories');
                return;
            }

            const tagArray = tags
                .split(',')
                .map(t => t.trim())
                .filter(t => t.length > 0);

            const res = await fetch('/v1/memory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    content: content.trim(),
                    source: 'quick-capture',
                    tags: tagArray.length > 0 ? tagArray : ['manual']
                })
            });

            if (res.ok) {
                const data = await res.json();
                setSent(true);
                setContent('');
                setTags('');

                // Call callback if provided
                if (onCapture && data.data?.memory) {
                    onCapture(data.data.memory);
                }

                setTimeout(() => setSent(false), 2000);
            } else {
                const errorData = await res.json();
                setError(errorData.message || 'Failed to capture memory');
            }
        } catch (error) {
            console.error('Failed to capture:', error);
            setError('Network error. Please try again.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="relative h-full flex flex-col">
            <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-3">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Capture an important thought, idea, or context..."
                    className="w-full flex-1 min-h-[100px] bg-black/40 border border-white/10 rounded-xl p-4 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 resize-none transition-colors"
                    disabled={sending}
                />

                <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex-1 relative">
                        <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            type="text"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            placeholder="Tags (comma separated)"
                            className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50 transition-colors"
                            disabled={sending}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={sending || !content.trim()}
                        className={`
                            flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-semibold transition-all
                            ${sent
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 border border-purple-500/30 hover:from-purple-500/30 hover:to-pink-500/30'
                            }
                            ${(sending || !content.trim()) ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                    >
                        {sending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Capturing...</span>
                            </>
                        ) : sent ? (
                            <>
                                <Check className="w-4 h-4" />
                                <span>Captured!</span>
                            </>
                        ) : (
                            <>
                                <Send className="w-4 h-4" />
                                <span>Capture</span>
                            </>
                        )}
                    </button>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                    >
                        {error}
                    </motion.div>
                )}
            </form>

            <AnimatePresence>
                {sent && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-xl"
                    >
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-green-500/30">
                                <Check className="w-8 h-8 text-green-400" />
                            </div>
                            <p className="text-green-400 font-semibold">Memory Captured Successfully</p>
                            <p className="text-xs text-gray-500 mt-1">Added to your knowledge base</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
