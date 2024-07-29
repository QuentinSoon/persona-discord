import {
	ChatInputCommandInteraction,
	PermissionsBitField,
	SlashCommandBuilder,
} from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import DiscordCommmand from '../client/DiscordCommand';
import { GuildIsCommunity } from '../utils/DiscordUtils';

export default class PingCommand extends DiscordCommmand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('setup')
				.setDescription('Setup and configuration editor')
				.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
		);
	}

	async execute(
		client: DiscordClient,
		interaction: ChatInputCommandInteraction
	) {
		console.log('Setup command executed');
		if (!interaction.guildId) return;
		if (!interaction.guild) return;

		console.log('Initialisation du bot...');

		// console.log(n);

		if (GuildIsCommunity(interaction.guildId)) {
			await interaction.reply({
				content: '🔰 Le bot est désormais initialisé !',
				ephemeral: true,
			});
		} else {
			// await interaction.reply({
			// 	content: "🔰 Le bot n'est pas configurable sur ce serveur.",
			// 	ephemeral: true,
			// });
			console.log(interaction.guild.preferredLocale);
			await interaction.reply({
				content: client.translations
					.get(interaction.guild.preferredLocale)
					?.get('CAN_NOT_BE_SETUP'),
				ephemeral: true,
			});
		}
	}
}
