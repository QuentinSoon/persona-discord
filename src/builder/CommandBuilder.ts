import { SlashCommandBuilder } from 'discord.js';

export default class CommandBuilder extends SlashCommandBuilder {
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
