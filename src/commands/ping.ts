import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import CommandStructure from '../structure/CommandStructure';

export default class PingCommand extends CommandStructure {
	constructor() {
		super(
			new SlashCommandBuilder().setName('ping').setDescription('Ping pong')
		);
	}

	async execute(client: DiscordClient, interaction: CommandInteraction) {
		const pingValue = client.ws.ping;
		await interaction.reply({
			content: `Pong! (${pingValue}ms)`,
			ephemeral: true,
		});
	}
}
