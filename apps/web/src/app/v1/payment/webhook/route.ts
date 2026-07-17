import { NextResponse } from 'next/server';
import { PayPalService } from '@/lib/paypal';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body || !body.event_type || !body.resource) {
            return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }

        // Verify webhook signature using PayPal's API
        const authHeader = request.headers.get('paypal-transmission-id');
        const timestamp = request.headers.get('paypal-transmission-time');

        if (process.env.PAYPAL_WEBHOOK_ID) {
            try {
                const accessToken = await (PayPalService as any).getAccessToken();
                const baseUrl = process.env.PAYPAL_MODE === 'sandbox'
                    ? 'https://api-m.sandbox.paypal.com'
                    : 'https://api-m.paypal.com';

                const rawBody = await request.text();
                const verificationRes = await fetch(`${baseUrl}/v1/notifications/verify-webhook-signature`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        auth_algo: request.headers.get('paypal-auth-algo'),
                        cert_url: request.headers.get('paypal-cert-url'),
                        actual_event_body: rawBody,
                        transmission_id: authHeader,
                        transmission_sig: request.headers.get('paypal-transmission-sig'),
                        transmission_time: timestamp,
                        webhook_id: process.env.PAYPAL_WEBHOOK_ID,
                    })
                });

                const verification = await verificationRes.json();
                if (verification.verification_status !== 'SUCCESS') {
                    console.error('PayPal webhook signature verification failed:', verification);
                    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
                }
            } catch (e) {
                console.error('PayPal verification request failed:', e);
            }
        }

        await PayPalService.handleWebhook(body);

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: 'Webhook Handler Failed' }, { status: 500 });
    }
}
