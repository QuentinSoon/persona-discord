import { ActivityType, Client, Collection, IntentsBitField } from 'discord.js';
import 'dotenv/config';
import PanelModule from '../modules/panel/panel';
import TicketModule from '../modules/ticket/ticket';
import CommandStructure from '../structure/CommandStructure';
import CommandsHandler from './handler/CommandsHandler';
import CommandsListener from './handler/CommandsListener';
import EventsHandler from './handler/EventsHandler';

export default class DiscordClient extends Client {
	collection = {
		application_commands: new Collection<string, CommandStructure>(),
	};
	rest_application_commands_array = <any[]>[];

	commands_handler = new CommandsHandler(this);
	events_handler = new EventsHandler(this);

	panel = new PanelModule(this);

	ticket = new TicketModule(this);

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

		new CommandsListener(this);
	}

	connect = async () => {
		console.log(`Attempting to connect to the Discord bot...`);

		try {
			await this.login(process.env.BOT_TOKEN);

			await this.commands_handler.load();
			await this.events_handler.load();

			// await this.commands_handler.registerApplicationCommands();

			console.log('Successfully connected to the Discord bot');
		} catch (err) {
			console.log('Failed to connect to the Discord bot');
		}
	};
}
