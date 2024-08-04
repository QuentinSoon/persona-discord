import { z } from 'zod';

export const TicketGuildSchema = z.object({
	id: z.number(),
	created_at: z.string(),
	guild_id: z.string(),
	name: z.string(),
	description: z.string().nullable(),
	text_channel_id: z.string().nullable(),
	forum_channel_id: z.string().nullable(),
});
export type TicketGuildType = z.infer<typeof TicketGuildSchema>;

export const TicketGuildsSchema = z.array(TicketGuildSchema);
export type TicketGuildsType = z.infer<typeof TicketGuildsSchema>;
