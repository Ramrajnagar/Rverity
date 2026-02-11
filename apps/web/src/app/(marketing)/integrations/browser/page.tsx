"use client";

import IntegrationDetail from "@/components/landing/IntegrationDetail";
import { Chrome } from "lucide-react";

export default function BrowserPage() {
    return (
        <IntegrationDetail
            title="Chrome Extension"
            description="Capture your browsing context automatically. Build a searchable archive of every article, research session, and important webpage you visit."
            icon={Chrome}
            installCommand="Install from Chrome Web Store (coming soon) or load unpacked extension"
            downloadLink="https://github.com/Ramrajnagar/Rverity/tree/main/extensions/chrome"
            docsLink="/docs"
            features={[
                "Automatic page visit tracking capturing URL, title, and visit timestamp",
                "Bookmark capture on creation preserving your curated content collection",
                "Text selection capture with keyboard shortcut for highlighting important passages",
                "Modern popup interface with gradient design and intuitive navigation",
                "Real-time search functionality with instant results as you type",
                "Comprehensive settings page for fine-tuned control over capture behavior",
                "Privacy controls including domain blacklist and whitelist management",
                "Incognito mode respect ensuring private browsing stays private",
                "Offline queue storing up to 100 items locally during network interruptions",
                "Manifest V3 compliance following Chrome's latest extension standards",
                "Three keyboard shortcuts for quick access to core functionality",
                "Smart filtering with pattern-based exclusion rules"
            ]}
            setupSteps={[
                {
                    title: "Build Extension",
                    description: "Clone the repository and build the extension using npm. This compiles TypeScript and bundles all assets.",
                    code: "cd extensions/chrome\nnpm install\nnpm run build"
                },
                {
                    title: "Load in Chrome",
                    description: "Enable Developer Mode in Chrome's extension settings and load the unpacked extension from the dist folder.",
                    code: "chrome://extensions → Enable Developer Mode → Load Unpacked → Select dist folder"
                },
                {
                    title: "Configure Settings",
                    description: "Right-click the extension icon and select Options to configure your API key, endpoint, and privacy preferences.",
                    code: "Required: API Key, Endpoint URL\nOptional: Auto-capture toggles, Privacy filters, Exclusion patterns"
                }
            ]}
            codeExample={`// Keyboard Shortcuts
// Ctrl+Shift+K - Open extension popup
// Ctrl+Shift+F - Quick search across all captured pages
// Ctrl+Shift+S - Capture currently selected text

// Privacy Controls
// Blacklist specific domains to never capture
// Example: *.bank.com, *.private-site.com
// Whitelist mode to only capture specific domains
// Respect incognito mode setting

// Offline Support
// Extension queues up to 100 items locally
// Automatic synchronization when connection restored
// Visual indicator shows queue size and sync status`}
        />
    );
}
