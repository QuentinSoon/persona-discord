import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	ChatInputCommandInteraction,
	EmbedBuilder,
} from 'discord.js';
import DiscordClient from '../../client/DiscordClient';
import ModuleStructure from '../../structure/ModuleStructure';

export default class PanelModule extends ModuleStructure {
	constructor(client: DiscordClient) {
		super(client, 'panel');
	}

	start = async (
		client: DiscordClient,
		interaction: ButtonInteraction | ChatInputCommandInteraction
	) => {
		const panelMessage = await interaction.reply({
			ephemeral: true,
			embeds: [
				new EmbedBuilder()
					.setTitle('Initialisation de Persona')
					.setDescription(
						`Salut <@${interaction.user.id}> ! 👋 \n` +
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
						.setLabel('Configurer')
						.setStyle(ButtonStyle.Primary)
						.setCustomId('panel:showModules')
				),
			],
		});
	};

	showModules = async (
		client: DiscordClient,
		interaction: ButtonInteraction
	) => {
		await interaction.update({
			embeds: [
				new EmbedBuilder()
					.setTitle('Initialisation de Persona')
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
						.setLabel('Tickets (Non configurer)')
						.setStyle(ButtonStyle.Danger)
						.setCustomId('ticket:start'),
					new ButtonBuilder()
						.setLabel('Alertes (Non configurer)')
						.setStyle(ButtonStyle.Danger)
						.setCustomId('alert:start')
				),
			],
		});
	};

	// createTicketTemplate = async (
	// 	client: DiscordClient,
	// 	interaction: ButtonInteraction | ChatInputCommandInteraction
	// ) => {
	// 	if (!interaction.guildId) return;
	// 	const guild = client.guilds.cache.get(interaction.guildId);
	// 	if (!guild) return;

	// 	await interaction.showModal(
	// 		new ModalBuilder()
	// 			.setTitle('Créer un template de ticket')
	// 			.setCustomId('panel:selectTextChannel')
	// 			.addComponents(
	// 				new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
	// 					new TextInputBuilder()
	// 						.setLabel('Nom du template')
	// 						.setCustomId('ticket-modal-title')
	// 						.setPlaceholder('Support')
	// 						.setStyle(TextInputStyle.Short)
	// 						.setRequired(true)
	// 				),
	// 				new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
	// 					new TextInputBuilder()
	// 						.setLabel('Description du template')
	// 						.setCustomId('ticket-modal-description')
	// 						.setPlaceholder('Ticket pour le support utilisateur du serveur.')
	// 						.setStyle(TextInputStyle.Paragraph)
	// 						.setRequired(true)
	// 				)
	// 			)
	// 	);
	// };

	// selectTextChannel = async (
	// 	client: DiscordClient,
	// 	interaction: ModalSubmitInteraction
	// ) => {
	// 	await interaction.deferUpdate();
	// 	await this.panelInteraction.editReply({
	// 		embeds: [
	// 			new EmbedBuilder()
	// 				.setTitle('Configuration du module Tickets')
	// 				.setDescription(
	// 					'Veuillez sélectionner le canal de texte dans lequel vous souhaitez créer le template de ticket.'
	// 				)
	// 				.setThumbnail(client.user!.avatarURL())
	// 				.setFooter({
	// 					text: 'Persona.app - Discord Bot',
	// 					iconURL: client.user!.avatarURL() as string,
	// 				})
	// 				.setColor('#f8e5fe'),
	// 		],
	// 		components: [
	// 			new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents(
	// 				new ChannelSelectMenuBuilder()
	// 					.setCustomId('panel:selectForumChannel')
	// 					.setPlaceholder('Selectionnez un salon textuel')
	// 					.setChannelTypes(ChannelType.GuildText)
	// 					.setDefaultChannels([])
	// 			),
	// 			new ActionRowBuilder<ButtonBuilder>().addComponents(
	// 				new ButtonBuilder()
	// 					.setLabel('Retour')
	// 					.setStyle(ButtonStyle.Secondary)
	// 					.setCustomId('panel:createTicketTemplate')
	// 			),
	// 		],
	// 	});
	// };

	// selectForumChannel = async (
	// 	client: DiscordClient,
	// 	interaction: ModalSubmitInteraction
	// ) => {
	// 	await interaction.deferUpdate();
	// 	await this.panelInteraction.editReply({
	// 		embeds: [
	// 			new EmbedBuilder()
	// 				.setTitle('Configuration du module Tickets')
	// 				.setDescription(
	// 					'Veuillez sélectionner le canal de forum dans lequel vous souhaitez créer le template de ticket.'
	// 				)
	// 				.setThumbnail(client.user!.avatarURL())
	// 				.setFooter({
	// 					text: 'Persona.app - Discord Bot',
	// 					iconURL: client.user!.avatarURL() as string,
	// 				})
	// 				.setColor('#f8e5fe'),
	// 		],
	// 		components: [
	// 			new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents(
	// 				new ChannelSelectMenuBuilder()
	// 					.setCustomId('panel:configurationTemplateEnd')
	// 					.setPlaceholder('Selectionnez un salon textuel')
	// 					.setChannelTypes(ChannelType.GuildForum)
	// 					.setDefaultChannels([])
	// 			),
	// 			new ActionRowBuilder<ButtonBuilder>().addComponents(
	// 				new ButtonBuilder()
	// 					.setLabel('Retour')
	// 					.setStyle(ButtonStyle.Secondary)
	// 					.setCustomId('panel:selectTextChannel')
	// 			),
	// 		],
	// 	});
	// };

	// configurationTemplateEnd = async (
	// 	client: DiscordClient,
	// 	interaction: ModalSubmitInteraction
	// ) => {
	// 	await interaction.deferUpdate();
	// 	await this.panelInteraction.editReply({
	// 		embeds: [
	// 			new EmbedBuilder()
	// 				.setTitle('Configuration du module Tickets')
	// 				.setDescription('✅ La configuration des tickets est terminée.')
	// 				.setFooter({
	// 					text: 'Persona.app - Discord Bot',
	// 					iconURL: client.user!.avatarURL() as string,
	// 				})
	// 				.setColor('#f8e5fe'),
	// 		],
	// 		components: [],
	// 	});
	// };
}
