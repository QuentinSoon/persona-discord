import fs from 'fs';
import path from 'path';
import DiscordClient from '../client/DiscordClient';
import DiscordCommmand from '../client/DiscordCommand';
import DiscordEvent from '../client/DiscordEvent';

export const loadEvents = async (client: DiscordClient) => {
	const files = await loadFiles('./src/events/');
	for (const file of files) {
		const { default: Event } = await import(
			path.join(__dirname, '../../', file)
		);
		console.log(`Imported Event from file ${file}:`, Event);

		if (typeof Event !== 'function') {
			console.error(
				`Failed to load event from file ${file}: Not a constructor`
			);
			continue;
		}

		const event = new Event();
		if (event instanceof DiscordEvent) {
			client.events.set(event.name, event);
			if (event.once) {
				client.once(event.name, event.register.bind(event, client));
			} else {
				client.on(event.name, event.register.bind(event, client));
			}
		} else {
			console.error(
				`Event from file ${file} is not an instance of DiscordEvent`
			);
		}
	}
};

// Fait comme pour loadEvents mais pour les commandes
export const loadCommands = async (client: DiscordClient) => {
	const files = await loadFiles('./src/commands/');
	for (const file of files) {
		const { default: Command } = await import(
			path.join(__dirname, '../../', file)
		);
		console.log(`Imported Command from file ${file}:`, Command);

		if (typeof Command !== 'function') {
			console.error(
				`Failed to load command from file ${file}: Not a constructor`
			);
			continue;
		}
		const command = new Command();
		if (command instanceof DiscordCommmand) {
			// client.commands.set(command.name, command);
			// if (command.once) {
			// 	client.once(command.name, command.register.bind(command, client));
			// } else {
			// 	client.on(command.name, command.register.bind(command, client));
			// }
		} else {
			console.error(
				`Command from file ${file} is not an instance of DiscordCommand`
			);
		}
	}
};

export const loadFiles = async (dir: string): Promise<string[]> => {
	const getTsFiles = async (
		dir: string,
		fileList: string[] = []
	): Promise<string[]> => {
		const files = await fs.promises.readdir(dir);

		for (const file of files) {
			const filePath = path.join(dir, file);
			const stat = await fs.promises.stat(filePath);

			if (stat.isDirectory()) {
				await getTsFiles(filePath, fileList);
			} else if (file.endsWith('.ts')) {
				fileList.push(filePath);
			}
		}

		return fileList;
	};
	try {
		const tsFiles = await getTsFiles(dir);
		return tsFiles;
	} catch (err) {
		console.error(`Error reading directory ${dir}:`, err);
		throw err;
	}
};
