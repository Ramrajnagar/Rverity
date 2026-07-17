import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import RverityLogo from "../branding/RverityLogo";

export default function Footer() {
    return (
        <footer className="border-t border-white/[0.06] bg-black">
            <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <RverityLogo />
                        </Link>
                        <p className="text-sm text-neutral-500 mb-4 max-w-xs">
                            The operating system for your digital soul.
                        </p>
                        <div className="flex gap-3">
                            <Link href="#" className="text-neutral-600 hover:text-white transition-colors duration-150">
                                <Github className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="text-neutral-600 hover:text-white transition-colors duration-150">
                                <Twitter className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">Product</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/signup" className="text-sm text-neutral-400 hover:text-white transition-colors duration-150">Download</Link></li>
                            <li><Link href="/pricing" className="text-sm text-neutral-400 hover:text-white transition-colors duration-150">Pricing</Link></li>
                            <li><Link href="/features/graph" className="text-sm text-neutral-400 hover:text-white transition-colors duration-150">Knowledge Graph</Link></li>
                            <li><Link href="/integrations" className="text-sm text-neutral-400 hover:text-white transition-colors duration-150">Integrations</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">Resources</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/docs" className="text-sm text-neutral-400 hover:text-white transition-colors duration-150">Documentation</Link></li>
                            <li><Link href="/manifesto" className="text-sm text-neutral-400 hover:text-white transition-colors duration-150">Manifesto</Link></li>
                            <li><Link href="#" className="text-sm text-neutral-400 hover:text-white transition-colors duration-150">Community</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-4">Legal</h4>
                        <ul className="space-y-2.5">
                            <li><Link href="/security" className="text-sm text-neutral-400 hover:text-white transition-colors duration-150">Security & Privacy</Link></li>
                            <li><Link href="/terms" className="text-sm text-neutral-400 hover:text-white transition-colors duration-150">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/[0.06] text-center">
                    <p className="text-xs text-neutral-600">
                        &copy; {new Date().getFullYear()} Rverity Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
