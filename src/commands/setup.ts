import { SlashCommandBuilder } from '../builders/commands';
import { SlashCommandComponent } from '../components/commands/commands';

export default class PingCommand extends SlashCommandComponent {
	constructor() {
		super(
			new SlashCommandBuilder()
				.setName('setup')
				.setDescription('Setup')
				.addModule('setup:setup')
		);
	}
}
