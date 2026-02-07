
'use client';

import dynamic from 'next/dynamic';
import { AuthForm } from '@/components/auth/AuthForm';
import NeuralBackground from '@/components/ui/3d/NeuralBackground';

export default function SignupPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
            <NeuralBackground />
            <div className="relative z-10 w-full max-w-md p-4">
                <AuthForm type="signup" />
            </div>
        </div>
    );
}
