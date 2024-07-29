import { Collection, IntentsBitField } from 'discord.js';
import 'dotenv/config';
import DiscordClient from './client/DiscordClient';
import { GuildsType, GuildType } from './interface/Guild.interface';
import { loadCommands, loadEvents } from './loaders/loader';
import { getGuilds } from './utils/sql/Guild.sql';

const client = new DiscordClient({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.MessageContent,
	],
});

(async () => {
	try {
		const guilds: GuildsType = await getGuilds();

		const config = new Collection<string, GuildType>();
		guilds.forEach((guild) => {
			config.set(guild.guild_id, guild);
		});
		client.configs = config;
	} catch (error) {
		console.error(error);
	}

	await loadEvents(client);
	await loadCommands(client);
	await client.login(process.env.BOT_TOKEN);
})();
