import {
	REST,
	RESTPostAPIChatInputApplicationCommandsJSONBody,
	Routes,
} from 'discord.js';

const rest = new REST().setToken(process.env.BOT_TOKEN as string);
const clientId: string = process.env.CLIENT_ID as string;

export const addGuildsCommands = async (
	commands: RESTPostAPIChatInputApplicationCommandsJSONBody[]
) => {
	try {
		console.log(`Started add ${commands.length} application (/) commands.`);

		const data: any = await rest.put(Routes.applicationCommands(clientId), {
			body: commands,
		});
		console.log(`Successfully add ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
};

export const addGuildCommands = async (guildId: string, commands: []) => {
	try {
		console.log(`Started add ${commands.length} application (/) commands.`);
		const data: any = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{
				body: commands,
			}
		);
		console.log(`Successfully add ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
};

// export const deleteAllGuildsCommands = async () => {
// 	try {
// 		console.log(`Deleted ALL application (/) commands.`);

// 		const data: any = await rest.put(Routes.applicationCommands(clientId), {
// 			body: [],
// 		});
// 		console.log(`Successfully delete ALL application (/) commands.`);
// 	} catch (error) {
// 		console.error(error);
// 	}
// };
