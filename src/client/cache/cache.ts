import 'dotenv/config';
import GuildClass from '../../classes/Guild.class';
import DiscordClient from '../DiscordClient';

export default class Cache {
	protected client: DiscordClient;
	guild: GuildClass;

	constructor(client: DiscordClient) {
		this.client = client;

		this.guild = new GuildClass(client);
	}
}
