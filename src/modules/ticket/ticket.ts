import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	ChannelSelectMenuBuilder,
	ChannelType,
	EmbedBuilder,
	StringSelectMenuInteraction,
} from 'discord.js';
import DiscordClient from '../../client/DiscordClient';
import ModuleStructure from '../../structure/ModuleStructure';
import { supabase } from '../../utils/supabase';

export default class TicketModule extends ModuleStructure {
	constructor(client: DiscordClient) {
		super(client, 'ticket');
	}

	start = async (client: DiscordClient, interaction: ButtonInteraction) => {
		await interaction.update({
			embeds: [
				new EmbedBuilder()
					.setTitle('Configurer le module de tickets')
					.setDescription(
						"Ce module vous permet de gérer efficacement les demandes d'assistance au sein de votre communauté.\n\n" +
							'**Fonctionnalités du Module Tickets :**\n' +
							'- Les utilisateurs peuvent créer des tickets directement depuis un canal dédié.\n' +
							"- Les modérateurs ont accès à tous les tickets créés à partir d'un forum centralisé.\n\n" +
							'Pour commencer la configuration, appuyez sur le bouton ci-dessous. Suivez les instructions et configurez votre module selon vos besoins.'
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
						.setLabel('Retour')
						.setStyle(ButtonStyle.Secondary)
						.setCustomId('panel:showModules'),
					new ButtonBuilder()
						.setLabel('Commencer la Configuration')
						.setStyle(ButtonStyle.Success)
						.setCustomId('ticket:selectTextChannel')
				),
			],
		});
	};

	selectTextChannel = async (
		client: DiscordClient,
		interaction: ButtonInteraction
	) => {
		await interaction.update({
			embeds: [
				new EmbedBuilder()
					.setTitle('Configurer le module de tickets')
					.setDescription(
						'Pour commencer, sélectionnez un salon dans lequel les utilisateurs pourront créer leurs tickets.\n\n' +
							'**Informations :**\n' +
							"- Vous pourrez toujours le modifier à l'avenir.\n\n" +
							'Sélectionnez un salon ci-dessous.'
					)
					.setThumbnail(client.user!.avatarURL())
					.setFooter({
						text: 'Persona.app - Discord Bot',
						iconURL: client.user!.avatarURL() as string,
					})
					.setColor('#f8e5fe'),
			],
			components: [
				new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents(
					new ChannelSelectMenuBuilder()
						.setCustomId('ticket:selectForumChannel')
						.setPlaceholder('Sélectionnez un salon textuel')
						.setChannelTypes(ChannelType.GuildText)
						.setDefaultChannels([])
				),
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setLabel('Retour')
						.setStyle(ButtonStyle.Secondary)
						.setCustomId('ticket:start')
				),
			],
		});
	};

	selectForumChannel = async (
		client: DiscordClient,
		interaction: StringSelectMenuInteraction
	) => {
		const id = interaction.guildId;
		if (!id) return;

		const { data, error } = await supabase
			.from('ticket_guilds')
			.insert([
				{
					guild_id: id,
					name: 'otherValue',
					description: 'otherValue',
					text_channel_id: 'otherValue',
					forum_channel_id: 'otherValue',
				},
			])
			.select();

		console.log(data);
		console.log(error);

		await interaction.update({
			embeds: [
				new EmbedBuilder()
					.setTitle('Configurer le module de tickets')
					.setDescription(
						'Ensuite, sélectionnez un salon dans lequel les modérateurs pourront voir et répondre aux tickets.\n\n' +
							'**Informations :**\n' +
							"- Vous pourrez toujours le modifier à l'avenir.\n\n" +
							'Sélectionnez un salon ci-dessous.'
					)
					.setThumbnail(client.user!.avatarURL())
					.setFooter({
						text: 'Persona.app - Discord Bot',
						iconURL: client.user!.avatarURL() as string,
					})
					.setColor('#f8e5fe'),
			],
			components: [
				new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents(
					new ChannelSelectMenuBuilder()
						.setCustomId('ticket:finish')
						.setPlaceholder('Sélectionnez un salon textuel')
						.setChannelTypes(ChannelType.GuildForum)
						.setDefaultChannels([])
				),
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setLabel('Retour')
						.setStyle(ButtonStyle.Secondary)
						.setCustomId('ticket:selectTextChannel')
				),
			],
		});
	};

	finish = async (client: DiscordClient, interaction: ButtonInteraction) => {
		await interaction.update({
			embeds: [
				new EmbedBuilder()
					.setTitle('Configurer le module de tickets')
					.setDescription('✅ La configuration des tickets est terminée.')
					.setThumbnail(client.user!.avatarURL())
					.setFooter({
						text: 'Persona.app - Discord Bot',
						iconURL: client.user!.avatarURL() as string,
					})
					.setColor('#f8e5fe'),
			],
			components: [],
		});
	};
}
