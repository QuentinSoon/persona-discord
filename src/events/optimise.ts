// import { Events } from 'discord.js';
// import DiscordClient from '../client/DiscordClient';
// import DiscordEvent from '../client/DiscordEvent';
// import DiscordMessage from '../client/DiscordMessage';

// export default class OptimiseEvent extends DiscordEvent {
// 	constructor() {
// 		super(Events.MessageCreate, false);
// 	}

// 	async execute(client: DiscordClient, message: DiscordMessage) {
// 		if (message.getAuthor().bot) return;

// 		await message.replyE('Hello World!');

// 		const guild = message.getGuildId();
// 		console.log(guild);
// 	}
// }
