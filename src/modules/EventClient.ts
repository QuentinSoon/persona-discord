import { Events } from 'discord.js';
import DiscordClient from './DiscordClient';

export default abstract class EventClient {
	public abstract name: Events;
	public abstract once: boolean;
	abstract execute(client: DiscordClient, ...args: any): {};
}
