import { Guild } from 'discord.js';
import { client } from '..';

export const GuildIsCommunity = (guildId: string): boolean => {
	const guild: Guild | undefined = client.guilds.cache.get(guildId);
	if (!guild) return false;
	return guild.features.includes('COMMUNITY');
};
