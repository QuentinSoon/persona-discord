import DiscordClient from '../client/DiscordClient';
import { supabase } from './SUPABASE';

export const getData = async (client: DiscordClient, key: string) => {
	try {
		let result = await client.redis.get(key);
		if (!result) {
			const { data, error } = await supabase.from(key).select();
			if (error) {
				throw new Error('Error occurred: ${error}');
			}

			const adding = await client.redis.set(key, JSON.stringify(data));
			console.log('JSON data cached successfully:', adding);
			result = JSON.stringify(data);
		}
		return JSON.parse(result);
	} catch (error) {
		console.log('Error occurred:', error);
	}
};

export const setData = async (
	client: DiscordClient,
	key: string,
	value: any
) => {
	try {
		const data = await supabase.from(key).insert(value);
		console.log('Data inserted successfully:', data);
		const adding = await client.redis.set(key, JSON.stringify(value));
	} catch (error) {
		console.log('Error occurred:', error);
	}
};

export const updateData = async (
	client: DiscordClient,
	key: string,
	value: any,
	guild_id: string
) => {
	try {
		const data = await supabase
			.from(key)
			.update(value)
			.eq('guild_id', guild_id);
		console.log('Data updated successfully:', data);
		const adding = await client.redis.set(key, JSON.stringify(value));
	} catch (error) {
		console.log('Error occurred:', error);
	}
};
