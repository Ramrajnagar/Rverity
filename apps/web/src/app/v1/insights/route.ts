import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const timeRange = searchParams.get('range') || 'week'; // day, week, month, year

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

        // Calculate date range
        const now = new Date();
        const startDate = new Date();

        switch (timeRange) {
            case 'day':
                startDate.setDate(now.getDate() - 1);
                break;
            case 'week':
                startDate.setDate(now.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(now.getMonth() - 1);
                break;
            case 'year':
                startDate.setFullYear(now.getFullYear() - 1);
                break;
        }

        // Get memories in range
        const { data: memories, error } = await supabase
            .from('memories')
            .select('*')
            .eq('user_id', session.user.id)
            .gte('created_at', startDate.toISOString())
            .order('created_at', { ascending: false });

        if (error) {
            console.error('[API] Insights error:', error);
            return NextResponse.json(
                { error: 'Failed to get insights' },
                { status: 500 }
            );
        }

        // Calculate insights
        const totalMemories = memories?.length || 0;

        // Memories by source
        const memoriesBySource: Record<string, number> = {};
        memories?.forEach(m => {
            const source = m.payload?.source || 'unknown';
            memoriesBySource[source] = (memoriesBySource[source] || 0) + 1;
        });

        // Top tags
        const tagCounts: Record<string, number> = {};
        memories?.forEach(m => {
            const tags = m.payload?.tags || [];
            tags.forEach((tag: string) => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });

        const topTags = Object.entries(tagCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([tag, count]) => ({ tag, count }));

        // Activity by hour (0-23)
        const activityByHour = new Array(24).fill(0);
        memories?.forEach(m => {
            const hour = new Date(m.created_at).getHours();
            activityByHour[hour]++;
        });

        // Activity by day of week (0-6, Sunday-Saturday)
        const activityByDay = new Array(7).fill(0);
        memories?.forEach(m => {
            const day = new Date(m.created_at).getDay();
            activityByDay[day]++;
        });

        return NextResponse.json({
            status: 'success',
            data: {
                timeRange,
                totalMemories,
                memoriesBySource,
                topTags,
                activityByHour,
                activityByDay
            }
        });

    } catch (error) {
        console.error('[API] Insights error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
