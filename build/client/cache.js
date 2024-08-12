import 'dotenv/config';
import AlertClass from '../classes/alert/Alert.class.js';
import GuildClass from '../classes/guild/Guild.class.js';
export default class Cache {
    constructor(client) {
        this.client = client;
        this.guild = new GuildClass(client);
        this.alert = new AlertClass(client);
    }
}
