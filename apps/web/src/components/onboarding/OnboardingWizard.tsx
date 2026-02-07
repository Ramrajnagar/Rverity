"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronRight, Code2, Globe, ArrowRight, Loader2, Copy } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const steps = [
    { id: "welcome", title: "Welcome" },
    { id: "connect", title: "Connect Tool" },
    { id: "verify", title: "Verify" },
    { id: "complete", title: "Complete" },
];

export default function OnboardingWizard() {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedTool, setSelectedTool] = useState<"vscode" | "browser" | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));

    const handleVerify = () => {
        setIsVerifying(true);
        // Simulate verification check
        setTimeout(() => {
            setIsVerifying(false);
            setIsVerified(true);
        }, 2000);
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="flex justify-between mb-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -z-10 -translate-y-1/2 rounded-full" />
                {steps.map((step, i) => (
                    <div key={step.id} className="flex flex-col items-center gap-2 bg-black px-2">
                        <div
                            className={cn(
                                "h-8 w-8 rounded-full flex items-center justify-center border transition-all duration-300",
                                i <= currentStep
                                    ? "bg-emerald-500 border-emerald-500 text-black"
                                    : "bg-black border-white/20 text-zinc-500"
                            )}
                        >
                            {i < currentStep ? <Check className="h-4 w-4" /> : <span>{i + 1}</span>}
                        </div>
                        <span
                            className={cn(
                                "text-xs font-medium transition-colors",
                                i <= currentStep ? "text-emerald-500" : "text-zinc-600"
                            )}
                        >
                            {step.title}
                        </span>
                    </div>
                ))}
            </div>

            {/* Content Area */}
            <div className="bg-[#0A0A0E] border border-white/10 rounded-2xl p-8 min-h-[400px] flex flex-col">
                <AnimatePresence mode="wait">
                    {currentStep === 0 && (
                        <motion.div
                            key="welcome"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-1 flex flex-col items-center text-center justify-center"
                        >
                            <div className="h-16 w-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6">
                                <Check className="h-8 w-8 text-black" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Welcome to Rverity</h2>
                            <p className="text-zinc-400 max-w-md mb-8">
                                Your second brain is ready to be initialized. Let's connect your first data source to start building your knowledge graph.
                            </p>
                            <button
                                onClick={nextStep}
                                className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors"
                            >
                                Let's Go <ArrowRight className="h-4 w-4" />
                            </button>
                        </motion.div>
                    )}

                    {currentStep === 1 && (
                        <motion.div
                            key="connect"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-1"
                        >
                            <h2 className="text-2xl font-bold text-white mb-2">Choose a Source</h2>
                            <p className="text-zinc-400 mb-8">Where do you do most of your work?</p>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <button
                                    onClick={() => setSelectedTool("vscode")}
                                    className={cn(
                                        "p-6 rounded-xl border flex flex-col items-center gap-4 transition-all hover:bg-white/5",
                                        selectedTool === "vscode"
                                            ? "border-emerald-500 bg-emerald-500/10"
                                            : "border-white/10 bg-white/5"
                                    )}
                                >
                                    <Code2 className="h-10 w-10 text-blue-400" />
                                    <span className="font-semibold text-white">VS Code</span>
                                </button>

                                <button
                                    onClick={() => setSelectedTool("browser")}
                                    className={cn(
                                        "p-6 rounded-xl border flex flex-col items-center gap-4 transition-all hover:bg-white/5",
                                        selectedTool === "browser"
                                            ? "border-emerald-500 bg-emerald-500/10"
                                            : "border-white/10 bg-white/5"
                                    )}
                                >
                                    <Globe className="h-10 w-10 text-yellow-400" />
                                    <span className="font-semibold text-white">Browser</span>
                                </button>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    onClick={nextStep}
                                    disabled={!selectedTool}
                                    className="px-6 py-2 bg-emerald-500 text-black font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-400"
                                >
                                    Continue
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 2 && (
                        <motion.div
                            key="verify"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-1"
                        >
                            <h2 className="text-2xl font-bold text-white mb-2">Install & Verify</h2>
                            {selectedTool === "vscode" ? (
                                <div className="mb-8">
                                    <p className="text-zinc-400 mb-4">Run this command in your VS Code terminal:</p>
                                    <div className="bg-black border border-white/10 rounded-lg p-4 flex items-center justify-between font-mono text-sm text-emerald-400 mb-6">
                                        <span>code --install-extension rverity.vscode</span>
                                        <Copy className="h-4 w-4 text-zinc-500 cursor-pointer hover:text-white" />
                                    </div>
                                </div>
                            ) : (
                                <div className="mb-8">
                                    <p className="text-zinc-400 mb-4">Install the extension from the Chrome Web Store:</p>
                                    <Link href="#" className="inline-flex items-center text-blue-400 hover:underline mb-6">
                                        Open Chrome Web Store <ArrowRight className="ml-1 h-3 w-3" />
                                    </Link>
                                </div>
                            )}

                            <div className="bg-zinc-900 rounded-xl p-6 text-center border border-white/5">
                                {!isVerified ? (
                                    isVerifying ? (
                                        <div className="flex flex-col items-center">
                                            <Loader2 className="h-8 w-8 text-emerald-500 animate-spin mb-2" />
                                            <p className="text-sm text-zinc-400">Listening for connection...</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <div className="h-2 w-2 bg-red-500 rounded-full mb-2 animate-pulse" />
                                            <p className="text-sm text-zinc-500 mb-4">Not connected yet</p>
                                            <button onClick={handleVerify} className="text-sm text-white underline">Check again</button>
                                        </div>
                                    )
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <div className="h-12 w-12 bg-emerald-500/20 rounded-full flex items-center justify-center mb-2">
                                            <Check className="h-6 w-6 text-emerald-500" />
                                        </div>
                                        <p className="text-white font-medium">Successfully Connected!</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between mt-8">
                                <button onClick={() => setCurrentStep(1)} className="text-zinc-500 hover:text-white">Back</button>
                                <button
                                    onClick={nextStep}
                                    disabled={!isVerified}
                                    className="px-6 py-2 bg-emerald-500 text-black font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Finish
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {currentStep === 3 && (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-1 flex flex-col items-center text-center justify-center"
                        >
                            <h2 className="text-3xl font-bold text-white mb-4">You're all set!</h2>
                            <p className="text-zinc-400 max-w-md mb-8">
                                Rverity is now active in the background. As you work, your knowledge graph will automatically populate.
                            </p>
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors"
                            >
                                Go to Dashboard <ArrowRight className="h-4 w-4" />
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
