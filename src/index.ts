import DiscordClient from './client/DiscordClient.js';

const client = new DiscordClient();

(async () => {
	await client.connect();
})();
