
import { stripe } from '../config/stripe';
import { supabase } from '../config/supabase';
import { env } from '../config/env';

export class SubscriptionService {
    static async createCheckoutSession(userId: string, priceId: string) {
        // Get or create customer
        const { data: profile } = await supabase
            .from('profiles')
            .select('stripe_customer_id')
            .eq('id', userId)
            .single();

        let customerId = profile?.stripe_customer_id;

        if (!customerId) {
            const { data: user } = await supabase.auth.admin.getUserById(userId);
            if (!user.user) throw new Error('User not found');

            const customer = await stripe.customers.create({
                email: user.user.email,
                metadata: { userId },
            });
            customerId = customer.id;

            // Save customer ID
            await supabase
                .from('profiles')
                .upsert({ id: userId, stripe_customer_id: customerId });
        }

        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${env.HOST}/dashboard?success=true`, // TODO: Fix URL
            cancel_url: `${env.HOST}/dashboard?canceled=true`,
            metadata: { userId },
        });

        return session.url;
    }

    static async handleWebhook(event: any) {
        switch (event.type) {
            case 'checkout.session.completed':
            case 'invoice.payment_succeeded':
                const session = event.data.object;
                const userId = session.metadata.userId;
                // Grant access (update DB)
                // TODO: Update subscription status in Supabase
                console.log(`Granting access to user ${userId}`);
                break;
            case 'customer.subscription.deleted':
                // Revoke access
                break;
        }
    }
}
