import { Events } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import DiscordEvent from '../client/DiscordEvent';

export default class StartEvent extends DiscordEvent {
	constructor() {
		super(Events.ClientReady, true);
	}

	async execute(client: DiscordClient) {
		console.log(`Logged in as ${client.user?.tag}!`);
	}
}
