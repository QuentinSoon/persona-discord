// import {
// 	ChatInputCommandInteraction,
// 	Guild,
// 	PermissionsBitField,
// 	SlashCommandBuilder,
// } from 'discord.js';
// import DiscordClient from '../client/DiscordClient';
// import DiscordCommmand from '../client/DiscordCommand';
// import { GuildType } from '../interface/Guild.interface';
// import { GuildIsCommunity } from '../utils/DiscordUtils';

// export default class PingCommand extends DiscordCommmand {
// 	constructor() {
// 		super(
// 			new SlashCommandBuilder()
// 				.setName('setup')
// 				.setDescription('Setup and configuration editor')
// 				.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
// 		);
// 	}

// 	async execute(
// 		client: DiscordClient,
// 		interaction: ChatInputCommandInteraction
// 	) {
// 		console.log('Setup command executed');
// 		const guild: Guild | null = interaction.guild;
// 		if (!interaction.guildId) return;
// 		if (!guild) return;
// 		const discordGuild: GuildType | undefined = client.configs.get(guild.id);
// 		if (!client.configs.has(guild.id)) return;
// 		if (!discordGuild) return;

// 		console.log('Initialisation du bot...');

// 		// console.log(n);

// 		if (GuildIsCommunity(interaction.guildId)) {
// 			await interaction.reply({
// 				content: '🔰 Le bot est désormais initialisé !',
// 				ephemeral: true,
// 			});
// 		} else {
// 			// await interaction.reply({
// 			// 	content: "🔰 Le bot n'est pas configurable sur ce serveur.",
// 			// 	ephemeral: true,
// 			// });
// 			console.log(guild.preferredLocale);
// 			// await interaction.reply({
// 			// 	content: client.translations
// 			// 		.get(interaction.guild.preferredLocale)
// 			// 		?.get('CAN_NOT_BE_SETUP'),
// 			// 	ephemeral: true,
// 			// });
// 			await interaction.reply({
// 				content: client.translations
// 					.get(discordGuild.guild_id)
// 					?.get('CAN_NOT_BE_SETUP'),
// 				ephemeral: true,
// 			});
// 		}
// 	}
// }
