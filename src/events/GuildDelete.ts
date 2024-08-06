import { Events, Guild } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import EventComponent from '../components/events/events';

export default class MessageEvent extends EventComponent {
	constructor() {
		super(Events.GuildDelete);
	}

	async execute(client: DiscordClient, guild: Guild) {
		client.cache.guild.removeData(guild.id);
	}
}
