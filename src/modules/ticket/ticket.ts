import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonInteraction,
	ButtonStyle,
	ChatInputCommandInteraction,
	EmbedBuilder,
} from 'discord.js';
import DiscordClient from '../../client/DiscordClient';
import ModuleStructure from '../../structure/ModuleStructure';

export default class TicketModule extends ModuleStructure {
	panelInteraction: ButtonInteraction | ChatInputCommandInteraction;

	constructor(client: DiscordClient) {
		super(client, 'ticket');
	}

	start = async (
		client: DiscordClient,
		interaction: ButtonInteraction | ChatInputCommandInteraction
	) => {
		const panelMessage = await interaction.reply({
			ephemeral: true,
			embeds: [
				new EmbedBuilder()
					.setTitle('Configurer le module de tickets')
					.setDescription(
						'Vous êtes sur le point de configurer \n' +
							'le module de tickets. \n' +
							'\n' +
							'**Informations:**\n' +
							'- Pour les utilisateurs, ils auront la possibilité de cree des tickets depuis un channel specific qui créra ensuite des sous channels.\n' +
							'- Pour les modérateurs, ils auront accèes aux tickets depuis un channel de forum qui affiche tous les tickets des utilisateurs.\n' +
							'\n' +
							'Pour configurer les tickets, cliquez \n' +
							'sur le bouton ci-dessous.'
					)
					.setThumbnail(client.user!.avatarURL())
					.setFooter({
						text: 'Persona.app - Discord Bot',
						iconURL: client.user!.avatarURL() as string,
					})
					.setColor('#f8e5fe'),
			],
			components: [
				new ActionRowBuilder<ButtonBuilder>().addComponents(
					new ButtonBuilder()
						.setLabel('Commencer')
						.setStyle(ButtonStyle.Success)
						.setCustomId('ticket:selectTextChannel')
				),
			],
		});
		this.panelInteraction = interaction;
	};
}
