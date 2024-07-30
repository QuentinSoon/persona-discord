import { RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
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
			client.commands.set(command.data.name, command);
		} else {
			console.error(
				`Command from file ${file} is not an instance of DiscordCommand`
			);
		}
	}
	// get all slashcommand and get json body
	const list: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
	client.commands.forEach((command) => {
		// list.push(command.data.toJSON());
		if (!command.data.name || typeof command.data.name !== 'string') {
			console.error('Command name is invalid:', command.data.name);
		} else if (
			!command.data.description ||
			typeof command.data.description !== 'string'
		) {
			console.error(
				'Command description is invalid:',
				command.data.description
			);
		} else {
			list.push(command.data.toJSON());
		}
	});
	// await addGuildsCommands(list);
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

export const loadJsonFiles = async (dir: string): Promise<string[]> => {
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
			} else if (file.endsWith('.json')) {
				fileList.push(file);
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
