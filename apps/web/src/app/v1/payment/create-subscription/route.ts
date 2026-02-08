import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { PayPalService } from '@/lib/paypal';
import { PLAN_MAP } from '@/lib/plans';
import { z } from 'zod';

const checkoutSchema = z.object({
    planId: z.string(),
});

export async function POST(request: Request) {
    try {
        const cookieStore = await cookies();

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() { return cookieStore.getAll() },
                    setAll(cookiesToSet) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) =>
                                cookieStore.set(name, value, options)
                            )
                        } catch { }
                    },
                },
            }
        );

        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { planId: requestedPlanId } = checkoutSchema.parse(body);

        const paypalPlanId = PLAN_MAP[requestedPlanId];
        if (!paypalPlanId) {
            return NextResponse.json({ error: 'Invalid Plan ID' }, { status: 400 });
        }

        const subscription = await PayPalService.createSubscription(paypalPlanId, session.user.id);
        const approvalLink = subscription.links.find((l: any) => l.rel === 'approve');

        return NextResponse.json({
            subscriptionId: subscription.id,
            approvalUrl: approvalLink.href
        });

    } catch (error: any) {
        console.error('Create Subscription Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
