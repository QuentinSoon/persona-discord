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
import { TwitchUser } from '../api/TwitchAPI';
import DiscordClient from '../client/DiscordClient';
import ModuleComponent from '../components/modules';
import { redis } from '../utils/redis';
import { supabase } from '../utils/supabase';

export default class AlertModule extends ModuleComponent {
	protected timeToCache: number = 30;

	constructor(client: DiscordClient) {
		super(client, 'alert');

		setInterval(getStreamers, this.timeToCache * 1000);

		async function getStreamers() {
			// Récupère tous les streamers de la base de données
			const streamerData = await client.cache.alert.getData();

			if (!streamerData) return;

			const streamerNames = streamerData.map((row) => row.login_id);

			await updateLiveStreamers(streamerNames);

			const liveStreamers = await redis.hkeys('currentLiveStreamers');

			for (const streamer of liveStreamers) {
				const notified = await redis.sismember('notifiedStreamers', streamer);

				if (!notified) {
					await redis.sadd('notifiedStreamers', streamer);
					const streamDataRaw = await redis.hget(
						'currentLiveStreamers',
						streamer
					);
					if (!streamDataRaw) return;
					const streamData = JSON.parse(streamDataRaw);
					for (const data of streamerData.filter(
						(row) => row.login_id === streamer
					)) {
						const channel = client.channels.cache.get(
							data.channel_id ?? ''
						) as TextChannel;
						if (!channel) return;
						const thumbnail_url = streamData.thumbnail_url
							.replace('{width}', '1280')
							.replace('{height}', '720');
						const pic = await client.twitch.getProfilePicture(
							streamData.user_id
						);

						const embed = new EmbedBuilder()
							.setTitle(streamData.title)
							.setAuthor({
								iconURL: pic,
								name: `${streamData.user_name} est en live sur Twitch !`,
							})
							.setURL(`https://twitch.tv/${streamData.user_name}`)
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
							.setColor('#f8e5fe');
						if (data.description) {
							embed.setDescription(data.description);
						}
						channel.send({
							content: '',
							embeds: [embed],
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

		async function updateLiveStreamers(streamerNames: string[]) {
			await redis.del('currentLiveStreamers');

			for (let i = 0; i < streamerNames.length; i += 100) {
				const streamersBatch = streamerNames.slice(i, i + 100);
				const response = await client.twitch.getStreamsById(streamersBatch);

				for (const stream of response) {
					await redis.hset(
						'currentLiveStreamers',
						stream.user_id,
						JSON.stringify(stream)
					);
				}
			}
		}
	}

	async setup(client: DiscordClient, interaction: ButtonInteraction) {
		await interaction.update({
			content: '',
			embeds: [
				new EmbedBuilder()
					.setTitle("Configurer le module d'alerte")
					.setDescription(
						'Ce module vous permet de cree des alertes de live Twitch.\n\n' +
							'**Fonctionnalités du Module Alerte :**\n' +
							"- Lorsqu'un streamer est en live sur Twitch, une alerte est envoyée dans le salon de discussion.\n\n" +
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
						.setCustomId('setup:showModules'),
					new ButtonBuilder()
						.setLabel('Configurer une alerte')
						.setStyle(ButtonStyle.Primary)
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
							.setLabel("Description dans l'alerte (Facultatif)")
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

		let streamerData: TwitchUser | null = null;
		let streamerNameField: string = '';
		let streamerDescription: string = '';

		if (interaction.isModalSubmit()) {
			const field: ModalSubmitInteraction = interaction;
			streamerNameField = field.fields.getTextInputValue('alert-modal-title');
			streamerDescription = field.fields.getTextInputValue(
				'alert-modal-description'
			);
			streamerData = await client.twitch.getUser(streamerNameField);
		}

		if (!streamerData)
			return await interaction.update({
				content: 'Erreur lors de la récupération des données Twitch.',
				embeds: [],
				components: [],
			});

		await interaction.update({
			embeds: [
				new EmbedBuilder()
					.setTitle("Configurer le module d'alerte")
					.setDescription(`Est-ce que la personne est bien ce streamer ?`)
					.setFields(
						{
							name: 'Nom',
							value: streamerData.display_name,
							inline: true,
						},
						{
							name: 'ID',
							value: streamerData.id,
							inline: true,
						},
						{
							name: 'Description',
							value: streamerData.description || 'Aucune description',
							inline: false,
						}
					)
					.setThumbnail(streamerData.profile_image_url)
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
							`alert:addChannel:${streamerNameField}:${streamerDescription}:${streamerData.id}`
						)
				),
			],
		});
	};

	addChannel = async (
		client: DiscordClient,
		interaction: ButtonInteraction,
		streamerNameField: string,
		streamerDescription: string,
		streamerId: string
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
							`alert:comfirmAlert:${streamerNameField}:${streamerDescription}:${streamerId}`
						)
						.setPlaceholder('Selectionnez un salon textuel')
						.setChannelTypes(
							ChannelType.GuildAnnouncement,
							ChannelType.GuildText
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
		streamerDescription: string,
		streamerId: string
	) => {
		if (!interaction.guild) return;
		const loginId = streamerNameField;
		const channelId = interaction.values[0];

		const { data, error } = await supabase
			.from('alerts')
			.insert({
				guild_id: interaction.guild.id,
				login_id: streamerId,
				channel_id: channelId,
				description: streamerDescription,
			})
			.select()
			.single();

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

		// add alert to redis (alerts)
		try {
			// await redis.sadd('alerts', JSON.stringify(data));
			this.addAlert(data);
		} catch (error) {
			console.log(error);
		}
	};

	addAlert = async (data: any) => {
		try {
			// Vérifiez le type de la clé 'alerts'
			const type = await redis.type('alerts');

			if (type !== 'set') {
				if (type !== 'none') {
					// La clé existe mais n'est pas du type 'set'
					await redis.del('alerts'); // Supprimez la clé s'il existe mais n'est pas un `set`
				}
			}

			await redis.sadd('alerts', JSON.stringify(data));
		} catch (error) {
			console.error('Error adding data:', error);
		}
	};
}
