import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

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

        const now = new Date();

        // Today
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const { count: todayCount } = await supabase
            .from('memories')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', session.user.id)
            .gte('created_at', todayStart.toISOString());

        // This week
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - 7);
        const { count: weekCount } = await supabase
            .from('memories')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', session.user.id)
            .gte('created_at', weekStart.toISOString());

        // This month
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const { count: monthCount } = await supabase
            .from('memories')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', session.user.id)
            .gte('created_at', monthStart.toISOString());

        // Total
        const { count: totalCount } = await supabase
            .from('memories')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', session.user.id);

        // Calculate streak (consecutive days with at least one memory)
        const { data: allMemories } = await supabase
            .from('memories')
            .select('created_at')
            .eq('user_id', session.user.id)
            .order('created_at', { ascending: false })
            .limit(365); // Last year

        let streak = 0;
        if (allMemories && allMemories.length > 0) {
            const uniqueDays = new Set<string>();
            allMemories.forEach(m => {
                const date = new Date(m.created_at);
                const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
                uniqueDays.add(dayKey);
            });

            // Check consecutive days from today backwards
            let checkDate = new Date(todayStart);
            while (true) {
                const dayKey = `${checkDate.getFullYear()}-${checkDate.getMonth()}-${checkDate.getDate()}`;
                if (uniqueDays.has(dayKey)) {
                    streak++;
                    checkDate.setDate(checkDate.getDate() - 1);
                } else {
                    break;
                }
            }
        }

        return NextResponse.json({
            status: 'success',
            data: {
                today: todayCount || 0,
                thisWeek: weekCount || 0,
                thisMonth: monthCount || 0,
                total: totalCount || 0,
                streak
            }
        });

    } catch (error) {
        console.error('[API] Stats error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
