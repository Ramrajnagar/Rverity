import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
    icon: LucideIcon;
    title: string;
    description: string;
    actionLabel: string;
    actionLink: string;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionLink }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white/5 rounded-xl border border-white/10 border-dashed">
            <div className="h-12 w-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <Icon className="h-6 w-6 text-zinc-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
            <p className="text-sm text-zinc-400 max-w-xs mb-6">{description}</p>
            <Link
                href={actionLink}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-medium text-sm rounded-lg transition-colors"
            >
                {actionLabel}
            </Link>
        </div>
    );
}
