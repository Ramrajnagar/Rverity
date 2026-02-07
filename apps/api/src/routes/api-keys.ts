
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { ApiKeyService } from '../services/api-key.service';
import { requireAuth as authenticate } from '../middleware/auth';

const createKeySchema = z.object({
    name: z.string().min(1).max(50)
});

export async function apiKeyRoutes(app: FastifyInstance) {
    // List Keys
    app.get('/', { preHandler: authenticate }, async (req, reply) => {
        const user = (req as any).user;
        const keys = await ApiKeyService.listKeys(user.id);
        return { keys };
    });

    // Create Key
    app.post('/', { preHandler: authenticate }, async (req, reply) => {
        const user = (req as any).user;
        const body = createKeySchema.parse(req.body);

        const result = await ApiKeyService.createKey(user.id, body.name);
        return result;
    });

    // Revoke Key
    app.delete('/:id', { preHandler: authenticate }, async (req, reply) => {
        const user = (req as any).user;
        const { id } = req.params as { id: string };

        await ApiKeyService.revokeKey(user.id, id);
        return { success: true };
    });
}
