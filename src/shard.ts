import { ShardingManager } from 'discord.js';
import 'dotenv/config';

(async () => {
	let manager = new ShardingManager('./src/index.ts', {
		token: process.env.BOT_TOKEN,
		totalShards: 'auto',
	});

	manager.on('shardCreate', (shard) =>
		console.log(`Launched shard ${shard.id}`)
	);

	manager.spawn();
})();
