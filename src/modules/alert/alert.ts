import axios from 'axios';
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	Channel,
	ChannelSelectMenuBuilder,
	ChannelSelectMenuInteraction,
	ChannelType,
	EmbedBuilder,
	ModalActionRowComponentBuilder,
	ModalBuilder,
	ModalSubmitInteraction,
	NewsChannel,
	TextInputBuilder,
	TextInputStyle,
} from 'discord.js';
import 'dotenv/config';
import DiscordClient from '../../client/DiscordClient';
import {
	AlertsSchema,
	AlertsType,
	AlertType,
} from '../../interface/Alert.interface';
import ModuleStructure from '../../structure/ModuleStructure';
import { getData, setData, updateData } from '../../utils/data';

export default class AlertModule extends ModuleStructure {
	constructor(client: DiscordClient) {
		super(client, 'alert');

		setInterval(async () => {
			// const result = await client.redis.get('alerts');
			const result = await getData(client, 'alerts');
			if (!result) return console.log('No alert found');
			const data: AlertsType = AlertsSchema.parse(result);
			if (!data) return console.log('No alert found');
			data.map(async (alert) => {
				if (alert.type === 'twitch') {
					if (!alert.channel_id) return;
					checkIfLive(alert.name, alert.channel_id, alert);
				}
			});
		}, Number(process.env.INTERVAL_ALERT ?? 60) * 1000);

		async function checkIfLive(
			username: string,
			channelSender: string,
			alert: AlertType
		) {
			try {
				const response = await axios.get(
					`https://api.twitch.tv/helix/streams?user_login=${username}`,
					{
						headers: {
							Authorization: `Bearer ${process.env.TWITCH_ACCESS_TOKEN}`,
							'Client-Id': process.env.TWITCH_CLIENT_ID,
						},
					}
				);
				if (response.data.data.length === 0) {
					console.log(`${username} is not live`);
					return;
				}
				const data = await response.data.data[0];
				console.log('Response:', data);

				const channel = (await client.channels.cache.find(
					(channel) => channel.id === channelSender
				)) as Channel;
				if (!channel) return;
				const chan: NewsChannel = channel as NewsChannel;

				const thumbnail_url = data.thumbnail_url
					.replace('{width}', '1280')
					.replace('{height}', '720');
				console.log(thumbnail_url);
				console.log(data.game_name);
				console.log(data.viewer_count);
				await chan.send({
					content: alert.description ?? 'Aucune description',
					embeds: [
						new EmbedBuilder()
							.setTitle(data.title)
							.setURL(`https://twitch.tv/${username}`)
							.setImage(thumbnail_url)
							.addFields(
								{
									name: 'Jeu',
									value: data.game_name ?? 'Aucun jeu',
									inline: true,
								},
								{
									name: 'Viewers',
									value: data.viewer_count + '' ?? '0',
									inline: true,
								}
							)

							.setFooter({
								text: 'Persona.app - Discord Bot',
								iconURL: client.user!.avatarURL() as string,
							})
							.setColor('#f8e5fe'),
					],
					components: [
						new ActionRowBuilder<ButtonBuilder>().addComponents(
							new ButtonBuilder()
								.setLabel('Voir sur Twitch')
								.setStyle(ButtonStyle.Link)
								.setURL(`https://twitch.tv/${username}`)
						),
					],
				});
			} catch (error) {
				console.log('Error occurred:', error);
			}
		}
	}

	start = async (client: DiscordClient, interaction: ButtonInteraction) => {
		await interaction.update({
			embeds: [
				new EmbedBuilder()
					.setTitle("Configurer le module d'alerte")
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
						.setCustomId('alert:showModal')
				),
			],
		});
	};

	showModal = async (client: DiscordClient, interaction: ButtonInteraction) => {
		await interaction.showModal(
			new ModalBuilder()
				.setTitle('Ajouter une nouvelle alerte')
				.setCustomId('alert:selectTextChannel')
				.addComponents(
					new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
						new TextInputBuilder()
							.setLabel('Nom du streamer')
							.setCustomId('alert-modal-title')
							.setPlaceholder('PersonaApp')
							.setStyle(TextInputStyle.Short)
							.setRequired(true)
					),
					new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
						new TextInputBuilder()
							.setLabel('Description du template')
							.setCustomId('alert-modal-description')
							.setPlaceholder('PersonaApp est en stream! 🚀')
							.setStyle(TextInputStyle.Paragraph)
							.setRequired(false)
					)
				)
		);
	};

	selectTextChannel = async (
		client: DiscordClient,
		interaction: ButtonInteraction
	) => {
		const id = interaction.guildId;

		if (interaction.isModalSubmit()) {
			const field: ModalSubmitInteraction = interaction;
			const twitchUsername =
				field.fields.getTextInputValue('alert-modal-title');
			const twitchDescription = field.fields.getTextInputValue(
				'alert-modal-description'
			);

			if (!twitchUsername || !twitchDescription) return;

			try {
				const result: AlertsType = await getData(client, 'alerts');
				if (!result) return;
				const alert = result.find((alert) => alert.name === twitchUsername);
				if (alert) return console.log('Alert already exists');
				await setData(client, 'alerts', [
					...result,
					{
						guild_id: id,
						name: twitchUsername,
						description: twitchDescription,
						type: 'twitch',
					},
				]);
			} catch (error) {
				console.log('Error occurred:', error);
			}
		}

		await interaction.update({
			embeds: [
				new EmbedBuilder()
					.setTitle("Configurer le module d'alerte")
					.setDescription('Selectionnez un salon qui recevra les alertes.')
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
						.setCustomId('alert:confirmAlert')
						.setPlaceholder('Selectionnez un salon textuel')
						.setChannelTypes(
							ChannelType.GuildAnnouncement | ChannelType.GuildText
						)
						.setDefaultChannels([])
				),
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setLabel('Retour')
						.setStyle(ButtonStyle.Secondary)
						.setCustomId('alert:start')
				),
			],
		});
	};

	confirmAlert = async (
		client: DiscordClient,
		interaction: ChannelSelectMenuInteraction
	) => {
		const id = interaction.guildId;
		if (!id) return;
		const channel = interaction.values[0];
		console.log(channel);

		await updateData(
			client,
			'alerts',
			[
				{
					channel_id: channel,
				},
			],
			id
		);
	};
}
