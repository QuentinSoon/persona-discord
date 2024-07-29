import { Client, ClientOptions, Collection } from 'discord.js';
import { GuildType } from '../interface/Guild.interface';
import DiscordCommmand from './DiscordCommand';
import DiscordEvent from './DiscordEvent';

export default class DiscordClient extends Client {
	private _prefix: string = '!';
	private _configs = new Collection<string, GuildType>();
	private _events = new Collection<string, DiscordEvent>();
	private _commands = new Collection<string, DiscordCommmand>();
	private _translations: Map<string, Map<string, string>> = new Map();

	constructor(options: ClientOptions) {
		super(options);
	}

	get prefix(): string {
		return this._prefix;
	}

	set prefix(prefix: string) {
		this._prefix = prefix;
	}

	get configs(): Collection<string, GuildType> {
		return this._configs;
	}

	set configs(configs: Collection<string, GuildType>) {
		this._configs = configs;
	}

	get events(): Collection<string, DiscordEvent> {
		return this._events;
	}

	set events(events: Collection<string, DiscordEvent>) {
		this._events = events;
	}

	get commands(): Collection<string, DiscordCommmand> {
		return this._commands;
	}

	set commands(commands: Collection<string, DiscordCommmand>) {
		this._commands = commands;
	}

	get translations(): Map<string, Map<string, string>> {
		return this._translations;
	}

	set translations(messages: Map<string, Map<string, string>>) {
		this._translations = messages;
	}
}
