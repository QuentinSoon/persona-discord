import 'dotenv/config';
import AlertClass from '../classes/alert/Alert.class';
import GuildClass from '../classes/guild/Guild.class';
import DiscordClient from '../client/DiscordClient';

export default class Cache {
	protected client: DiscordClient;
	guild: GuildClass;
	alert: AlertClass;

	constructor(client: DiscordClient) {
		this.client = client;

		this.guild = new GuildClass(client);
		this.alert = new AlertClass(client);
	}
}
