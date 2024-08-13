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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
require("dotenv/config");
const EventsHandler_1 = __importDefault(require("./handlers/EventsHandler"));
class DiscordClient extends discord_js_1.Client {
    constructor() {
        super({
            intents: [
                discord_js_1.IntentsBitField.Flags.Guilds,
                discord_js_1.IntentsBitField.Flags.GuildMessages,
                discord_js_1.IntentsBitField.Flags.GuildMembers,
                discord_js_1.IntentsBitField.Flags.MessageContent,
            ],
            presence: {
                activities: [
                    {
                        name: "Persona.app - Lify's Shard",
                        type: discord_js_1.ActivityType.Custom,
                    },
                ],
                status: 'online',
            },
        });
        this.events_handler = new EventsHandler_1.default(this);
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Attempting to connect to the Discord bot...`);
                yield this.events_handler.load();
                yield this.login(process.env.BOT_TOKEN);
                console.log('Successfully connected to the Discord bot!');
            }
            catch (err) {
                console.log('Failed to connect to the Discord bot :', err);
            }
        });
    }
}
exports.default = DiscordClient;
