import { Client, ClientOptions, Collection } from 'discord.js';
import { glob } from 'glob';
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
		registerEvents(this);
	}
	RegisterCommands(): void {}
}

export function registerEvents(client: DiscordClient) {
	const eventFiles = glob.

	console.log(eventFiles);
}
