"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../builders/commands");
const commands_2 = require("../components/commands/commands");
class PingCommand extends commands_2.SlashCommandComponent {
    constructor() {
        super(new commands_1.SlashCommandBuilder()
            .setName('setup')
            .setDescription('Setup')
            .addModule('setup:setup'));
    }
}
exports.default = PingCommand;
