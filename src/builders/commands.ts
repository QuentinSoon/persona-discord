import { SlashCommandBuilder as DiscordSlashCommandBuilder } from 'discord.js';

export class SlashCommandBuilder extends DiscordSlashCommandBuilder {
	private _modules: string | undefined = undefined;

	constructor() {
		super();
	}

	build() {
		return this;
	}

	addModule(module: string): this {
		this._modules = module;
		return this;
	}

	get modules(): string | undefined {
		return this._modules;
	}
}
