import { Message } from 'discord.js';
import DiscordClient from './DiscordClient';

export default class DiscordMessage {
	constructor(private message: Message, private client: DiscordClient) {}

	async replyE(content: string) {
		if (!this.message.author.bot) {
			await this.message.reply(content);
		}
	}

	async guildIdIIIII() {
		console.log('eee');
		// return this.message.guildId;
	}
}
