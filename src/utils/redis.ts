import 'dotenv/config';
import { Redis, RedisOptions } from 'ioredis';

export default class RedisClient extends Redis {
	constructor(options: RedisOptions) {
		super(options);
	}
}
