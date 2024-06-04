import { Client, ClientOptions, Collection } from 'discord.js';
import { GuildConfigurationType } from '../classes/GuildConfiguration.class';
import { Handler } from '../classes/Handler';
import { IClient } from '../interface/IClient';
import { getGuilds } from '../sql/GuildsSQL';

export default class DiscordClient extends Client implements IClient {
	private _configs = new Collection<string, GuildConfigurationType>();
	_handlers: Handler;

	constructor(options: ClientOptions) {
		super(options);
		this._handlers = new Handler(this);
	}

	get configs() {
		return this._configs;
	}
	set configs(guildConfigs: Collection<string, GuildConfigurationType>) {
		this._configs = guildConfigs;
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
		this._handlers.LoadEvents();
	}
	RegisterCommands(): void {}
}
