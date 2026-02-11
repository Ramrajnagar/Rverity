import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '10');

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

        // Get the source memory
        const { data: sourceMemory, error: sourceError } = await supabase
            .from('memories')
            .select('*')
            .eq('id', id)
            .eq('user_id', session.user.id)
            .single();

        if (sourceError || !sourceMemory) {
            return NextResponse.json(
                { error: 'Memory not found' },
                { status: 404 }
            );
        }

        // Extract tags and content for similarity matching
        const sourceTags = sourceMemory.payload?.tags || [];
        const sourceContent = sourceMemory.payload?.content || '';
        const sourceWords = sourceContent.toLowerCase().split(/\s+/).filter((w: string) => w.length > 3);

        // Find related memories based on:
        // 1. Shared tags
        // 2. Similar content (word overlap)
        // 3. Same source
        // 4. Temporal proximity

        const { data: allMemories, error: allError } = await supabase
            .from('memories')
            .select('*')
            .eq('user_id', session.user.id)
            .neq('id', id)
            .order('created_at', { ascending: false })
            .limit(100); // Get recent memories to compare

        if (allError) {
            console.error('[API] Related memories error:', allError);
            return NextResponse.json(
                { error: 'Failed to find related memories' },
                { status: 500 }
            );
        }

        // Calculate relevance scores
        const scoredMemories = (allMemories || []).map((memory: any) => {
            let score = 0;
            const memoryTags = memory.payload?.tags || [];
            const memoryContent = memory.payload?.content || '';
            const memoryWords = memoryContent.toLowerCase().split(/\s+/).filter((w: string) => w.length > 3);

            // Tag overlap (high weight)
            const sharedTags = sourceTags.filter((tag: string) => memoryTags.includes(tag));
            score += sharedTags.length * 10;

            // Content word overlap (medium weight)
            const sharedWords = sourceWords.filter((word: string) => memoryWords.includes(word));
            score += sharedWords.length * 2;

            // Same source (low weight)
            if (memory.payload?.source === sourceMemory.payload?.source) {
                score += 5;
            }

            // Temporal proximity (within 24 hours = bonus)
            const timeDiff = Math.abs(
                new Date(memory.created_at).getTime() - new Date(sourceMemory.created_at).getTime()
            );
            if (timeDiff < 24 * 60 * 60 * 1000) {
                score += 3;
            }

            return { memory, score };
        });

        // Sort by score and take top N
        const relatedMemories = scoredMemories
            .filter(({ score }) => score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, Math.min(limit, 20))
            .map(({ memory }) => memory);

        return NextResponse.json({
            status: 'success',
            data: {
                sourceMemory,
                relatedMemories,
                count: relatedMemories.length
            }
        });

    } catch (error) {
        console.error('[API] Related memories error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
