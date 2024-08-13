import { ActivityType, Client, IntentsBitField } from 'discord.js';
import 'dotenv/config';

export default class DiscordClient extends Client {
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
			await this.login(process.env.BOT_TOKEN);
			console.log(
				'Successfully connected to the Discord bot! ' + process.env.CLIENT_ID
			);
		} catch (err) {
			console.log('Failed to connect to the Discord bot :', err);
		}
	};
}
