import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
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

        // Get single memory
        const { data: memory, error } = await supabase
            .from('memories')
            .select('*')
            .eq('id', id)
            .eq('user_id', session.user.id)
            .single();

        if (error || !memory) {
            return NextResponse.json(
                { error: 'Memory not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            status: 'success',
            data: memory
        });

    } catch (error) {
        console.error('[API] Get memory error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
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

        const body = await request.json();
        const { content, tags, metadata } = body;

        // Get existing memory
        const { data: existing } = await supabase
            .from('memories')
            .select('*')
            .eq('id', id)
            .eq('user_id', session.user.id)
            .single();

        if (!existing) {
            return NextResponse.json(
                { error: 'Memory not found' },
                { status: 404 }
            );
        }

        // Update payload
        const updatedPayload = {
            ...existing.payload,
            ...(content && { content }),
            ...(tags && { tags }),
            ...(metadata && { metadata: { ...existing.payload.metadata, ...metadata } })
        };

        const { data: updated, error } = await supabase
            .from('memories')
            .update({ payload: updatedPayload })
            .eq('id', id)
            .eq('user_id', session.user.id)
            .select()
            .single();

        if (error) {
            console.error('[API] Update memory error:', error);
            return NextResponse.json(
                { error: 'Failed to update memory' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            status: 'success',
            data: updated
        });

    } catch (error) {
        console.error('[API] Update memory error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
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

        const { error } = await supabase
            .from('memories')
            .delete()
            .eq('id', id)
            .eq('user_id', session.user.id);

        if (error) {
            console.error('[API] Delete memory error:', error);
            return NextResponse.json(
                { error: 'Failed to delete memory' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            status: 'success',
            message: 'Memory deleted'
        });

    } catch (error) {
        console.error('[API] Delete memory error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
