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
import { AlertsSchema } from './types.js';
export default class AlertClass {
    constructor(client) {
        this.timeToCache = 24;
        this.client = client;
    }
    getData() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cachedData = yield redis.smembers(`alerts`);
                if (cachedData.length > 0) {
                    const parsedData = cachedData.map((alert) => JSON.parse(alert));
                    const zodParsedData = AlertsSchema.parse(parsedData);
                    return zodParsedData;
                }
                const { data, error } = yield supabase
                    .from('alerts')
                    .select('*')
                    .returns();
                if (error) {
                    throw error;
                }
                if (data) {
                    // console.log(data);
                    yield this.addAlertsToSet(data);
                    // redis.set(`alerts`, JSON.stringify(data));
                    return data;
                }
            }
            catch (error) {
                console.error('[ERROR] Failed to fetch data:', error);
            }
            return null;
        });
    }
    addAlertsToSet(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data && data.length > 0) {
                const type = yield redis.type('alerts');
                if (type !== 'set') {
                    if (type !== 'none') {
                        // La clé existe mais n'est pas un ensemble
                        yield redis.del('alerts'); // Supprimez la clé si elle existe mais n'est pas un ensemble
                    }
                }
                const pipeline = redis.multi();
                data.forEach((alert) => {
                    pipeline.sadd('alerts', JSON.stringify(alert));
                });
                yield pipeline.exec();
                return data;
            }
            return []; // Retourner une liste vide si `data` est vide ou non définie
        });
    }
}
