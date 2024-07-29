import { REST, Routes } from 'discord.js';

const rest = new REST().setToken(process.env.BOT_TOKEN as string);
const clientId: string = process.env.CLIENT_ID as string;

export const addGuildCommands = async (commands: []) => {
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

export const addGuildsCommands = async (guildId: string, commands: []) => {
	try {
		console.log(`Started remove ${commands.length} application (/) commands.`);
		const data: any = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{
				body: commands,
			}
		);
		console.log(`Successfully remove ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
};
