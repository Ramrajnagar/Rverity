import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import RverityLogo from "../branding/RverityLogo";

export default function Footer() {
    return (
        <footer className="w-full border-t border-white/10 bg-black py-12 text-zinc-400">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 lg:grid-cols-4 lg:px-8">
                <div className="space-y-4">
                    <Link href="/" className="inline-block">
                        <RverityLogo />
                    </Link>
                    <p className="text-sm">
                        The absolute truth for your digital life.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="hover:text-white"><Github className="h-5 w-5" /></Link>
                        <Link href="#" className="hover:text-white"><Twitter className="h-5 w-5" /></Link>
                    </div>
                </div>

                <div>
                    <h4 className="mb-4 font-semibold text-white">Product</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/signup" className="hover:text-green-400">Download</Link></li>
                        <li><Link href="/pricing" className="hover:text-green-400">Pricing</Link></li>
                        <li><Link href="/manifesto" className="hover:text-green-400">Vision</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-4 font-semibold text-white">Resources</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/docs" className="hover:text-green-400">Documentation</Link></li>
                        <li><Link href="/graph" className="hover:text-green-400">Knowledge Graph</Link></li>
                        <li><Link href="/signup" className="hover:text-green-400">Community</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-4 font-semibold text-white">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/security" className="hover:text-green-400">Security & Privacy</Link></li>
                        <li><Link href="/" className="hover:text-green-400">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 text-center text-xs opacity-50">
                © {new Date().getFullYear()} Rverity Inc. All rights reserved.
            </div>
        </footer>
    );
}
