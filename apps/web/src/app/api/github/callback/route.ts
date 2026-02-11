import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get('code');
        const installationId = searchParams.get('installation_id');
        const setupAction = searchParams.get('setup_action');

        if (!code || !installationId) {
            return NextResponse.redirect(
                new URL('/dashboard?error=github_auth_failed', request.url)
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
            return NextResponse.redirect(
                new URL('/login?error=unauthorized', request.url)
            );
        }

        // Exchange code for access token
        const tokenResponse = await fetch(
            'https://github.com/login/oauth/access_token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code
                })
            }
        );

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            console.error('[GitHub OAuth] Token exchange error:', tokenData.error);
            return NextResponse.redirect(
                new URL('/dashboard?error=github_token_failed', request.url)
            );
        }

        // Get installation details
        const installationResponse = await fetch(
            `https://api.github.com/app/installations/${installationId}`,
            {
                headers: {
                    'Authorization': `Bearer ${tokenData.access_token}`,
                    'Accept': 'application/vnd.github+json'
                }
            }
        );

        const installationData = await installationResponse.json();

        // Store installation in database
        const { error: insertError } = await supabase
            .from('github_installations')
            .upsert({
                user_id: session.user.id,
                installation_id: parseInt(installationId),
                account_login: installationData.account?.login,
                account_type: installationData.account?.type,
                access_token: tokenData.access_token,
                token_type: tokenData.token_type,
                scope: tokenData.scope,
                installed_at: new Date().toISOString()
            }, {
                onConflict: 'installation_id'
            });

        if (insertError) {
            console.error('[GitHub OAuth] Failed to store installation:', insertError);
            return NextResponse.redirect(
                new URL('/dashboard?error=github_install_failed', request.url)
            );
        }

        console.log(`[GitHub OAuth] Successfully linked installation ${installationId} to user ${session.user.id}`);

        return NextResponse.redirect(
            new URL('/dashboard?success=github_connected', request.url)
        );

    } catch (error) {
        console.error('[GitHub OAuth] Error:', error);
        return NextResponse.redirect(
            new URL('/dashboard?error=github_error', request.url)
        );
    }
}
