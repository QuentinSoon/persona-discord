import {
	ChatInputCommandInteraction,
	SlashCommandBuilder,
	SlashCommandOptionsOnlyBuilder,
} from 'discord.js';
import DiscordClient from './DiscordClient';

export default abstract class DiscordCommmand {
	private _data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;

	constructor(
		slashCommand: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder
	) {
		this._data = slashCommand;
	}

	abstract execute(client: DiscordClient, ...args: any[]);

	// abstract execute(client: DiscordClient, ...args: any[]);

	async register(client: DiscordClient, ...args: any[]) {
		if (this._data instanceof ChatInputCommandInteraction) {
			return await this.runSlashCommandOptionsOnlyBuilder(client, args[0]);
		}
		this.execute(client, ...args);
	}

	async runSlashCommandOptionsOnlyBuilder(
		client: DiscordClient,
		interaction: ChatInputCommandInteraction
	) {
		await this.execute(client, interaction);
	}

	get data(): SlashCommandBuilder | SlashCommandOptionsOnlyBuilder {
		return this._data;
	}
}
