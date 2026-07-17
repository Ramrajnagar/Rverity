"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function PricingPreview() {
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

            const res = await fetch('/v1/payment/create-subscription', {
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
            tier: "Free",
            price: "0",
            period: "forever",
            description: "For individual developers exploring Rverity.",
            features: [
                "1,000 memories",
                "VS Code + Chrome extensions",
                "Personal knowledge graph",
                "Semantic search",
                "Community support",
            ],
            recommended: false,
            planId: "free",
            buttonText: "Start for free",
        },
        {
            tier: "Team",
            price: "12",
            period: "/seat/mo",
            description: "For teams that share context and build together.",
            features: [
                "Unlimited memories",
                "Shared knowledge graphs",
                "Team workspace",
                "API access + webhooks",
                "Priority support",
                "Admin dashboard",
            ],
            recommended: true,
            planId: "P-TEAM",
            buttonText: "Start team trial",
        },
        {
            tier: "Enterprise",
            price: "Custom",
            period: "",
            description: "For organizations with custom requirements.",
            features: [
                "Everything in Team",
                "Self-hosted deployment",
                "SSO / SAML",
                "Custom integrations",
                "Dedicated success manager",
                "SLA guarantee",
            ],
            recommended: false,
            planId: "enterprise",
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
                            Free for you. Paid for teams.
                        </h2>
                        <p className="mt-3 text-neutral-400 max-w-lg mx-auto text-base">
                            Start free as an individual. Upgrade when your team needs shared context.
                        </p>
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
                                    {plan.price !== "Custom" && (
                                        <span className="text-4xl font-bold tracking-tight text-white">
                                            ${plan.price}
                                        </span>
                                    )}
                                    {plan.price === "Custom" && (
                                        <span className="text-4xl font-bold tracking-tight text-white">
                                            Custom
                                        </span>
                                    )}
                                    {plan.period && (
                                        <span className="ml-1.5 text-sm text-neutral-500">
                                            {plan.period}
                                        </span>
                                    )}
                                </div>
                                <p className="mt-2 text-sm text-neutral-500">
                                    {plan.description}
                                </p>
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
