import {
	ActionRowBuilder,
	BaseInteraction,
	ButtonBuilder,
	ButtonStyle,
	EmbedBuilder,
} from 'discord.js';

export const showSetupPanel = async (interaction: BaseInteraction) => {
	if (interaction.isCommand()) {
		await interaction.editReply({
			content: '',
			embeds: [
				new EmbedBuilder()
					.setTitle('Initialisation de Persona')
					.setDescription(
						'Je possède un grands nombres de \n' +
							"modules vous permettant l'optimiser votre \n" +
							'serveur. Pour des meilleurs performances, il \n' +
							'est recommander de ne pas utiliser plusieurs \n' +
							'bot possedant les memes fonctionnalités. \n' +
							'\n' +
							'**Module Tickets:** \n' +
							'Le module tickets permet a vos utilisateurs \n' +
							"de créer des tickets pour demander de l'aide \n" +
							'ou signaler un problème. \n' +
							'\n' +
							'Clique sur le module ci-dessous pour \n' +
							'le configurer.'
					)
					.setColor('#f8e5fe'),
			],
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setLabel(`Tickets )`)
						.setStyle(ButtonStyle.Primary)
						.setCustomId('')
				),
			],
		});
	}
};
