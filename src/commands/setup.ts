import { PermissionsBitField } from 'discord.js';
import { SlashCommandBuilder } from '../client/builders/commands';
import { SlashCommandComponent } from '../components/commands';

export default class PingCommand extends SlashCommandComponent {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('setup')
				.setDescription('Ping pong')
				.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
				.addModule('setup:setup')
		);
	}
}
