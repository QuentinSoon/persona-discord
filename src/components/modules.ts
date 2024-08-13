import { Events, Interaction } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import { SlashCommandComponent } from './commands';

export default abstract class ModuleComponent {
	private _client: DiscordClient;
	private _name: string;

	constructor(client: DiscordClient, name: string) {
		this._client = client;
		this._name = name;

		this._client.on(
			Events.InteractionCreate,
			async (interaction: Interaction) => {
				if (interaction.isButton()) {
					console.log('Button');
					if (!interaction.customId.startsWith(this._name)) return;
					await this.execute(interaction.customId, client, interaction);
				}
				if (interaction.isChatInputCommand()) {
					console.log('ChatInputCommand');
					const command: SlashCommandComponent | undefined =
						client.collection.application_commands.get(interaction.commandName);
					if (!command) return;
					if (!command.data.modules) return;
					if (!command.data.modules.includes(this._name)) return;
					this.execute(command.data.modules, client, interaction);
				}
				if (interaction.isModalSubmit()) {
					console.log('ModalSubmit');
					if (!interaction.customId.startsWith(this._name)) return;
					this.execute(interaction.customId, client, interaction);
				}
				if (interaction.isChannelSelectMenu()) {
					console.log('ModalSubmit');
					if (!interaction.customId.startsWith(this._name)) return;
					this.execute(interaction.customId, client, interaction);
				}
			}
		);
	}

	async execute(
		customId: string,
		client: DiscordClient,
		interaction: Interaction
	) {
		try {
			const [, action, data, ...rest] = customId.split(':');

			if (typeof (this as any)[action] !== 'function') {
				if (interaction.isButton() || interaction.isChatInputCommand()) {
					await interaction.reply({
						content: 'Error: Interaction type does not match.',
						ephemeral: true,
					});
				}
				return console.log(`Function ${action} does not exist in PanelModule.`);
			}

			const actionMethod = (this as any)[action] as Function;

			try {
				await actionMethod.call(this, client, interaction, data, ...rest);
			} catch (err) {
				console.log(
					`Function ${action} called in PanelModule but interaction type does not match.`
				);
			}
		} catch (err) {
			console.log(err);
		}
	}
}
