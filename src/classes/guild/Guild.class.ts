import 'dotenv/config';
import DiscordClient from '../../client/DiscordClient';
import { redis } from '../../utils/redis';
import { supabase } from '../../utils/supabase';
import { GuildSchema, GuildType } from './types';

export default class GuildClass {
	protected client: DiscordClient;
	protected timeToCache: number = 24;

	constructor(client: DiscordClient) {
		this.client = client;
	}

	async getData(guildId: string): Promise<GuildType | null> {
		try {
			const cachedData = await redis.get(`guild:${guildId}`);

			if (cachedData) {
				const parsedData = JSON.parse(cachedData);
				const zodParsedData = GuildSchema.parse(parsedData);
				return zodParsedData;
			}

			const { data, error } = await supabase
				.from('guilds')
				.select('*')
				.eq('guild_id', guildId)
				.single();

			if (error) {
				throw error;
			}

			if (data) {
				await redis.set(
					`guild:${guildId}`,
					JSON.stringify(data),
					'EX',
					this.timeToCache * 60 * 60 ?? 3600
				);
				return data;
			}
		} catch (error) {
			console.error('[ERROR] Failed to fetch data:', error);
		}

		return null;
	}

	async addData(guildId: string) {
		try {
			const cachedData = await this.getData(guildId);

			if (cachedData) return;

			const { data, error } = await supabase
				.from('guilds')
				.insert({
					guild_id: guildId,
				})
				.select()
				.single();

			if (error) {
				throw error;
			}

			if (data) {
				await redis.set(
					`guild:${guildId}`,
					JSON.stringify(data),
					'EX',
					this.timeToCache * 60 * 60 ?? 3600
				);
				return data;
			}
		} catch (error) {
			console.error('[ERROR] Failed to fetch data:', error);
		}

		return null;
	}

	async removeData(guildId: string) {
		try {
			const cachedData = await this.getData(guildId);

			if (!cachedData) return;

			const { data, error } = await supabase
				.from('guilds')
				.delete()
				.eq('guild_id', guildId)
				.select();

			if (error) {
				throw error;
			}

			if (data) {
				await redis.del(`guild:${guildId}`);
				return data;
			}
		} catch (error) {
			console.error('[ERROR] Failed to fetch data:', error);
		}
	}
}
