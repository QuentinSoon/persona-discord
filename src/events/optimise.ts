import { Events } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import DiscordEvent from '../client/DiscordEvent';
import DiscordMessage from '../client/DiscordMessage';

export default class OptimiseEvent extends DiscordEvent {
	constructor() {
		super(Events.MessageCreate, false);
	}

	async execute(client: DiscordClient, message: DiscordMessage) {
		await message.reply('Hello World!');
	}
}
