
import { Stripe } from 'stripe';
import { env } from './env';

if (!env.STRIPE_SECRET_KEY) {
    console.warn('Stripe credentials missing. Payment features will be disabled.');
}

export const stripe = new Stripe(env.STRIPE_SECRET_KEY || 'mock_key', {
    apiVersion: '2024-12-18.acacia' as any, // Cast to any to avoid strict version mismatch with installed package
    typescript: true,
});
