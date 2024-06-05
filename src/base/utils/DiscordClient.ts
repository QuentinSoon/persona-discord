import { Client, ClientOptions, Collection } from 'discord.js';
import { promises as fs } from 'fs';
import path from 'path';
import { BaseEvent } from '../classes/BaseEvent';
import { GuildConfigurationType } from '../classes/GuildConfiguration.class';
import { IClient } from '../interface/IClient';
import { getGuilds } from '../sql/GuildsSQL';

export default class DiscordClient extends Client implements IClient {
	private _events = new Collection<string, BaseEvent>();
	private _configs = new Collection<string, GuildConfigurationType>();

	constructor(options: ClientOptions) {
		super(options);
	}

	get configs() {
		return this._configs;
	}
	set configs(guildConfigs: Collection<string, GuildConfigurationType>) {
		this._configs = guildConfigs;
	}

	get events() {
		return this._events;
	}

	set events(events: Collection<string, BaseEvent>) {
		this._events = events;
	}

	Init(): void {
		this.RegisterGuild();
		this.RegisterEvents();
		this.RegisterCommands();
		this.login(process.env.BOT_TOKEN);
	}
	async RegisterGuild(): Promise<void> {
		const guilds = await getGuilds();
		guilds.forEach((config) => this.configs.set(config.guildId, config));
	}
	RegisterEvents(): void {
		registerEvents(this, '../events');
	}
	RegisterCommands(): void {}
}

export async function registerEvents(client: DiscordClient, dir: string = '') {
	const filePath = path.join(__dirname, dir);
	const files = await fs.readdir(filePath);
	for (const file of files) {
		const stat = await fs.lstat(path.join(filePath, file));
		if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
		if (file.endsWith('.js') || file.endsWith('.ts')) {
			const { default: Event } = await import(path.join(dir, file));
			const event = new Event();
			client.events.set(event.name, event);
			client.on(event.name, event.execute.bind(event, client));
		}
	}
}
