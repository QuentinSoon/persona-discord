"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const path_1 = __importDefault(require("path"));
const commands_1 = require("../../components/commands");
const files_1 = require("../../utils/files");
const rest = new discord_js_1.REST().setToken(process.env.BOT_TOKEN);
const clientId = process.env.CLIENT_ID;
class CommandsHandler {
    constructor(client) {
        this.client = client;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const files = yield (0, files_1.loadFiles)('../../commands/');
                for (const file of files) {
                    const { default: Command } = yield Promise.resolve(`${path_1.default.join(file)}`).then(s => __importStar(require(s)));
                    console.log(`Imported Command from file ${file}:`, Command);
                    if (typeof Event !== 'function') {
                        console.error(`Failed to load command from file ${file}: Not a constructor`);
                        continue;
                    }
                    const command = new Command();
                    if (command instanceof commands_1.SlashCommandComponent) {
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
                const data = yield rest.put(discord_js_1.Routes.applicationCommands(process.env.CLIENT_ID), {
                    body: this.client.rest_application_commands_array,
                });
                console.log(`Successfully add ${data.length} application (/) commands.`);
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.default = CommandsHandler;
