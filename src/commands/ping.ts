import { CommandInteraction } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import { SlashCommandBuilder } from '../components/builders/commands';
import { SlashCommandComponent } from '../components/commands/commands';

export default class PingCommand extends SlashCommandComponent {
	constructor() {
		super(
			new SlashCommandBuilder().setName('ping').setDescription('Ping pong')
		);
	}

	async execute(client: DiscordClient, interaction: CommandInteraction) {
		if (!interaction.guild) return;
		const pingValue = client.ws.ping;
		await interaction.reply({
			content: `Pong! (${pingValue}ms)`,
			ephemeral: true,
			components: [],
		});

		const rs = await client.cache.guild.getData(interaction.guild.id);
		if (!rs) return;

		console.log(rs.guild_id);
	}
}
