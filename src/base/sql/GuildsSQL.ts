import { GuildConfigurationType } from '../classes/GuildConfiguration.class';
import { supabase } from './supabase';

export const getGuilds = async () => {
	const { data, error } = await supabase
		.from('guilds')
		.select('*')
		.returns<GuildConfigurationType[]>();
	if (error) {
		throw error;
	}
	return data;
};
