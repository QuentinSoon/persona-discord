import path from 'path';
import EventStructure from '../../structure/EventStructure';
import { loadFiles } from '../../utils/files';
import DiscordClient from '../DiscordClient';

export default class EventsHandler {
	client: DiscordClient;

	constructor(client: DiscordClient) {
		this.client = client;
	}

	async load() {
		try {
			const files = await loadFiles('./src/events/');
			for (const file of files) {
				const { default: Event } = await import(
					path.join(__dirname, '../../../', file)
				);
				console.log(`Imported Event from file ${file}:`, Event);
				if (typeof Event !== 'function') {
					console.error(
						`Failed to load event from file ${file}: Not a constructor`
					);
					continue;
				}
				const event = new Event();
				if (event instanceof EventStructure) {
					// this.client.events.set(event.name, event);
					if (event.once) {
						this.client.once(
							event.name,
							event.execute.bind(event, this.client)
						);
					} else {
						this.client.on(event.name, event.execute.bind(event, this.client));
					}
				} else {
					console.error(
						`Event from file ${file} is not an instance of DiscordEvent`
					);
				}
			}
		} catch (err) {
			console.error(`Error loading events: ${err}`);
		}
	}
}
