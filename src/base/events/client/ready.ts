import { Events } from 'discord.js';
import { BaseEvent } from '../../classes/BaseEvent';
import DiscordClient from '../../utils/DiscordClient';

export class Ready extends BaseEvent {
	constructor(client: DiscordClient) {
		super(client, {
			name: Events.ClientReady,
			description: 'Ready event',
			once: true,
		});
	}

	Execute() {
		console.log(`${this.client.user?.tag} is ready!`);
	}
}
