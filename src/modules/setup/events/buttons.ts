import { ButtonInteraction, Guild } from 'discord.js';
import DiscordClient from '../../../client/DiscordClient';
import { GuildType } from '../../../interface/Guild.interface';

export const onButtonClick = async (
	client: DiscordClient,
	guild: Guild,
	discordGuild: GuildType,
	interaction: ButtonInteraction
) => {
	console.log(interaction.customId);
};
