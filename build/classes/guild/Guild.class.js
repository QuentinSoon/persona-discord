var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import 'dotenv/config';
import { redis } from '../../utils/redis.js';
import { supabase } from '../../utils/supabase.js';
import { GuildSchema } from './types.js';
export default class GuildClass {
    constructor(client) {
        this.timeToCache = 24;
        this.client = client;
    }
    getData(guildId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cachedData = yield redis.get(`guild:${guildId}`);
                if (cachedData) {
                    const parsedData = JSON.parse(cachedData);
                    const zodParsedData = GuildSchema.parse(parsedData);
                    return zodParsedData;
                }
                const { data, error } = yield supabase
                    .from('guilds')
                    .select('*')
                    .eq('guild_id', guildId)
                    .single();
                if (error) {
                    throw error;
                }
                if (data) {
                    yield redis.set(`guild:${guildId}`, JSON.stringify(data), 'EX', (_a = this.timeToCache * 60 * 60) !== null && _a !== void 0 ? _a : 3600);
                    return data;
                }
            }
            catch (error) {
                console.error('[ERROR] Failed to fetch data:', error);
            }
            return null;
        });
    }
    addData(guildId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cachedData = yield this.getData(guildId);
                if (cachedData)
                    return;
                const { data, error } = yield supabase
                    .from('guilds')
                    .insert({
                    guild_id: guildId,
                })
                    .select()
                    .single();
                if (error) {
                    throw error;
                }
                if (data) {
                    yield redis.set(`guild:${guildId}`, JSON.stringify(data), 'EX', (_a = this.timeToCache * 60 * 60) !== null && _a !== void 0 ? _a : 3600);
                    return data;
                }
            }
            catch (error) {
                console.error('[ERROR] Failed to fetch data:', error);
            }
            return null;
        });
    }
    removeData(guildId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cachedData = yield this.getData(guildId);
                if (!cachedData)
                    return;
                const { data, error } = yield supabase
                    .from('guilds')
                    .delete()
                    .eq('guild_id', guildId)
                    .select();
                if (error) {
                    throw error;
                }
                if (data) {
                    yield redis.del(`guild:${guildId}`);
                    return data;
                }
            }
            catch (error) {
                console.error('[ERROR] Failed to fetch data:', error);
            }
        });
    }
}
