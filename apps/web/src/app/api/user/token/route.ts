import { ApiKeyService } from '@/lib/api-keys';
import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function GET(request: Request) {
    try {
        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll();
                    },
                    setAll(cookiesToSet) {
                        try {
                            // cookieStore.set(name, value, options) - Read Only in this context usually, but required for auth
                        } catch {
                            // Ignore
                        }
                    },
                },
            }
        );

        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = session.user.id;

        // Generate a new API Key for the extension
        // We cannot retrieve existing raw keys as they are hashed.
        // For a seamless flow, we generate a new dedicated key.

        try {
            const keyData = await ApiKeyService.createKey(userId, `VS Code Extension (${new Date().toISOString().split('T')[0]})`);
            return NextResponse.json({ token: keyData.key });
        } catch (err: any) {
            console.error('Error creating API key:', err);
            return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 });
        }

    } catch (error) {
        console.error('Error in token route:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
