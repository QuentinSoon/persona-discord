import { z } from 'zod';

export const GuildSchema = z.object({
	id: z.number(),
	created_at: z.string(),
	guild_id: z.string(),
	prefix: z.string(),
	language: z.string(),
});
export type GuildType = z.infer<typeof GuildSchema>;

export const GuildsSchema = z.array(GuildSchema);
export type GuildsType = z.infer<typeof GuildsSchema>;
