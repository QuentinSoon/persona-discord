import { GuildsSchema } from '../../interface/Guild.interface';
import { supabase } from '../supabase/supabase';

export const getGuilds = async () => {
	const { data, error } = await supabase.from('guilds').select('*');
	if (error) {
		throw new Error(error.message);
	}
	return GuildsSchema.parse(data);
};
