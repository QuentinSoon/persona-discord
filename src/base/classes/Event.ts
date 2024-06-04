import { Events } from 'discord.js';
import { IEvent } from '../interface/IEvent';
import { IEventOption } from '../interface/IEventOptions';
import DiscordClient from '../utils/DiscordClient';

export class Event implements IEvent {
	client: DiscordClient;
	name: Events;
	description: string;
	once: boolean;

	constructor(client: DiscordClient, options: IEventOption) {
		this.client = client;
		this.name = options.name;
		this.description = options.description;
		this.once = options.once;
	}

	Execute(...args: any[]): void {}
}
