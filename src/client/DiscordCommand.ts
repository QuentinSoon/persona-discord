import {
	Guild,
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
} from 'discord.js';
import { GuildType } from '../interface/Guild.interface';
import DiscordClient from './DiscordClient';

export default abstract class DiscordCommmand {
	private _data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;

	constructor(
		slashCommand: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder
	) {
		this._data = slashCommand;
	}

	abstract execute(
		client: DiscordClient,
		guild: Guild,
		discordGuild: GuildType,
		...args: any[]
	);

	get data(): SlashCommandBuilder | SlashCommandOptionsOnlyBuilder {
		return this._data;
	}
}
