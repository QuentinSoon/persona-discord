import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	CommandInteraction,
} from 'discord.js';
import CommandBuilder from '../builder/CommandBuilder';
import DiscordClient from '../client/DiscordClient';
import CommandStructure from '../structure/CommandStructure';

export default class PingCommand extends CommandStructure {
	constructor() {
		super(new CommandBuilder().setName('ping').setDescription('Ping pong'));
	}

	async execute(client: DiscordClient, interaction: CommandInteraction) {
		const pingValue = client.ws.ping;
		await interaction.reply({
			content: `Pong! (${pingValue}ms)`,
			ephemeral: true,
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setCustomId('panel:confirmeDelete')
						.setLabel('Ping')
						.setStyle(ButtonStyle.Primary)
				),
			],
		});
	}
}
