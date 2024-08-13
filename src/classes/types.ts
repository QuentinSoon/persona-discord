import { z } from 'zod';

export const GuildSchema = z.object({
	guild_id: z.string(),
	created_at: z.string(),
});
export type GuildType = z.infer<typeof GuildSchema>;

export const GuildsSchema = z.array(GuildSchema);
export type GuildsType = z.infer<typeof GuildsSchema>;
