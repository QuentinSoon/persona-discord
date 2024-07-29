import { SlashCommandBuilder } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import DiscordCommmand from '../client/DiscordCommand';
import DiscordCommandInteraction from '../client/DiscordCommandInteraction';

export default class ClearCommand extends DiscordCommmand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('clear')
				.setDescription('remove all command')
		);
	}

	async execute(client: DiscordClient, interaction: DiscordCommandInteraction) {
		await interaction.reply('ok');
	}
}
