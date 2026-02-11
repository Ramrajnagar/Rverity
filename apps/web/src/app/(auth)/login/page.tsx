'use client';

import { AuthForm } from '@/components/auth/AuthForm';
import MemoryNodesBackground from '@/components/auth/MemoryNodesBackground';

export default function LoginPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            <MemoryNodesBackground />
            <div className="relative z-10 w-full max-w-md p-4">
                <AuthForm type="login" />
            </div>
        </div>
    );
}
