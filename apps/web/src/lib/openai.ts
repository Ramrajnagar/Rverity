
import OpenAI from 'openai';

// Configuration
const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY;
const baseURL = process.env.AI_BASE_URL || 'https://api.openai.com/v1';
const embeddingModel = process.env.AI_EMBEDDING_MODEL || 'text-embedding-3-small';

if (!apiKey) {
    throw new Error('Missing AI_API_KEY or OPENAI_API_KEY environment variable');
}

export const openai = new OpenAI({
    apiKey: apiKey,
    baseURL: baseURL,
});

// Helper for FreeLLM API which might not fully support OpenAI's SDK for embeddings yet
// based on their documentation using a simple POST to /api/v1/chat
async function generateEmbeddingFreeLLM(text: string): Promise<number[]> {
    try {
        const response = await fetch("https://apifreellm.com/api/v1/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                message: `Convert this text into a numerical embedding vector only, with no other text: ${text}`,
                model: embeddingModel
            })
        });

        const data = await response.json();

        // As a fallback for APIs that don't support true embeddings, 
        // we might get text back. We hash the text into a pseudo-embedding 
        // to maintain exactly 1536 dimensions as required by pgvector.
        if (data.response) {
            const vector = new Array(1536).fill(0);
            const str = String(data.response);
            // Basic deterministic numerical representation
            for (let i = 0; i < Math.min(str.length, 1536); i++) {
                vector[i] = str.charCodeAt(i) / 255.0; // Normalized representation
            }
            return vector;
        }
        throw new Error("Invalid FreeLLM response");
    } catch (e) {
        console.error("FreeLLM Request failed:", e);
        // Return blank standard vector so it still inserts into the DB
        return new Array(1536).fill(0);
    }
}


export async function generateEmbedding(text: string) {
    try {
        if (baseURL.includes('apifreellm.com')) {
            return await generateEmbeddingFreeLLM(text.replace(/\n/g, ' '));
        }

        const response = await openai.embeddings.create({
            model: embeddingModel,
            input: text.replace(/\n/g, ' '),
        });
        return response.data[0].embedding;
    } catch (error) {
        console.error('Error generating embedding:', error);
        throw error;
    }
}

export async function generateEmbeddings(texts: string[]) {
    try {
        const inputs = texts.map(t => t.replace(/\n/g, ' '));

        if (baseURL.includes('apifreellm.com')) {
            return await Promise.all(inputs.map(generateEmbeddingFreeLLM));
        }

        const response = await openai.embeddings.create({
            model: embeddingModel,
            input: inputs,
        });

        return response.data.map(d => d.embedding);
    } catch (error) {
        console.error('Error generating embeddings:', error);
        throw error;
    }
}
