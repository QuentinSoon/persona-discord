import { PermissionsBitField } from 'discord.js';
import { SlashCommandBuilder } from '../builders/commands';
import { SlashCommandComponent } from '../components/commands/commands';

export default class PingCommand extends SlashCommandComponent {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('setup')
				.setDescription('Setup')
				.setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
				.addModule('setup:setup')
		);
	}
}
