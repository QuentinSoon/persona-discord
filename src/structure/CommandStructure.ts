import { CommandInteraction } from 'discord.js';
import CommandBuilder from '../builder/CommandBuilder';
import DiscordClient from '../client/DiscordClient';

export default abstract class CommandStructure {
	private _data: CommandBuilder;

	constructor(command: CommandBuilder) {
		this._data = command;
	}

	execute(
		client: DiscordClient,
		interaction: CommandInteraction,
		...args: any[]
	): void {}

	get data(): CommandBuilder {
		return this._data;
	}
}
