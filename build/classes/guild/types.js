import { z } from 'zod';
export const GuildSchema = z.object({
    guild_id: z.string(),
    created_at: z.string(),
});
export const GuildsSchema = z.array(GuildSchema);
