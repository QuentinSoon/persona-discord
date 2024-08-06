import { ChatInputCommandInteraction } from 'discord.js';
import DiscordClient from '../../client/DiscordClient';
import { SlashCommandBuilder } from '../builders/commands';

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
