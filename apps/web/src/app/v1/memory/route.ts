import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { redis } from '@/lib/redis';
import { ApiKeyService } from '@/lib/api-keys';
import { supabaseAdmin } from '@/lib/supabase-admin';

const createMemorySchema = z.object({
    content: z.string().min(1, 'Content is required'),
    tags: z.array(z.string()).optional(),
    source: z.string().optional().default('api'),
});

export async function POST(request: Request) {
    try {
        let user: { id: string } | null = null;
        let supabase: any;

        // 1. Check for API Key first (Authorization header)
        const authHeader = request.headers.get('Authorization');
        if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const userId = await ApiKeyService.verifyKey(token);
            if (userId) {
                user = { id: userId };
                supabase = supabaseAdmin;
            }
        }

        // 2. Fallback to Cookie Auth if no valid API key
        if (!user) {
            const cookieStore = await cookies();
            supabase = createServerClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                {
                    cookies: {
                        getAll() {
                            return cookieStore.getAll()
                        },
                        setAll(cookiesToSet) {
                            try {
                                cookiesToSet.forEach(({ name, value, options }) =>
                                    cookieStore.set(name, value, options)
                                )
                            } catch { }
                        },
                    },
                }
            );
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                user = session.user;
            }
        }

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const body = await request.json();
        const { content, tags = [], source = 'api' } = createMemorySchema.parse(body);

        console.log(`[API] addMemory. User: ${user.id}, Source: ${source}`);

        const memory = {
            id: crypto.randomUUID(),
            content,
            source,
            tags,
            timestamp: new Date().toISOString(),
            importance: 0.5,
            vectorId: null,
        };

        // 1. Store in Redis for short-term context
        try {
            if (redis) {
                await redis.lpush(`user:${user.id}:context`, JSON.stringify(memory));
                await redis.ltrim(`user:${user.id}:context`, 0, 50); // Keep last 50 items
            }
        } catch (e) {
            console.warn('Redis unavailable, skipping cache', e);
        }

        // 2. Store in Supabase for persistence
        let persistentId: string | undefined;
        let persistentData: any = null;

        try {
            const { data, error } = await supabase.from('memories').insert({
                user_id: user.id,
                content,
                source,
                tags,
            }).select().single();

            if (!error && data) {
                persistentId = data.id;
                persistentData = data;
            } else {
                console.warn('Supabase persistence failed', error);
                return NextResponse.json({ error: 'Database error', details: error }, { status: 500 });
            }
        } catch (e) {
            console.warn('Supabase unavailable', e);
            return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
        }

        return NextResponse.json({
            status: 'created',
            memory: {
                ...memory,
                persistentId
            },
            data: persistentData
        });

    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal Server Error', message: error?.message }, { status: 500 });
    }
}

export async function GET(request: Request) {
    try {
        let user: { id: string } | null = null;
        let supabase: any;

        // 1. Check for API Key first (Authorization header)
        const authHeader = request.headers.get('Authorization');
        if (authHeader?.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            // Ensure ApiKeyService is imported
            const userId = await ApiKeyService.verifyKey(token);
            if (userId) {
                user = { id: userId };
                supabase = supabaseAdmin;
            }
        }

        // 2. Fallback to Supabase Auth (Cookies)
        if (!user) {
            const cookieStore = await cookies();
            supabase = createServerClient(
                process.env.NEXT_PUBLIC_SUPABASE_URL!,
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
                {
                    cookies: {
                        getAll() {
                            return cookieStore.getAll()
                        },
                        setAll(cookiesToSet) {
                            try {
                                cookiesToSet.forEach(({ name, value, options }) =>
                                    cookieStore.set(name, value, options)
                                )
                            } catch {
                                // The `setAll` method was called from a Server Component.
                            }
                        },
                    },
                }
            );

            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                user = session.user;
            }
        }

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '20');

        // 1. Try Supabase first
        const { data, error } = await supabase
            .from('memories')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(limit);

        if (!error && data) {
            const memories = data.map((d: any) => ({
                id: d.id,
                content: d.content,
                source: d.source,
                tags: d.tags,
                created_at: d.created_at,
                metadata: d.metadata
            }));
            return NextResponse.json({ memories });
        }

        // 2. Fallback to Redis if DB fails
        try {
            if (redis) {
                const raw = await redis.lrange(`user:${user.id}:context`, 0, -1);
                const context = raw.map((item: any) => {
                    if (typeof item === 'string') {
                        try { return JSON.parse(item); } catch (e) { return null; }
                    }
                    return item;
                }).filter(Boolean);

                const memories = context.map((item: any) => ({
                    id: item.id || crypto.randomUUID(),
                    payload: item
                }));
                return NextResponse.json({ memories, source: 'cache' });
            }
        } catch (e) {
            console.warn('Redis fallback failed', e);
        }

        return NextResponse.json({ memories: [] });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
