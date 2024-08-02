import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	Interaction,
} from 'discord.js';
import DiscordClient from '../../client/DiscordClient';
import ModuleStructure from '../../structure/ModuleStructure';

export default class PanelModule extends ModuleStructure {
	constructor(client: DiscordClient) {
		super(client, 'panel');
	}

	show = async (interaction: ButtonInteraction) => {
		await interaction.reply({
			ephemeral: true,
			content: 'Hello World! => SHOW',
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setCustomId('panel:selectorModule')
						.setLabel('Configurer')
						.setStyle(ButtonStyle.Primary)
				),
			],
		});
	};

	selectorModule = async (interaction: ButtonInteraction) => {
		await interaction.reply({
			ephemeral: true,
			content: 'SELECTOR',
		});
	};

	confirmeDelete = (interaction: Interaction) => {
		if (!(interaction.isButton() || interaction.isChatInputCommand())) return;
		console.log('OK');
		// const modal = new ModalBuilder()
		// 	.setCustomId('myModal')
		// 	.setTitle('My Modal');
		// // Add components to modal
		// // Create the text input components
		// const favoriteColorInput = new TextInputBuilder()
		// 	.setCustomId('favoriteColorInput')
		// 	// The label is the prompt the user sees for this input
		// 	.setLabel("What's your favorite color?")
		// 	// Short means only a single line of text
		// 	.setStyle(TextInputStyle.Short);
		// const hobbiesInput = new TextInputBuilder()
		// 	.setCustomId('hobbiesInput')
		// 	.setLabel("What's some of your favorite hobbies?")
		// 	// Paragraph means multiple lines of text.
		// 	.setStyle(TextInputStyle.Paragraph);
		// // An action row only holds one text input,
		// // so you need one action row per text input.
		// const firstActionRow =
		// 	new ActionRowBuilder<TextInputBuilder>().addComponents(
		// 		favoriteColorInput
		// 	);
		// // converse to typescript
		// const secondActionRow =
		// 	new ActionRowBuilder<TextInputBuilder>().addComponents(hobbiesInput);
		// // Add inputs to the modal
		// modal.setComponents(firstActionRow, secondActionRow);
		// await interaction.showModal(modal);
	};
}
