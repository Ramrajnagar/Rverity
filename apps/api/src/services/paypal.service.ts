
import { env } from '../config/env';
import { supabase } from '../config/supabase';
import { redis } from '../config/redis';

interface PayPalToken {
    access_token: string;
    expires_in: number;
}

export class PayPalService {
    private static baseUrl = env.PAYPAL_MODE === 'sandbox'
        ? 'https://api-m.sandbox.paypal.com'
        : 'https://api-m.paypal.com';

    private static async getAccessToken(): Promise<string> {
        const auth = Buffer.from(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_SECRET}`).toString('base64');

        const response = await fetch(`${this.baseUrl}/v1/oauth2/token`, {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials'
        });

        if (!response.ok) {
            console.error('PayPal Access Token Failed:', response.status, response.statusText);
            const text = await response.text();
            console.error('Response Body:', text);
            throw new Error(`Failed to get PayPal Access Token: ${response.statusText}`);
        }

        const data = await response.json() as PayPalToken;
        return data.access_token;
    }

    static async createSubscription(planId: string, userId: string) {
        console.log('PayPalService: Getting Access Token...');
        const accessToken = await this.getAccessToken();
        console.log('PayPalService: Got Access Token. Creating Subscription...');

        const response = await fetch(`${this.baseUrl}/v1/billing/subscriptions`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify({
                plan_id: planId,
                custom_id: userId, // Store userId to link webhook events
                application_context: {
                    return_url: `${env.FRONTEND_URL}/checkout/success`,
                    cancel_url: `${env.FRONTEND_URL}/checkout/cancel`,
                    user_action: 'SUBSCRIBE_NOW'
                }
            })
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('PayPal Create Subscription Failed:', error);
            throw new Error(`Failed to create subscription: ${error}`);
        }

        return await response.json();
    }

    static async verifyWebhookSignature(req: any) {
        // TODO: Implement actual signature verification using PayPal SDK or crypto
        // For now, we trust the source if the ID matches configuration if present
        // In production, this MUST be implemented to prevent spoofing.
        return true;
    }

    static async handleWebhook(event: any) {
        const resource = event.resource;
        const eventType = event.event_type;
        const eventId = event.id;

        if (!resource) return;

        // Idempotency Check using Redis
        // Set key causing it to expire in 24 hours
        // 'nx' means only set if not exists
        const processed = await redis.set(`webhook:${eventId}`, 'processed', { nx: true, ex: 86400 });

        if (!processed) {
            console.log(`Duplicate Webhook Event Ignored: ${eventId}`);
            return;
        }

        console.log(`Processing PayPal Webhook: ${eventType} for Resource: ${resource.id} (Event: ${eventId})`);

        try {
            switch (eventType) {
                case 'BILLING.SUBSCRIPTION.ACTIVATED':
                case 'BILLING.SUBSCRIPTION.RE-ACTIVATED':
                    await this.handleSubscriptionActivated(resource);
                    break;
                case 'BILLING.SUBSCRIPTION.CANCELLED':
                case 'BILLING.SUBSCRIPTION.SUSPENDED':
                case 'BILLING.SUBSCRIPTION.EXPIRED':
                    await this.handleSubscriptionStatusChange(resource, eventType);
                    break;
                default:
                    console.log(`Unhandled PayPal Webhook Event: ${eventType}`);
            }
        } catch (error) {
            console.error('Webhook processing failed:', error);
            // Delete key to allow retry if logic failed?
            // Usually we don't want to retry if it's a code error, but for transient issues yes.
            // Leaving it set prevents retry loops for bad logic.
        }
    }

    private static async handleSubscriptionActivated(resource: any) {
        const userId = resource.custom_id;
        const paypalSubscriptionId = resource.id;
        const paypalPlanId = resource.plan_id;
        const status = resource.status;

        if (!userId) {
            console.error('No custom_id (userId) found in PayPal subscription resource');
            return;
        }

        // 1. Get Plan ID from our DB
        const { data: plan, error: planError } = await supabase
            .from('plans')
            .select('id')
            .eq('paypal_plan_id', paypalPlanId)
            .single();

        if (planError || !plan) {
            console.error(`Plan not found for PayPal Plan ID: ${paypalPlanId}`);
            return;
        }

        // 2. Upsert Subscription
        const { error: subError } = await supabase
            .from('subscriptions')
            .upsert({
                user_id: userId,
                paypal_subscription_id: paypalSubscriptionId,
                status: status,
                plan_id: plan.id,
                current_period_start: resource.billing_info?.last_payment?.time || new Date().toISOString(),
                // current_period_end would ideally be calculated based on plan interval
            }, {
                onConflict: 'paypal_subscription_id'
            });

        if (subError) {
            console.error('Failed to upsert subscription:', subError);
        } else {
            console.log(`Subscription activated for user ${userId}`);
        }
    }

    private static async handleSubscriptionStatusChange(resource: any, eventType: string) {
        const paypalSubscriptionId = resource.id;
        const status = resource.status;

        const { error } = await supabase
            .from('subscriptions')
            .update({ status: status })
            .eq('paypal_subscription_id', paypalSubscriptionId);

        if (error) {
            console.error(`Failed to update subscription status for ${paypalSubscriptionId}:`, error);
        } else {
            console.log(`Subscription ${paypalSubscriptionId} updated to ${status}`);
        }
    }
}
