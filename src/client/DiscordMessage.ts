import { Message } from 'discord.js';
import DiscordClient from './DiscordClient';

export default class DiscordMessage {
	constructor(private message: Message, private client: DiscordClient) {}

	get content() {
		return this.message.content;
	}

	get author() {
		return this.message.author;
	}

	async reply(content: string) {
		if (!this.message.author.bot) {
			await this.message.reply(content);
		}
	}
}
