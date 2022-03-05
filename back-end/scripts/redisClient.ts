import { createClient } from 'redis';
type RedisClientType = ReturnType<typeof createClient>;

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

console.log(`> Connecting to ${REDIS_URL}`);

const redisClient: RedisClientType = createClient({ url: REDIS_URL });

redisClient.on('error', (error) => {
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
        console.log('> Redis container not yet available...');
    }
});

redisClient.on('connect', () => console.log(`> Connected to Redis`));

redisClient.connect();

export default redisClient;
