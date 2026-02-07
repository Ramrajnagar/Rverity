'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function PricingCard({
    tier,
    variant = 'starter',
    highlighted = false,
    onSubscribe
}: {
    tier: any,
    variant?: 'starter' | 'pro' | 'business',
    highlighted?: boolean,
    onSubscribe?: (planId: string) => void
}) {

    const themes = {
        starter: {
            border: 'border-white/10 hover:border-white/20',
            bg: 'bg-black/40',
            glow: '',
            text: 'text-gray-400',
            button: 'bg-white/10 hover:bg-white/20 text-white',
            icon: 'bg-white/10 text-gray-400'
        },
        pro: {
            border: 'border-cyan-500/50',
            bg: 'bg-cyan-950/10',
            glow: 'shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)]',
            text: 'text-cyan-400',
            button: 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)]',
            icon: 'bg-cyan-500/20 text-cyan-400'
        },
        business: {
            border: 'border-purple-500/50',
            bg: 'bg-purple-950/10',
            glow: 'shadow-[0_0_50px_-12px_rgba(168,85,247,0.3)]',
            text: 'text-purple-400',
            // gradients for business
            button: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-[0_0_20px_-5px_rgba(168,85,247,0.5)]',
            icon: 'bg-purple-500/20 text-purple-400'
        }
    };

    const theme = themes[variant] || themes.starter;

    return (
        <motion.div
            whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
            className={`
                relative p-8 rounded-3xl border backdrop-blur-xl overflow-hidden transition-all duration-300
                ${theme.border} ${theme.bg} ${theme.glow}
            `}
        >
            {highlighted && (
                <div className="absolute top-0 right-0 p-3">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-950 bg-cyan-400 px-3 py-1 rounded-full">
                        Popular
                    </div>
                </div>
            )}

            <div className="mb-8">
                <h3 className={`text-lg font-display font-medium ${theme.text}`}>
                    {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-4xl font-display font-bold text-white">{tier.price}</span>
                    <span className="text-sm text-gray-500">/month</span>
                </div>
                <p className="mt-4 text-sm text-gray-400 leading-relaxed font-light">
                    {tier.description}
                </p>
            </div>

            <ul className="space-y-4 mb-8">
                {tier.features.map((feature: string) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                        <div className={`mt-0.5 rounded-full p-0.5 ${theme.icon}`}>
                            <Check className="w-3 h-3" />
                        </div>
                        {feature}
                    </li>
                ))}
            </ul>

            <button
                onClick={() => onSubscribe?.(tier.planId)}
                className={`
                w-full py-4 rounded-xl font-medium transition-all duration-300
                ${theme.button}
            `}>
                {tier.buttonText || 'Get Started'}
            </button>
        </motion.div>
    );
}
