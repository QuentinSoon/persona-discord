import { Interaction } from 'discord.js';
import DiscordClient from '../../client/DiscordClient';
import CommandStructure from '../../structure/CommandStructure';

export default class CommandsListener {
	constructor(client: DiscordClient) {
		client.on('interactionCreate', async (interaction: Interaction) => {
			if (!interaction.isCommand()) return;
			const command: CommandStructure | undefined =
				client.collection.application_commands.get(interaction.commandName);
			if (!command) return;

			try {
				if (command.customId) return;
				await command.execute(client, interaction);
			} catch (err) {
				console.log(err);
			}
		});
	}
}

module.exports = CommandsListener;
