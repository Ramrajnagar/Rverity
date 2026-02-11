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

        // Build query
        let queryBuilder = supabase
            .from('memories')
            .select('*')
            .eq('user_id', session.user.id);

        // Text search in content
        if (query) {
            queryBuilder = queryBuilder.ilike('payload->>content', `%${query}%`);
        }

        // Filter by sources
        if (sources.length > 0) {
            queryBuilder = queryBuilder.in('payload->>source', sources);
        }

        // Filter by tags (contains any of the tags)
        if (tags.length > 0) {
            queryBuilder = queryBuilder.contains('payload->tags', tags);
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
            .limit(Math.min(limit, 100)); // Max 100 results

        const { data: memories, error } = await queryBuilder;

        if (error) {
            console.error('[API] Search error:', error);
            return NextResponse.json(
                { error: 'Search failed' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            status: 'success',
            data: {
                memories: memories || [],
                count: memories?.length || 0,
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
