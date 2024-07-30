import { Events, Interaction } from 'discord.js';
import DiscordClient from '../client/DiscordClient';
import DiscordEvent from '../client/DiscordEvent';

export default class TEST extends DiscordEvent {
	constructor() {
		super(Events.InteractionCreate, false);
	}

	async execute(client: DiscordClient, interaction: Interaction) {}
}
