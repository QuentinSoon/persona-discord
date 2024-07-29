import { Interaction, SlashCommandBuilder } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import DiscordCommmand from '../client/DiscordCommand';

export default class PingCommand extends DiscordCommmand {
	constructor() {
		super(new SlashCommandBuilder().setName('looool').setDescription('Ping!'));
	}

	async execute(client: DiscordClient, interaction: Interaction) {
		if (!interaction.isCommand()) return;
		await interaction.reply('pongsss!');
	}
}
