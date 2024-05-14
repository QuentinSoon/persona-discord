import { IntentsBitField } from 'discord.js';
import DiscordClient from './modules/DiscordClient';

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
})();
