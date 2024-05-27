const { REST, Routes } = require('discord.js');
const api = new REST({ version: '10' }).setToken(
	process.env.BOT_TOKEN as string
);

/**
 * Create commands from a guild
 * @param {string} clientId - The bot's client ID
 * @param {string} guildId - The guild ID
 * @param {object} commands- The command(s)
 *  */
const createCommandsGuilds = async (
	clientId: string,
	guildId: string,
	commands: object
) => {
	try {
		await api
			.put(Routes.applicationGuildCommands(clientId, guildId), {
				body: commands,
			})
			.then(() => {
				console.log('Successfully reloaded application (/) commands.');
				console.log(commands);
			})
			.catch(console.error);
	} catch (error) {
		console.error(error);
	}
};

export { createCommandsGuilds };
