
import dotenv from 'dotenv';
import path from 'path';

// Load .env from parent directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_SECRET;
const mode = process.env.PAYPAL_MODE || 'sandbox';
const baseUrl = mode === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

async function getAccessToken() {
    console.log('Getting Access Token...');
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const response = await fetch(`${baseUrl}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
        throw new Error(`Failed to get token: ${await response.text()}`);
    }

    const data = await response.json();
    return data.access_token;
}

async function createProduct(accessToken: string) {
    console.log('Creating Product...');
    const response = await fetch(`${baseUrl}/v1/catalogs/products`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({
            name: 'NeuroSync AI',
            description: 'AI Memory Assistant',
            type: 'SERVICE',
            category: 'SOFTWARE',
            image_url: 'https://example.com/logo.png',
            home_url: 'https://example.com'
        })
    });

    if (!response.ok) {
        throw new Error(`Failed to create product: ${await response.text()}`);
    }

    const data = await response.json();
    console.log(`Product Created: ${data.id}`);
    return data.id;
}

async function createPlan(accessToken: string, productId: string) {
    console.log('Creating Plan...');
    const response = await fetch(`${baseUrl}/v1/billing/plans`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        },
        body: JSON.stringify({
            product_id: productId,
            name: 'Business Plus',
            description: 'Team Accounts and API Access',
            status: 'ACTIVE',
            billing_cycles: [
                {
                    frequency: {
                        interval_unit: 'MONTH',
                        interval_count: 1
                    },
                    tenure_type: 'REGULAR',
                    sequence: 1,
                    total_cycles: 0, // Infinite
                    pricing_scheme: {
                        fixed_price: {
                            value: '29',
                            currency_code: 'USD'
                        }
                    }
                }
            ],
            payment_preferences: {
                auto_bill_outstanding: true,
                setup_fee: {
                    value: '0',
                    currency_code: 'USD'
                },
                setup_fee_failure_action: 'CONTINUE',
                payment_failure_threshold: 3
            },
            taxes: {
                percentage: '0',
                inclusive: false
            }
        })
    });

    if (!response.ok) {
        throw new Error(`Failed to create plan: ${await response.text()}`);
    }

    const data = await response.json();
    console.log(`Plan Created: ${data.id}`);
    return data.id;
}

async function main() {
    try {
        if (!clientId || !clientSecret) {
            throw new Error('PAYPAL_CLIENT_ID or PAYPAL_SECRET missing in .env');
        }

        const token = await getAccessToken();
        const productId = await createProduct(token);
        const planId = await createPlan(token, productId);

        console.log('\nSUCCESS!');
        console.log('------------------------------------------------');
        console.log(`NEW PLAN ID: ${planId}`);
        console.log('------------------------------------------------');
        const fs = require('fs');
        fs.writeFileSync('paypal_plan_id.txt', planId);
        console.log(`Saved Plan ID to paypal_plan_id.txt: ${planId}`);

    } catch (error) {
        console.error('Error:', error);
    }
}

main();
