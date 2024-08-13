import { Redis } from 'ioredis';

export const redis = new Redis({
	host: process.env.REDIS_HOST as string,
	port: Number(process.env.REDIS_PORT as string),
	username: process.env.REDIS_USERNAME as string,
	password: process.env.REDIS_PASSWORD as string,
	db: 1,
});
