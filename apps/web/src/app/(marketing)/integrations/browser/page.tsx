"use client";

import IntegrationDetail from "@/components/landing/IntegrationDetail";
import { Chrome } from "lucide-react";

export default function BrowserPage() {
    return (
        <IntegrationDetail
            title="Chrome & Edge"
            description="Turn your browsing history into a searchable knowledge base. Capture documentation, StackOverflow answers, and articles with one click."
            icon={Chrome}
            downloadLink="#"
            docsLink="/docs/browser"
            features={[
                "Automatic URL categorization",
                "Capture selected text to graph",
                "Highlight persistence even if page follows a redirect",
                "Privacy mode: Blacklist banking and social media sites",
                "Syncs open tabs to your Dashboard instantly"
            ]}
        />
    );
}
