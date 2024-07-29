import { SlashCommandBuilder } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import DiscordCommmand from '../client/DiscordCommand';
import DiscordCommandInteraction from '../client/DiscordCommandInteraction';

export default class PingCommand extends DiscordCommmand {
	constructor() {
		super(new SlashCommandBuilder().setName('looool').setDescription('Ping!'));
	}

	async execute(
		client: DiscordClient,
		interaction: DiscordCommandInteraction
	) {}
}
