"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "I replaced my bookmarks, notes app, and Notion workspace with Rverity. Everything just connects now.",
        author: "Sarah Chen",
        role: "Staff Engineer at Vercel",
        avatar: "SC",
    },
    {
        quote: "We onboarded our entire backend team. New hires get context in minutes instead of weeks.",
        author: "Marcus Rivera",
        role: "CTO at PlanGrid",
        avatar: "MR",
    },
    {
        quote: "The API is beautiful. Three lines of code and my VS Code history feeds into a queryable knowledge graph.",
        author: "Aisha Patel",
        role: "Senior Dev at Stripe",
        avatar: "AP",
    },
    {
        quote: "Finally, something that respects my data. Local-first, encrypted, and I can self-host. Sold.",
        author: "Jake Morrison",
        role: "Indie Developer",
        avatar: "JM",
    },
    {
        quote: "Our team's tribal knowledge went from Slack messages nobody can find to a living, searchable graph.",
        author: "Elena Volkov",
        role: "Engineering Lead at Linear",
        avatar: "EV",
    },
    {
        quote: "I built a custom integration with the SDK in 20 minutes. The developer experience is unreal.",
        author: "Tomás García",
        role: "Founding Engineer at Replit",
        avatar: "TG",
    },
];

const colors = ["#00A3FF", "#44FFA4", "#A78BFA", "#FFCA16", "#E01E5A", "#FF6B35"];

export default function TestimonialsSection() {
    return (
        <section className="py-24 md:py-32 border-t border-white/[0.06]" id="testimonials">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-16 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold tracking-[-0.02em] text-white font-display">
                            Developers love Rverity
                        </h2>
                        <p className="mt-3 text-neutral-400 max-w-lg mx-auto text-base">
                            Don&apos;t take our word for it. Here&apos;s what the community is building with.
                        </p>
                    </motion.div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className="flex flex-col p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.10] transition-all duration-150"
                        >
                            <p className="text-sm text-neutral-300 leading-relaxed flex-1 mb-6">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-3">
                                <div
                                    className="h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold text-black/80 shrink-0"
                                    style={{ backgroundColor: colors[i % colors.length] }}
                                >
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-white">{t.author}</div>
                                    <div className="text-xs text-neutral-500">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
