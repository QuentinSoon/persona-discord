import { Events } from 'discord.js';
import { Event } from '../../classes/Event';
import DiscordClient from '../../utils/DiscordClient';

export class Ready extends Event {
	constructor(client: DiscordClient) {
		super(client, {
			name: Events.ClientReady,
			description: 'Ready event',
			once: true,
		});
	}

	Execute(...args: any[]): void {
		console.log(`${this.client.user?.tag} is ready!`);
	}
}
