
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { PricingCard } from '@/components/marketing/PricingCard';

export default function PricingPage() {
    const [loading, setLoading] = useState<string | null>(null);
    const router = useRouter();

    const handleSubscribe = async (planId: string) => {
        try {
            if (planId === 'free') {
                router.push('/dashboard');
                return;
            }

            setLoading(planId);
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                router.push('/login');
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/payment/create-subscription`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({ planId }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({ error: 'Unknown error' }));
                throw new Error(errData.error || errData.message || 'Failed to create subscription');
            }

            const { approvalUrl } = await res.json();
            window.location.href = approvalUrl;
        } catch (error: any) {
            console.error('Subscription Error:', error);
            alert(`Subscription Failed: ${error.message}`);
        } finally {
            setLoading(null);
        }
    };

    const plans = [
        {
            name: 'Starter',
            price: 'Free',
            features: ['5 Projects', 'Basic Analytics', 'Community Support'],
            planId: 'free',
            buttonText: 'Current Plan',
            highlight: false,
        },
        {
            name: 'Pro Creator',
            price: '$9',
            period: '/month',
            features: ['Unlimited Projects', 'Advanced Analytics', 'Priority Email Support', 'Automation Tools'],
            planId: 'P-PRO-CREATOR', // Maps to backend ID
            buttonText: 'Subscribe to Pro',
            highlight: true,
            badge: 'Most Popular'
        },
        {
            name: 'Business Plus',
            price: '$29',
            period: '/month',
            features: ['Team Accounts', 'API Access', 'White-label Export', 'Dedicated Support'],
            planId: 'P-BUSINESS-PLUS',
            buttonText: 'Subscribe to Business',
            highlight: false,
        },
    ];

    return (
        <div className="min-h-screen bg-black text-white py-20 px-4">
            <div className="max-w-6xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        Choose Your Plan
                    </h1>
                    <p className="text-xl text-gray-400">
                        Simple pricing for every stage of growth.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 w-full">
                    {plans.map((plan, i) => (
                        <PricingCard
                            key={plan.name}
                            tier={plan}
                            // Assign variants: 0->starter, 1->pro, 2->business
                            variant={i === 0 ? 'starter' : i === 1 ? 'pro' : 'business'}
                            highlighted={plan.highlight}
                            onSubscribe={handleSubscribe}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
