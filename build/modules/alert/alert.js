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
const redis_1 = require("../../utils/redis");
const supabase_1 = require("../../utils/supabase");
class AlertModule extends modules_1.default {
    constructor(client) {
        super(client, 'alert');
        this.timeToCache = 3;
        this.showModal = (client, interaction) => __awaiter(this, void 0, void 0, function* () {
            yield interaction.showModal(new discord_js_1.ModalBuilder()
                .setTitle('Ajouter une nouvelle alerte')
                .setCustomId('alert:confirmUser')
                .addComponents(new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.TextInputBuilder()
                .setLabel('Nom du streamer')
                .setCustomId('alert-modal-title')
                .setPlaceholder('PersonaApp')
                .setStyle(discord_js_1.TextInputStyle.Short)
                .setRequired(true)), new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.TextInputBuilder()
                .setLabel("Description dans l'alerte (Facultatif)")
                .setCustomId('alert-modal-description')
                .setPlaceholder('PersonaApp est en stream! 🚀 @everyone')
                .setStyle(discord_js_1.TextInputStyle.Paragraph)
                .setRequired(false))));
        });
        this.confirmUser = (client, interaction) => __awaiter(this, void 0, void 0, function* () {
            if (!interaction.guild)
                return;
            const guildId = interaction.guild.id;
            let streamerData = null;
            let streamerNameField = '';
            let streamerDescription = '';
            if (interaction.isModalSubmit()) {
                const field = interaction;
                streamerNameField = field.fields.getTextInputValue('alert-modal-title');
                streamerDescription = field.fields.getTextInputValue('alert-modal-description');
                streamerData = yield client.twitch.getUser(streamerNameField);
            }
            if (!streamerData)
                return;
            yield interaction.update({
                embeds: [
                    new discord_js_1.EmbedBuilder()
                        .setTitle("Configurer le module d'alerte")
                        .setDescription(`Est-ce que la personne est bien ce streamer ?`)
                        .setFields({
                        name: 'Nom',
                        value: streamerData.display_name,
                        inline: true,
                    }, {
                        name: 'ID',
                        value: streamerData.id,
                        inline: true,
                    }, {
                        name: 'Description',
                        value: streamerData.description,
                        inline: false,
                    })
                        .setThumbnail(streamerData.profile_image_url)
                        .setFooter({
                        text: 'Persona.app - Discord Bot',
                        iconURL: client.user.avatarURL(),
                    })
                        .setColor('#f8e5fe'),
                ],
                components: [
                    new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                        .setLabel('Annuler')
                        .setStyle(discord_js_1.ButtonStyle.Secondary)
                        .setCustomId('alert:setup'), new discord_js_1.ButtonBuilder()
                        .setLabel('Non')
                        .setStyle(discord_js_1.ButtonStyle.Danger)
                        .setCustomId('alert:showModal'), new discord_js_1.ButtonBuilder()
                        .setLabel('Oui')
                        .setStyle(discord_js_1.ButtonStyle.Success)
                        .setCustomId(`alert:addChannel:${streamerNameField}:${streamerDescription}:${streamerData.id}`)),
                ],
            });
        });
        this.addChannel = (client, interaction, streamerNameField, streamerDescription, streamerId) => __awaiter(this, void 0, void 0, function* () {
            yield interaction.update({
                embeds: [
                    new discord_js_1.EmbedBuilder()
                        .setTitle("Configurer le module d'alerte")
                        .setDescription('Selectionnez un salon qui recevra les alertes.')
                        .setThumbnail(client.user.avatarURL())
                        .setFooter({
                        text: 'Persona.app - Discord Bot',
                        iconURL: client.user.avatarURL(),
                    })
                        .setColor('#f8e5fe'),
                ],
                components: [
                    new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ChannelSelectMenuBuilder()
                        .setCustomId(`alert:comfirmAlert:${streamerNameField}:${streamerDescription}:${streamerId}`)
                        .setPlaceholder('Selectionnez un salon textuel')
                        .setChannelTypes(discord_js_1.ChannelType.GuildAnnouncement, discord_js_1.ChannelType.GuildText)
                        .setDefaultChannels([])),
                    new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                        .setLabel('Retour')
                        .setStyle(discord_js_1.ButtonStyle.Secondary)
                        .setCustomId('alert:confirmUser')),
                ],
            });
        });
        this.comfirmAlert = (client, interaction, streamerNameField, streamerDescription, streamerId) => __awaiter(this, void 0, void 0, function* () {
            if (!interaction.guild)
                return;
            const loginId = streamerNameField;
            const channelId = interaction.values[0];
            const { data, error } = yield supabase_1.supabase
                .from('alerts')
                .insert({
                guild_id: interaction.guild.id,
                login_id: streamerId,
                channel_id: channelId,
                description: streamerDescription,
            })
                .select()
                .single();
            if (error)
                return console.log(error);
            yield interaction.update({
                embeds: [
                    new discord_js_1.EmbedBuilder()
                        .setTitle("Configurer le module d'alerte")
                        .setDescription('La configuration des alertes est terminée. 🎉')
                        .setThumbnail(client.user.avatarURL())
                        .setFooter({
                        text: 'Persona.app - Discord Bot',
                        iconURL: client.user.avatarURL(),
                    })
                        .setColor('#f8e5fe'),
                ],
                components: [],
            });
            // add alert to redis (alerts)
            try {
                // await redis.sadd('alerts', JSON.stringify(data));
                this.addAlert(data);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.addAlert = (data) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Vérifiez le type de la clé 'alerts'
                const type = yield redis_1.redis.type('alerts');
                if (type !== 'set') {
                    if (type !== 'none') {
                        // La clé existe mais n'est pas du type 'set'
                        yield redis_1.redis.del('alerts'); // Supprimez la clé s'il existe mais n'est pas un `set`
                    }
                }
                yield redis_1.redis.sadd('alerts', JSON.stringify(data));
            }
            catch (error) {
                console.error('Error adding data:', error);
            }
        });
        function getStreamers() {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function* () {
                // Récupère tous les streamers de la base de données
                const streamerData = yield client.cache.alert.getData();
                if (!streamerData)
                    return;
                const streamerNames = streamerData.map((row) => row.login_id);
                yield updateLiveStreamers(streamerNames);
                const liveStreamers = yield redis_1.redis.hkeys('currentLiveStreamers');
                for (const streamer of liveStreamers) {
                    const notified = yield redis_1.redis.sismember('notifiedStreamers', streamer);
                    if (!notified) {
                        yield redis_1.redis.sadd('notifiedStreamers', streamer);
                        const streamDataRaw = yield redis_1.redis.hget('currentLiveStreamers', streamer);
                        if (!streamDataRaw)
                            return;
                        const streamData = JSON.parse(streamDataRaw);
                        for (const data of streamerData.filter((row) => row.login_id === streamer)) {
                            const channel = client.channels.cache.get((_a = data.channel_id) !== null && _a !== void 0 ? _a : '');
                            if (!channel)
                                return;
                            const thumbnail_url = streamData.thumbnail_url
                                .replace('{width}', '1280')
                                .replace('{height}', '720');
                            const pic = yield client.twitch.getProfilePicture(streamData.user_id);
                            const embed = new discord_js_1.EmbedBuilder()
                                .setTitle(streamData.title)
                                .setAuthor({
                                iconURL: pic,
                                name: `${streamData.user_name} est en live sur Twitch !`,
                            })
                                .setURL(`https://twitch.tv/${streamData.user_name}`)
                                .setImage(thumbnail_url)
                                .addFields({
                                name: 'Jeu',
                                value: (_b = streamData.game_name) !== null && _b !== void 0 ? _b : 'Aucun jeu',
                                inline: true,
                            }, {
                                name: 'Viewers',
                                value: (_c = streamData.viewer_count + '') !== null && _c !== void 0 ? _c : '0',
                                inline: true,
                            })
                                .setFooter({
                                text: 'Persona.app - Discord Bot',
                                iconURL: client.user.avatarURL(),
                            })
                                .setColor('#f8e5fe');
                            if (data.description) {
                                embed.setDescription(data.description);
                            }
                            channel.send({
                                content: '',
                                embeds: [embed],
                                components: [
                                    new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                                        .setLabel('Voir sur Twitch')
                                        .setStyle(discord_js_1.ButtonStyle.Link)
                                        .setURL(`https://twitch.tv/${streamData.user_name}`)),
                                ],
                            });
                        }
                    }
                }
            });
        }
        function updateLiveStreamers(streamerNames) {
            return __awaiter(this, void 0, void 0, function* () {
                yield redis_1.redis.del('currentLiveStreamers');
                for (let i = 0; i < streamerNames.length; i += 100) {
                    const streamersBatch = streamerNames.slice(i, i + 100);
                    const response = yield client.twitch.getStreamsById(streamersBatch);
                    for (const stream of response) {
                        yield redis_1.redis.hset('currentLiveStreamers', stream.user_id, JSON.stringify(stream));
                    }
                }
            });
        }
        setInterval(getStreamers, this.timeToCache * 1000);
    }
    setup(client, interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            yield interaction.update({
                content: '',
                embeds: [
                    new discord_js_1.EmbedBuilder()
                        .setTitle("Configurer le module d'alerte")
                        .setDescription('Ce module vous permet de cree des alertes de live Twitch.\n\n' +
                        '**Fonctionnalités du Module Alerte :**\n' +
                        "- Lorsqu'un streamer est en live sur Twitch, une alerte est envoyée dans le salon de discussion.\n\n" +
                        'Pour commencer la configuration, appuyez sur le bouton ci-dessous. Suivez les instructions et configurez votre module selon vos besoins.')
                        .setThumbnail(client.user.avatarURL())
                        .setFooter({
                        text: 'Persona.app - Discord Bot',
                        iconURL: client.user.avatarURL(),
                    })
                        .setColor('#f8e5fe'),
                ],
                components: [
                    new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                        .setLabel('Retour')
                        .setStyle(discord_js_1.ButtonStyle.Secondary)
                        .setCustomId('setup:showModules'), new discord_js_1.ButtonBuilder()
                        .setLabel('Configurer une alerte')
                        .setStyle(discord_js_1.ButtonStyle.Success)
                        .setCustomId('alert:showModal')),
                ],
            });
        });
    }
}
exports.default = AlertModule;
