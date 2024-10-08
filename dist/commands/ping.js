"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../client/builders/commands");
const commands_2 = require("../components/commands");
class PingCommand extends commands_2.SlashCommandComponent {
    constructor() {
        super(new commands_1.SlashCommandBuilder().setName('ping').setDescription('Ping pong'));
    }
    execute(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!interaction.guild)
                return;
            const pingValue = client.ws.ping;
            yield interaction.reply({
                content: `Pong! (${pingValue}ms)`,
                ephemeral: true,
                components: [],
            });
        });
    }
}
exports.default = PingCommand;
