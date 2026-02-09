'use client';

import { useState } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#05050A]">
            <AppSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className={cn(
                "flex-1 p-4 md:p-8 overflow-y-auto transition-all duration-300",
                "md:ml-64" // Desktop: always offset by sidebar width
            )}>
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="md:hidden mb-6 p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {children}
            </main>
        </div>
    );
}
