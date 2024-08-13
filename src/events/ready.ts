import { Events } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import EventComponent from '../components/events';

export default class ReadyEvent extends EventComponent {
	constructor() {
		super(Events.ClientReady, true);
	}

	async execute(client: DiscordClient) {
		if (!client.user) return;
		console.log(`Logged in as ${client.user.tag}!`);
	}
}
