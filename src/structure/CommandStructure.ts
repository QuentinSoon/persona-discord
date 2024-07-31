import {
	CommandInteraction,
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
} from 'discord.js';
import DiscordClient from '../client/DiscordClient';

export default abstract class CommandStructure {
	private _data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;

	constructor(command: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder) {
		this._data = command;
	}

	abstract execute(
		client: DiscordClient,
		interaction: CommandInteraction,
		...args: any[]
	);

	get data(): SlashCommandBuilder | SlashCommandOptionsOnlyBuilder {
		return this._data;
	}
}
