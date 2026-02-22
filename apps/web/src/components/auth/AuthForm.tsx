
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface AuthFormProps {
    type: 'login' | 'signup';
}

export function AuthForm({ type }: AuthFormProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (type === 'signup') {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;

                if (data.session) {
                    // Use window.location for hard redirect to ensure cookies are set
                    window.location.href = '/dashboard';
                } else {
                    alert('Account created! Please check your email to verify.');
                    setLoading(false);
                }
            } else {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;

                // Verify session is set
                if (data.session) {
                    // Use window.location for hard redirect to ensure cookies are set
                    window.location.href = '/dashboard';
                } else {
                    throw new Error('Login failed - no session created');
                }
            }
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'github' | 'azure') => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signInWithOAuth({
                provider: provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
            if (error) throw error;
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-8 space-y-6 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
            <div className="text-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    {type === 'login' ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="mt-2 text-gray-400">
                    {type === 'login'
                        ? 'Enter your credentials to access your memory.'
                        : 'Start your journey with Rverity.'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                    <div className="p-3 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg">
                        {error}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email</label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-500 transition-all"
                            placeholder="you@example.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Password</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-500 transition-all"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        type === 'login' ? 'Sign In' : 'Sign Up'
                    )}
                </button>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-black/50 text-gray-500">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <button
                        type="button"
                        onClick={() => handleSocialLogin('github')}
                        className="flex items-center justify-center px-4 py-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors gap-2"
                    >
                        <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="text-white font-medium">Continue with GitHub</span>
                    </button>
                </div>
            </form>

            <div className="text-center text-sm text-gray-400">
                {type === 'login' ? (
                    <>
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-blue-400 hover:text-blue-300 transition-colors">
                            Sign up
                        </Link>
                    </>
                ) : (
                    <>
                        Already have an account?{' '}
                        <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
                            Sign in
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
