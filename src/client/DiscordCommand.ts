import { SharedSlashCommandOptions } from 'discord.js';
import DiscordClient from './DiscordClient';

export default abstract class DiscordCommmand {
	private _name: string;
	private _option: SharedSlashCommandOptions<any>;

	constructor(name: string, option: SharedSlashCommandOptions<any>) {
		this._name = name;
		this._option = option;
	}

	abstract execute(client: DiscordClient, ...args: any[]);

	get name(): string {
		return this._name;
	}

	get option(): SharedSlashCommandOptions<any> {
		return this._option;
	}
}
