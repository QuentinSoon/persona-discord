import { createClient } from '@supabase/supabase-js';
import { GuildsSchema } from '../classes/Guild.class';

export const supabase = createClient(
	process.env.SUPABASE_URL as string,
	process.env.SUPABASE_ANON_KEY as string
);

export const getGuilds = async () => {
	const { error, data } = await supabase.from('guilds').select('*');
	return GuildsSchema.parse(data);
};
