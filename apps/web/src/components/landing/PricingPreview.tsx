"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function PricingPreview() {
    const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
    const [loading, setLoading] = useState<string | null>(null);
    const router = useRouter();

    const handleSubscribe = async (planId: string) => {
        if (planId === "free") {
            router.push("/login");
            return;
        }

        try {
            setLoading(planId);
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                router.push("/login?redirect=pricing");
                return;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/payment/create-subscription`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.access_token}`,
                },
                body: JSON.stringify({ planId }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({ error: "Unknown error" }));
                throw new Error(errData.error || errData.message || "Failed to create subscription");
            }

            const { approvalUrl } = await res.json();
            if (approvalUrl) {
                window.location.href = approvalUrl;
            } else {
                throw new Error("No approval URL returned");
            }
        } catch (error: any) {
            console.error("Subscription Error:", error);
            alert(`Subscription Failed: ${error.message}`);
        } finally {
            setLoading(null);
        }
    };

    const plans = [
        {
            tier: "Starter",
            price: { monthly: "0", yearly: "0" },
            period: "/mo",
            features: ["5 Projects", "Basic Analytics", "Community Support", "1GB Storage"],
            recommended: false,
            planId: "free",
            buttonText: "Start for free",
        },
        {
            tier: "Pro",
            price: { monthly: "9", yearly: "90" },
            period: { monthly: "/mo", yearly: "/yr" },
            features: ["Unlimited Projects", "Advanced Analytics", "Priority Support", "Automation Tools"],
            recommended: true,
            planId: "P-PRO-CREATOR",
            buttonText: "Get started",
        },
        {
            tier: "Business",
            price: { monthly: "29", yearly: "290" },
            period: { monthly: "/mo", yearly: "/yr" },
            features: ["Team Accounts", "API Access", "White-label Export", "Dedicated Success Manager"],
            recommended: false,
            planId: "P-BUSINESS-PLUS",
            buttonText: "Contact sales",
        },
    ];

    return (
        <section className="py-24 md:py-32 border-t border-white/[0.06]" id="pricing">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-white font-display">
                            Simple pricing
                        </h2>
                        <p className="mt-3 text-neutral-400 max-w-lg mx-auto text-base">
                            Start free. Upgrade when you need more.
                        </p>

                        <div className="flex items-center justify-center gap-3 mt-8">
                            <span className={`text-sm font-medium transition-colors ${billingCycle === "monthly" ? "text-white" : "text-neutral-500"}`}>
                                Monthly
                            </span>
                            <button
                                onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                                className="relative h-6 w-11 rounded-full bg-white/[0.08] p-0.5 transition-colors hover:bg-white/[0.12]"
                            >
                                <motion.div
                                    animate={{ x: billingCycle === "monthly" ? 0 : 20 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    className="h-5 w-5 rounded-full bg-white"
                                />
                            </button>
                            <span className={`text-sm font-medium transition-colors ${billingCycle === "yearly" ? "text-white" : "text-neutral-500"}`}>
                                Yearly <span className="text-[#44FFA4] text-xs ml-1">(Save 20%)</span>
                            </span>
                        </div>
                    </motion.div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className={`relative flex flex-col rounded-xl border p-6 transition-all duration-150 ${
                                plan.recommended
                                    ? "bg-white/[0.04] border-[#00A3FF]/30"
                                    : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]"
                            }`}
                        >
                            {plan.recommended && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[11px] font-medium text-[#00A3FF] bg-[#00A3FF]/10 border border-[#00A3FF]/20 rounded-full">
                                    Most popular
                                </div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-neutral-400">{plan.tier}</h3>
                                <div className="mt-3 flex items-baseline">
                                    <span className="text-4xl font-bold tracking-tight text-white">
                                        ${plan.price[billingCycle]}
                                    </span>
                                    <span className="ml-1.5 text-sm text-neutral-500">
                                        {typeof plan.period === 'string' ? plan.period : plan.period[billingCycle]}
                                    </span>
                                </div>
                            </div>

                            <ul className="mb-8 space-y-2.5 flex-1">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center gap-2.5 text-sm text-neutral-400">
                                        <Check className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => handleSubscribe(plan.planId)}
                                disabled={loading === plan.planId}
                                className={`w-full rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-150 flex items-center justify-center gap-2 ${
                                    plan.recommended
                                        ? "bg-[#00A3FF] text-white hover:bg-[#008FE0]"
                                        : "bg-white/[0.06] text-neutral-300 hover:bg-white/[0.1] border border-white/[0.08]"
                                }`}
                            >
                                {loading === plan.planId ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    plan.buttonText
                                )}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
