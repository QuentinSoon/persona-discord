import { REST, Routes } from 'discord.js';
import path from 'path';
import DiscordClient from '../../client/DiscordClient';
import { SlashCommandComponent } from '../../components/commands';
import { loadFiles } from '../../utils/files';

const rest = new REST().setToken(process.env.BOT_TOKEN as string);
const clientId: string = process.env.CLIENT_ID as string;

export default class CommandsHandler {
	client: DiscordClient;

	constructor(client: DiscordClient) {
		this.client = client;
	}

	async load() {
		try {
			const files = await loadFiles('../../commands/');
			for (const file of files) {
				const { default: Command } = await import(path.join(file));
				console.log(`Imported Command from file ${file}:`, Command);
				if (typeof Event !== 'function') {
					console.error(
						`Failed to load command from file ${file}: Not a constructor`
					);
					continue;
				}
				const command = new Command();
				if (command instanceof SlashCommandComponent) {
					this.client.collection.application_commands.set(
						command.data.name,
						command
					);
					this.client.rest_application_commands_array.push(
						command.data.toJSON()
					);
				} else {
					console.error(
						`Command from file ${file} is not an instance of CommandStructure`
					);
				}
			}
		} catch (err) {
			console.error(`Error loading commands: ${err}`);
		}
	}

	async registerApplicationCommands() {
		try {
			console.log(
				`Started add ${this.client.rest_application_commands_array.length} application (/) commands.`
			);

			const data: any = await rest.put(
				Routes.applicationCommands(process.env.CLIENT_ID as string),
				{
					body: this.client.rest_application_commands_array,
				}
			);
			console.log(`Successfully add ${data.length} application (/) commands.`);
		} catch (error) {
			console.error(error);
		}
	}
}
