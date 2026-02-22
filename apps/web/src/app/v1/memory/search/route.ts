import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q') || '';
        const sources = searchParams.get('sources')?.split(',') || [];
        const tags = searchParams.get('tags')?.split(',') || [];
        const dateFrom = searchParams.get('dateFrom');
        const dateTo = searchParams.get('dateTo');
        const limit = parseInt(searchParams.get('limit') || '20');

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

        let memories = [];

        // If query exists, perform Vector Search using the RPC function
        if (query) {
            try {
                const { generateEmbedding } = await import('@/lib/openai');
                const embedding = await generateEmbedding(query);

                const { data, error } = await supabase.rpc('match_memories', {
                    query_embedding: embedding,
                    match_threshold: 0.5, // adjustable threshold
                    match_count: limit,
                    p_user_id: session.user.id
                });

                if (error) {
                    console.error('[API] Vector search error:', error);
                    throw error;
                }

                memories = data || [];

                // Filter by sources/tags in memory if needed (or update RPC to handle it)
                // The current RPC implementation returns all matches, we can filter here for simplicity for now
                if (sources.length > 0) {
                    memories = memories.filter((m: any) => sources.includes(m.source));
                }
                if (tags.length > 0) {
                    memories = memories.filter((m: any) => m.tags && tags.some(t => m.tags.includes(t)));
                }

            } catch (e) {
                console.error('Vector search failed, falling back to basic search', e);
                // Fallback handled below (if memories is empty)
                // Actually, if vector search fails, we should probably fall back to text search
            }
        }

        // Fallback to basic text/filter search if no query or vector search failed/empty
        if (memories.length === 0) {
            let queryBuilder = supabase
                .from('memories')
                .select('*')
                .eq('user_id', session.user.id);

            // Text search in content (standard ILIKE)
            if (query) {
                queryBuilder = queryBuilder.ilike('content', `%${query}%`);
            }

            // Filter by sources
            if (sources.length > 0) {
                queryBuilder = queryBuilder.in('source', sources);
            }

            // Filter by tags (contains any of the tags)
            if (tags.length > 0) {
                queryBuilder = queryBuilder.contains('tags', tags);
            }

            // Date range
            if (dateFrom) {
                queryBuilder = queryBuilder.gte('created_at', dateFrom);
            }
            if (dateTo) {
                queryBuilder = queryBuilder.lte('created_at', dateTo);
            }

            // Order and limit
            queryBuilder = queryBuilder
                .order('created_at', { ascending: false })
                .limit(Math.min(limit, 100));

            const { data, error } = await queryBuilder;

            if (error) {
                console.error('[API] Search error:', error);
                return NextResponse.json({ error: 'Search failed' }, { status: 500 });
            }
            memories = data || [];
        }

        return NextResponse.json({
            status: 'success',
            data: {
                memories: memories,
                count: memories.length,
                query: {
                    text: query,
                    sources,
                    tags,
                    dateFrom,
                    dateTo
                }
            }
        });

    } catch (error) {
        console.error('[API] Search error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
