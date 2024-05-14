import { IntentsBitField } from 'discord.js';
import 'dotenv/config';
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
	client.init();
})();
