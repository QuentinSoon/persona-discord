import { ChatInputCommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '../../builders/commands';
import DiscordClient from '../../client/DiscordClient';

export abstract class SlashCommandComponent {
	data: SlashCommandBuilder;

	constructor(command: SlashCommandBuilder) {
		this.data = command;
	}

	execute(
		client: DiscordClient,
		interaction: ChatInputCommandInteraction,
		...args: any[]
	): void {}
}
