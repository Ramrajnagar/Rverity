import { NextResponse } from 'next/server';
import { PayPalService } from '@/lib/paypal';

export async function POST(request: Request) {
    try {
        // Verify Signature (Placeholder implementation in service)
        await PayPalService.verifyWebhookSignature(request);

        const event = await request.json();
        await PayPalService.handleWebhook(event);

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error('Webhook Error:', error);
        return NextResponse.json({ error: 'Webhook Handler Failed' }, { status: 500 });
    }
}
