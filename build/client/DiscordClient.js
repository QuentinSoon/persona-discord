var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ActivityType, Client, Collection, IntentsBitField } from 'discord.js';
import 'dotenv/config';
import TwitchAPI from '../api/TwitchAPI';
import AlertModule from '../modules/alert/alert';
import SetupModule from '../modules/setup/setup';
import Cache from './cache';
import CommandsHandler from './handlers/CommandHandler';
import EventsHandler from './handlers/EventsHandler';
export default class DiscordClient extends Client {
    constructor() {
        super({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.MessageContent,
            ],
            presence: {
                activities: [
                    {
                        name: "Persona.app - Lify's Shard",
                        type: ActivityType.Custom,
                    },
                ],
                status: 'online',
            },
        });
        this.collection = {
            application_commands: new Collection(),
        };
        this.rest_application_commands_array = [];
        this.commands_handler = new CommandsHandler(this);
        this.events_handler = new EventsHandler(this);
        this.cache = new Cache(this);
        this.setup = new SetupModule(this);
        this.alert = new AlertModule(this);
        this.twitch = new TwitchAPI();
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Attempting to connect to the Discord bot...`);
                yield this.login(process.env.BOT_TOKEN);
                yield this.commands_handler.load();
                yield this.events_handler.load();
                yield this.commands_handler.registerApplicationCommands();
            }
            catch (err) {
                console.log('Failed to connect to the Discord bot');
            }
        });
    }
}
