
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, Loader2 } from 'lucide-react';
import Link from 'next/link';

function SuccessContent() {
    const searchParams = useSearchParams();
    const subscriptionId = searchParams.get('subscription_id');
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('success'); // verifiable via webhook

    return (
        <div className="max-w-md w-full relative z-10">
            <div className="absolute inset-0 bg-green-500/5 blur-xl rounded-full" />
            <div className="relative p-8 rounded-3xl bg-[#0F0F16] border border-white/5 shadow-2xl backdrop-blur-xl">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 ring-1 ring-green-500/20">
                    <Check className="w-8 h-8 text-green-500" />
                </div>

                <div className="text-center space-y-4 mb-8">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Payment Successful!</h1>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Your subscription has been successfully activated. You now have full access to all Rverity features.
                        {subscriptionId && <span className="block text-xs mt-3 font-mono text-cyan-400 bg-cyan-950/30 py-1 px-2 rounded border border-cyan-900/50 inline-block">ID: {subscriptionId}</span>}
                    </p>
                </div>

                <div className="space-y-3">
                    <Link
                        href="/dashboard"
                        className="block w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold text-center transition-all duration-300 shadow-lg shadow-cyan-900/20"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <div className="min-h-screen bg-[#05050A] text-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-[-20%] right-[-20%] w-[50%] h-[50%] bg-cyan-900/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-20%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px]" />

            <Suspense fallback={
                <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 text-cyan-500 animate-spin mb-4" />
                    <p className="text-zinc-500">Verifying payment...</p>
                </div>
            }>
                <SuccessContent />
            </Suspense>
        </div>
    );
}
