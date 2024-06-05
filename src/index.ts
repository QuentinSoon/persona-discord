import { IntentsBitField } from 'discord.js';
import 'dotenv/config';
import fs from 'fs';
import DiscordClient from './base/utils/DiscordClient';

const client = new DiscordClient({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.MessageContent,
	],
});

(async () => {
	client.Init();

	console.log('Registering events...');
	const files = fs.readFileSync('../events/client/ready.ts', 'utf-8');
	console.log(files);
})();
