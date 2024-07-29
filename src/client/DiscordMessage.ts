import { Message, User } from 'discord.js';
import DiscordClient from './DiscordClient';

export default class DiscordMessage {
	constructor(private message: Message, private client: DiscordClient) {}

	async replyE(content: string) {
		if (!this.message.author.bot) {
			await this.message.reply(content);
		}
	}

	getAuthor(): User {
		return this.message.author;
	}

	getGuildId(): string | null {
		return this.message.guildId;
	}
}
