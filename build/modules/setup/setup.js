var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, } from 'discord.js';
import ModuleComponent from '../../components/modules/modules';
export default class SetupModule extends ModuleComponent {
    constructor(client) {
        super(client, 'setup');
    }
    setup(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.reply({
                content: '',
                ephemeral: true,
                embeds: [
                    new EmbedBuilder()
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
                    new ActionRowBuilder().addComponents(new ButtonBuilder()
                        .setLabel('Commencer la Configuration')
                        .setStyle(ButtonStyle.Primary)
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
                    new EmbedBuilder()
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
                    new ActionRowBuilder().addComponents(new ButtonBuilder()
                        .setLabel('Alertes (Non configurer)')
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId('alert:setup')),
                ],
            });
        });
    }
}
