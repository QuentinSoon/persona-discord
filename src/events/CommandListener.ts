import { Interaction } from 'discord.js';

import { Events } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import { SlashCommandComponent } from '../components/commands/commands';
import EventComponent from '../components/events/events';

export default class MessageEvent extends EventComponent {
	constructor() {
		super(Events.InteractionCreate);
	}

	async execute(client: DiscordClient, interaction: Interaction) {
		if (!interaction.isChatInputCommand()) return;
		const command: SlashCommandComponent | undefined =
			client.collection.application_commands.get(interaction.commandName);
		if (!command) return;

		try {
			if (command.data.modules) return;
			await command.execute(client, interaction);
		} catch (err) {
			console.log(err);
		}
	}
}
