import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	CommandInteraction,
	SlashCommandBuilder,
} from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import CommandStructure from '../structure/CommandStructure';

export default class SetupCommand extends CommandStructure {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('setupmdr')
				.setNameLocalizations({
					fr: 'setup',
					'en-US': 'setup',
				})
				.setDescription('Configurer et éditeur de configuration')
				.setDescriptionLocalizations({
					fr: 'Configurer et éditeur de configuration',
					'en-US': 'Setup and configuration editor',
				}),
			'panel:confirmeDelete'
		);
	}

	async execute(client: DiscordClient, interaction: CommandInteraction) {
		await interaction.reply({
			content: `Pong! (ms)`,
			ephemeral: true,
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setCustomId('panel:selectorModule')
						.setLabel('Ping')
						.setStyle(ButtonStyle.Primary)
				),
			],
		});
	}
}
