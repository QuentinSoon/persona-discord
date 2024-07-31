import { Events } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import EventStructure from '../structure/EventStructure';

export default class ReadyEvent extends EventStructure {
	constructor() {
		super(Events.ClientReady, true);
	}

	async execute(client: DiscordClient) {
		if (!client.user) return;

		console.log(`Logged in as ${client.user.tag}!`);
	}
}
