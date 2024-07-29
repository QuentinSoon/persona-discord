import { Interaction, SlashCommandBuilder } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import DiscordCommmand from '../client/DiscordCommand';

export default class ClearCommand extends DiscordCommmand {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('clear')
				.setDescription('remove all command')
		);
	}

	async execute(client: DiscordClient, interaction: Interaction) {
		if (!interaction.isCommand()) return;
		// await deleteAllGuildsCommands();
	}
}
