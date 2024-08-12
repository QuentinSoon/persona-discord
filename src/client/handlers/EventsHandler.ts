import EventComponent from '../../components/events/events';
import { loadFiles } from '../../utils/files';
import DiscordClient from '../DiscordClient';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class EventsHandler {
	client: DiscordClient;

	constructor(client: DiscordClient) {
		this.client = client;
	}

	async load() {
		try {
			const basePath =
				process.env.NODE_ENV === 'production'
					? './build/' // Chemin pour le dossier build
					: './src/'; // Chemin pour le dossier src
			// const files = await loadFiles('./src/events/');
			const files = await loadFiles(basePath + '/events/');
			for (const file of files) {
				const { default: Event } = await import(path.join('../../../', file));
				console.log(`Imported Event from file ${file}:`, Event);
				if (typeof Event !== 'function') {
					console.error(
						`Failed to load event from file ${file}: Not a constructor`
					);
					continue;
				}
				const event = new Event();
				if (event instanceof EventComponent) {
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
