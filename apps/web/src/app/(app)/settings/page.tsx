'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { BillingSection } from '@/components/settings/BillingSection';
import { IntegrationsSection } from '@/components/settings/IntegrationsSection';
import { ApiKeyManager } from '@/components/settings/ApiKeyManager';
import { motion } from 'framer-motion';
import { Save, User, Key, Shield, Bell, Link2 } from 'lucide-react'; // Added Link2 for Integrations icon if needed

export default function SettingsPage() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) setUser(session.user);
        };
        getUser();
    }, []);

    const initial = user?.user_metadata?.full_name?.[0] || user?.email?.[0] || '?';

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Settings</h1>
                <p className="text-gray-400 mt-2">Manage your profile and preferences</p>
            </header>

            {/* Profile Section */}
            <section className="bg-[#0F0F16] border border-white/5 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
                    <User className="w-5 h-5 text-cyan-400" />
                    <h2 className="text-lg font-semibold text-white">Public Profile</h2>
                </div>

                <div className="space-y-6">
                    <div className="flex items-start gap-6">
                        <div className="w-24 h-24 rounded-full bg-black border border-white/10 flex items-center justify-center relative group cursor-pointer overflow-hidden">
                            {/* Placeholder for avatar upload */}
                            <span className="text-2xl font-bold text-gray-600 group-hover:text-gray-400 capitalize">{initial}</span>
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs text-white">Change</span>
                            </div>
                        </div>
                        <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {user && (
                                    <>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">First Name</label>
                                            <input type="text" defaultValue={user?.user_metadata?.full_name?.split(' ')?.[0] || ''} placeholder="Your First Name" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 transition-colors" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Display Name</label>
                                            <input type="text" defaultValue={user?.user_metadata?.full_name || user?.email?.split('@')[0] || ''} placeholder="Your Display Name" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 transition-colors" />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Bio</label>
                                <textarea rows={3} defaultValue={user?.user_metadata?.bio || "Rverity Pioneer"} placeholder="Tell us about yourself" className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500/50 transition-colors resize-none" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button className="flex items-center gap-2 px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-colors">
                        <Save className="w-4 h-4" />
                        Save Changes
                    </button>
                </div>
            </section>

            {/* Billing Section */}
            <section className="bg-[#0F0F16] border border-white/5 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <h2 className="text-lg font-semibold text-white">Billing & Plan</h2>
                </div>
                <BillingSection />
            </section>

            {/* Integrations Section */}
            <section className="bg-[#0F0F16] border border-white/5 rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                    <Link2 className="w-5 h-5 text-pink-400" />
                    <h2 className="text-lg font-semibold text-white">Integrations</h2>
                </div>
                <IntegrationsSection />
            </section>

            {/* API Keys Section */}
            <section className="bg-[#0F0F16] border border-white/5 rounded-2xl p-6 shadow-xl opacity-100 transition-opacity">
                <div className="flex items-center gap-4 mb-6">
                    <Key className="w-5 h-5 text-purple-400" />
                    <h2 className="text-lg font-semibold text-white">API Credentials</h2>
                </div>
                <ApiKeyManager />
            </section>
        </div>
    );
}
