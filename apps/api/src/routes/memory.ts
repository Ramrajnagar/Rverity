
import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { requireAuth, AuthenticatedRequest } from '../middleware/auth';

const createMemorySchema = z.object({
    content: z.string().min(1, 'Content is required'),
    tags: z.array(z.string()).optional(),
    source: z.string().optional().default('api'),
});

export async function memoryRoutes(app: FastifyInstance) {
    app.post('/', {
        preHandler: requireAuth,
    }, async (req: AuthenticatedRequest) => {
        const { content, tags, source } = createMemorySchema.parse(req.body);
        const user = req.user!; // Auth middleware ensures user exists

        const { MemoryService } = await import('../services/memory.service');
        const memory = await MemoryService.addMemory(user.id, content, source, tags || []);

        return {
            status: 'created',
            memory
        };
    });

    app.get('/', {
        preHandler: requireAuth,
    }, async (req: AuthenticatedRequest) => {
        const user = req.user!;
        const { MemoryService } = await import('../services/memory.service');
        const memories = await MemoryService.getHistory(user.id);
        return { memories };
    });

    app.get('/stats', {
        preHandler: requireAuth,
    }, async (req: AuthenticatedRequest) => {
        const user = req.user!;
        const { MemoryService } = await import('../services/memory.service');
        const stats = await MemoryService.getStats(user.id);
        return { stats };
    });
}
