import { SlashCommandBuilder } from '../builders/commands.js';
import { SlashCommandComponent } from '../components/commands/commands.js';
export default class PingCommand extends SlashCommandComponent {
    constructor() {
        super(new SlashCommandBuilder()
            .setName('setup')
            .setDescription('Setup')
            .addModule('setup:setup'));
    }
}
