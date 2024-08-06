import { z } from 'zod';

export const AlertSchema = z.object({
	id: z.number(),
	created_at: z.string(),
	guild_id: z.string(),
	login_id: z.string(),
	description: z.string().nullable(),
	type: z.string(),
	channel_id: z.string().nullable(),
});
export type AlertType = z.infer<typeof AlertSchema>;

export const AlertsSchema = z.array(AlertSchema);
export type AlertsType = z.infer<typeof AlertsSchema>;
