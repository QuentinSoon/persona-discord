import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ChatInputCommandInteraction,
	EmbedBuilder,
} from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import ModuleComponent from '../components/modules';

export default class SetupModule extends ModuleComponent {
	constructor(client: DiscordClient) {
		super(client, 'setup');
	}

	async setup(client: DiscordClient, interaction: ChatInputCommandInteraction) {
		if (!interaction.guild) return;

		await interaction.reply({
			content: '',
			ephemeral: true,
			embeds: [
				new EmbedBuilder()
					.setTitle('Initialisation de Persona')
					.setDescription(
						`Salut <@${interaction.user.id}> ! 👋 \n\n` +
							'Persona est un bot avancé de modération automatique et manuelle, conçu pour les petites, moyennes et grandes communautés.\n\n' +
							'Persona est là pour vous aider à maintenir un environnement sûr et agréable. Pour commencer la configuration, veuillez appuyer sur le bouton ci-dessous.'
					)
					.setThumbnail(client.user!.avatarURL())
					.setFooter({
						text: 'Persona.app - Discord Bot',
						iconURL: client.user!.avatarURL() as string,
					})
					.setColor('#f8e5fe'),
			],
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setLabel('Commencer la Configuration')
						.setStyle(ButtonStyle.Primary)
						.setCustomId('panel:showModules')
				),
			],
		});
	}
}
