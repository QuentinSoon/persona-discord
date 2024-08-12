import { z } from 'zod';
export const AlertSchema = z.object({
    id: z.number(),
    guild_id: z.string(),
    login_id: z.string(),
    description: z.string().nullable(),
    channel_id: z.string().nullable(),
});
export const AlertsSchema = z.array(AlertSchema);
