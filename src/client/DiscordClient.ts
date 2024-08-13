import { ActivityType, Client, IntentsBitField } from 'discord.js';
import 'dotenv/config';
import EventsHandler from './handlers/EventsHandler';

export default class DiscordClient extends Client {
	events_handler = new EventsHandler(this);

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

			await this.events_handler.load();

			await this.login(process.env.BOT_TOKEN);

			console.log('Successfully connected to the Discord bot!');
		} catch (err) {
			console.log('Failed to connect to the Discord bot :', err);
		}
	};
}
