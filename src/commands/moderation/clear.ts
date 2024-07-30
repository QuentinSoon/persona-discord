import {
	ChatInputCommandInteraction,
	Guild,
	PermissionsBitField,
	SlashCommandBuilder,
	TextChannel,
} from 'discord.js';
import DiscordClient from '../../client/DiscordClient';
import DiscordCommmand from '../../client/DiscordCommand';
import { GuildType } from '../../interface/Guild.interface';

export default class ClearCommand extends DiscordCommmand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('clear')
				.setDescription('Delete previous messages')
				.addIntegerOption((option) =>
					option
						.setName('number')
						.setDescription('Number of messages to delete')
						.setRequired(true)
						.setMinValue(1)
						.setMaxValue(99)
				)
				.setDefaultMemberPermissions(PermissionsBitField.Flags.ManageMessages)
		);
	}

	async execute(
		client: DiscordClient,
		guild: Guild,
		discordGuild: GuildType,
		interaction: ChatInputCommandInteraction
	) {
		const number = interaction.options.getInteger('number');
		try {
			if (number === null) {
				await interaction.reply({
					content: 'You must specify the number of messages to delete.',
					ephemeral: true,
				});
				return;
			}

			const channel = interaction.channel as TextChannel;
			if (!channel) return;

			const listmessages = await channel.messages.fetch({ limit: number });
			await channel.bulkDelete(listmessages);

			await interaction.reply({
				content: `🔰 Tres bien, je supprime ${number} messages.`,
				ephemeral: true,
			});
		} catch (error: any) {
			await interaction.reply({
				content: `❌ Une erreur s'est produite : ${error.message}`,
				ephemeral: true,
			});
		}
	}
}
