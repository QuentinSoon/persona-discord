import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	ChannelSelectMenuBuilder,
	ChannelSelectMenuInteraction,
	ChannelType,
	EmbedBuilder,
	ModalActionRowComponentBuilder,
	ModalBuilder,
	ModalSubmitInteraction,
	TextChannel,
	TextInputBuilder,
	TextInputStyle,
} from 'discord.js';
import DiscordClient from '../../client/DiscordClient';
import ModuleComponent from '../../components/modules/modules';
import { supabase } from '../../utils/supabase';

export default class AlertModule extends ModuleComponent {
	protected timeToCache: number = 1;

	constructor(client: DiscordClient) {
		super(client, 'alert');

		async function checkStreamers() {
			// Récupère tous les streamers de la base de données
			const streamerData = await client.cache.alert.getData();

			if (!streamerData) return;

			const streamerNames = streamerData.map((row) => row.login_id);

			await updateLiveStreamers(streamerNames);

			// Obtenir les streamers en ligne depuis Redis
			const liveStreamers = await client.redis.hkeys('currentLiveStreamers');

			for (const streamer of liveStreamers) {
				const notified = await client.redis.sismember(
					'notifiedStreamers',
					streamer
				);

				if (!notified) {
					await client.redis.sadd('notifiedStreamers', streamer);
					const streamDataRaw = await client.redis.hget(
						'currentLiveStreamers',
						streamer
					);
					if (!streamDataRaw) return;
					const streamData = JSON.parse(streamDataRaw);

					// Envoyer une notification pour chaque guilde concernée
					for (const data of streamerData.filter(
						(row) => row.login_id === streamer
					)) {
						const channel = client.channels.cache.get(
							data.channel_id ?? ''
						) as TextChannel;
						if (channel) {
							console.log(streamData);
							const thumbnail_url = streamData.thumbnail_url
								.replace('{width}', '1280')
								.replace('{height}', '720');
							const pic = await client.twitch.getProfilePicture(
								streamData.user_id
							);
							channel.send({
								content: '',
								embeds: [
									new EmbedBuilder()
										.setTitle(streamData.title)
										.setAuthor({
											iconURL: pic,
											name: `${streamData.user_name} est en live sur Twitch !`,
										})
										.setURL(`https://twitch.tv/${streamData.user_name}`)
										.setDescription(data.description ?? '')
										.setImage(thumbnail_url)
										.addFields(
											{
												name: 'Jeu',
												value: streamData.game_name ?? 'Aucun jeu',
												inline: true,
											},
											{
												name: 'Viewers',
												value: streamData.viewer_count + '' ?? '0',
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
											.setURL(`https://twitch.tv/${streamData.user_name}`)
									),
								],
							});
						}
					}
				}
			}

			// Retirer les streamers qui ne sont plus en ligne de Redis
			const notifiedStreamers = await client.redis.smembers(
				'notifiedStreamers'
			);
			for (const streamer of notifiedStreamers) {
				if (!liveStreamers.includes(streamer)) {
					await client.redis.srem('notifiedStreamers', streamer);
				}
			}
		}

		async function updateLiveStreamers(streamerNames) {
			await client.redis.del('currentLiveStreamers');

			for (let i = 0; i < streamerNames.length; i += 100) {
				const streamersBatch = streamerNames.slice(i, i + 100);
				const response = await client.twitch.getStreamsById(streamersBatch);

				for (const stream of response) {
					await client.redis.hset(
						'currentLiveStreamers',
						stream.user_id,
						JSON.stringify(stream)
					);
				}
			}
		}

		setInterval(checkStreamers, this.timeToCache * 60 * 1000);
	}

	async setup(client: DiscordClient, interaction: ButtonInteraction) {
		await interaction.update({
			content: '',
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
						.setLabel('Liste des alertes')
						.setStyle(ButtonStyle.Primary)
						.setCustomId('alert:listAlert'),
					new ButtonBuilder()
						.setLabel('Configurer une alerte')
						.setStyle(ButtonStyle.Success)
						.setCustomId('alert:showModal')
				),
			],
		});
	}

	showModal = async (client: DiscordClient, interaction: ButtonInteraction) => {
		await interaction.showModal(
			new ModalBuilder()
				.setTitle('Ajouter une nouvelle alerte')
				.setCustomId('alert:confirmUser')
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
							.setPlaceholder('PersonaApp est en stream! 🚀 @everyone')
							.setStyle(TextInputStyle.Paragraph)
							.setRequired(false)
					)
				)
		);
	};

	confirmUser = async (
		client: DiscordClient,
		interaction: ButtonInteraction
	) => {
		if (!interaction.guild) return;
		const guildId = interaction.guild.id;
		let streamerName: any;
		let streamerNameField = '';
		let streamerDescription = '';

		if (interaction.isModalSubmit()) {
			const field: ModalSubmitInteraction = interaction;
			streamerNameField = field.fields.getTextInputValue('alert-modal-title');
			streamerDescription = field.fields.getTextInputValue(
				'alert-modal-description'
			);
			streamerName = await client.twitch.getUser(streamerNameField);
			streamerNameField = streamerName.id;
		}

		await interaction.update({
			embeds: [
				new EmbedBuilder()
					.setTitle("Configurer le module d'alerte")
					.setDescription(`La personne est elle bien ce streamer ?`)
					.setFields(
						{
							name: 'Nom',
							value: streamerName.display_name,
							inline: true,
						},
						{
							name: 'ID',
							value: streamerName.id,
							inline: true,
						},
						{
							name: 'Description',
							value: streamerName.description,
							inline: false,
						}
					)
					.setThumbnail(streamerName.profile_image_url)
					.setFooter({
						text: 'Persona.app - Discord Bot',
						iconURL: client.user!.avatarURL() as string,
					})
					.setColor('#f8e5fe'),
			],
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setLabel('Annuler')
						.setStyle(ButtonStyle.Secondary)
						.setCustomId('alert:setup'),
					new ButtonBuilder()
						.setLabel('Non')
						.setStyle(ButtonStyle.Danger)
						.setCustomId('alert:showModal'),
					new ButtonBuilder()
						.setLabel('Oui')
						.setStyle(ButtonStyle.Success)
						.setCustomId(
							`alert:addChannel:${streamerNameField}:${streamerDescription}`
						)
				),
			],
		});
	};

	addChannel = async (
		client: DiscordClient,
		interaction: ButtonInteraction,
		streamerNameField: string,
		streamerDescription: string
	) => {
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
						.setCustomId(
							`alert:comfirmAlert:${streamerNameField}:${streamerDescription}`
						)
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
						.setCustomId('alert:confirmUser')
				),
			],
		});
	};

	comfirmAlert = async (
		client: DiscordClient,
		interaction: ChannelSelectMenuInteraction,
		streamerNameField: string,
		streamerDescription: string
	) => {
		const loginId = streamerNameField;
		const channelId = interaction.values[0];

		console.log(loginId + ':' + channelId);
		const { data, error } = await supabase.from('alerts').insert({
			guild_id: interaction.guild?.id,
			login_id: loginId,
			channel_id: channelId,
			description: streamerDescription,
			type: 'twitch',
		});

		if (error) return console.log(error);

		await interaction.update({
			embeds: [
				new EmbedBuilder()
					.setTitle("Configurer le module d'alerte")
					.setDescription('La configuration des alertes est terminée. 🎉')
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
