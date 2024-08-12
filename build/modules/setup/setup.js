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
const modules_1 = __importDefault(require("../../components/modules/modules"));
class SetupModule extends modules_1.default {
    constructor(client) {
        super(client, 'setup');
    }
    setup(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.reply({
                content: '',
                ephemeral: true,
                embeds: [
                    new discord_js_1.EmbedBuilder()
                        .setTitle('Configuration de Persona')
                        .setDescription(`Salut <@${interaction.user.id}> ! 👋 \n\n` +
                        'Persona est un bot avancé de modération automatique et manuelle, conçu pour les petites, moyennes et grandes communautés.\n\n' +
                        'Ce bot est là pour vous aider à maintenir un environnement sûr et agréable. Pour commencer la configuration, veuillez appuyer sur le bouton ci-dessous.')
                        .setThumbnail(client.user.avatarURL())
                        .setFooter({
                        text: 'Persona.app - Discord Bot',
                        iconURL: client.user.avatarURL(),
                    })
                        .setColor('#f8e5fe'),
                ],
                components: [
                    new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                        .setLabel('Commencer la Configuration')
                        .setStyle(discord_js_1.ButtonStyle.Primary)
                        .setCustomId('setup:showModules')),
                ],
            });
        });
    }
    showModules(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.update({
                content: '',
                embeds: [
                    new discord_js_1.EmbedBuilder()
                        .setTitle('Configuration de Persona')
                        .setDescription('Persona propose un large éventail de modules pour optimiser votre serveur. Pour des performances optimales, il est recommandé de ne pas utiliser plusieurs bots offrant les mêmes fonctionnalités.\n\n' +
                        'Cliquez sur un module ci-dessous pour commencer la configuration de celui-ci.')
                        .setThumbnail(client.user.avatarURL())
                        .setFooter({
                        text: 'Persona.app - Discord Bot',
                        iconURL: client.user.avatarURL(),
                    })
                        .setColor('#f8e5fe'),
                ],
                components: [
                    new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                        .setLabel('Alertes (Non configurer)')
                        .setStyle(discord_js_1.ButtonStyle.Danger)
                        .setCustomId('alert:setup')),
                ],
            });
        });
    }
}
exports.default = SetupModule;
