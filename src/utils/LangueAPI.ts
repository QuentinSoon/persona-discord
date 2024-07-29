// // export const LangueAPI = async (langue: string) => {
// // 	const langueFile = await import(`./${langue}.json`);
// // 	return langueFile;
// // };

// import { Guild } from 'discord.js';
// import fr from '../utils/fr.json';

// // converse the fr json file to type.
// type LangueType = typeof fr;

// export default class LangueAPI {
// 	private _langue: string;
// 	private keysTrad: Map<string, Map<string, string>>;

// 	constructor(guild: Guild) {
// 		this._langue = guild.preferredLocale.toLowerCase();
// 	}

// 	async loadLang() {
// 		const langueFile = await import(`./${this._langue}.json`);
// 		if (langueFile) {
// 			return langueFile;
// 		}
// 		return fr;
// 	}

// 	async getLang(): Promise<LangueType> {
// 		const langueFile = await import(`./${this._langue}.json`);
// 		if (langueFile) {
// 			return langueFile;
// 		}
// 		return fr;
// 	}

// 	async getMessage(message: string) {
// 		const asyncthis = await this.getLang();

// 		if (!asyncthis[message]) {
// 			return 'No message found';
// 		}

// 		return asyncthis[message];
// 	}
// }
