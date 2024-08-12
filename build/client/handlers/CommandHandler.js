var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { REST, Routes } from 'discord.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { SlashCommandComponent } from '../../components/commands/commands.js';
import { loadFiles } from '../../utils/files.js';
const rest = new REST().setToken(process.env.BOT_TOKEN);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default class CommandsHandler {
    constructor(client) {
        this.client = client;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const basePath = process.env.NODE_ENV === 'production'
                    ? './build' // Chemin pour le dossier build
                    : './src'; // Chemin pour le dossier src
                const files = yield loadFiles(basePath + '/commands/'); // TODO: change path
                for (const file of files) {
                    const { default: Command } = yield import(path.join('../../../', file));
                    console.log(`Imported Command from file ${file}:`, Command);
                    if (typeof Event !== 'function') {
                        console.error(`Failed to load command from file ${file}: Not a constructor`);
                        continue;
                    }
                    const command = new Command();
                    if (command instanceof SlashCommandComponent) {
                        this.client.collection.application_commands.set(command.data.name, command);
                        this.client.rest_application_commands_array.push(command.data.toJSON());
                    }
                    else {
                        console.error(`Command from file ${file} is not an instance of CommandStructure`);
                    }
                }
            }
            catch (err) {
                console.error(`Error loading commands: ${err}`);
            }
        });
    }
    registerApplicationCommands() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(`Started add ${this.client.rest_application_commands_array.length} application (/) commands.`);
                const data1 = yield rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
                    body: this.client.rest_application_commands_array,
                });
                console.log(`Successfully add ${data1.length} application (/) commands.`);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
