"use client";

import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { Shield, Lock, Server, Key, FileCheck, EyeOff } from "lucide-react";

export default function SecurityPage() {
    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

            <Section className="pt-32 pb-20 relative z-10">
                <div className="text-center max-w-4xl mx-auto px-6 mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono mb-8"
                    >
                        <Shield className="w-3 h-3" />
                        SECURITY_PROTOCOL :: ACTIVE
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 tracking-tight">
                        ZERO <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">TRUST</span>
                    </h1>

                    <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
                        We assume the network is hostile. We assume the cloud is compromised.
                        Rverity is built on a "Verify, Don't Trust" architecture.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
                    <SecurityCard
                        icon={Lock}
                        title="AES-256 Encryption"
                        description="Your local database is encrypted at rest using industry-standard AES-256. Even if your device is stolen, your graph remains unreadable without your master key."
                        delay={0.1}
                    />
                    <SecurityCard
                        icon={Key}
                        title="Local-Only Key Management"
                        description="We never see your private keys. They are generated on your device and never leave your hardware enclave. Authentication happens locally first."
                        delay={0.2}
                    />
                    <SecurityCard
                        icon={EyeOff}
                        title="Zero-Knowledge Sync"
                        description="If you choose to sync via our cloud, data is encrypted *before* it leaves your device. We store blobs of random noise. We literally cannot read your data."
                        delay={0.3}
                    />
                    <SecurityCard
                        icon={Server}
                        title="Self-Hosting Capable"
                        description="Don't trust our infrastructure? Deploy the Rverity sync server as a Docker container on your own VP or home lab. Full sovereignty."
                        delay={0.4}
                    />
                </div>
            </Section>
        </main>
    )
}

function SecurityCard({ icon: Icon, title, description, delay }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-red-500/30 transition-all group relative overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="h-12 w-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display group-hover:text-red-300 transition-colors">{title}</h3>
                <p className="text-zinc-400 leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    )
}
