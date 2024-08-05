import { ActivityType, Client, Collection, IntentsBitField } from 'discord.js';
import 'dotenv/config';
import AlertModule from '../modules/alert/alert';
import PanelModule from '../modules/panel/panel';
import TicketModule from '../modules/ticket/ticket';
import CommandStructure from '../structure/CommandStructure';
import RedisClient from '../utils/redis';
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
	alert = new AlertModule(this);
	redis = new RedisClient({
		host: process.env.REDIS_HOST as string,
		port: Number(process.env.REDIS_PORT as string),
		password: process.env.REDIS_PASSWORD as string,
		db: 1,
	});

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

		this.redis.on('error', (err) => console.log(err));
		this.redis.on('ready', () => console.log('Redis is ready'));

		new CommandsListener(this);

		// setTimeout(async () => checkIfLive('pomakatv'), 5 * 1000);

		// async function checkIfLive(username) {
		// 	try {
		// 		// // const response = await fetch(`https://twitch.tv/${username}`);
		// 		// const response = await fetch(
		// 		// 	`https://api.twitch.tv/kraken/streams/${username}`
		// 		// );
		// 		// const sourceCode: any = await response.text();

		// 		// // console.log('Source code:', sourceCode);

		// 		// console.log('Source code:', sourceCode);

		// 		// if (sourceCode.includes('isLiveBroadcast')) {
		// 		// 	console.log(`${username} is live =>` + sourceCode[1]);
		// 		// } else {
		// 		// 	console.log(`${username} is not live`);
		// 		// }

		// 		// check if the stream is live api twitch
		// 		const response = await axios.get(
		// 			`https://api.twitch.tv/helix/streams?user_login=${username}`,
		// 			{
		// 				headers: {
		// 					Authorization: `Bearer 906ajmygxtm7c1stz7lpebimvodykr`,
		// 					'Client-Id': 'gp762nuuoqcoxypju8c569th9wz7q5',
		// 				},
		// 			}
		// 		);
		// 		const data = await response.data.data[0];

		// 		console.log('Response:', data);
		// 		const sourceCode = data;

		// 		console.log('title:' + sourceCode.title);
		// 	} catch (error) {
		// 		console.log('Error occurred:', error);
		// 	}
		// }
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
