import DiscordClient from './DiscordClient';

export default abstract class DiscordModule {
	constructor() {}

	abstract execute(client: DiscordClient, ...args: any[]);
}
