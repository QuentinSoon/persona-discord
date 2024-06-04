import { z } from 'zod';

export const GuildConfigurationSchema = z.object({
	id: z.number(),
	createdAt: z.string(),
	guildId: z.string(),
	prefix: z.string(),
});
export type GuildConfigurationType = z.infer<typeof GuildConfigurationSchema>;
