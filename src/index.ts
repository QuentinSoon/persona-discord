import { Collection, IntentsBitField } from 'discord.js';
import 'dotenv/config';
import DiscordClient from './client/DiscordClient';
import { GuildsType, GuildType } from './interface/Guild.interface';
import { loadCommands, loadEvents } from './loaders/loader';
import { getGuilds } from './utils/sql/Guild.sql';

export const client = new DiscordClient({
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

		// supabase
		// 	.channel('guilds')
		// 	.on(
		// 		'postgres_changes',
		// 		{ event: 'UPDATE', schema: 'public', table: 'guilds' },
		// 		(payload) => {
		// 			client.configs.set(payload.new.guildId, payload.new as GuildType);
		// 		}
		// 	)
		// 	.subscribe();

		await loadEvents(client);
		await loadCommands(client);
		await client.login(process.env.BOT_TOKEN);
	} catch (error) {
		console.error(error);
	}
})();
