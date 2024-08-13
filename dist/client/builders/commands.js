"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlashCommandBuilder = void 0;
const discord_js_1 = require("discord.js");
class SlashCommandBuilder extends discord_js_1.SlashCommandBuilder {
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
exports.SlashCommandBuilder = SlashCommandBuilder;
