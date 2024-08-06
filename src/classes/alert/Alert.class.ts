import 'dotenv/config';
import DiscordClient from '../../client/DiscordClient';
import { supabase } from '../../utils/supabase';
import { AlertsSchema, AlertsType } from './types';

export default class AlertClass {
	protected client: DiscordClient;
	protected timeToCache: number = 24;

	constructor(client: DiscordClient) {
		this.client = client;
	}

	async getData(): Promise<AlertsType | null> {
		try {
			const cachedData = await this.client.redis.get(`alerts`);

			if (cachedData) {
				const parsedData = JSON.parse(cachedData);
				const zodParsedData = AlertsSchema.parse(parsedData);
				return zodParsedData;
			}

			const { data, error } = await supabase
				.from('alerts')
				.select('*')
				.returns<AlertsType>();

			if (error) {
				throw error;
			}

			if (data) {
				await this.client.redis.set(`alerts`, JSON.stringify(data));
				return data;
			}
		} catch (error) {
			console.error('[ERROR] Failed to fetch data:', error);
		}

		return null;
	}

	async updateData(name: string, value: any) {
		try {
			const cachedData = await this.getData();

			if (!cachedData) return;

			const { data, error } = await supabase
				.from('alerts')
				.update(value)
				.eq('name', name);

			if (error) {
				throw error;
			}

			if (data) {
				await this.client.redis.set(`alerts`, JSON.stringify(data));
				return data;
			}
		} catch (error) {
			// console.error('[ERROR] Failed to fetch data:', error);
		}
	}
}
