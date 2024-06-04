import { Events } from 'discord.js';
import DiscordClient from '../utils/DiscordClient';

export interface IEvent {
	client: DiscordClient;
	name: Events;
	description: string;
	once: boolean;
}
