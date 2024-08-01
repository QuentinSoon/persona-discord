import {
	CommandInteraction,
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
} from 'discord.js';
import DiscordClient from '../client/DiscordClient';

export default abstract class CommandStructure {
	private _data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
	private _customId: string | undefined;

	// add customId to command in slash command
	constructor(
		command: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder,
		customId: string | undefined = undefined
	) {
		this._data = command;
		this._customId = customId;
	}

	abstract execute(
		client: DiscordClient,
		interaction: CommandInteraction,
		...args: any[]
	);

	get data(): SlashCommandBuilder | SlashCommandOptionsOnlyBuilder {
		return this._data;
	}

	get customId(): string | undefined {
		return this._customId;
	}
}
