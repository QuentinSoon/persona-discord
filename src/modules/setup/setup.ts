import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	ChatInputCommandInteraction,
	EmbedBuilder,
} from 'discord.js';
import DiscordClient from '../../client/DiscordClient';
import ModuleComponent from '../../components/modules/modules';

export default class SetupModule extends ModuleComponent {
	constructor(client: DiscordClient) {
		super(client, 'setup');
	}

	async setup(client: DiscordClient, interaction: ChatInputCommandInteraction) {
		await interaction.reply({
			content: '',
			ephemeral: true,
			embeds: [
				new EmbedBuilder()
					.setTitle('Configuration de Persona')
					.setDescription(
						`Salut <@${interaction.user.id}> ! 👋 \n\n` +
							'Persona est un bot avancé de modération automatique et manuelle, conçu pour les petites, moyennes et grandes communautés.\n\n' +
							'Ce bot est là pour vous aider à maintenir un environnement sûr et agréable. Pour commencer la configuration, veuillez appuyer sur le bouton ci-dessous.'
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
						.setCustomId('setup:showModules')
				),
			],
		});
	}

	async showModules(client: DiscordClient, interaction: ButtonInteraction) {
		await interaction.update({
			content: '',
			embeds: [
				new EmbedBuilder()
					.setTitle('Configuration de Persona')
					.setDescription(
						'Persona propose un large éventail de modules pour optimiser votre serveur. Pour des performances optimales, il est recommandé de ne pas utiliser plusieurs bots offrant les mêmes fonctionnalités.\n\n' +
							'Cliquez sur un module ci-dessous pour commencer la configuration de celui-ci.'
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
						.setLabel('Alertes (Non configurer)')
						.setStyle(ButtonStyle.Danger)
						.setCustomId('alert:setup')
				),
			],
		});
	}
}
