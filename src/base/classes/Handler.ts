import { glob } from 'glob';
import path from 'path';
import { IHandler } from '../interface/IHandler';
import DiscordClient from '../utils/DiscordClient';
import { Event } from './Event';

export class Handler implements IHandler {
	client: DiscordClient;

	constructor(client: DiscordClient) {
		this.client = client;
	}

	async LoadEvents() {
		const files = (await glob('src/base/events/**/*.ts')).map((filePath) =>
			path.resolve(filePath)
		);

		files.forEach(async (file: string) => {
			const event: Event = new (await import(file)).default(this.client);

			if (!event.name)
				return (
					delete require.cache[require.resolve(file)] &&
					console.log(`[Event] ${file.split('/').pop()} failed to load.`)
				);

			const execute = (...args: any) => event.Execute(...args);

			// @ts-ignore
			if (event.once) this.client.once(event.name, execute);
			// @ts-ignore
			else this.client.on(event.name, execute);

			return delete require.cache[require.resolve(file)];
		});
	}
}
