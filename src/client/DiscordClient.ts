import { ActivityType, Client, Collection, IntentsBitField } from 'discord.js';
import 'dotenv/config';
import { Redis } from 'ioredis';
import TwitchAPI from '../api/TwitchAPI';
import Cache from '../cache/cache';
import { SlashCommandComponent } from '../components/commands/commands';
import AlertModule from '../modules/alert/alert';
import PanelModule from '../modules/panel/panel';
import CommandsHandler from './handlers/CommandHandler';
import EventsHandler from './handlers/EventsHandler';

export default class DiscordClient extends Client {
	collection = {
		application_commands: new Collection<string, SlashCommandComponent>(),
	};
	rest_application_commands_array = <any[]>[];

	commands_handler = new CommandsHandler(this);
	events_handler = new EventsHandler(this);

	panel = new PanelModule(this);
	alert = new AlertModule(this);

	twitch = new TwitchAPI();

	redis = new Redis({
		host: process.env.REDIS_HOST as string,
		port: Number(process.env.REDIS_PORT as string),
		username: process.env.REDIS_USERNAME as string,
		password: process.env.REDIS_PASSWORD as string,
		db: 1,
	});

	cache = new Cache(this);

	constructor() {
		super({
			intents: [
				IntentsBitField.Flags.Guilds,
				IntentsBitField.Flags.GuildMessages,
				IntentsBitField.Flags.GuildMembers,
				IntentsBitField.Flags.MessageContent,
			],
			presence: {
				activities: [
					{
						name: "Persona.app - Lify's Shard",
						type: ActivityType.Custom,
					},
				],
				status: 'online',
			},
		});
	}

	connect = async () => {
		try {
			console.log(`Attempting to connect to the Discord bot...`);

			await this.redis.flushdb();

			await this.login(process.env.BOT_TOKEN);

			await this.commands_handler.load();
			await this.events_handler.load();

			await this.commands_handler.registerApplicationCommands();
		} catch (err) {
			console.log('Failed to connect to the Discord bot');
		}
	};
}
