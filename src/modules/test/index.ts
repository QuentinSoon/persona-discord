import DiscordClient from '../../client/DiscordClient';
import DiscordModule from '../../client/DiscordModule';

export default class Test extends DiscordModule {
	execute(client: DiscordClient, ...args: any[]) {
		throw new Error('Method not implemented.');
	}
}
