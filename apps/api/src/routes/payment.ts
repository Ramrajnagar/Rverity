
import { FastifyInstance, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';
import { PayPalService } from '../services/paypal.service';
import { env } from '../config/env';
import { PLAN_MAP } from '../config/plans';

const checkoutSchema = z.object({
    planId: z.string(),
});

export async function paymentRoutes(app: FastifyInstance) {
    app.post('/create-subscription', {
        preHandler: requireAuth,
    }, async (req: AuthenticatedRequest, reply) => {
        try {
            const body = req.body as { planId: string };
            console.log('Received subscription request:', body);

            const { planId: requestedPlanId } = checkoutSchema.parse(body);
            console.log('Parsed Plan ID:', requestedPlanId);

            const paypalPlanId = PLAN_MAP[requestedPlanId];
            console.log('Mapped to PayPal Plan ID:', paypalPlanId);

            if (!paypalPlanId) {
                throw new Error(`Invalid Plan ID: ${requestedPlanId}`);
            }

            if (!req.user) {
                console.error('User context missing');
                throw new Error('User context missing');
            }
            console.log('User ID:', req.user.id);

            const subscription = await PayPalService.createSubscription(paypalPlanId, req.user.id);
            console.log('PayPal Subscription Created:', subscription);

            // Return the approval link
            const approvalLink = subscription.links.find((l: any) => l.rel === 'approve');

            return {
                subscriptionId: subscription.id,
                approvalUrl: approvalLink.href
            };
        } catch (error: any) {
            console.error('Create Subscription Error:', error);
            return reply.status(500).send({ error: error.message || 'Internal Server Error' });
        }
    });

    app.post('/webhook', {
        config: { rawBody: true },
    }, async (req: FastifyRequest) => {
        // Verify Signature
        await PayPalService.verifyWebhookSignature(req);

        const event = req.body as any;
        console.log('PayPal Webhook:', event.event_type);

        await PayPalService.handleWebhook(event);

        return { received: true };
    });
}
