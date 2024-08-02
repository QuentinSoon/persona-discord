import { Interaction } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import CommandStructure from './CommandStructure';

export default abstract class ModuleStructure {
	private _client: DiscordClient;
	private _name: string;

	constructor(client: DiscordClient, name: string) {
		this._client = client;
		this._name = name;

		this._client.on('interactionCreate', async (interaction: Interaction) => {
			if (!interaction.isButton()) return;
			if (!interaction.customId.startsWith(this._name)) return;

			const [, action] = interaction.customId.split(':');
			if (typeof (this as any)[action] === 'function') {
				await (this as any)[action](interaction);
				console.log(`Function ${action} called in PanelModule.`);
			} else {
				console.log(`Function ${action} does not exist in PanelModule.`);
			}
		});

		this._client.on('interactionCreate', async (interaction: Interaction) => {
			if (interaction.isButton()) {
				console.log('Button');
				if (!interaction.customId.startsWith(this._name)) return;
				await this.execute(interaction.customId, interaction);
			}
			if (interaction.isChatInputCommand()) {
				console.log('ChatInputCommand');
				const command: CommandStructure | undefined =
					client.collection.application_commands.get(interaction.commandName);
				if (!command) return;
				if (!command.data.modules) return;
				if (!command.data.modules.includes(this._name)) return;
				this.execute(command.data.modules, interaction);
			}
		});
	}

	async execute(customId: string, interaction: Interaction) {
		try {
			const [, action] = customId.split(':');

			if (typeof (this as any)[action] !== 'function')
				return console.log(`Function ${action} does not exist in PanelModule.`);
			const actionMethod = (this as any)[action] as Function;

			try {
				await actionMethod.call(this, interaction);
			} catch (err) {
				console.log(
					`Function ${action} called in PanelModule but interaction type does not match.`
				);
			}

			// if (typeof (this as any)[action] === 'function') {
			// 	const actionMethod = (this as any)[action] as Function;

			// 	if (this.checkInteractionType(actionMethod, interaction)) {
			// 		await actionMethod.call(this, interaction);
			// 		console.log(
			// 			`Function ${action} called in PanelModule with correct interaction type.`
			// 		);
			// 	} else {
			// 		// Vérification du type d'interaction et réponse appropriée
			// 		// if (
			// 		// 	interaction.isRepliable() &&
			// 		// 	!interaction.replied &&
			// 		// 	!interaction.deferred
			// 		// ) {
			// 		// 	if (interaction.isButton()) {
			// 		// 		await interaction.reply({
			// 		// 			content: "Type d'interaction attendu: ButtonInteraction.",
			// 		// 			ephemeral: true,
			// 		// 		});
			// 		// 	} else if (interaction.isChatInputCommand()) {
			// 		// 		await interaction.reply({
			// 		// 			content: "Type d'interaction attendu: isChatInputCommand.",
			// 		// 			ephemeral: true,
			// 		// 		});
			// 		// 	} else {
			// 		// 		await interaction.reply({
			// 		// 			content: "Type d'interaction non reconnu.",
			// 		// 			ephemeral: true,
			// 		// 		});
			// 		// 	}
			// 		// } else {
			// 		// 	console.log('Interaction already replied or deferred.');
			// 		// }

			// 		console.log(
			// 			`Function ${action} called in PanelModule but interaction type does not match.`
			// 		);
			// 	}
			// } else {
			// 	console.log(`Function ${action} does not exist in PanelModule.`);
			// }
		} catch (err) {
			console.log(err);
		}
	}
}
