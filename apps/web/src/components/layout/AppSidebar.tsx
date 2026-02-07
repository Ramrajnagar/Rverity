'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Brain, Settings, Database, LogOut, Moon, Sun, Monitor, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export function AppSidebar() {
    const pathname = usePathname();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) setUser(session.user);
        };
        getUser();
    }, []);

    const isActive = (path: string) => pathname?.startsWith(path);

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 bg-[#0A0A0E] border-r border-white/5 flex flex-col z-50">
            {/* Logo Area */}
            <div className="h-16 flex items-center px-6 border-b border-white/5 bg-black/20 backdrop-blur-xl">
                <Brain className="w-6 h-6 text-cyan-400 mr-2" />
                <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                    Rverity
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
                <div className="text-xs font-semibold text-gray-500 px-3 mb-2 uppercase tracking-wider">Platform</div>

                <SidebarItem
                    href="/dashboard"
                    icon={Activity}
                    label="Live Activity"
                    active={pathname === '/dashboard'}
                />
                <SidebarItem
                    href="/graph"
                    icon={Database}
                    label="Knowledge Graph"
                    active={isActive('/graph')}
                />

                <div className="text-xs font-semibold text-gray-500 px-3 mt-8 mb-2 uppercase tracking-wider">Configuration</div>

                <SidebarItem
                    href="/settings"
                    icon={Settings}
                    label="Settings"
                    active={isActive('/settings')}
                />
            </nav>

            {/* User Profile Section */}
            <div className="p-4 border-t border-white/5 bg-[#08080C]">
                <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 p-[1px]">
                        <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                            <User className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                            {/* <img src="user-avatar.jpg" alt="User" /> */}
                        </div>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                            {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">Starter Plan</p>
                    </div>
                    <Link href="/settings">
                        <Settings className="w-4 h-4 text-gray-600 group-hover:text-gray-400" />
                    </Link>
                </div>

                <div className="mt-3 flex items-center justify-between px-1">
                    <p className="text-[10px] text-gray-600">v1.2.0-beta</p>
                    <button
                        onClick={async () => {
                            // Clear supabase cookies/tokens
                            await supabase.auth.signOut();
                            window.location.href = '/login';
                        }}
                        className="text-gray-600 hover:text-red-400 transition-colors"
                        title="Logout"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </aside>
    );
}

function SidebarItem({ href, icon: Icon, label, active }: { href: string, icon: any, label: string, active: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${active
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
        >
            {active && (
                <motion.div
                    layoutId="active-sidebar"
                    className="absolute left-0 w-1 h-6 bg-cyan-500 rounded-r-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />
            )}
            <Icon className={`w-5 h-5 ${active ? 'text-cyan-400' : 'text-gray-500 group-hover:text-gray-300'}`} />
            <span className="font-medium text-sm">{label}</span>
        </Link>
    );
}
