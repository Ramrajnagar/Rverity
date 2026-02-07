
'use client';

import { X } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutCancelPage() {
    return (
        <div className="min-h-screen bg-[#05050A] text-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-purple-900/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-red-900/10 rounded-full blur-[120px]" />

            <div className="max-w-md w-full relative z-10">
                <div className="absolute inset-0 bg-red-500/5 blur-xl rounded-full" />
                <div className="relative p-8 rounded-3xl bg-[#0F0F16] border border-white/5 shadow-2xl backdrop-blur-xl">
                    <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 ring-1 ring-red-500/20">
                        <X className="w-8 h-8 text-red-500" />
                    </div>

                    <div className="text-center space-y-4 mb-8">
                        <h1 className="text-2xl font-bold text-white tracking-tight">Payment Cancelled</h1>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            The checkout process was cancelled. No charges were made to your account. You can retry whenever you're ready.
                        </p>
                    </div>

                    <div className="space-y-3">
                        <Link
                            href="/pricing"
                            className="block w-full py-4 px-6 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold text-center transition-all duration-300 shadow-lg shadow-red-900/20"
                        >
                            Return to Pricing
                        </Link>
                        <Link
                            href="/dashboard"
                            className="block w-full py-4 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-medium text-center transition-colors border border-white/10"
                        >
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
