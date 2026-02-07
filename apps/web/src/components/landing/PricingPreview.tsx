"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import { Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import clsx from "clsx";

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
            buttonText: "Start for Free",
            theme: {
                border: "group-hover:border-cyan-500/50",
                shadow: "group-hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)]",
                text: "text-cyan-400",
                bg: "group-hover:bg-cyan-500/10",
                button: "hover:bg-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]",
                check: "text-cyan-400",
                checkBg: "bg-cyan-500/20",
            }
        },
        {
            tier: "Pro Creator",
            price: { monthly: "9", yearly: "90" },
            period: { monthly: "/mo", yearly: "/yr" },
            features: ["Unlimited Projects", "Advanced Analytics", "Priority Support", "Automation Tools"],
            recommended: true,
            planId: "P-PRO-CREATOR",
            buttonText: "Subscribe to Pro",
            theme: {
                border: "border-purple-500/50",
                shadow: "shadow-[0_0_40px_-10px_rgba(168,85,247,0.3)]",
                text: "text-purple-400",
                bg: "bg-purple-500/10",
                button: "bg-white text-black hover:bg-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]",
                check: "text-purple-400",
                checkBg: "bg-purple-500/20",
                badge: "from-purple-500 to-pink-500 shadow-purple-500/20"
            }
        },
        {
            tier: "Business Plus",
            price: { monthly: "29", yearly: "290" },
            period: { monthly: "/mo", yearly: "/yr" },
            features: ["Team Accounts", "API Access", "White-label Export", "Dedicated Success Manager"],
            recommended: false,
            planId: "P-BUSINESS-PLUS",
            buttonText: "Subscribe to Business",
            theme: {
                border: "group-hover:border-amber-500/50",
                shadow: "group-hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.3)]",
                text: "text-amber-400",
                bg: "group-hover:bg-amber-500/10",
                button: "hover:bg-amber-500 hover:shadow-[0_0_20px_rgba(245,158,11,0.5)]",
                check: "text-amber-400",
                checkBg: "bg-amber-500/20",
            }
        },
    ];

    return (
        <Section className="py-32 relative overflow-hidden" id="pricing">
            <div className="mb-20 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 font-display">
                    INVEST IN CLARITY
                </h2>
                <p className="text-zinc-400 max-w-xl mx-auto text-lg mb-8">
                    Stop paying for fragmentation. One subscription for your entire second brain.
                </p>

                {/* Toggle */}
                <div className="flex items-center justify-center gap-4">
                    <span className={`text-sm font-medium transition-colors ${billingCycle === "monthly" ? "text-white" : "text-zinc-500"}`}>Monthly</span>
                    <button
                        onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                        className="relative h-8 w-14 rounded-full bg-white/10 p-1 transition-colors hover:bg-white/20"
                    >
                        <motion.div
                            animate={{ x: billingCycle === "monthly" ? 0 : 24 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="h-6 w-6 rounded-full bg-primary shadow-lg"
                        />
                    </button>
                    <span className={`text-sm font-medium transition-colors ${billingCycle === "yearly" ? "text-white" : "text-zinc-500"}`}>
                        Yearly <span className="text-emerald-400 text-xs ml-1 font-bold">(Save 20%)</span>
                    </span>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto relative z-10 px-4 pt-4">
                {plans.map((plan, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        className={clsx(
                            "relative flex flex-col rounded-2xl border p-8 backdrop-blur-xl group transition-all duration-300 hover:-translate-y-2",
                            plan.recommended ? "bg-black/60" : "bg-black/40 border-white/10",
                            plan.theme.border,
                            plan.theme.shadow
                        )}
                    >
                        {plan.recommended && (
                            <>
                                <div className={`absolute inset-0 bg-gradient-to-b opacity-20 pointer-events-none rounded-2xl ${plan.theme.bg}`} />
                                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r px-4 py-1 text-xs font-bold text-white shadow-lg ${plan.theme.badge}`}>
                                    MOST POPULAR
                                </div>
                            </>
                        )}
                        {!plan.recommended && (
                            <div className={`absolute inset-0 bg-gradient-to-b from-transparent to-transparent opacity-0 transition-opacity duration-300 pointer-events-none rounded-2xl ${plan.theme.bg}`} />
                        )}

                        <div className="mb-8 relative z-10">
                            <h3 className={`text-lg font-bold uppercase tracking-wider ${plan.theme.text}`}>
                                {plan.tier}
                            </h3>
                            <div className="mt-4 flex items-baseline">
                                <span className="text-5xl font-bold text-white tracking-tighter">
                                    ${plan.price[billingCycle]}
                                </span>
                                <span className="ml-2 text-sm text-zinc-500 font-medium">
                                    {typeof plan.period === 'string' ? plan.period : plan.period[billingCycle]}
                                </span>
                            </div>
                        </div>

                        <ul className="mb-10 space-y-4 flex-1 relative z-10">
                            {plan.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3 text-sm text-zinc-300">
                                    <div className={`flex items-center justify-center h-5 w-5 rounded-full ${plan.theme.checkBg} ${plan.theme.check}`}>
                                        <Check className="h-3 w-3" />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            onClick={() => handleSubscribe(plan.planId)}
                            disabled={loading === plan.planId}
                            className={clsx(
                                "w-full rounded-xl px-6 py-4 font-bold text-sm transition-all duration-300 relative z-10 flex items-center justify-center gap-2",
                                plan.theme.button || "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
                            )}
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
        </Section>
    );
}
