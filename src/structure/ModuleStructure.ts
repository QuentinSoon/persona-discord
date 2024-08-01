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

			// this.interactions(this._client, interaction);

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
			}
			if (interaction.isModalSubmit()) {
				console.log('ModalSubmit');
			}
			if (interaction.isChatInputCommand()) {
				console.log('ChatInputCommand');
				const command: CommandStructure | undefined =
					client.collection.application_commands.get(interaction.commandName);
				if (!command) return;
				if (!command.customId) return;
				if (!command.customId.startsWith(this._name)) return;
				this.execute(command.customId, interaction);
			}
		});
	}

	async execute(customId: string, interaction: Interaction) {
		try {
			const [, action] = customId.split(':');

			if (typeof (this as any)[action] === 'function') {
				const actionMethod = (this as any)[action] as Function;

				if (this.checkInteractionType(actionMethod, interaction)) {
					await actionMethod.call(this, interaction);
					console.log(
						`Function ${action} called in PanelModule with correct interaction type.`
					);
				} else {
					// Vérification du type d'interaction et réponse appropriée
					// if (
					// 	interaction.isRepliable() &&
					// 	!interaction.replied &&
					// 	!interaction.deferred
					// ) {
					// 	if (interaction.isButton()) {
					// 		await interaction.reply({
					// 			content: "Type d'interaction attendu: ButtonInteraction.",
					// 			ephemeral: true,
					// 		});
					// 	} else if (interaction.isChatInputCommand()) {
					// 		await interaction.reply({
					// 			content: "Type d'interaction attendu: isChatInputCommand.",
					// 			ephemeral: true,
					// 		});
					// 	} else {
					// 		await interaction.reply({
					// 			content: "Type d'interaction non reconnu.",
					// 			ephemeral: true,
					// 		});
					// 	}
					// } else {
					// 	console.log('Interaction already replied or deferred.');
					// }

					console.log(
						`Function ${action} called in PanelModule but interaction type does not match.`
					);
				}
			} else {
				console.log(`Function ${action} does not exist in PanelModule.`);
			}
		} catch (err) {
			console.log(err);
		}
	}

	private checkInteractionType(
		actionMethod: Function,
		interaction: Interaction
	): boolean {
		// Obtenez le nom du type d'interaction attendu par la méthode
		const expectedInteractionType =
			this.getExpectedInteractionType(actionMethod);
		// Comparez le type d'interaction attendu avec le type réel
		return interaction.constructor.name === expectedInteractionType;
	}

	private getExpectedInteractionType(actionMethod: Function): string {
		// Ici, nous déterminons dynamiquement le type d'interaction attendu
		// Vous pouvez améliorer cette logique selon vos besoins
		const methodName = actionMethod.name;
		switch (methodName) {
			case 'ButtonInteraction':
				return 'ButtonInteraction';
			case 'ChatInputCommandInteraction':
				return 'ChatInputCommandInteraction';
			default:
				return 'Interaction';
		}
	}
}
