'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Check, CreditCard, Zap } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Plan {
    id: string;
    name: string;
    price_cents: number;
    max_memories: number;
    max_api_keys: number;
}

interface Subscription {
    id: string;
    status: string;
    plan: Plan;
}

export function BillingSection() {
    const router = useRouter();
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubscription();
    }, []);

    const fetchSubscription = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            // For now, default to Free plan since subscriptions table may not exist yet
            setSubscription({
                id: 'free',
                status: 'active',
                plan: {
                    id: 'free',
                    name: 'Free',
                    price_cents: 0,
                    max_memories: 1000,
                    max_api_keys: 3,
                }
            });
        } catch (e) {
            console.error('Failed to fetch subscription', e);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-gray-500 text-sm">Loading...</div>;
    }

    const planName = subscription?.plan?.name || 'Free';
    const isActive = subscription?.status === 'active' || subscription?.status === 'ACTIVE';

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Your Plan</h3>
                    <p className="text-gray-400 text-sm">You are on the <span className="text-cyan-400 font-bold">{planName} Plan</span></p>
                </div>
                <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-wider">
                    {isActive ? 'Active' : planName}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 bg-cyan-500/10 rounded-bl-xl border-l border-b border-cyan-500/20">
                        <Check className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                            <Zap className="w-5 h-5 text-cyan-400" />
                        </div>
                        <h4 className="text-lg font-bold text-white">{planName} Plan</h4>
                    </div>
                    <ul className="space-y-3 mb-6">
                        {[
                            `${subscription?.plan?.max_memories?.toLocaleString() || '1,000'} Memories`,
                            `${subscription?.plan?.max_api_keys || 3} API Keys`,
                            planName !== 'Free' ? 'Advanced Analytics' : 'Basic Analytics',
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-cyan-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    {planName === 'Free' && (
                        <button
                            onClick={() => router.push('/pricing')}
                            className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-colors"
                        >
                            Upgrade to Team
                        </button>
                    )}
                </div>

                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col justify-center items-center text-center opacity-50 hover:opacity-100 transition-opacity">
                    <CreditCard className="w-12 h-12 text-gray-600 mb-4" />
                    <h4 className="text-lg font-bold text-white mb-2">Payment Method</h4>
                    <p className="text-gray-400 text-sm mb-4">No payment method connected</p>
                    <button
                        disabled
                        className="text-sm text-zinc-500 font-bold cursor-not-allowed"
                    >
                        Coming soon
                    </button>
                </div>
            </div>
        </div>
    );
}
