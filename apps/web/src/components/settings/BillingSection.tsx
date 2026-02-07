'use client';

import { Check, CreditCard, Zap } from 'lucide-react';

export function BillingSection() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div>
                    <h3 className="text-lg font-bold text-white mb-1">Your Plan</h3>
                    <p className="text-gray-400 text-sm">You are on the <span className="text-cyan-400 font-bold">Starter Plan</span></p>
                </div>
                <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-wider">
                    Active
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
                        <h4 className="text-lg font-bold text-white">Starter Plan</h4>
                    </div>
                    <ul className="space-y-3 mb-6">
                        {['5 Projects', 'Basic Analytics', 'Community Support'].map((item) => (
                            <li key={item} className="flex items-center gap-2 text-sm text-gray-400">
                                <Check className="w-4 h-4 text-cyan-500" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <button className="w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-colors">
                        Upgrade Plan
                    </button>
                </div>

                <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] flex flex-col justify-center items-center text-center opacity-50 hover:opacity-100 transition-opacity">
                    <CreditCard className="w-12 h-12 text-gray-600 mb-4" />
                    <h4 className="text-lg font-bold text-white mb-2">Payment Method</h4>
                    <p className="text-gray-400 text-sm mb-4">No payment method connected</p>
                    <button className="text-sm text-cyan-400 hover:text-cyan-300 font-bold">
                        Add Payment Method
                    </button>
                </div>
            </div>
        </div>
    );
}
