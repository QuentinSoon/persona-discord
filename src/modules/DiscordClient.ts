import { Client, ClientOptions, Collection } from 'discord.js';
import fs from 'fs/promises';
import path from 'path';
import { GuildType, GuildsSchema } from '../classes/Guild.class';
import { supabase } from '../utils/supabase';
import EventClient from './EventClient';

export default class DiscordClient extends Client {
	private _configs = new Collection<string, GuildType>();

	constructor(options: ClientOptions) {
		super(options);
	}

	get configs() {
		return this._configs;
	}

	set configs(configs: Collection<string, GuildType>) {
		this._configs = configs;
	}

	async init() {
		await this.fetchConfigs();
		await this.registerEvents();
		await this.login(process.env.BOT_TOKEN);

		// const { default: Event } = await import('../app/events/ready');
		// const event = new Event();

		// this.once(event.name, event.execute.bind(event, this));
	}

	async registerEvents() {
		const eventFiles = await this.getFiles('../app/events');
		console.log(eventFiles);

		for (const file of eventFiles) {
			const { default: Event } = await import(file);
			const event = new Event();

			if (event.once) {
				this.once(event.name, event.execute.bind(event, this));
			} else {
				this.on(event.name, event.execute.bind(event, this));
			}
		}
	}

	async getFiles(dir: string) {
		const filePath = path.join(__dirname, dir);
		const files = await fs.readdir(filePath);

		const fileList: any = [];
		// get all files in the directory and subdirectories and add them to the fileList only if is ts or js file and if file extends EventClient
		for (const file of files) {
			const stat = await fs.lstat(path.join(filePath, file));
			if (stat.isDirectory()) {
				const subFiles: any = await this.getFiles(path.join(dir, file));
				fileList.push(...subFiles);
			} else if (file.endsWith('.ts') || file.endsWith('.js')) {
				const { default: Event } = await import(path.join(filePath, file));
				if (Event.prototype instanceof EventClient) {
					fileList.push(path.join(dir, file));
				}
			}
		}

		// for (const file of files) {
		// 	const stat = await fs.lstat(path.join(filePath, file));
		// 	if (stat.isDirectory()) {
		// 		const subFiles: any = await this.getFiles(path.join(dir, file));
		// 		fileList.push(...subFiles);
		// 	} else if (file.endsWith('.ts') || file.endsWith('.js')) {
		// 		fileList.push(path.join(dir, file));
		// 	}
		// }

		// for (const file of files) {
		// 	const stat = await fs.lstat(path.join(filePath, file));
		// 	if (stat.isDirectory()) {
		// 		const subFiles: any = await this.getFiles(path.join(dir, file));
		// 		fileList.push(...subFiles);
		// 	} else {
		// 		fileList.push(path.join(dir, file));
		// 	}
		// }

		return fileList;
	}

	async getGuilds() {
		const { error, data } = await supabase.from('guilds').select('*');
		return GuildsSchema.parse(data);
	}

	async fetchConfigs() {
		const guilds = await this.getGuilds();
		this._configs = new Collection(
			guilds.map((guild) => [guild.guild_id, guild])
		);
	}
}
