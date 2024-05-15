import { Events } from 'discord.js';
import DiscordClient from '../../modules/DiscordClient';
import EventClient from '../../modules/EventClient';

export default class ReadyEvent extends EventClient {
	public name = Events.ClientReady;
	public once = true;
	async execute(client: DiscordClient, ...args: any) {
		console.log(`Logged in as ${client.user?.tag}`);
	}
}
