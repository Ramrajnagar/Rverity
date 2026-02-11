import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

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

        // Get user's GitHub installations
        const { data: installations, error } = await supabase
            .from('github_installations')
            .select('*')
            .eq('user_id', session.user.id);

        if (error) {
            console.error('[GitHub] Failed to get installations:', error);
            return NextResponse.json(
                { error: 'Failed to get installations' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            status: 'success',
            data: {
                installations: installations || [],
                count: installations?.length || 0
            }
        });

    } catch (error) {
        console.error('[GitHub] Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const installationId = searchParams.get('installation_id');

        if (!installationId) {
            return NextResponse.json(
                { error: 'Missing installation_id' },
                { status: 400 }
            );
        }

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

        // Delete installation
        const { error } = await supabase
            .from('github_installations')
            .delete()
            .eq('installation_id', parseInt(installationId))
            .eq('user_id', session.user.id);

        if (error) {
            console.error('[GitHub] Failed to delete installation:', error);
            return NextResponse.json(
                { error: 'Failed to delete installation' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            status: 'success',
            message: 'Installation removed'
        });

    } catch (error) {
        console.error('[GitHub] Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
