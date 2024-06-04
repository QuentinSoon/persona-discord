import { Events } from 'discord.js';

export interface IEventOption {
	name: Events;
	description: string;
	once: boolean;
}
