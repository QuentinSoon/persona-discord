import { Events } from 'discord.js';
import { BaseEvent } from '../../classes/BaseEvent';
import DiscordClient from '../../utils/DiscordClient';

export default class Ready extends BaseEvent {
	constructor(client: DiscordClient) {
		super(client, {
			name: Events.ClientReady,
			description: 'Ready event',
			once: true,
		});
	}

	execute() {
		// console.log(this.client);
		// console.log(`${this.client.user?.tag} is ready!`);
	}
}
