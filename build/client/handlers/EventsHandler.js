var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import EventComponent from '../../components/events/events.js';
import { loadFiles } from '../../utils/files.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default class EventsHandler {
    constructor(client) {
        this.client = client;
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const basePath = process.env.NODE_ENV === 'production'
                    ? './build/' // Chemin pour le dossier build
                    : './src/'; // Chemin pour le dossier src
                // const files = await loadFiles('./src/events/');
                const files = yield loadFiles(basePath + '/events/');
                for (const file of files) {
                    const { default: Event } = yield import(path.join('../../../', file));
                    console.log(`Imported Event from file ${file}:`, Event);
                    if (typeof Event !== 'function') {
                        console.error(`Failed to load event from file ${file}: Not a constructor`);
                        continue;
                    }
                    const event = new Event();
                    if (event instanceof EventComponent) {
                        if (event.once) {
                            this.client.once(event.name, event.execute.bind(event, this.client));
                        }
                        else {
                            this.client.on(event.name, event.execute.bind(event, this.client));
                        }
                    }
                    else {
                        console.error(`Event from file ${file} is not an instance of DiscordEvent`);
                    }
                }
            }
            catch (err) {
                console.error(`Error loading events: ${err}`);
            }
        });
    }
}
