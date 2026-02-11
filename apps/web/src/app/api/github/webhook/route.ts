import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { GitHubWebhookVerifier, getEventProcessor } from '@/lib/github-utils';

export async function POST(request: Request) {
    try {
        // Get webhook signature
        const signature = request.headers.get('x-hub-signature-256');
        const eventType = request.headers.get('x-github-event');

        if (!signature || !eventType) {
            return NextResponse.json(
                { error: 'Missing required headers' },
                { status: 400 }
            );
        }

        // Get raw body for signature verification
        const body = await request.text();

        // Verify webhook signature
        const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;
        if (!webhookSecret) {
            console.error('[GitHub Webhook] GITHUB_WEBHOOK_SECRET not configured');
            return NextResponse.json(
                { error: 'Webhook not configured' },
                { status: 500 }
            );
        }

        const verifier = new GitHubWebhookVerifier(webhookSecret);
        if (!verifier.verify(body, signature)) {
            console.error('[GitHub Webhook] Invalid signature');
            return NextResponse.json(
                { error: 'Invalid signature' },
                { status: 401 }
            );
        }

        // Parse payload
        const payload = JSON.parse(body);

        console.log(`[GitHub Webhook] Received ${eventType} event from ${payload.repository?.full_name}`);

        // Get event processor
        const processor = getEventProcessor(eventType);
        if (!processor) {
            console.log(`[GitHub Webhook] No processor for event type: ${eventType}`);
            return NextResponse.json({ message: 'Event type not supported' });
        }

        // Process event
        const { content, tags, metadata } = processor(payload);

        // Get installation ID from payload
        const installationId = payload.installation?.id;
        if (!installationId) {
            console.error('[GitHub Webhook] No installation ID in payload');
            return NextResponse.json(
                { error: 'No installation ID' },
                { status: 400 }
            );
        }

        // Get user ID from installation
        // In a real implementation, you'd store installation_id -> user_id mapping in database
        // For now, we'll use a simple approach
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

        // Look up user by installation ID in github_installations table
        const { data: installation } = await supabase
            .from('github_installations')
            .select('user_id')
            .eq('installation_id', installationId)
            .single();

        if (!installation) {
            console.error(`[GitHub Webhook] No user found for installation ${installationId}`);
            // Still return 200 to acknowledge receipt
            return NextResponse.json({ message: 'Installation not linked to user' });
        }

        // Create memory for the user
        const { error: insertError } = await supabase
            .from('memories')
            .insert({
                user_id: installation.user_id,
                payload: {
                    content,
                    source: 'github',
                    tags,
                    metadata,
                    timestamp: new Date().toISOString()
                }
            });

        if (insertError) {
            console.error('[GitHub Webhook] Failed to create memory:', insertError);
            return NextResponse.json(
                { error: 'Failed to create memory' },
                { status: 500 }
            );
        }

        console.log(`[GitHub Webhook] Created memory for user ${installation.user_id}`);

        return NextResponse.json({
            message: 'Webhook processed successfully',
            event: eventType
        });

    } catch (error) {
        console.error('[GitHub Webhook] Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Respond to ping events
export async function GET(request: Request) {
    return NextResponse.json({
        message: 'NeuroSync GitHub Webhook',
        status: 'active'
    });
}
