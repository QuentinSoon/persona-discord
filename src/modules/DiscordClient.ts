import { Client, ClientOptions, Collection } from 'discord.js';
import { GuildType, GuildsSchema } from '../classes/Guild.class';
import { supabase } from '../utils/supabase';

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
		await this.login(process.env.BOT_TOKEN);
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
