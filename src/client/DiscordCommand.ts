import { SlashCommandBuilder } from 'discord.js';
import DiscordClient from './DiscordClient';

export default abstract class DiscordCommmand {
	private _data: SlashCommandBuilder;

	constructor(slashCommand: SlashCommandBuilder) {
		this._data = slashCommand;
	}

	abstract execute(client: DiscordClient, ...args: any[]);

	get data(): SlashCommandBuilder {
		return this._data;
	}
}
