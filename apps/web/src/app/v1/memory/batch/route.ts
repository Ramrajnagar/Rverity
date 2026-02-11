import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const batchMemorySchema = z.object({
    items: z.array(z.object({
        content: z.string().min(1),
        source: z.string().optional().default('api'),
        tags: z.array(z.string()).optional(),
        metadata: z.record(z.any()).optional()
    })).min(1).max(100) // Max 100 items per batch
});

export async function POST(request: Request) {
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
                            cookiesToSet.forEach(({ name, value, options }) =>
                                cookieStore.set(name, value, options)
                            );
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

        const user = session.user;
        const body = await request.json();
        const { items } = batchMemorySchema.parse(body);

        console.log(`[API] Batch create memories. User: ${user.id}, Count: ${items.length}`);

        // Prepare all memories for insertion
        const memories = items.map(item => ({
            user_id: user.id,
            payload: {
                content: item.content,
                source: item.source || 'api',
                tags: item.tags || [],
                metadata: item.metadata || {},
                timestamp: new Date().toISOString()
            }
        }));

        // Insert all memories in one query
        const { data, error } = await supabase
            .from('memories')
            .insert(memories)
            .select();

        if (error) {
            console.error('[API] Batch insert error:', error);
            return NextResponse.json(
                { error: 'Failed to create memories' },
                { status: 500 }
            );
        }

        console.log(`[API] Successfully created ${data.length} memories`);

        return NextResponse.json({
            status: 'success',
            data: {
                memories: data,
                count: data.length
            }
        });

    } catch (error) {
        console.error('[API] Batch create error:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid request', details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
