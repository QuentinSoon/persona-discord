import DiscordClient from './client/DiscordClient';

const client = new DiscordClient();

(async () => {
	await client.connect();
})();

module.exports = client;
