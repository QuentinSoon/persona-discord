import { Events, Message } from 'discord.js';
import DiscordClient from './DiscordClient';
import DiscordMessage from './DiscordMessage';

export default abstract class DiscordEvent {
	private _name: Events;
	private _once: boolean = false;

	constructor(name: Events, once: boolean = false) {
		this._name = name;
		this._once = once;
	}

	abstract execute(client: DiscordClient, ...args: any[]);

	async register(client: DiscordClient, ...args: any[]) {
		if (this._name === Events.MessageCreate) {
			return await this.runMessage(client, args[0]);
		}
		this.execute(client, ...args);
	}

	async runMessage(client: DiscordClient, rawMessage: Message) {
		const message = new DiscordMessage(rawMessage, client);
		await this.execute(client, message);
	}

	get name(): string {
		return this._name;
	}

	get once(): boolean {
		return this._once;
	}
}
