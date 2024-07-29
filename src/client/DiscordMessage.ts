import { Message } from 'discord.js';
import DiscordClient from './DiscordClient';

export default class DiscordMessage {
	constructor(private message: Message, private client: DiscordClient) {}

	async reply(content: string) {
		if (!this.message.author.bot) {
			await this.message.reply(content);
		}
	}
}
