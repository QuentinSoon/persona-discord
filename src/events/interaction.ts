import { Events, Guild, Interaction } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import DiscordCommmand from '../client/DiscordCommand';
import DiscordEvent from '../client/DiscordEvent';
import { GuildType } from '../interface/Guild.interface';

export default class InteractionEvent extends DiscordEvent {
	constructor() {
		super(Events.InteractionCreate, false);
	}

	async execute(client: DiscordClient, interaction: Interaction) {
		if (interaction.isCommand()) {
			const guild: Guild | null = interaction.guild;
			if (!guild) return;

			//////////////
			if (!interaction.commandName) return;
			const command: DiscordCommmand | undefined = client.commands.get(
				interaction.commandName
			);
			if (!command) return;

			const discordGuild: GuildType | undefined = client.configs.get(guild.id);
			if (!client.configs.has(guild.id)) return;
			if (!discordGuild) return;

			await command.execute(client, guild, discordGuild, interaction);
		}
	}
}
