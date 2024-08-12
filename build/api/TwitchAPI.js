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
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
class TwitchAPI {
    constructor() { }
    getTwitchAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios_1.default.post('https://id.twitch.tv/oauth2/token', null, {
                params: {
                    client_id: process.env.TWITCH_CLIENT_ID,
                    client_secret: process.env.TWITCH_CLIENT_SECRET,
                    grant_type: 'client_credentials',
                },
            });
            return response.data.access_token;
        });
    }
    getUser(userName) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.getTwitchAccessToken();
            try {
                const response = yield axios_1.default.get(`https://api.twitch.tv/helix/users?login=${userName}`, {
                    headers: {
                        'Client-ID': process.env.TWITCH_CLIENT_ID,
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data[0];
            }
            catch (error) {
                console.log('Error occurred:', error);
                return null;
            }
        });
    }
    getStreamsById(userIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.getTwitchAccessToken();
            try {
                const response = yield axios_1.default.get('https://api.twitch.tv/helix/streams?user_id=' +
                    userIds.join('&user_id='), {
                    headers: {
                        'Client-ID': process.env.TWITCH_CLIENT_ID,
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data;
            }
            catch (error) {
                console.log('Error occurred:', error);
                return [];
            }
        });
    }
    getProfilePicture(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.getTwitchAccessToken();
            try {
                const response = yield axios_1.default.get(`https://api.twitch.tv/helix/users?id=${userId}`, {
                    headers: {
                        'Client-ID': process.env.TWITCH_CLIENT_ID,
                        Authorization: `Bearer ${token}`,
                    },
                });
                return response.data.data[0].profile_image_url;
            }
            catch (error) {
                console.log('Error occurred:', error);
                return '';
            }
        });
    }
}
exports.default = TwitchAPI;
