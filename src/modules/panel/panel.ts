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
						`Salut <@${interaction.user.id}> 👋 \n` +
							'Je suis Persona, un bot avancé de modération \n' +
							'automatique et manuelle conçu pour les \n' +
							'petites, moyennes et grandes communautés. \n\n' +
							'Je suis là pour vous aider à maintenir un \n' +
							'environnement sûr et agréable. Pour commencer \n' +
							'la configuration, appuyez simplement sur \n' +
							'le bouton ci-dessous.'
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
		interaction: ButtonInteraction | ChatInputCommandInteraction
	) => {
		await interaction.reply({
			ephemeral: true,
			embeds: [
				new EmbedBuilder()
					.setTitle('Initialisation de Persona')
					.setDescription(
						'Je possède un grands nombres de \n' +
							"modules vous permettant l'optimiser votre \n" +
							'serveur. Pour des meilleurs performances, il \n' +
							'est recommander de ne pas utiliser plusieurs \n' +
							'bot possedant les memes fonctionnalités. \n' +
							'\n' +
							'**Module Tickets:** \n' +
							'Le module tickets permet a vos utilisateurs \n' +
							"de créer des tickets pour demander de l'aide \n" +
							'ou signaler un problème. \n' +
							'\n' +
							'Clique sur le module ci-dessous pour \n' +
							'le configurer.'
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
						.setCustomId('ticket:start')
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
