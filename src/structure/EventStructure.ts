import { Events } from 'discord.js';
import DiscordClient from '../client/DiscordClient';

export default abstract class EventStructure {
	private _name: Events;
	private _once: boolean = false;

	constructor(name: Events, once: boolean = false) {
		this._name = name;
		this._once = once;
	}

	abstract execute(client: DiscordClient, ...args: any[]);

	get name(): string {
		return this._name;
	}

	get once(): boolean {
		return this._once;
	}
}
