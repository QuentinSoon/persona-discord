import { IntentsBitField } from 'discord.js';
import 'dotenv/config';
import DiscordClient from './client/DiscordClient';

const client = new DiscordClient({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.MessageContent,
	],
});

(async () => {
	await client.login(process.env.BOT_TOKEN);
	client.on('ready', () => {
		console.log('Bot is ready!');
	});
})();
