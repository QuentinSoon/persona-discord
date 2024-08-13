import { CommandInteraction } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import { SlashCommandBuilder } from '../client/builders/commands';
import { SlashCommandComponent } from '../components/commands';

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
	}
}
