import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ChatInputCommandInteraction,
	EmbedBuilder,
	Guild,
} from 'discord.js';
import DiscordClient from '../../client/DiscordClient';
import DiscordModular from '../../client/DiscordModular';
import { GuildType } from '../../interface/Guild.interface';

export default class Panel {
	private _client: DiscordClient;
	private _guild: Guild;
	private _discordGuild: GuildType;
	private _interaction: ChatInputCommandInteraction;

	constructor(
		client: DiscordClient,
		guild: Guild,
		discordGuild: GuildType,
		interaction: ChatInputCommandInteraction
	) {
		this._client = client;
		this._guild = guild;
		this._discordGuild = discordGuild;
		this._interaction = interaction;
		// this.getConfigurated();
		this.testModular();
	}

	async getConfigurated() {
		await this._interaction.editReply({
			content: '🔬 Analyse de la configuration ...',
			embeds: [],
			components: [],
		});
		await this._interaction.editReply({
			content: '🔍 Configuration de la guilde trouvée.',
			embeds: [],
			components: [],
		});
		this.showPanel();
	}
	async showPanel() {
		await this._interaction.editReply({
			content: '',
			embeds: [
				new EmbedBuilder()
					.setTitle('Initialisation de Persona')
					.setDescription(
						`Hello <@${this._interaction.user.id}> 👋 \n\n` +
							'Je suis Persona, un bot avancé de modération \n' +
							'automatique et manuelle conçu pour les \n' +
							'petites, moyennes et grandes communautés. \n\n' +
							'Pour commencer, clique sur le bouton ci-dessous\n' +
							'pour configurer ton serveur.'
					)
					.setThumbnail(this._client.user!.avatarURL())
					.setColor('#f8e5fe'),
			],
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setLabel('Configurer Persona')
						.setStyle(ButtonStyle.Primary)
						.setCustomId('configure')
				),
			],
		});
	}

	async testModular() {
		const test = new DiscordModular()
			.setLabel('Configurer Persona')
			.setStyle(ButtonStyle.Primary)
			.setCustomId('configure')
			.onClick((interaction) => {
				console.log('Button clicked!', interaction);
			});

		await this._interaction.editReply({
			content: '',
			embeds: [new EmbedBuilder().setTitle('Message de test')],
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents(test.build()),
			],
		});
	}
}
