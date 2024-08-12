import { SlashCommandBuilder as DiscordSlashCommandBuilder } from 'discord.js';
export class SlashCommandBuilder extends DiscordSlashCommandBuilder {
    constructor() {
        super();
        this._modules = undefined;
    }
    build() {
        return this;
    }
    addModule(module) {
        this._modules = module;
        return this;
    }
    get modules() {
        return this._modules;
    }
}
