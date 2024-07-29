// import { Events, Message } from 'discord.js';
// import DiscordClient from '../client/DiscordClient';
// import DiscordEvent from '../client/DiscordEvent';

// export default class PingEvent extends DiscordEvent {
// 	constructor() {
// 		super(Events.MessageCreate, false);
// 	}
// 	async execute(client: DiscordClient, messages: Message) {
// 		if (messages.author.bot) return;
// 		if (!messages.guild) return;
// 		if (!messages.guildId) return;

// 		const guild = client.configs.get(messages.guildId);
// 		if (!guild) return;

// 		if (!messages.content.startsWith(guild.prefix)) return;
// 		await messages.reply('Pong!');
// 	}
// }
