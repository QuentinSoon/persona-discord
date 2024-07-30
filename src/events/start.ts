import { ActivityType, Events } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import DiscordEvent from '../client/DiscordEvent';

export default class StartEvent extends DiscordEvent {
	constructor() {
		super(Events.ClientReady, true);
	}

	async execute(client: DiscordClient) {
		if (!client.user) return;

		console.log(`Logged in as ${client.user.tag}!`);

		client.user.setActivity("Persona.app - Lify's Shard", {
			type: ActivityType.Watching,
		});
	}
}
