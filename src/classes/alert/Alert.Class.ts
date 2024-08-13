import 'dotenv/config';
import DiscordClient from '../../client/DiscordClient';
import { redis } from '../../utils/redis';
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
			const cachedData = await redis.smembers(`alerts`);

			if (cachedData.length > 0) {
				const parsedData = cachedData.map((alert) => JSON.parse(alert));
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
				// console.log(data);
				await this.addAlertsToSet(data);
				// redis.set(`alerts`, JSON.stringify(data));
				return data;
			}
		} catch (error) {
			console.error('[ERROR] Failed to fetch data:', error);
		}

		return null;
	}

	async addAlertsToSet(data: any[]) {
		if (data && data.length > 0) {
			const type = await redis.type('alerts');
			if (type !== 'set') {
				if (type !== 'none') {
					// La clé existe mais n'est pas un ensemble
					await redis.del('alerts'); // Supprimez la clé si elle existe mais n'est pas un ensemble
				}
			}
			const pipeline = redis.multi();
			data.forEach((alert) => {
				pipeline.sadd('alerts', JSON.stringify(alert));
			});
			await pipeline.exec();
			return data;
		}
		return []; // Retourner une liste vide si `data` est vide ou non définie
	}
}
