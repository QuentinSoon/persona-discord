import axios from 'axios';
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ChatInputCommandInteraction,
	EmbedBuilder,
	Guild,
	PermissionsBitField,
	SlashCommandBuilder,
	TextChannel,
} from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import DiscordCommmand from '../client/DiscordCommand';
import DiscordModular from '../client/DiscordModular';
import { GuildType } from '../interface/Guild.interface';

export default class SetupCommand extends DiscordCommmand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('setup')
				.setDescription('Setup and configuration editor')
				.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
		);
	}

	async execute(
		client: DiscordClient,
		guild: Guild,
		discordGuild: GuildType,
		interaction: ChatInputCommandInteraction
	) {
		await interaction.deferReply({ fetchReply: true, ephemeral: true });

		// const panel = new Panel(client, guild, discordGuild, interaction);

		// await interaction.editReply({
		// 	content: '🔬 Analyse de la configuration ...',
		// 	embeds: [],
		// 	components: [],
		// });

		// await interaction.editReply({
		// 	content: '🔍 Configuration de la guilde trouvée.',
		// 	embeds: [],
		// 	components: [],
		// });

		const button = new DiscordModular()
			.setLabel('Configurer Persona')
			.setStyle(ButtonStyle.Primary)
			.setId('configured')
			.onClick((interaction) => {
				console.log('Button clicked!');
			});

		await interaction.editReply({
			content: '',
			embeds: [
				new EmbedBuilder()
					.setTitle('Initialisation de Persona')
					.setDescription(
						`Hello <@${interaction.user.id}> 👋 \n\n` +
							'Je suis Persona, un bot avancé de modération \n' +
							'automatique et manuelle conçu pour les \n' +
							'petites, moyennes et grandes communautés. \n\n' +
							'Pour commencer, clique sur le bouton ci-dessous\n' +
							'pour configurer ton serveur.'
					)
					.setThumbnail(client.user!.avatarURL())
					.setColor('#f8e5fe'),
			],
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents(button.build()),
			],
		});
	}
}

async function checkSubscriptionStatus(
	guild: Guild,
	channel: TextChannel
): Promise<boolean> {
	let isPremium = false;
	try {
		const response = await axios.get(
			`https://discord.com/api/v10/applications/${process.env.CLIENT_ID}/entitlements`,
			{
				headers: {
					Authorization: `Bot ${process.env.BOT_TOKEN}`,
				},
			}
		);
		console.log(response.data);
		await response.data.forEach(async (datas) => {
			let guildId = datas.guild_id;
			if (guildId === guild.id) {
				isPremium = true;
			}
		});
	} catch (error) {
		console.error(`Failed to fetch subscription info: ${error}`);
		if (channel) {
			channel.send(`Failed to fetch subscription info: ${error.message}`);
		}
		return false;
	}
	return isPremium;
}
