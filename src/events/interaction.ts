import { Events, Interaction } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import DiscordCommmand from '../client/DiscordCommand';
import DiscordEvent from '../client/DiscordEvent';

export default class InteractionEvent extends DiscordEvent {
	constructor() {
		super(Events.InteractionCreate, false);
	}

	async execute(client: DiscordClient, interaction: Interaction) {
		if (interaction.isCommand()) {
			if (!interaction.guildId) return;
			if (!interaction.commandName) return;
			const command: DiscordCommmand | undefined = client.commands.get(
				interaction.commandName
			);
			if (!command) return;
			await command.execute(client, interaction);
		}
	}
}
