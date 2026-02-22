'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Activity, Brain, Settings, Database, LogOut, User, X, Upload, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AppSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            setUser(session.user);
            setAvatarUrl(session.user.user_metadata?.avatar_url || null);
        }
    };

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                return;
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}-${Math.random()}.${fileExt}`;
            const filePath = `avatars/${fileName}`;

            // Upload to Supabase Storage
            const { error: uploadError, data } = await supabase.storage
                .from('user-uploads')
                .upload(filePath, file, { upsert: true });

            if (uploadError) {
                throw uploadError;
            }

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('user-uploads')
                .getPublicUrl(filePath);

            // Update user metadata
            const { error: updateError } = await supabase.auth.updateUser({
                data: { avatar_url: publicUrl }
            });

            if (updateError) {
                throw updateError;
            }

            setAvatarUrl(publicUrl);
        } catch (error) {
            console.error('Error uploading avatar:', error);
            alert('Failed to upload image. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    const handleLogout = async () => {
        try {
            // Sign out from Supabase
            await supabase.auth.signOut();

            // Clear any local storage
            localStorage.clear();
            sessionStorage.clear();

            // Close sidebar
            onClose();

            // Redirect to home page with a full window reload to clear Next.js Route Cache
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const isActive = (path: string) => pathname?.startsWith(path);

    return (
        <>
            {/* Mobile Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={cn(
                "w-64 h-screen fixed left-0 top-0 bg-gradient-to-b from-[#0A0A0E] to-[#050208] border-r border-white/5 flex flex-col z-50 transition-transform duration-300 ease-in-out md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Logo Area */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-white/5 bg-black/20 backdrop-blur-xl">
                    <Link href="/dashboard" className="flex items-center group" onClick={onClose}>
                        <div className="relative">
                            <Brain className="w-7 h-7 text-purple-400 group-hover:text-purple-300 transition-colors" />
                            <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <span className="ml-3 font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-purple-300 transition-all">
                            Rverity
                        </span>
                    </Link>
                    {/* Mobile Close Button */}
                    <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto custom-scrollbar">
                    <div className="text-xs font-semibold text-gray-500 px-3 mb-3 uppercase tracking-wider">
                        Platform
                    </div>

                    <SidebarItem
                        href="/dashboard"
                        icon={Activity}
                        label="Dashboard"
                        active={pathname === '/dashboard'}
                        onClick={onClose}
                    />
                    <SidebarItem
                        href="/graph"
                        icon={Database}
                        label="Knowledge Graph"
                        active={isActive('/graph')}
                        onClick={onClose}
                    />

                    <div className="text-xs font-semibold text-gray-500 px-3 mt-8 mb-3 uppercase tracking-wider">
                        Settings
                    </div>

                    <SidebarItem
                        href="/settings"
                        icon={Settings}
                        label="Configuration"
                        active={isActive('/settings')}
                        onClick={onClose}
                    />
                </nav>

                {/* User Profile Section */}
                <div className="p-4 border-t border-white/5 bg-black/30 backdrop-blur-xl">
                    <div className="relative group">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all cursor-pointer">
                            {/* Avatar with upload */}
                            <div className="relative">
                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 p-[2px]">
                                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                                        {avatarUrl ? (
                                            <Image
                                                src={avatarUrl}
                                                alt="Profile"
                                                width={44}
                                                height={44}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                </div>
                                {/* Upload overlay */}
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    {uploading ? (
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <Camera className="w-4 h-4 text-white" />
                                    )}
                                </button>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                    className="hidden"
                                />
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate">
                                    {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {user?.email}
                                </p>
                            </div>

                            <Link href="/settings" onClick={onClose}>
                                <Settings className="w-4 h-4 text-gray-500 hover:text-gray-300 transition-colors" />
                            </Link>
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="w-full mt-3 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/30 transition-all group"
                    >
                        <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        <span className="text-sm font-medium">Sign Out</span>
                    </button>

                    <div className="mt-3 flex items-center justify-center">
                        <p className="text-[10px] text-gray-600">v2.0.0 • Rverity AI</p>
                    </div>
                </div>
            </aside>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(168, 85, 247, 0.4);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(168, 85, 247, 0.6);
                }
            `}</style>
        </>
    );
}

function SidebarItem({ href, icon: Icon, label, active, onClick }: {
    href: string;
    icon: any;
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                active
                    ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-400 border border-purple-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
            )}
        >
            {active && (
                <motion.div
                    layoutId="active-sidebar"
                    className="absolute left-0 w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
            )}
            <Icon className={cn(
                "w-5 h-5 transition-colors",
                active ? 'text-purple-400' : 'text-gray-500 group-hover:text-gray-300'
            )} />
            <span className="font-medium text-sm">{label}</span>
        </Link>
    );
}
